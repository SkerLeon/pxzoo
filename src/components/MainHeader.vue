<template>
  <header
  :style="{
    backgroundImage: `url(${currentIcon})`,
    backgroundSize: 'cover',
    backgroundPosition: 'top left',
  }">
    <nav>
      <div class="arrowleft" :style="{ 'border-left': borderStyle}"></div>
      <div class="arrowright" :style="{ 'border-right': borderStyle}"></div>
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
        <li class="header_btn pcInnerText header_news header_ph_dis_no">
          <RouterLink to="/news">最新消息</RouterLink>
          <div class="header_news_hover"><img src="@/assets/images/header/header_newshover.svg" alt="news"></div>
        </li>

        <li class="header_btn pcInnerText header_park header_ph_dis_no">
          <RouterLink to="/park">園區介紹</RouterLink>
          <div class="header_park_hover"><img src="@/assets/images/header/header_parkhover.svg" alt="park"></div>
        </li>

        <li class="header_btn pcInnerText header_animal header_ph_dis_no">
          <RouterLink to="/animal">動物資訊</RouterLink>
          <div class="header_animal_hover"><img src="@/assets/images/header/header_animalhover.svg" alt="animal"></div>
        </li>

        <li class="header_logo">
          <RouterLink to="/">
            <img src="@/assets/images/header/header_logo.svg" alt="logo" />
          </RouterLink>
        </li>

        <li class="header_btn pcInnerText header_vote header_ph_dis_no">
          <RouterLink to="/vote">人氣投票</RouterLink>
          <div class="header_vote_hover"><img src="@/assets/images/header/header_votehover.svg" alt="vote"></div>
        </li>

        <li class="header_btn pcInnerText header_school header_ph_dis_no">
          <RouterLink to="/school">知識學堂</RouterLink>
          <div class="header_school_hover"><img src="@/assets/images/header/header_schoolhover.svg" alt="school"></div>
        </li>

        <li class="header_btn pcInnerText header_ticket header_ph_dis_no">
          <RouterLink to="/ticket">立即購票</RouterLink>
          <div class="header_ticket_hover"><img src="@/assets/images/header/header_tickethover.svg" alt="ticket"></div>
        </li>

        <li class="header_login header_ph_dis_no">
          <RouterLink to="/login" class="icon">
            <img src="@/assets/images/header/header_member.svg" alt="member" />
          </RouterLink>
          <div class="header_login_hover"><img src="@/assets/images/header/header_loginhover.svg" alt="login"></div>
        </li>
      </ul>
          <!-- 
          
          <RouterLink to="/member">Member</RouterLink> -->
      <div class="header_ph_hb header_pc_dis_no"
      @click="isLightBoxVisible = !isLightBoxVisible">
        <span :class="['header_ph_hb_style', 'header_hb_span1', { 'active': isLightBoxVisible }]"></span>
        <span :class="['header_ph_hb_style', 'header_hb_span2', { 'active': isLightBoxVisible }]"></span>
        <span :class="['header_ph_hb_style', 'header_hb_span3', { 'active': isLightBoxVisible }]"></span>
      </div>
    </nav>
  </header>

  <transition name="fade">
    <MainHeaderLightBox v-if="isLightBoxVisible" :close-menu="closeMenu"></MainHeaderLightBox>
  </transition>
  
</template>

<script>
import { RouterLink } from "vue-router";
import MainHeaderLightBox from '@/components/header/MainHeaderLightBox.vue';

import Image01 from "/src/assets/images/header/header_day.svg"
import Image02 from "/src/assets/images/header/header_night.svg"

export default {
  components: {
    RouterLink,
    MainHeaderLightBox,
  },
  data() {
    return {
      targetValue: 0,
      isLightBoxVisible: false,
      
      currentIcon: '',
      borderStyle: '50px solid #91d5ff',
    };
  },
  mounted() {
    this.updateTimeOfDayIcon();
    // 更新圖示，每5分鐘檢查一次
    setInterval(this.updateTimeOfDayIcon, 300000);

    this.updateBorderStyle();
    setInterval(this.updateBorderStyle, 300000);
    
  },
  created() {},
  methods: {
    closeMenu() {
      this.isLightBoxVisible = false;
    },

    updateTimeOfDayIcon() {
      const currentHour = new Date().getHours();
      this.currentIcon = (6 <= currentHour && currentHour < 18) ? `${import.meta.env.VITE_IMAGES_BASE_URL}/header/header_day.svg` : `${import.meta.env.VITE_IMAGES_BASE_URL}/header/header_night.svg`;
    },

    updateBorderStyle() {
      const currentHour = new Date().getHours();
      this.borderStyle = (currentHour >= 6 && currentHour < 18) ? '50px solid #91d5ff' : '50px solid #11215C';
    }
  },
};
</script>

<style>
/* 由程式控制出現的css樣式 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>