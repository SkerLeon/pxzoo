<template>
    <MainFixedVote />
    <section class="forHeader news_detail_section">
        <!-- banner -->
        <div class="newsDetail_banner">
            <img src="../assets/images/news/banner_news_detail_full.png" alt="newsDetail_banner">
            <h2 class="pcBigTitle">最新消息</h2>
        </div>

        <main>
            <div class="news_detail">
                <div class="news_detail_info" data-aos="fade-up" data-aos-easing="ease-in-out">
                    <div class="news_detail_tag_time">
                        <span class="time pcInnerText">{{ newsDetailData.news_date }}</span>
                        <div class="newsFrame">
                            <img :src="getNewsTagUrl(newsDetailData.news_typepic)" alt="newsFrame" class="newsFramePic" />
                            <p class="newsFrameText pcInnerText">{{ newsDetailData.news_type }}</p>
                        </div>
                    </div>
                    <div class="news_detail_title">
                        <h2 class="pcBigTitle">{{ newsDetailData.news_title }}</h2>
                    </div>
                    <img src="../assets/images/news/decorate-line_news_detail.png" alt="裝飾線" class="news_line upper">
                </div>
                <div class="news_detail_content" data-aos="fade-up" data-aos-easing="ease-in-out">
                    <div class="news_detail_pic">
                        <div class="news_detail_border">
                            <img :src="getNewsUrl(newsDetailData.news_pic)" alt="news圖">
                        </div>
                    </div>
                    <!-- v-for段落 --><!-- 每段包p，並中間用<br>隔開 -->
                    <!-- <div class="news_detail_text" v-for="(paragraph, index) in news.content">
                        <p class="pcInnerText" v-html="paragraph"></p>
                        <br v-if="index < news.content.length - 1">
                    </div> -->
                    <div class="news_detail_text">
                        <p class="pcInnerText">{{ newsDetailData.news_text_1 }}</p>
                        <br>
                        <p class="pcInnerText">{{ newsDetailData.news_text_2 }}</p>
                        <br>
                        <p class="pcInnerText">{{ newsDetailData.news_text_3 }}</p>
                        <br>
                        <p class="pcInnerText">{{ newsDetailData.news_text_4 }}</p>
                    </div>
                </div>

            </div>
        </main>
        <!-- 背景 -->
        <div class="news_detail_bg">
            <img class="cloud_bg cloud_2" src="../assets/images/vetor/nature_cloud_2.svg" alt="bg-雲2">
            <img class="cloud_bg cloud_4" src="../assets/images/vetor/nature_cloud_4.svg" alt="bg-雲4">
            <img class="cloud_bg cloud_4_2" src="../assets/images/vetor/nature_cloud_4.svg" alt="bg-雲4">

        </div>
    </section>
</template>

<script>
import MainFixedVote from '@/components/MainFixedVote.vue';
import axios from 'axios';
export default {
    data() {
        return {
            newsDetailData: [],
            pageTitle:''
        };
    },
    created() {
        const newsId = this.$route.params.id;
        this.fetchNewsDetail(newsId);
    },

    methods: {
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

        fetchNewsDetail(id) {
            // API 請求或其他邏輯來填充 animalDetail
            axios.get(`${import.meta.env.VITE_API_URL}/newsDetailShow.php?id=${id}`)
                .then(response => {
                    // 處理獲取到的動物詳情數據
                    this.newsDetailData = response.data
                    this.pageTitle = this.newsDetailData.news_title
                    document.title = this.pageTitle + ' | PxZoO'
                    this.bigPic = new URL(`${import.meta.env.VITE_IMAGES_BASE_URL}/news/${this.news.news_pic}`, import.meta.url).href
                })
                .catch(error => {
                    // 處理錯誤情況
                    // console.error('獲取消息詳情時出錯:', error);
                });
        },
        backtoNews() {
            // history.go(-1)
            this.$router.push({ name: 'news' });
        },
    },
    components: {
        MainFixedVote,
    },
};
</script>

