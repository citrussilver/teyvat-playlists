<template>
  <div class="content">
    <Navbar />
    <router-view/>
  </div>
  
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  components: {
    Navbar
  }
}
</script>

<style>
  .content {
    margin: 2rem auto;
    /* max-width: 1200px; */
    width: 90%;
    padding: 0 20px;
  }
</style>