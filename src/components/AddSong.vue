<template>
  <div class="add-song">
    <button @click="openModal">Add Songs</button>

    <Teleport to="body">
      <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
        <div class="modal" role="dialog" aria-modal="true" aria-labelledby="add-song-title">
          <form @submit.prevent="handleSubmit">
            <h4 id="add-song-title">Add a New Song</h4>
            <div class="wrapper">
              <div class="field-group">
                <input type="text" placeholder="Song title" required v-model="title">
                <div class="line"></div>
              </div>
              <div class="field-group">
                <input type="text" placeholder="Artist" required v-model="artist">
                <div class="line"></div>
              </div>
            </div>
            <div class="modal-actions">
              <button type="submit">Add</button>
              <button type="button" class="cancel-btn" @click="closeModal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import useDocument from '@/composables/useDocument'

const props = defineProps({
  playlist: {
    type: Object,
    required: true
  }
})

const title = ref('')
const artist = ref('')
const showModal = ref(false)
const { updateDoc } = useDocument('playlists', props.playlist.id)

const openModal = () => {
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  title.value = ''
  artist.value = ''
}

const handleSubmit = async () => {
  const newSong = {
    title: title.value,
    artist: artist.value,
    id: Math.floor(Math.random() * 1000000)
  }
  await updateDoc({
    songs: [...props.playlist.songs, newSong]
  })
  closeModal()
}
</script>

<style scoped>
.add-song {
  text-align: center;
  margin-top: 40px;
}

.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(68, 71, 67, 0.45);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.modal {
  width: 100%;
  max-width: 400px;
}

.modal form {
  opacity: 1;
  animation: none;
  margin: 0;
  max-width: 100%;
  text-align: left;
  background: var(--background-2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

.modal-actions button {
  flex: 1;
}

.cancel-btn {
  background: var(--background);
}
</style>
