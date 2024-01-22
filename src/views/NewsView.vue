<template>
  <section class="forHeader">
      <!-- banner -->
      <div class="news_banner">
          <img src="@/assets/images/news/banner_news.png" alt="news_banner">
      </div>

      <!-- menu button(pc) -->
      <div class="animal_pc_sidebar">
          <aside class="Sidebar no_slide">
              <!-- 側邊欄上方動物icon -->
              <img class="Sidebar_icon octopus" src="@/assets/images/vetor/vetor_animal_octopus.svg" alt="螃蟹icon">

              <!-- ul裡面的li是主要存放按鈕的區塊 -->
              <ul class="Sidebar_filter_btns">
                  <li class="filter_btn_item">
                  <img src="@/assets/images/park/pk_filter_icon_Overview.svg" alt="篩選icon">
                  <p class="pcInnerText">草原之聲</p>
                  </li>
                  <li class="filter_btn_item">
                  <img src="@/assets/images/park/pk_filter_icon_Overview.svg" alt="篩選icon">
                  <p class="pcInnerText">極地秘境</p>
                  </li>
                  <li class="filter_btn_item">
                  <img src="@/assets/images/park/pk_filter_icon_Overview.svg" alt="篩選icon">
                  <p class="pcInnerText">叢林奇蹟</p>
                  </li>
                  <li class="filter_btn_item">
                  <img src="@/assets/images/park/pk_filter_icon_Overview.svg" alt="篩選icon">
                  <p class="pcInnerText">鳥園樂章</p>
                  </li>
                  <li class="filter_btn_item">
                  <img src="@/assets/images/park/pk_filter_icon_Overview.svg" alt="篩選icon">
                  <p class="pcInnerText">海洋奇觀</p>
                  </li>
              </ul>

              <!-- 導引按鈕(我還沒讓它收起來時可以自動變icon) -->
          </aside>
      </div>

      <!-- 動物列表 -->
      <main class="news_overview">
          <!-- select(mb) -->
          <Select class="news_select" v-model="model" style="width:200px">
              <Option v-for="category in animalsCategory" :value="category.value" :key="category.value">{{ category.label }}</Option>
          </Select>

          
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
                  value: 'grassLand',
                  label: '草原之聲'
              },
              {
                  value: 'polar',
                  label: '極地秘境'
              },
              {
                  value: 'jungle',
                  label: '叢林奇蹟'
              },
              {
                  value: 'birds',
                  label: '鳥園樂章'
              },
              {
                  value: 'aqua',
                  label: '海洋奇觀'
              }
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
