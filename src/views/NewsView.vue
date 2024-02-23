Vue.config.devtools = true; 
<template>
  <MainFixedVote/>
  <section class="forHeader news_section">
      <!-- banner -->
    <div class="news_banner">
      <img src="../assets/images/news/banner_news_full.png" alt="news_banner">
      <h2 class="pcBigTitle">最新消息</h2>
    </div>

    <!-- 新聞列表 -->
    <main class="news_overview">
      <!-- menu button(ph) -->
      <select name="payway[]" placeholder="ALL" class="pcInnerText news_select"
      @change="selectTypeChange"
      v-model="selectedCategory">
      <option value="ALL" disabled hidden>ALL</option>
        <option v-for="category in newsCategory" :value="category.value" :key="category.value"
        >{{ category.label }}</option>
      </select>


      <!-- menu button(pc) -->
      <ul class="news_pc_filter">
        <li v-for="category in newsCategory">
          <button class="defaultBtn pcInnerText"
          @click="pressType(category.value)"
          >
          {{category.label}}
          <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
          </button>
        </li>
      </ul> 
      

      <!-- news -->
      <div class="news_content">
        <!-- 限制一頁的數量 -->
        <a class="news-each"
        v-for="newsinfo in listAfterCategory"
      :key="newsinfo"
      data-aos="fade-up"
      data-aos-easing="ease-in-out"
      data-aos-anchor-placement =“top-bottom”>
          <img src="../assets/images/news/decorate-line.png" alt="上方裝飾線" class="news_line upper">
          <div class="news_info"
          @click="toNewsDetail(newsinfo.news_id)">
            <img :src="getNewsUrl(newsinfo.news_pic)" alt="news圖">
            <div class="news-text">
              <div class="news_tag_time">
                <span class="time pcInnerText">{{ newsinfo.news_date }}</span>
                <div class="newsFrame">
                  <img
                  :src="getNewsTagUrl(newsinfo.news_typepic)"
                  alt="orangeFrame"
                  class="newsFramePic"
                  />
                  <p class="newsFrameText pcInnerText">{{newsinfo.news_type}}</p>
                </div>
              </div>
              <div class="news_title">
                <h4 class="pcSmTitle">{{newsinfo.news_title}}</h4>
              </div>
            </div>
        </div>
      </a>
      <img src="../assets/images/news/decorate-line.png" alt="下方裝飾線" class="news_line lower">

      <ul class="news_pagination pcInnerText">
        <!-- 前一頁 -->
        <li @click.prevent="setPage(currentPage-1)"
        @mouseenter="toggleImage(-1,ishover)" @mouseleave="toggleImage(-1,ishover)"
        v-show="firstPage">
          <span class="news_page_num" >
          |&lt;
          </span>
          <img :src="ishover[-1] ? imgstate[0] : imgstate[1]" 
          alt="page-num">
        </li>

        <li v-for="(num, index) in totalPage" :key="index"
        @click.prevent="setPage(num)"
        @mouseenter="toggleImage(index,ishover)" @mouseleave="toggleImage(index,ishover)">
          <span class="news_page_num" >
          {{ num }}
          </span>
          <!-- 當頁淺綠，其他頁hover淺綠 -->
          <img :src="num === currentPage ? imgstate[0] : (ishover[index] ? imgstate[0] : imgstate[1])" alt="page-num">
        </li>
        <!-- 後一頁 -->
        <li @click.prevent="setPage(currentPage+1)"
        @mouseenter="toggleImage(totalPage,ishover)" @mouseleave="toggleImage(totalPage,ishover)"
        v-show="lastPage">
          <span class="news_page_num" >
          >|
          </span>
          <img :src="ishover[totalPage] ? imgstate[0] : imgstate[1]" 
          alt="page-num">
        </li>
      </ul>
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
import MainFixedVote from '@/components/MainFixedVote.vue'
import onpagebtn from "/images/news/onpage.svg";   
import defaultbtn from "/images/news/default.svg";   
import axios from 'axios';
// import { setTransitionHooks } from 'vue';
  
export default {
  data() {
    return {
      imgstate: [
        onpagebtn,
        defaultbtn,
      ],

      firstPage: false,
      lastPage: true,
      //目前是寫死
      ishover: new Array(5).fill(false) ,
        
      //select
      newsCategory: [
        {
          value: 'ALL',
          label: 'ALL'
        },
        {
          value: '最新活動',
          label: '最新活動'
        },
        {
          value: '園區動態',
          label: '園區動態'
        },
        {
          value: '動物知識',
          label: '動物知識'
        },
      ],
      buttonTypes: [
        { value: '', label: 'ALL' },
        { value: '最新活動', label: '最新活動' },
        { value: '園區動態', label: '園區動態' },
        { value: '動物知識', label: '動物知識' },
      ],

      //news
      // news:[
      //   {
      //     date:'2024.01.02',
      //     tag:'最新活動',
      //     color:'orange',
      //     tag_class:'new_activity',
      //     title:'動物明星新一輪投票即將啟動！',
      //     img:'new_activity_1',
      //   },
      //   {
      //     date:'2024.01.04',
      //     tag:'園區消息',
      //     color:'green',
      //     tag_class:'zoo_news',
      //     title:'動物園為家人共度佳節與動物提供寧靜休息環境，宣布農曆新年休假',
      //     img:'zoo_news_1',
      //   },
      //   {
      //     date:'2023.12.29',
      //     tag:'最新消息',
      //     color:'orange',
      //     tag_class:'new_activity',
      //     title:'兒童攝影大賽：小攝影師們快來動物園捕捉最美瞬間，贏得豐富獎品',
      //     img:'new_activity_2',
      //   },
      //   {
      //     date:'2023.12.28',
      //     tag:'動物知識',
      //     color:'blue',
      //     tag_class:'animal_knowledge',
      //     title:'貓頭鷹的生活習性和獵食技巧，揭開夜間狩獵的神秘面紗',
      //     img:'animal_knowledge_1',
      //   },
      //   {
      //     date:'2023.12.22',
      //     tag:'園區消息',
      //     color:'green',
      //     tag_class:'zoo_news',
      //     title:'新生兒象寶寶在動物園誕生，展現可愛模樣',
      //     img:'zoo_news_2',
      //   },
      //   {
      //     date:'2023.12.21',
      //     tag:'動物知識',
      //     color:'blue',
      //     tag_class:'animal_knowledge',
      //     title:'北極熊的生態適應，面對氣候變遷的挑戰',
      //     img:'animal_knowledge_2',
      //   },
      //   {
      //     date:'2023.12.18',
      //     tag:'動物知識',
      //     color:'blue',
      //     tag_class:'animal_knowledge',
      //     title:'大象的家庭結構和保護幼象的感人故事',
      //     img:'animal_knowledge_3',
      //   },
      //   {
      //     date:'2023.12.15',
      //     tag:'最新消息',
      //     color:'orange',
      //     tag_class:'new_activity',
      //     title:'動物園歡樂跨年 共度美好時光',
      //     img:'new_activity_3',
      //   },
      //   {
      //     date:'2024.12.10',
      //     tag:'園區消息',
      //     color:'green',
      //     tag_class:'zoo_news',
      //     title:'奇特鳥類現身！園區引進巨嘴鳥擴大生態多樣性',
      //     img:'zoo_news_3',
      //   },
      //   {
      //     date:'2023.12.01',
      //     tag:'動物知識',
      //     color:'blue',
      //     tag_class:'animal_knowledge',
      //     title:'海豚的高度智慧和令人驚艷的表演技巧',
      //     img:'animal_knowledge_4',
      //   },
      //   {
      //     date:'2023.11.28',
      //     tag:'園區消息',
      //     color:'green',
      //     tag_class:'zoo_news',
      //     title:'老虎親子幸福時刻！雙胞胎寶寶首次公開亮相',
      //     img:'zoo_news_4',
      //   },
      //   {
      //     date:'2023.11.27',
      //     tag:'最新消息',
      //     color:'orange',
      //     tag_class:'new_activity',
      //     title:'動物園推出專業生態導覽活動，深入解說動物的自然行為和習性',
      //     img:'new_activity_4',
      //   },
      //   {
      //     date:'2023.11.26',
      //     tag:'動物知識',
      //     color:'blue',
      //     tag_class:'animal_knowledge',
      //     title:'獅子的社會結構和狩獵技巧，追蹤非洲草原上的霸主',
      //     img:'animal_knowledge_5',
      //   },
      //   {
      //     date:'2023.11.20',
      //     tag:'最新消息',
      //     color:'orange',
      //     tag_class:'new_activity',
      //     title:'環境教育工作坊，邀請專業生態學家分享有關動植物保育的知識',
      //     img:'new_activity_5',
      //   },
      //   {
      //     date:'2023.11.16',
      //     tag:'動物知識',
      //     color:'blue',
      //     tag_class:'animal_knowledge',
      //     title:'企鵝的潛水冒險，揭開冰山下的神秘世界',
      //     img:'animal_knowledge_6',
      //   },
      //   {
      //     date:'2023.11.15',
      //     tag:'園區消息',
      //     color:'green',
      //     tag_class:'zoo_news',
      //     title:'環保倡議：動物園宣布全面淘汰一次性塑膠，投身環保運動',
      //     img:'zoo_news_5',
      //   },
      //   {
      //     date:'2023.11.05',
      //     tag:'園區消息',
      //     color:'green',
      //     tag_class:'zoo_news',
      //     title:'動物園引進新鮮有機食材，動物們品嚐美食大集合',
      //     img:'zoo_news_6',
      //   },
      //   {
      //     date:'2023.11.03',
      //     tag:'動物知識',
      //     color:'blue',
      //     tag_class:'animal_knowledge',
      //     title:'樹頂生活的猿猴，探討猴群社會結構和智慧表現',
      //     img:'animal_knowledge_7',
      //   },
      //   {
      //     date:'2023.10.28',
      //     tag:'最新消息',
      //     color:'orange',
      //     tag_class:'new_activity',
      //     title:'星際奇幻夜：動物園舉辦星空觀測派對，揭秘動物星座的有趣故事',
      //     img:'new_activity_6',
      //   },
      //   {
      //     date:'2023.10.25',
      //     tag:'園區消息',
      //     color:'green',
      //     tag_class:'zoo_news',
      //     title:'動物保育計畫新進展，園方積極參與國際合作保育工作',
      //     img:'zoo_news_7',
      //   },
      //   {
      //     date:'2023.10.25',
      //     tag:'動物知識',
      //     color:'blue',
      //     tag_class:'animal_knowledge',
      //     title:'獵鷹的驚人飛行速度和狩獵技巧解析',
      //     img:'animal_knowledge_8',
      //   },
      //   {
      //     date:'2023.10.13',
      //     tag:'園區消息',
      //     color:'green',
      //     tag_class:'zoo_news',
      //     title:'現代科技登場，動物園啟動AR導覽，提升遊客互動體驗',
      //     img:'zoo_news_8',
      //   },
      //   {
      //     date:'2023.09.23',
      //     tag:'最新消息',
      //     color:'orange',
      //     tag_class:'new_activity',
      //     title:'古怪搞笑周：園區展示動物最搞笑的一面，帶給遊客歡笑滿滿',
      //     img:'new_activity_7',
      //   },
      //   {
      //     date:'2023.09.15',
      //     tag:'最新消息',
      //     color:'orange',
      //     tag_class:'new_activity',
      //     title:'秋日生態尋奇：動物園邀您共度秋日美好',
      //     img:'new_activity_8',
      //   },
      // ],
      news: [],

      selectedType: '',

      //儲存篩選值
      filteredNews: [],

      // v-model用
      selectedCategory: 'ALL',

      perpage: 10, //一頁的資料數
      currentPage: 1
    };
  },

  created() {
    this.initializeFilteredNews();
    axios.get(`${import.meta.env.VITE_API_URL}/newsShow.php`)
      .then(response => {
        this.news = response.data; // 假設返回的數據是一個數組
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  },

  mounted() {
    window.scrollTo(0, 0);
    // this.fetchNews();
  },

  computed: {
    totalPage() {
      return Math.ceil(this.listAfterCategory.length / this.perpage)
      //Math.ceil()取最小整數
    },
    pageStart() {
      return (this.currentPage - 1) * this.perpage
      //取得該頁第一個值的index
    },
    pageEnd() {
      return this.currentPage * this.perpage
      //取得該頁最後一個值的index
    },
    
    //篩選
    listAfterCategory() {
      if (this.selectedCategory === 'ALL') return this.news;
      return this.news.filter(item => item.news_type === this.selectedCategory);
    },
    //根據篩選後新聞數量顯示頁面
    listAfterPagination() {
      return this.listAfterCategory.slice((this.currentPage - 1) * this.perpage, this.currentPage * this.perpage);
    },
  },

  methods: {
    //初始匯入全部值
    initializeFilteredNews(){
      this.filteredNews = this.news
    },

    //按鈕先到這
    pressType(value){
      //value值到this.selectedCategory
      this.selectedCategory = value
      this.setPage(1)
    },
    
    // 按鈕點擊事件處理函數
    // 在handleButtonClick方法中调用filterNews方法
    handleButtonClick(value) {
      this.selectedCategory = value;
      this.filterNews(); // 调用filterNews方法重新过滤新闻列表
      this.setPage(1); // 每次过滤都返回第一页
    },

    // // 篩選新聞
    filterNews() {
      if (!this.selectedType) {
        this.filteredNews = this.news;
      } else {
        this.filteredNews = this.news.filter(news => news.news_type === this.selectedType);
      }
    },
    // 在methods中添加filterNews方法
    // filterNews() {
    //   this.filteredNews = this.news.filter(item => {
    //     if (this.selectedCategory === 'ALL') {
    //       return true; // 如果选择了 'ALL'，返回所有新闻
    //     } else {
    //       return item.tag_class === this.selectedCategory; // 否则，根据选定的类别过滤新闻
    //     }
    //   });
    // },

    

    getNewsTagUrl(image) {
      return new URL(
        `${import.meta.env.VITE_IMAGES_BASE_URL}/news/newsFrame/`+image,
        import.meta.url
      ).href;
    },

    getNewsUrl(image) {
      return new URL(
        `${import.meta.env.VITE_IMAGES_BASE_URL}/news/`+image,
        import.meta.url
      ).href;
    },

    // toNewsDetail(){
    //     this.$router.push({
    //       path:'./NewsDetail',
    //   })
    // },
    
    toNewsDetail(newsId){
      console.log(newsId)
      this.$router.push({
        name: 'newsDetail', params: { id:newsId },
      })
    },
    //hover頁碼
    toggleImage(index,ishover){
        ishover[index] = !ishover[index];
    },
    //換頁
    setPage(page) {
      if(page <= 0 || page > this.totalPage) {
          return
      }
      this.currentPage = page
        window.scrollTo(0, 0);
        if (this.totalPage === 1) {
          this.firstPage = false;
          this.lastPage = false;
        } else {
          this.firstPage = page !== 1;
          this.lastPage = page !== this.totalPage;
        }
    },
    
  },
  components: {
    MainFixedVote,
  },
};
</script>

