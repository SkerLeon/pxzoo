<template>
  <section class="forHeader news_section">
      <!-- banner -->
    <div class="news_banner">
        <img src="@/assets/images/news/banner_news.png" alt="news_banner">
    </div>

    <!-- 新聞列表 -->
    <main class="news_overview">
      <!-- select(mb) -->
      <!-- <Select class="" 
      v-model="model" 
      default-label="ALL"
      style="width:200px">
          <Option v-for="category in newsCategory" :value="category.value" :key="category.value">{{ category.label }}</Option>
      </Select> -->

      <select name="payway[]" id="payway" placeholder="ALL" class="pcInnerText news_select">
        <option v-for="category in newsCategory" :value="category.value" :key="category.value">{{ category.label }}</option>
      </select>


      <!-- menu button(pc) -->
      <ul class="news_pc_filter">
        <li v-for="category in newsCategory">
          <button class="defaultBtn pcInnerText">
          {{category.label}}
          <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
          </button>
        </li>
      </ul> 

      <!-- news -->
      <div class="news_content">
        <a class="news-each"
        v-for="item in news_info"
      :key="item ">
          <img src="../assets/images/news/decorate-line.png" alt="上方裝飾線" class="news_line upper">
          <div class="news_info"
          @click="toNewsDetail()">
            <img :src="getImageUrl(item.img)" alt="news圖">
            <div class="news-text">
              <div class="news_tag_time">
                <span class="time pcInnerText">{{ item.date }}</span>
                <div class="newsFrame">
                    <img
                    :src="getTagUrl(item.color)"
                    alt="orangeFrame"
                    class="newsFramePic"
                    />
                    <p class="newsFrameText pcInnerText">{{item.tag}}</p>
                </div>
              </div>
              <div class="news_title">
                <h4 class="pcSmTitle">{{item.title}}</h4>
              </div>
            </div>
        </div>
      </a>
      <img src="../assets/images/news/decorate-line.png" alt="下方裝飾線" class="news_line lower">

      <!-- 分頁 -->
      <div class="news_pagination pcInnerText">
        <li><a href="#" class="news_page_num onpage">1
        </a>
        <img src="../assets/images/news/onpage.svg" alt="page-num">
        </li>
        
        <li v-for="(pageNumber, index) in pageNumbers" :key="index">
          <a href="#" class="news_page_num default" 
          @mouseenter="toggleImage(index,ishover)" @mouseleave="toggleImage(index,ishover)">
          {{ pageNumber }}
        </a>
        <img :src="ishover[index] ? '/src/assets/images/news/onpage.svg' : '/src/assets/images/news/default.svg'" 
        alt="page-num">
        </li>
      </div>
    </div>     
    </main>
    <!-- 背景 -->
    <div class="news_bg">
      <img class="cloud_bg cloud_2" src="../assets/images/vetor/nature_cloud_2.svg" alt="bg-雲2">
      <img class="cloud_bg cloud_4" src="../assets/images/vetor/nature_cloud_4.svg" alt="bg-雲4">

      <img class="news_bg_palnt grass_2" src="../assets/images/vetor/nature_grass_2.svg" alt="bg-grass2">
      <img class="news_bg_palnt grass_5" src="../assets/images/vetor/nature_grass_5.svg" alt="bg-grass5">

      <img class="news_bg_palnt tree_4" src="../assets/images/vetor/nature_tree_4.svg" alt="bg-tree4">
      <img class="news_bg_palnt tree_7" src="../assets/images/vetor/nature_tree_7.svg" alt="bg-tree7">

      <img class="alpaca" src="../assets/images/vetor/vetor_animal_alpaca.svg" alt="bg-羊駝">

    </div>
  </section>
</template>

<script>
export default {
  data() {
      return {

        pageNumbers: [2, 3, 4, 5, '>|'], // 假设有5个页码
        ishover: new Array(5).fill(false) ,
          
          //select
          newsCategory: [
              {
                  value: 'All',
                  label: 'ALL'
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

          //fliter


          //news
          news_info:[
            {
              date:'2024.01.02',
              tag:'最新活動',
              color:'orange',
              tag_class:'new_activity',
              title:'動物明星新一輪投票即將啟動！',
              img:'new_activity_1',
            },
            {
              date:'2024.01.04',
              tag:'園區消息',
              color:'green',
              tag_class:'zoo_news',
              title:'動物園為家人共度佳節與動物提供寧靜休息環境，宣布農曆新年休假',
              img:'zoo_news_1',
            },
            {
              date:'2023.12.29',
              tag:'最新消息',
              color:'orange',
              tag_class:'new_activity',
              title:'兒童攝影大賽：小攝影師們快來動物園捕捉最美瞬間，贏得豐富獎品',
              img:'new_activity_2',
            },
            {
              date:'2023.12.28',
              tag:'動物知識',
              color:'blue',
              tag_class:'animal_knowledge',
              title:'貓頭鷹的生活習性和獵食技巧，揭開夜間狩獵的神秘面紗',
              img:'animal_knowledge_1',
            },
            {
              date:'2023.12.22',
              tag:'園區消息',
              color:'green',
              tag_class:'zoo_news',
              title:'新生兒象寶寶在動物園誕生，展現可愛模樣',
              img:'zoo_news_2',
            },
            {
              date:'2023.12.21',
              tag:'動物知識',
              color:'blue',
              tag_class:'animal_knowledge',
              title:'北極熊的生態適應，面對氣候變遷的挑戰',
              img:'animal_knowledge_2',
            },
            {
              date:'2023.12.18',
              tag:'動物知識',
              color:'blue',
              tag_class:'animal_knowledge',
              title:'大象的家庭結構和保護幼象的感人故事',
              img:'animal_knowledge_3',
            },
            {
              date:'2023.12.15',
              tag:'最新消息',
              color:'orange',
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

      getTagUrl(paths){
        return new URL(`../assets/images/news/newsFrame/${paths}Frame.svg`, import.meta.url).href
      },

      toNewsDetail(){
        this.$router.push({
          path:'./NewsDetail',
      })
      },
      toggleImage(index,ishover){
        // console.log(ishover[index]);
        ishover[index] = !ishover[index];
      }
  },
  created() {
  },
};
</script>

