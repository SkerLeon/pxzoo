<template>
    <MainFixedVote/>
    <section class="forHeader animal_detail_section">

        <!-- 動物側邊欄 -->
        <aside class="animal_detail_menu">
            <img 
            class="monkey"
            src="../assets/images/vetor/vetor_animal_monkey.svg" alt="monkey">
            <ul class="animal_link_btn">
                <li class="animaldetail_filter "
                v-for="(category, index) in animals_species"
                :key="category.id"
                @click="toggleShow(isShow,index)">
                <div class="main_select">
                <img :src="getIconUrl(category.icon)" alt="category.label">
                <p class="pcInnerText">{{ category.park }}</p>
                <img src="../assets/images/animal/icon/down_arrow.svg" alt="arrow"
                class="toggle_arrow"
                :class="{ arrow_rotate: category.isShow }">
                </div>
                    <ul class="animaldetail_sub_menu" v-show="category.isShow">
                        <li v-for="child in category.children" :key="child.id">
                            <a class="pcInnerText" href="#">{{ child.species }}</a>
                        </li>
                    </ul>
                </li>
            </ul>
        </aside>
        <main class="animal_detail_overview"> 
        <!-- 上方介紹區塊            -->
            <div class="animal_detail_info">
                <div class="animal_detail_text">
                    <div class="animal_detail_title">
                        <h2 class="animal_detail_species">獅子</h2>
                        <div class="animal_detail_sound"
                        @click="animalSoundPlay">
                        
                            <img src="../assets/images/animal/icon/Sound.svg" alt="">
                        </div>
                    </div>
                    <div class="animal_detail_sec-section">
                        <div class="animal_detail_name">
                            <h5 class="pcMarkText">名字</h5>
                            <p class="pcInnerText">威廉</p>
                        </div>
                        <div class="animal_detail_life">
                            <h5 class="pcMarkText">平均壽命</h5>
                            <p class="pcInnerText">10-14年</p>
                        </div>
                    </div>
                    <div class="animal_detail_live">
                        <h5 class="pcMarkText">分布地區</h5>
                        <p class="pcInnerText">主要分布在非洲和印度次大陸</p>
                    </div>
                    <div class="animal_detail_food">
                        <h5 class="pcMarkText">食性</h5>
                        <p class="pcInnerText">獅子是肉食性動物，主食包括水牛、斑馬、角馬等大型草食動物</p>
                    </div>
                    <div class="animal_detail_feature">
                        <h5 class="pcMarkText">特徵</h5>
                        <p class="pcInnerText">獅子以強壯的身軀、金黃色的鬃毛和威風凜凜的咆哮聲著稱。雄性獅子的鬃毛不僅吸引雌性，也象徵領導地位。發達的四肢和肌肉是成功捕獵的關鍵</p>
                    </div>
                </div>

                <!-- 圖片區 -->
                <div class="animal_detail_img_list">
                    <div class="big_pic">
                        <img src="../assets/images/animal/animal_pic/pic1_lion.png" alt="pic1_lion">
                    </div>
                    <div class="small_pic">
                        <img src="../assets/images/animal/animal_pic/pic1_lion.png" alt="pic1_lion">
                        <img src="../assets/images/animal/animal_pic/pic2_lion.png" alt="pic2_lion">
                        <img src="../assets/images/animal/animal_pic/pic3_lion.png" alt="pic3_lion">
                    </div>
                </div>
            </div>

            <!-- 下方介紹 -->
            <div class="animal_detail_intro">
                <div class="animal_detail_icon">
                    <img src="../assets/images/animal/animal_icon/animal_icon_lion.png" alt="lion">
                </div>
                <div class="animal_detail_text_bg">
                    <p class="pcInnerText"> 獅子，草原之王，是大自然中的傑出代表。其金黃色的身軀和宏偉的鬃毛賦予了牠們令人難以忽視的外貌。作為社會性動物，獅子以群體合作和狩獵技巧而聞名。這些特質讓獅子在草原生態中扮演重要角色，體現著大自然的神奇和生命的韌性。</p>
                </div>
            </div>
        </main>

        <!-- 手機版本 -->
        <div class="animal_detail_intro_ph">
            <div class="animal_detail_intro_content">
                <div class="animal_detail_icon">
                    <img src="../assets/images/animal/animal_icon/animal_icon_lion.png" alt="lion">
                </div>
                <p class="pcInnerText"> 獅子，草原之王，是大自然中的傑出代表。其金黃色的身軀和宏偉的鬃毛賦予了牠們令人難以忽視的外貌。作為社會性動物，獅子以群體合作和狩獵技巧而聞名。這些特質讓獅子在草原生態中扮演重要角色，體現著大自然的神奇和生命的韌性。</p>
            </div>

            
            <button class="iconBtn pcInnerText animal_detail_btn"                 @click="backtoAnimal()">
            <p class="iconText">
                <img
                src="../assets/images/animal/goback-arrow.png"
                alt=""
                class="buttonIcon"
                />返回上頁
            </p>
            <img
                src="@/assets/images/login/icon/btnArrow.svg"
                alt=""
                class="arrowIcon"
            />
            </button>
        </div>

        <!-- 背景 -->
        <div class="animal_detail_bg">
            <img class="cloud_bg cloud_4" src="../assets/images/vetor/nature_cloud_4.svg" alt="bg-雲4">
            <img class="cloud_bg cloud_6" src="../assets/images/vetor/nature_cloud_6.svg" alt="bg-雲6">
            <img class="cloud_bg cloud_7" src="../assets/images/vetor/nature_cloud_7.svg" alt="bg-雲7">

            <img class="animal_bg_animal ostrich" src="../assets/images/vetor/vetor_animal_ostrich.svg" alt="bg-鴕鳥">
            <img class="animal_bg_animal chimpanzees" src="../assets/images/vetor/vetor_animal_chimpanzees.svg" alt="bg-猩猩">

        </div>

    </section>
</template>

<script>       
import MainFixedVote from '@/components/MainFixedVote.vue'     
export default {
    data() {
        return {
            //animal
            animals_species : [
                {
                    park:'草原之聲',
                    id:1,
                    isShow: false,
                    children: [
                        {species:'獅子'},
                        {species:'長頸鹿'},
                        {species:'非洲象'},
                        {species:'獵豹'},
                        {species:'斑馬'},
                        {species:'狐獴'},
                    ],
                    icon:'giraffe'
                },
                {
                    park:'極地秘境',
                    id:2,
                    isShow: false,
                    children: [
                        {species:'北極熊'},
                        {species:'國王企鵝'},
                        {species:'麥哲倫企鵝'},
                        {species:'北極狐'},
                        {species:'海豹'},
                    ],
                    icon:'penguin'
                },
                {
                    park:'叢林奇蹟',
                    id:3,
                    isShow: false,
                    children: [
                        {species:'水豚'},
                        {species:'馬來貘'},
                        {species:'紅毛猩猩'},
                        {species:'孟加拉虎'},
                        {species:'二趾樹懶'},
                        {species:'台灣獼猴'},
                    ],
                    icon:'monkey'
                },
                {
                    park:'鳥園樂章',
                    id:4,
                    isShow: false,
                    children: [
                        {species:'孔雀'},
                        {species:'紅鶴'},
                        {species:'丹頂鶴'},
                        {species:'貓頭鷹'},
                        {species:'巨嘴鳥'},
                        {species:'鵜鶘'},
                    ],
                    icon:'flamingo'
                },
                {
                    park:'海洋奇觀',
                    id:5,
                    isShow: false,
                    children: [
                        {species:'魟魚'},
                        {species:'鯊魚'},
                        {species:'海鰻'},
                        {species:'小丑魚'},
                        {species:'章魚'},
                    ],
                    icon:'fish'
                },
            ],
            //select ph
            animalsCategory: [
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
        },

        getIconUrl(paths) {
            return new URL(`../assets/images/animal/icon/${paths}.svg`, import.meta.url).href
        },

        animalSoundPlay(){
            var sound = new Audio('/public/sound_lion.mp3')
            sound.play();
        },
        toggleShow(isShow,index) {
            this.animals_species[index].isShow = !this.animals_species[index].isShow;
            this.animals_species.forEach((item, i) => {
            if (i !== index) {
            item.isShow = false;
            }
         });
         
            
        },
        
        backtoAnimal(){
        this.$router.push({
        path:'./animal',})
        },
    },
    components: {
       MainFixedVote,
     },
};
</script>

<style scoped>
/* 在這裡添加樣式 */
</style>