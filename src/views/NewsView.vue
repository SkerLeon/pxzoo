Vue.config.devtools = true; 
<template>
  <MainFixedVote />
  <section class="forHeader news_section">
    <!-- banner -->
    <div class="news_banner">
      <img src="../assets/images/news/banner_news_full.png" alt="news_banner">
      <h2 class="pcBigTitle">最新消息</h2>
    </div>

    <!-- 新聞列表 -->
    <main class="news_overview">
      <!-- menu button(ph) -->
      <select name="payway[]" placeholder="ALL" class="pcInnerText news_select" @change="setPage(1)"
        v-model="selectedCategory">
        <option value="ALL" disabled hidden>ALL</option>
        <option v-for="category in newsCategory" :value="category.value" :key="category.value">{{ category.label }}
        </option>
      </select>


      <!-- menu button(pc) -->
      <ul class="news_pc_filter">
        <li v-for="category in newsCategory">
          <button class="defaultBtn pcInnerText" @click="pressType(category.value)"
            :class="{ hovered: selectedCategory === category.label }">
            {{ category.label }}
            <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
          </button>
        </li>
      </ul>


      <!-- news -->
      <div class="news_content">
        <!-- 限制一頁的數量 -->
        <a class="news-each" v-for="newsinfo in listAfterPagination" :key="newsinfo" data-aos="fade-up"
          data-aos-easing="ease-in-out" data-aos-anchor-placement="top-bottom">
          <img src="../assets/images/news/decorate-line.png" alt="上方裝飾線" class="news_line upper">
          <div class="news_info" @click="toNewsDetail(newsinfo.news_id)">
            <img :src="getNewsUrl(newsinfo.news_pic)" alt="news圖">
            <div class="news-text">
              <div class="news_tag_time">
                <span class="time pcInnerText">{{ newsinfo.news_date }}</span>
                <div class="newsFrame">
                  <img :src="getNewsTagUrl(newsinfo.news_typepic)" alt="orangeFrame" class="newsFramePic" />
                  <p class="newsFrameText pcInnerText">{{ newsinfo.news_type }}</p>
                </div>
              </div>
              <div class="news_title">
                <h4 class="pcSmTitle">{{ newsinfo.news_title }}</h4>
              </div>
            </div>
          </div>
        </a>
        <img src="../assets/images/news/decorate-line.png" alt="下方裝飾線" class="news_line lower">

        <ul class="news_pagination pcInnerText">
          <!-- 前一頁 -->
          <li @click.prevent="setPage(currentPage - 1)" @mouseenter="toggleImage(-1, ishover)"
            @mouseleave="toggleImage(-1, ishover)" v-show="firstPage">
            <span class="news_page_num">
              |&lt;
            </span>
            <img :src="ishover[-1] ? imgstate[0] : imgstate[1]" alt="page-num">
          </li>

          <li v-for="(num, index) in totalPage" :key="index" @click.prevent="setPage(num)"
            @mouseenter="toggleImage(index, ishover)" @mouseleave="toggleImage(index, ishover)">
            <span class="news_page_num">
              {{ num }}
            </span>
            <!-- 當頁淺綠，其他頁hover淺綠 -->
            <img :src="num === currentPage ? imgstate[0] : (ishover[index] ? imgstate[0] : imgstate[1])" alt="page-num">
          </li>
          <!-- 後一頁 -->
          <li @click.prevent="setPage(currentPage + 1)" @mouseenter="toggleImage(totalPage, ishover)"
            @mouseleave="toggleImage(totalPage, ishover)" v-show="lastPage">
            <span class="news_page_num">
              >|
            </span>
            <img :src="ishover[totalPage] ? imgstate[0] : imgstate[1]" alt="page-num">
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

export default {
  data() {
    return {
      imgstate: [
        onpagebtn,
        defaultbtn,
      ],

      firstPage: false,
      lastPage: true,
      
      ishover: new Array(5).fill(false),

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
    this.fetchNews()
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
    initializeFilteredNews() {
      this.filteredNews = this.news
    },
    fetchNews(){
      axios.get(`${import.meta.env.VITE_API_URL}/newsFrontShow.php`)
      .then(response => {
        this.news = response.data.map(item=>{
          return {
            ...item,
            news_status: parseInt(item.news_status)
          }
        }); 
        // console.log(this.news.length); 
        // 處理頁碼問題
        this.currentPage = parseInt(this.$route.params.page) || 1;
        this.selectedCategory = this.$route.params.category || 'ALL';
        if (this.currentPage === 1) {
          this.firstPage = false;
          this.lastPage = true;
        } else if (this.currentPage === Math.ceil(this.news.length / this.perpage)) {
          this.firstPage = true;
          this.lastPage = false;
        } else {
          this.firstPage = true;
          this.lastPage = true;
        }
      })
      .catch(error => {
        // console.error("Error fetching data: ", error);
      });
    },
    //按鈕先到這
    pressType(value) {
      //value值到this.selectedCategory
      this.selectedCategory = value
      this.setPage(1)
    },

    //篩選新聞
    filterNews() {
      if (!this.selectedType) {
        this.filteredNews = this.news;
      } else {
        this.filteredNews = this.news.filter(news => news.news_type === this.selectedType);
      }
    },

    getNewsTagUrl(image) {
      return new URL(
        `${import.meta.env.VITE_IMAGES_BASE_URL}/news/newsFrame/` + image,
        import.meta.url
      ).href;
    },

    getNewsUrl(image) {
      return new URL(
        `${import.meta.env.VITE_IMAGES_BASE_URL}/news/` + image,
        import.meta.url
      ).href;
    },

    toNewsDetail(newsId) {
      // console.log(newsId)
      this.$router.push({
        name: 'newsDetail', params: { id: newsId },
      })
    },

    //根據頁碼和篩選更改url
    toPage(page, category) {
      const nowpage = page;
      const type = category
      this.$router.push(`/news/${type}/${nowpage}`);
    },
    //hover頁碼
    toggleImage(index, ishover) {
      ishover[index] = !ishover[index];
    },
    //換頁
    setPage(page) {
      if (page <= 0 || page > this.totalPage) {
        return
      }
      this.currentPage = page
      window.scrollTo(0, 0);
      if(this.selectedCategory === 'ALL'){
        if (this.currentPage === 1) {
          this.firstPage = false;
          this.lastPage = true;
        } else if (this.currentPage === Math.ceil(this.news.length / this.perpage)) {
          this.firstPage = true;
          this.lastPage = false;
        } else {
          this.firstPage = true;
          this.lastPage = true;
        }
      }else{
        this.firstPage = false;
        this.lastPage = false;
      }
      this.toPage(this.currentPage, this.selectedCategory)
    },

  },
  watch: {
    '$route'(to, from) {
      this.currentPage = parseInt(this.$route.params.page) || 1;
      this.selectedCategory = this.$route.params.category || 'ALL';
      // console.log(this.currentPage)
      // console.log(this.selectedCategory)
    }
  },
  components: {
    MainFixedVote,
  },
};
</script>

