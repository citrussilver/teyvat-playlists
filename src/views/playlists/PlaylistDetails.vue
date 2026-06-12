<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">
    <div class="playlist-info">
      <div class="cover" :class="{ 'cover--editable': ownership && coverUrl && !coverImageError }">
        <img
          v-if="coverUrl && !coverImageError"
          :src="coverUrl"
          alt="Playlist cover"
          @error="coverImageError = true"
          @load="coverImageError = false"
        >
        <div v-else class="cover-placeholder">
          <span>Cover unavailable</span>
        </div>
        <div
          v-if="ownership && coverUrl && !coverImageError"
          class="cover-overlay"
        >
          <button type="button" @click="showUploadImage = true">Replace Image</button>
        </div>
        <button
          v-if="ownership && coverImageError"
          type="button"
          class="upload-image-btn"
          @click="showUploadImage = true"
        >
          Upload Image
        </button>
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button v-if="ownership" @click="handleDelete">Delete Playlist</button>
    </div>

    <div class="song-list">
      <div v-if="!playlist.songs.length">No songs added yet.</div>
      <div v-for="song in playlist.songs" :key="song.id" class="single-song">
        <div class="details">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
        </div>
        <button v-if="ownership" @click="openSongDeleteConfirm(song.id)">Delete</button>
      </div>
      <AddSong v-if="ownership" :playlist="playlist"/>
    </div>

    <ConfirmModal
      v-model="showSongDeleteConfirm"
      title="Delete song?"
      :message="songDeleteMessage"
      @confirm="confirmSongDelete"
    />

    <UploadImageLink
      v-if="ownership"
      v-model="showUploadImage"
      :playlist-id="id"
      @saved="onImageLinkSaved"
    />
    
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import AddSong from '@/components/AddSong.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import UploadImageLink from '@/components/UploadImageLink.vue'
import useStorage from '@/composables/useStorage'
import useDocument from '@/composables/useDocument'
import getDocument from '@/composables/getDocument'
import getUser from '@/composables/getUser'
import getPlaylistCoverUrl from '@/composables/getPlaylistCoverUrl'

const props = defineProps({
  id: {
    type: String,
    required: true
  }
})

const { error, document: playlist } = getDocument('playlists', props.id)
const { user } = getUser()
const { deleteDoc, updateDoc } = useDocument('playlists', props.id)
const { deleteImage } = useStorage()
const router = useRouter()

const ownership = computed(() => {
  return playlist.value
    && user.value
    && user.value.uid == playlist.value.userId
})

const coverUrl = computed(() => getPlaylistCoverUrl(playlist.value))
const coverImageError = ref(false)
const showUploadImage = ref(false)

watch(coverUrl, () => {
  coverImageError.value = false
})

const onImageLinkSaved = () => {
  coverImageError.value = false
}

const showSongDeleteConfirm = ref(false)
const songIdToDelete = ref(null)

const songDeleteMessage = computed(() => {
  const song = playlist.value?.songs.find((s) => s.id === songIdToDelete.value)
  return song
    ? `Are you sure you want to delete "${song.title}" by ${song.artist}?`
    : 'Are you sure you want to delete this song?'
})

const openSongDeleteConfirm = (id) => {
  songIdToDelete.value = id
  showSongDeleteConfirm.value = true
}

const confirmSongDelete = async () => {
  if (songIdToDelete.value == null) return
  await handleSongDelete(songIdToDelete.value)
  songIdToDelete.value = null
}

const handleDelete = async () => {
  await deleteDoc()
  await deleteImage(playlist.value.filePath)
  router.push({ name: 'Home' })
}

const handleSongDelete = async (id) => {
  const filteredSongs = playlist.value.songs.filter((song) => song.id !== id)
  await updateDoc({
    songs: filteredSongs
  })
}
</script>

<style>
  .playlist-details {
    opacity: 0;
    display: grid;
    grid-template-columns: 1fr 2fr;
    column-gap: 5rem;
    animation-name: playlist-detail-animate;
    animation-duration: var(--anim-duration);
    animation-fill-mode: var(--anim-fill-mode);
  }

   @keyframes playlist-detail-animate {
    to {
      opacity: 1;
    }
  }

  .cover {
    overflow: hidden;
    border-radius: 20px;
    position: relative;
    aspect-ratio: 1;
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
    background: color-mix(in srgb, var(--background-2) 20%, transparent);
  }

  .cover img {
    display: block;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .cover-placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: color-mix(in srgb, var(--background-2) 20%, transparent);
    color: var(--primary);
    font-size: 0.875rem;
  }

  .cover-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(68, 71, 67, 0.55);
    opacity: 0;
    transition: opacity 0.2s ease;
    z-index: 1;
    pointer-events: none;
  }

  .cover--editable:hover .cover-overlay {
    opacity: 1;
    pointer-events: auto;
  }

  .upload-image-btn {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
  }
  .playlist-info {
    text-align: center;
  }
  .playlist-info h2 {
    text-transform: capitalize;
    font-size: 28px;
    margin-top: 20px;
  }
  .playlist-info p {
    margin-bottom: 20px;
  }
  .username {
    color: var(--primary);
  }
  .description {
    text-align: center;
  }
  .single-song {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px dashed var(--secondary);
    margin-bottom: 20px;
  }

  @media screen and (max-width: 768px) {
    
    .playlist-details {
      width: 100%;
      row-gap: 1.5rem;
      grid-template-columns: 1fr;
      grid-template-rows: repeat(2, 1fr);
    }

  }
</style>
