<template>
  <memLightBox />

  <button class="iconBtn pcInnerText" style="margin: 200px 200px">
    <p class="iconText">
      <img
        src="@/assets/images/login/icon/comment.svg"
        alt=""
        class="buttonIcon"
      />
      按鈕文字
    </p>
    <img
      src="@/assets/images/login/icon/btnArrow.svg"
      alt=""
      class="arrowIcon"
    />
  </button>
</template>

<script>
import memLightBox from "@/components/loginLightBox.vue";

export default {
  components: {
    memLightBox,
  },
};
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
