<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header class="textheader">
    <div class="wrapper">
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
  </header>

  <!-- 頁面路由route渲染的地方 -->
  <RouterView />

  <footer>版權文字請貼這裡</footer>
</template>

<style>
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
</style>