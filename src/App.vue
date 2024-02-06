<!-- <script setup>
import { RouterLink, RouterView } from "vue-router";
</script> -->

<template>
  <MainHeader/>

  <!-- 頁面路由route渲染的地方 -->
  <RouterView />

  <MainFooter/>
  <!-- <footer>版權文字請貼這裡</footer> -->
</template>

<script>
import { RouterView } from 'vue-router'
import MainHeader from '@/components/MainHeader.vue'
import MainFooter from '@/components/MainFooter.vue'

export default {
  components:{
    RouterView,
    MainHeader,
    MainFooter
  },
  data() {
    return {
      targetValue:0,
    }
    
  },
  methods:{},
}
</script>