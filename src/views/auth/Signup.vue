<template>
  <form @submit.prevent="handleSubmit">
      <h3>Sign Up</h3>
      <div class="wrapper">
          <div class="field-group">
              <input type="text" placeholder="Display Name" v-model="displayName" required>
              <div class="line"></div>
          </div>
          <div class="field-group">
              <input type="email" placeholder="Email" v-model="email" required>
              <div class="line"></div>
          </div>
          <div class="field-group">
              <input type="password" placeholder="Password" v-model="password" required>
              <div class="line"></div>
          </div>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <button v-if="!isPending">Sign Up</button>
      <button v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script>
import useSignup from '@/composables/useSignup'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
    setup() {

        const { error, signup, isPending } = useSignup()
        const router = useRouter()

        const email = ref('')
        const password = ref('')
        const displayName = ref('')

        const handleSubmit = async () => {
            const res = await signup(email.value, password.value, displayName.value)
            if(!error.value) {
                console.log('user signed up')
                router.push({ name: 'UserPlaylists' })
            }
        }

        return { email, password, displayName, isPending, error, handleSubmit }
    }
}
</script>

<style>

</style>