<template>
  <div class="content">
    <Navbar @stop-scroll="stopVpScroll" />
    <div class="router-view-div" :class="{'inactive': deactivateClass}"><router-view/></div>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const deactivateClass = ref(false)

const stopVpScroll = (value) => {
  deactivateClass.value = value
  if (deactivateClass.value) {
    document.body.setAttribute('style', 'position: fixed; right: 0; left: 0;')
  } else {
    document.body.setAttribute('style', '')
  }
}
</script>

<style>
  .content {
    margin: 2rem auto;
    width: 90%;
  }

  .router-view-div {
    transition: 0.5s filter ease-out;
  }

  .router-view-div.inactive {
    pointer-events: none;
    filter: grayscale(100%) opacity(0.5);
  }
</style>
