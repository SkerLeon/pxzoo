<template>
    <MainFixedVote/>
    <section class="forHeader news_detail_section">
        <!-- banner -->
        <div class="newsDetail_banner">
            <img src="../assets/images/news/banner_news_detail_full.png" alt="newsDetail_banner">
            <h2 class="pcBigTitle">最新消息</h2>
        </div>

        <main>
            <div class="news_detail">            
                <div class="news_detail_info"
                data-aos="fade-up"
                data-aos-easing="ease-in-out">
                    <div class="news_detail_tag_time">
                        <span class="time pcInnerText">{{article.date}}</span>
                        <div class="newsFrame">
                            <img
                            :src="getTagUrl(article.color)"
                            alt="orangeFrame"
                            class="newsFramePic"
                            />
                            <p class="newsFrameText pcInnerText">{{article.tag}}</p>
                        </div>
                    </div>
                    <div class="news_detail_title">
                        <h2 class="pcBigTitle">{{ article.title }}</h2>
                    </div>
                    <img src="../assets/images/news/decorate-line_news_detail.png" alt="裝飾線" class="news_line upper">
                </div>
                <div class="news_detail_content"
                data-aos="fade-up"
                data-aos-easing="ease-in-out">
                    <div class="news_detail_pic">
                        <div class="news_detail_border">
                            <img :src="getImageUrl(article.img)" alt="news圖">
                        </div>
                    </div>
                    <!-- v-for段落 -->
                    <div class="news_detail_text" v-for="(paragraph, index) in article.content">
                        <!-- 每段包p，並中間用<br>隔開 -->
                        <p class="pcInnerText" v-html="paragraph"></p>
                        <br v-if="index < article.content.length - 1">
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
import MainFixedVote from '@/components/MainFixedVote.vue'    
export default {
    data() {
        return {
            article: {
            date:'2024.01.02',
            tag:'最新活動',
            color:'orange',
            tag_class:'new_activity',
            title:'動物明星新一輪投票即將啟動！',
            img:'new_activity_1',
            content:[
                '動物園即將迎來一場令人期待的「動物明星投票」活動！經過上一期12月的人氣投票，大象、長頸鹿和獅子成功脫穎而出，成為前三名的熱門動物明星。這次的活動將提供遊客們一個難得的機會，以票選心中最喜愛的動物，讓牠們成為動物園的代表性明星。',
                '參與投票的遊客不僅能夠支持自己心目中的動物候選人，還有機會贏得豐富的獎品。動物園希望透過這次活動，拉進與遊客之間的距離，同時讓大家更深入認識動物園的居民。',
                '這場「動物明星投票」活動將成為動物園最新、最受期待的亮點之一。歡迎大家踴躍參與，共同打造一個充滿歡笑和驚喜的動物園體驗！'
            ]
            },
            
        };
    },
    methods: {
        getImageUrl(paths) {
            return new URL(`../assets/images/news/${paths}.png`, import.meta.url).href
        },
        //tag樣式
        getTagUrl(paths){
            return new URL(`../assets/images/news/newsFrame/${paths}Frame.svg`, import.meta.url).href
        },
    },
    components: {
       MainFixedVote,
     },
};
</script>

