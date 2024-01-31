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
  methods:{}
}
</script>

<!-- <style>
  .textheader{
    background-color: #f5efeb;
  }
  .wrapper{
    width: 100%;
  }
  .wrapper nav{
    display: flex;
    justify-content: space-between;
  }
  .wrapper nav a{
    text-decoration: none;
    font-size: 30px;
    font-weight: bold;
    color: #3f3f3f;
  }
  .wrapper nav a:hover{
    color:#11a729;
  }
</style> -->
