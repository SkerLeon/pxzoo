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
      <ul class="news_pc_filter">
        <li>
          <button class="defaultBtn pcInnerText">
          ALL
          <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
          </button>
        </li>
        <li>
          <button class="defaultBtn pcInnerText">
          最新活動
          <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
          </button>
        </li>
        <li>
          <button class="defaultBtn pcInnerText">
          園區動態
          <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
          </button>
        </li>
        <li>
          <button class="defaultBtn pcInnerText">
          動物知識
          <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
          </button>
        </li>
      </ul> 

      <!-- news -->
      <div class="news_section">
        <div class="news-each"
        v-for="item in news_info"
      :key="item ">
          <img src="../assets/images/news/decorate-line.png" alt="上方裝飾線" class="news_line upper">
          <div class="news_info">
            <img :src="getImageUrl(item.img)" alt="news圖">
            <div class="news-text">
              <div class="news_tag_time">
                <span class="time">{{ item.date }}</span>
                <span class="tag" 
                :class="item.tag_class">{{ item.tag }}</span>
              </div>
              <div class="news_title">
                <h4>{{item.title}}</h4>
              </div>
            </div>
        </div>
      </div>
      <img src="../assets/images/news/decorate-line.png" alt="下方裝飾線" class="news_line lower">

      <!-- 分頁 -->
      <div class="news_pagination">
        <li><a href="#">|<</a></li>
        <li><a href="#">1</a></li>
        <li><a href="#">2</a></li>
        <li><a href="#">3</a></li>
        <li><a href="#">4</a></li>
        <li><a href="#">5</a></li>
        <li><a href="#">|></a></li>
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

          //news
          news_info:[
            {
              date:'2024.01.02',
              tag:'最新活動',
              tag_class:'new_activity',
              title:'動物明星新一輪投票即將啟動！',
              img:'new_activity_1',
            },
            {
              date:'2024.01.04',
              tag:'園區消息',
              tag_class:'zoo_news',
              title:'動物園為家人共度佳節與動物提供寧靜休息環境，宣布農曆新年休假',
              img:'zoo_news_1',
            },
            {
              date:'2023.12.29',
              tag:'最新消息',
              tag_class:'new_activity',
              title:'兒童攝影大賽：小攝影師們快來動物園捕捉最美瞬間，贏得豐富獎品',
              img:'new_activity_2',
            },
            {
              date:'2023.12.28',
              tag:'動物知識',
              tag_class:'animal_knowledge',
              title:'貓頭鷹的生活習性和獵食技巧，揭開夜間狩獵的神秘面紗',
              img:'animal_knowledge_1',
            },
            {
              date:'2023.12.22',
              tag:'園區消息',
              tag_class:'zoo_news',
              title:'新生兒象寶寶在動物園誕生，展現可愛模樣',
              img:'zoo_news_2',
            },
            {
              date:'2023.12.21',
              tag:'動物知識',
              tag_class:'animal_knowledge',
              title:'北極熊的生態適應，面對氣候變遷的挑戰',
              img:'animal_knowledge_2',
            },
            {
              date:'2023.12.18',
              tag:'動物知識',
              tag_class:'animal_knowledge',
              title:'大象的家庭結構和保護幼象的感人故事',
              img:'animal_knowledge_3',
            },
            {
              date:'2023.12.15',
              tag:'最新消息',
              tag_class:'new_activity',
              title:'動物園歡樂跨年 共度美好時光',
              img:'new_activity_3',
            },

          ]
      };
  },
  methods: {
      getImageUrl(paths) {
          return new URL(`../assets/images/news/${paths}.png`, import.meta.url).href
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
