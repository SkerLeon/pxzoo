<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <MainHeader/>
  <!-- <header>
    <div class="wrapper">
      <HelloWorld msg="WELCOME to PXZoO" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
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
  </header> -->

  <!-- 頁面路由route渲染的地方 -->
  <RouterView />

  <MainFooter/>
  <footer>版權文字請貼這裡</footer>
</template>

<script>
import { RouterView } from 'vue-router'
import MainHeader from '@/components/MainHeader.vue'
import MainFooter from '@/components/MainFooter.vue'

export default {
  components:{
    // RouterLink,
    RouterView,
    MainHeader,
    MainFooter
  },
  data() {
    return {
      targetValue:0,
    }
    
  },
  created(){},
  methods:{},
}
</script>