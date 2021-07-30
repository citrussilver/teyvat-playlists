<template>
    <div v-for="playlist in playlists" :key="playlist.id">
        <router-link :to="{ name: 'PlaylistDetails', params: { id: playlist.id } }">
          <div class="single">
              <div class="thumbnail">
                  <img :src="playlist.coverUrl" alt="playlist cover">
              </div>
              <div class="info">
                  <h3>{{ playlist.title }}</h3>
                  <p><span>Created by</span> {{ playlist.userName }}</p>
              </div>
              <div class="song-number">
                  <p>{{ playlist.songs.length }}</p>
              </div>
          </div>
        </router-link>
    </div>
</template>

<script>
export default {
    props: ['playlists']
}
</script>

<style>

  .single {
    opacity: 0;
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 10px;
    background: var(--background-2);
    margin: 16px 0;
    transition: box-shadow ease 0.2s, transform ease 0.2s;
    animation-name: playlist-animate;
    animation-duration: var(--anim-duration);
    animation-fill-mode: var(--anim-fill-mode);
  }

  .single:hover {
    box-shadow: 1px 2px 3px rgba(50,50,50,0.05);
    transform: scale(1.02);
    /* transition: all ease 0.2s; */
  }

  @keyframes playlist-animate {
    to {
      opacity: 1;
    }
  }

  .thumbnail {
    max-width: 100px;
    max-height: 100px;
    overflow: hidden;
    border-radius: 10px;
  }
  img {
    max-width: 150%;
    max-height: 150%;
    display: block;
  }
  .info {
    margin: 0 30px;
  }
  .song-number {
    margin-left: auto;
  }
  .info p span {
    color: var(--primary);
  }
</style>