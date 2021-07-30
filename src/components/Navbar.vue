<template>
  <div class="navbar">
      <nav>
          <div id="logo">
            <img src="@/assets/Windsong_Lyre.png" alt="">
            <router-link :to="{ name: 'Home'}"><h1 class="main-title">Teyvat Playlists</h1></router-link>
          </div>
          <div class="links" :class="{'open': isAddClass}" v-if="user">
            <ul class="nav-links">
              <li class="li-link" @click="closeBurger"><router-link :to="{ name: 'UserPlaylists' }"><span>My Playlists</span></router-link></li>
              <li class="li-link" @click="closeBurger"><router-link :to="{ name: 'CreatePlaylist' }"><span>Create Playlist</span></router-link></li>
              <li id="li-login-info"><span class="login-text">Logged in as <span id="display-name">{{ user.displayName }}</span></span></li>
              <li><button id="logout-btn" @click="handleSubmit">Logout</button></li>
            </ul>
          </div>
          <div class="links" :class="{'open': isAddClass}" v-else>
            <ul class="nav-links">
              <li><router-link class="btn" :to="{ name: 'Signup' }" @click="closeBurger">Signup</router-link></li>
              <li><router-link class="btn" :to="{ name: 'Login' }" @click="closeBurger">Login</router-link></li>
            </ul>
          </div>
          <div class="hamburger" @click="hamburgerClick">
            <div class="burger-line" :class="{'slash-1': isAddClass}"></div>
            <div class="burger-line" :class="{'slash-2': isAddClass}"></div>
            <div class="burger-line" :class="{'hide': isAddClass}"></div>
          </div>
      </nav>
  </div>
</template>

<script>
import { ref } from 'vue'
import useLogout from '../composables/useLogout'
import { useRouter } from 'vue-router'
import getUser from '../composables/getUser'

export default {
    emits: ["stop-scroll"],
    setup(props, { emit }) {
        const router = useRouter()
        const { logout, error } = useLogout()

        const { user } = getUser()

        const isAddClass = ref(false)

        const handleSubmit = async () => {
            await logout()
            if(!error.value) {
                console.log('User logged out');
            }
            router.push({ name: 'Login' })
        }

        const hamburgerClick = () => {
          isAddClass.value = !isAddClass.value
          emit('stop-scroll', isAddClass.value)
        }

        const closeBurger = () => {
          isAddClass.value = false;
          emit('stop-scroll', false )
        }

        return { handleSubmit, user, isAddClass, hamburgerClick, closeBurger }
    }

}
</script>

<style>

  .main-title {
    color: #fff;
  }
  .navbar {
    background: inherit;
  }
  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    /* max-width: 1200px; */
    /* margin: 0 auto; */
  }

  nav #logo {
    display: flex;
    align-items: center;
  }

  nav #logo img {
    max-height: 60px;
  }
  nav #logo h1 {
    margin-left: 20px;
    white-space: nowrap;
  }

  nav .links {
    margin-left: auto;
    /* background-color: palegreen; */
  }

  .nav-links {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-links li {
    margin-top: 0;
    margin-bottom: 0;
    margin-left: 1rem;
  }

  #logout-btn {
    margin-left: 1rem;
  }

  .li-link {
    padding: 0.5rem 0.5rem;
    border-radius: 1rem;
  }

  .li-link:hover {
    background: var(--secondary);
  }

  nav .links, nav .hamburger {
      isolation: auto;
      z-index: 0;
    }

  span.login-text {
    font-size: 14px;
    display: inline-block;
    /* margin-left: 1rem; */
    /* padding-left: 1rem; */
    /* border-left: 10px solid inherit; */
    color: #fff;
  }

  @media screen and (max-width: 768px) {

    .burger-line {
      width: 1.5rem;
      height: 3px;
      background-color: #fff;
      margin: 5px;
      transition: 0.2s transform ease-out, 0.2s opacity ease-out;
    }

    .burger-line.slash-1 {
      transform: rotate(45deg) translate(25%, 190%);
    }

    .burger-line.slash-2 {
      transform: rotate(-45deg);
    }

    .burger-line.hide {
      opacity: 0;
    }

    nav {
      position: relative;
    }

    nav #logo {
      margin-right: auto;
    }

    .hamburger {
      cursor: pointer;
      position: absolute;
      top: 0.9rem;
      right: 0;
    }

    nav .links, nav .hamburger {
      isolation: auto;
      z-index: 1;
    }

    nav .links {
      margin-left: 0;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      height: 100vh;
      width: 100%;
      clip-path: circle(30px at 100% 2%);
      -webkit-clip-path: circle(30px at 100% 2%);
      transition: 1s background-color ease-in-out, 1s clip-path ease-out;
    }

    nav .links.open{
      background-color: var(--secondary);
      clip-path: circle(90vh at 100% 0%);
      -webkit-clip-path: circle(90vh at 100% 0%);
    }

    #li-login-info {
      height: 1rem;
      position: absolute;
      bottom: 0rem;
    }
    
    .nav-links {
      padding: 0;
      margin: 0;
      flex-direction: column;
      position: absolute;
      bottom: 50vh;
      width: 100%;
    }

    .nav-links li, #logout-btn {
      margin-left: 0;
    }

    .nav-links li {
      height: 10vh;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .li-link:hover {
      border-radius: 1.5rem;
      background-color: var(--background);
    }

    .li-link span {
      padding: 1rem 30vw;
    }

    .li-link span:hover {
      color: #fff;
    }

    .nav-links .btn, #logout-btn {
      background: var(--background);
    }

    .nav-links .btn, #logout-btn:hover {
    background: var(--primary);
    color: var(--secondary);
  }

  }

</style>