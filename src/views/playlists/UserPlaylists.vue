<template>
  <div id="user-playlists">
    <h2>My Playlists</h2>
    <div v-if="playlists">
      <ListView :playlists="playlists" />
    </div>
    <router-link :to="{ name: 'CreatePlaylist' }" class="btn">Create a New Playlist</router-link>
  </div>
</template>

<script>
import getUser from '@/composables/getUser'
import getCollection from '@/composables/getCollection'
import ListView from '@/components/ListView.vue'
export default {
  components: { ListView },
  setup() {
    const { user } = getUser()
    const { documents: playlists } = getCollection(
      'playlists', 
      ['userId', '==', user.value.uid]
    )

    console.log(playlists)
    
    return { playlists }
  }
}
</script>

<style>
  #user-playlists h2 {
    padding-bottom: 10px;
    margin-bottom: 30px;
    border-bottom: 1px solid var(--secondary)
  }
  #user-playlists .btn {
    margin-top: 20px;
  }

  #user-playlists {
    margin: 2rem 0;
    /* display: flex;
    flex-direction: column; */
    animation-name: user-playlists-animate;
    animation-duration: var(--anim-duration);
    animation-fill-mode: var(--anim-fill-mode);
  }

  @keyframes user-playlists-animate {
    to {
      opacity: 1;
    }
  }
</style>