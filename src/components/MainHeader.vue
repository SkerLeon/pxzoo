<template>
  <header>
    <div class="wrapper" id="app">
      <!-- <HelloWorld msg="WELCOME to PXZoO" /> -->
      <nav>
        <div class="arrowleft"></div>
        <div class="arrowright"></div>
        <div class="arrowtopleft">
          <div class="arrowtopl"></div>
          <div class="arrowtopl"></div>
          <div class="arrowtopl"></div>
        </div>
        <div class="arrowtopright">
          <div class="arrowtopr"></div>
          <div class="arrowtopr"></div>
          <div class="arrowtopr"></div>
        </div>
        <ul>
          <li class="headerbtn pcInnerText">
            <RouterLink to="/news">最新消息</RouterLink>
          </li>

          <li class="headerbtn pcInnerText">
            <RouterLink to="/park">園區介紹</RouterLink>
          </li>

          <li class="headerbtn pcInnerText">
            <RouterLink to="/animal">動物資訊</RouterLink>
          </li>

          <li class="logo">
            <RouterLink to="/">
              <img src="/public/images/header/header_logo.svg" alt="logo" />
            </RouterLink>
          </li>

          <li class="headerbtn pcInnerText">
            <RouterLink to="/vote">人氣投票</RouterLink>
          </li>

          <li class="headerbtn pcInnerText">
            <RouterLink to="/school">知識學堂</RouterLink>
          </li>

          <li class="headerbtn pcInnerText">
            <RouterLink to="/ticket">立即購票</RouterLink>
          </li>

          <li class="login">
            <RouterLink to="/login">
              <img src="/public/images/header/header_member.svg" alt="member" />
            </RouterLink>
          </li>
        </ul>
            <!-- 
            
            <RouterLink to="/member">Member</RouterLink> -->
      </nav>
    </div>
  </header>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  components: {
    RouterLink,
  },
  data() {
    return {
      targetValue: 0,
    };
  },
  created() {},
  methods: {},
};
</script>
