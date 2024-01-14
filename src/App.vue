<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<script>
const imgUrl = new URL('../src/assets/images/讚.jpg', import.meta.url).href
export default {
  data() {
    return {
      rawHtml: '<p>1</p>',
      imgUrl: imgUrl
    }
  },
  mounted() {
  }
}
</script>


<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <img :src="imgUrl" alt="" width="200" height="200">
    <div class="wrapper">
      <HelloWorld msg="WELCOME PXZoO" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink> <!-- 這個我們沒有，之後刪掉 -->
        <RouterLink to="/ticket">Ticket</RouterLink>
        <RouterLink to="/member">Member</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/animal">Animal</RouterLink>
        <RouterLink to="/park">Park</RouterLink>
        <RouterLink to="/news">News</RouterLink>
        <RouterLink to="/school">School</RouterLink>
        <RouterLink to="/vote">Vote</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />

  <footer>
    版權文字請貼這裡
  </footer>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
