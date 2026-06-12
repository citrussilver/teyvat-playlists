<template>
  <Teleport to="body">
    <div v-if="modelValue" class="modal-backdrop" @click.self="cancel">
      <div class="modal" role="dialog" aria-modal="true" :aria-labelledby="titleId">
        <div class="modal-panel">
          <h4 :id="titleId">{{ title }}</h4>
          <p class="modal-message">{{ message }}</p>
          <div class="modal-actions">
            <button type="button" class="confirm-btn" @click="confirm">Yes</button>
            <button type="button" class="cancel-btn" @click="cancel">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { useId } from 'vue'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Confirm'
  },
  message: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'confirm'])

const titleId = useId()

const cancel = () => {
  emit('update:modelValue', false)
}

const confirm = () => {
  emit('confirm')
  emit('update:modelValue', false)
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
  max-width: 400px;
}

.modal-panel {
  padding: 30px;
  border-radius: 8px;
  border: 1px solid var(--secondary);
  background: var(--background-2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}

.modal-panel h4 {
  margin-bottom: 0.75rem;
}

.modal-message {
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.modal-actions {
  display: flex;
  gap: 0.75rem;
}

.modal-actions button {
  flex: 1;
}

.cancel-btn {
  background: var(--background);
}
</style>
