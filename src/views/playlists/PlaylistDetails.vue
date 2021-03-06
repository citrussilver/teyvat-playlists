<template>
  <div class="error" v-if="error">{{ error }}</div>
  <div v-if="playlist" class="playlist-details">
    <!-- playlist information -->
    <div class="playlist-info">
      <div class="cover">
        <img :src="playlist.coverUrl">
      </div>
      <h2>{{ playlist.title }}</h2>
      <p class="username">Created by {{ playlist.userName }}</p>
      <p class="description">{{ playlist.description }}</p>
      <button v-if="ownership" @click="handleDelete">Delete Playlist</button>
    </div>

    <!-- song list -->
    <div class="song-list">
      <div v-if="!playlist.songs.length">No songs added yet.</div>
      <div v-for="song in playlist.songs" :key="song.id" class="single-song">
        <div class="details">
          <h3>{{ song.title }}</h3>
          <p>{{ song.artist }}</p>
        </div>
        <button v-if="ownership" @click="handleSongDelete(song.id)">Delete</button>
      </div>
      <AddSong v-if="ownership" :playlist="playlist"/>
    </div>
    
  </div>
</template>

<script>
import useStorage from '@/composables/useStorage'
import useDocument from '@/composables/useDocument'
import getDocument from '@/composables/getDocument'
import getUser from '@/composables/getUser'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import AddSong from '@/components/AddSong'

export default {
  props: ['id'],
  components: { 
    AddSong
  },
  setup(props) {
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
    
    const handleDelete = async () => {
      await deleteDoc()
      await deleteImage(playlist.value.filePath)
      router.push({ name: 'Home' })
    }

    const handleSongDelete = async (id) => {
      let filteredSongs = playlist.value.songs.filter((song) => song.id !== id)
      // console.log(filteredSongs)
      await updateDoc({
        songs: filteredSongs
      })
    }

    return { error, playlist, ownership, handleDelete, handleSongDelete }
  }
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
    padding: 160px;
  }
  .cover img {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    max-width: 200%;
    max-height: 200%;
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
    /* color: #999; */
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