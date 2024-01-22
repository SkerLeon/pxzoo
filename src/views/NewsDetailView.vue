<template>
    <section class="forHeader">
        <!-- banner -->
        <div class="newsDetail_banner">
            <img src="@/assets/images/news/banner_newsInfo.png" alt="newsDetail_banner">
        </div>

        <main>
            
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

@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
