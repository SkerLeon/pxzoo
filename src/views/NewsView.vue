<template>
  <section class="forHeader">
      <!-- banner -->
    <div class="news_banner">
        <img src="@/assets/images/news/banner_news.png" alt="news_banner">
    </div>

    <!-- 新聞列表 -->
    <main class="news_overview">
      <!-- select(mb) -->
      <Select class="news_select" 
      v-model="model" 
      default-label="ALL"
      style="width:200px">
          <Option v-for="category in newsCategory" :value="category.value" :key="category.value">{{ category.label }}</Option>
      </Select>
      <!-- menu button(pc) -->
      <div class="news_pc_sidebar">
        
      </div> 

      <div class="news_section">
        <img src="" alt="上方裝飾線">
        <img src="" alt="下方裝飾線">
        <div class="news-info">
          <img src="" alt="news圖">
          <div class="news-text">
            <div class="news_tag_time">
              <div class="time"></div>
              <div class="tag"></div>
            </div>
            <div class="news_title">
              <h3></h3>
            </div>
          </div>
        </div>
      </div>     
    </main>
  </section>
</template>

<script>
export default {
  data() {
      return {
          
          //select
          newsCategory: [
              {
                  value: 'All',
                  label: 'All'
              },
              {
                  value: 'new_activity',
                  label: '最新活動'
              },
              {
                  value: 'zoo_news',
                  label: '園區動態'
              },
              {
                  value: 'animal_knowledge',
                  label: '動物知識'
              },
          ],
      };
  },
  methods: {
      getImageUrl(paths) {
          return new URL(`../assets/images/animal/small_pic/small_pic_${paths}.png`, import.meta.url).href
      },//改網址
  },
  created() {
  },
};
</script>

<style scoped>
/* 在這裡添加樣式 */
</style>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
