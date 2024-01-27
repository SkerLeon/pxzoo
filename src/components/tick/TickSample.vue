<template>
    <div>
      <!-- 網頁內容 -->
      
      <!-- 燈箱 -->
      <div v-if="showLightbox" class="lightbox">
        <!-- 燈箱內容 -->
        <div class="lightbox-content">
          <!-- 你的燈箱內容放在這裡 -->
  
          <!-- 關閉按鈕 -->
          <button @click="closeLightbox">關閉</button>
        </div>
      </div>
    </div>
  </template>
  
<script>
export default {
    data() {
    return {
        showLightbox: true
    };
    },
    methods: {
        closeLightbox() {
            this.showLightbox = false;
        }
    },
}
</script>

<style>
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.lightbox-content {
  /* 調整燈箱內容的樣式 */
}

/* 可以根據需要進一步設置其他樣式 */

</style>

