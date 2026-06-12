<template>
  <Teleport to="body">
    <div v-if="modelValue" class="modal-backdrop" @click.self="closeModal">
      <div class="modal" role="dialog" aria-modal="true" aria-labelledby="upload-image-title">
        <form @submit.prevent="handleSubmit">
          <h4 id="upload-image-title">Upload Image Link</h4>
          <p class="modal-hint">
            Paste a direct link to a hosted image (e.g. from postimg.cc, imgur, etc.).
            Use the image URL ending in .png, .jpg, or .webp — not the gallery page link.
          </p>
          <div class="wrapper">
            <div class="field-group">
              <input
                type="url"
                placeholder="https://i.postimg.cc/..."
                required
                v-model="imageLink"
              >
              <div class="line"></div>
            </div>
          </div>
          <div v-if="linkError" class="error">{{ linkError }}</div>
          <div class="modal-actions">
            <button type="submit" :disabled="isPending">{{ isPending ? 'Saving...' : 'Save' }}</button>
            <button type="button" class="cancel-btn" @click="closeModal">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import useDocument from '@/composables/useDocument'

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  playlistId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'saved'])

const imageLink = ref('')
const linkError = ref(null)
const isPending = ref(false)
const { updateDoc } = useDocument('playlists', props.playlistId)

watch(() => props.modelValue, (open) => {
  if (open) {
    imageLink.value = ''
    linkError.value = null
  }
})

const closeModal = () => {
  emit('update:modelValue', false)
}

const handleSubmit = async () => {
  linkError.value = null
  const trimmed = imageLink.value.trim()

  if (!/^https?:\/\/.+/i.test(trimmed)) {
    linkError.value = 'Please enter a valid http or https URL'
    return
  }

  isPending.value = true
  await updateDoc({ imageLink: trimmed })
  isPending.value = false
  emit('saved', trimmed)
  closeModal()
}
</script>

<style scoped>
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
  max-width: 440px;
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

.modal-hint {
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  opacity: 0.85;
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
