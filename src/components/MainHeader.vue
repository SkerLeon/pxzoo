<template>
  <header>
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
        <li class="header_btn pcInnerText header_news">
          <RouterLink to="/news">最新消息</RouterLink>
          <div class="header_news_hover"><img src="@/assets/images/header/header_newshover.svg" alt="news"></div>
        </li>

        <li class="header_btn pcInnerText header_park">
          <RouterLink to="/park">園區介紹</RouterLink>
          <div class="header_park_hover"><img src="@/assets/images/header/header_parkhover.svg" alt="park"></div>
        </li>

        <li class="header_btn pcInnerText header_animal">
          <RouterLink to="/animal">動物資訊</RouterLink>
          <div class="header_animal_hover"><img src="@/assets/images/header/header_animalhover.svg" alt="animal"></div>
        </li>

        <li class="header_logo">
          <RouterLink to="/">
            <img src="@/assets/images/header/header_logo.svg" alt="logo" />
          </RouterLink>
        </li>

        <li class="header_btn pcInnerText header_vote">
          <RouterLink to="/vote">人氣投票</RouterLink>
          <div class="header_vote_hover"><img src="@/assets/images/header/header_votehover.svg" alt="vote"></div>
        </li>

        <li class="header_btn pcInnerText header_school">
          <RouterLink to="/school">知識學堂</RouterLink>
          <div class="header_school_hover"><img src="@/assets/images/header/header_schoolhover.svg" alt="school"></div>
        </li>

        <li class="header_btn pcInnerText header_ticket">
          <RouterLink to="/ticket">立即購票</RouterLink>
          <div class="header_ticket_hover"><img src="@/assets/images/header/header_tickethover.svg" alt="ticket"></div>
        </li>

        <li class="header_login">
          <RouterLink to="/login" class="icon">
            <img src="@/assets/images/header/header_member.svg" alt="member" />
          </RouterLink>
          <div class="header_login_hover"><img src="@/assets/images/header/header_loginhover.svg" alt="login"></div>
        </li>
      </ul>
          <!-- 
          
          <RouterLink to="/member">Member</RouterLink> -->
    </nav>
    
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
