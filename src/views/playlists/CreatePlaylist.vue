<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <h4>Create a New Playlist</h4>
      <div class="wrapper">
          <div class="field-group">
              <input type="text" required placeholder="Playlist title" v-model="title">
              <div class="line"></div>
          </div>
      </div>
      <div class="wrapper">
          <div class="field-group">
              <textarea required placeholder="Playlist description..." v-model="description"></textarea>
              <div class="line"></div>
          </div>
      </div>
      <!-- upload playlist image -->
      <div id="file-input">
        <label>Upload Playlist Cover Image</label>
        <input type="file" @change="handleChange">
      </div>
      
      <div class="error">{{ fileError }}</div>

      <button v-if="!isPending">Create</button>
      <button v-else disabled>Saving...</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import useStorage from '@/composables/useStorage'
import useCollection from '@/composables/useCollection'
import getUser from '@/composables/getUser'
import { timestamp } from '@/firebase/config'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const { filePath, url, uploadImage } = useStorage()
    const { error, addDoc } = useCollection('playlists')
    const { user } = getUser()
    const router = useRouter()
    const title = ref('')
    const description = ref('')
    const file = ref(null)
    const fileError = ref(null)
    const isPending = ref(false)

    
    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true
        await uploadImage(file.value)
        const res = await addDoc({
          title: title.value,
          description: description.value,
          userId: user.value.uid,
          userName: user.value.displayName,
          coverUrl: url.value,
          filePath: filePath.value, // so we can delete it later
          songs: [],
          createdAt: timestamp()
        })
        isPending.value = false
        if (!error.value) {
          router.push({ name: 'PlaylistDetails', params: { id: res.id }})
        }
      }
    }
    // allowed file types
    const types = ['image/png', 'image/jpeg']
    const handleChange = (e) => {
      let selected = e.target.files[0]
      // console.log(selected)
      if (selected && types.includes(selected.type)) {
        file.value = selected
        fileError.value = null
      } else {
        file.value = null
        fileError.value = 'Please select an image file (png or jpg)'
      }
    }
    
    return { title, description, handleSubmit, fileError, handleChange, isPending }
  }
}
</script>

<style>
/* input[type="file"] {
  display: none;
}

.file-input label {
  display: block;
  position: relative;
  width: 200px;
  height: 50px;
  border-radius: 8px;
  background: var(--secondary);
  color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform .2s ease-out;
  border: 0;
  padding: 8px 12px;
  font-weight: 600;
  cursor: pointer;
} */
</style>