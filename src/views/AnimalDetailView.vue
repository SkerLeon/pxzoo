<template>
    <MainFixedVote/>
    <section class="forHeader animal_detail_section">
        <div class="animal-lightBox"
        v-show="showHint" @click.stop="closeHint">
            <div class="animal-hint">
                <img class="hint-close" src="/src/assets/images/animal/icon/close.svg" alt="close"
                @click="closeHint">
                <p class="pcMarkText">此頁面含有動物叫聲，請點選<span><img src="../assets/images/animal/icon/Sound.svg" alt=""></span>聆聽</p>
            </div>
        </div>
        <!-- 動物側邊欄 pc才有 -->
        <aside class="animal_detail_menu">
            <img 
            class="monkey"
            src="../assets/images/vetor/vetor_animal_monkey.svg" alt="monkey">
            <ul class="animal_link_btn ">
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
                    <!-- @click.stop阻止蔓延 -->
                    <ul class="animaldetail_sub_menu" v-show="category.isShow" @click.stop>
                        <li v-for="child in category.children" :key="child.id" class="fade">
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
                        <h2 class="animal_detail_species">{{ animalDetailData.animal_species }}</h2>
                        <!-- 聲音 -->
                        <div class="animal_detail_sound"
                        @click="animalSoundPlay">            
                        <img src="../assets/images/animal/icon/Sound.svg" alt="soundIcon">
                        </div>
                    </div>
                    <div class="animal_detail_sec-section">
                        <div class="animal_detail_name">
                            <h5 class="pcMarkText">名字</h5>
                            <p class="pcInnerText">{{animalDetailData.animal_name}}</p>
                        </div>
                        <div class="animal_detail_life">
                            <h5 class="pcMarkText">平均壽命</h5>
                            <p class="pcInnerText">{{animalDetailData.animal_lifespan}}</p>
                        </div>
                    </div>
                    <div class="animal_detail_live">
                        <h5 class="pcMarkText">分布地區</h5>
                        <p class="pcInnerText">{{ animalDetailData.animal_area }}</p>
                    </div>
                    <div class="animal_detail_food">
                        <h5 class="pcMarkText">食性</h5>
                        <p class="pcInnerText">{{ animalDetailData.animal_food }}</p>
                    </div>
                    <div class="animal_detail_feature">
                        <h5 class="pcMarkText">特徵</h5>
                        <p class="pcInnerText">{{ animalDetailData.animal_features }}</p>
                    </div>
                </div>

                <!-- 圖片區 -->
                <div class="animal_detail_img_list">
                    <div class="big_pic">
                    <!-- 动态绑定大图的 src 属性 -->
                        <img :src="bigPic" alt="big_pic">
                    </div>
                    <div class="small_pic">
                    <!-- 使用 v-for 循环生成小图 -->
                    <img
                     v-for="pic in [animalDetailData.animal_pic_a, animalDetailData.animal_pic_b, animalDetailData.animal_pic_c]"
                    :src="getSmallPicUrl(pic)" 
                    :key="`small_${pic}`" 
                    :alt="`small_${pic}`"
                    @click="selectPic(pic)">
                    </div>
                </div>
            </div>

            <!-- 下方介紹 -->
            <div class="animal_detail_intro">
                <div class="animal_detail_icon">
                    <img :src="getAnimalIconUrl(animalDetailData.animal_icon)" alt="icon">
                </div>
                <div class="animal_detail_text_bg">
                    <p class="pcInnerText"> {{ animalDetailData.animal_description }}</p>
                </div>
            </div>
        </main>

        <!-- 手機版本 -->
        <div class="animal_detail_intro_ph">
            <div class="animal_detail_intro_content">
                <div class="animal_detail_icon">
                    <img :src="getAnimalIconUrl(animalDetailData.animal_icon)" alt="icon">
                </div>
                <p class="pcInnerText"> {{ animalDetailData.animal_description }}</p>
            </div>

            <!-- 返回上頁 mb才有 -->
            <button class="iconBtn pcInnerText animal_detail_btn"                 
            @click="backtoAnimal()">
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
import animalSound from "../../public/audio/sound_lion.mp3";     
import axios from 'axios';
export default {
    data() {
        return {
            animalDetailData: [],//data
            bigPic:'',
            smallPics: [],
            animal:{
                species: '獅子',
                name:'威廉',
                lifeSpan:'10-14年',
                area:'主要分布在非洲和印度次大陸',
                food:'獅子是肉食性動物，主食包括水牛、斑馬、角馬等大型草食動物',
                features:'獅子以強壯的身軀、金黃色的鬃毛和威風凜凜的咆哮聲著稱。雄性獅子的鬃毛不僅吸引雌性，也象徵領導地位。發達的四肢和肌肉是成功捕獵的關鍵',
                description:' 獅子，草原之王，是大自然中的傑出代表。其金黃色的身軀和宏偉的鬃毛賦予了牠們令人難以忽視的外貌。作為社會性動物，獅子以群體合作和狩獵技巧而聞名。這些特質讓獅子在草原生態中扮演重要角色，體現著大自然的神奇和生命的韌性。',
                en_name:'lion',

            },
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

            //小圖換大圖
            imgnum: 1,
            //關提示
            showHint: true,
                
        };
    },
    created(){
        document.body.style.overflow = 'hidden';
        const closed = sessionStorage.getItem('hintClosed');
        if (closed) {
            this.showHint = false;
            document.body.style.overflow = ''
        }
        const animalIdMapping = {
            6: 1,  7: 3,  1: 5, 8: 6,
            12: 7, 13: 8,  15: 10, 16: 11,
            34: 12, 33: 13, 38: 14, 37: 15, 36: 16, 35: 17,
            19: 18, 18: 19, 21: 20, 20: 21,  17: 23,
            29: 24, 24: 25, 30: 26, 28: 27, 26: 28
        }
 
        const animalId = this.$route.params.id;
        if (animalIdMapping.hasOwnProperty(animalId)) {
        // 如果動物 ID 需要映射，則獲取對應的新 ID
            const mappedAnimalId = animalIdMapping[animalId];
            console.log(`映射後的動物 ID: ${mappedAnimalId}`);

        // 使用新的動物 ID 來獲取動物詳情
            this.fetchAnimalDetail(mappedAnimalId);
        } else {
        // 如果動物 ID 不需要映射，則直接使用原始的動物 ID
            console.log(`未映射的動物 ID: ${animalId}`);
            this.fetchAnimalDetail(animalId);
        }

    },
    computed:{
        animalSoundPath(){
            return this.getAnimalSound(this.animalDetailData.animal_sound)
        }
    },
    methods: {
        fetchAnimalDetail(id) {
        // API 請求或其他邏輯來填充 animalDetail
            axios.get(`${import.meta.env.VITE_API_URL}/animalDetailShow.php?id=${id}`)
            .then(response => {
                // 處理獲取到的動物詳情數據
                this.animalDetailData = response.data

                this.bigPic = new URL(`${import.meta.env.VITE_IMAGES_BASE_URL}/animal/animal_pic/${this.animalDetailData.animal_pic_a}`, import.meta.url).href
            })
            .catch(error => {
                // 處理錯誤情況
                console.error('獲取動物詳情時出錯:', error);
            });
        },
        closeHint() {
            sessionStorage.setItem('hintClosed', 'true');
            this.showHint = false;
            document.body.style.overflow = ''
        },

        getImageUrl(paths) {
            return new URL(`../assets/images/animal/small_pic/small_pic_${paths}.png`, import.meta.url).href
        },

        getIconUrl(paths) {
            return new URL(`../assets/images/animal/icon/${paths}.svg`, import.meta.url).href
        },
        getAnimalIconUrl(paths) {
            return new URL(`${import.meta.env.VITE_IMAGES_BASE_URL}/animal/animal_icon/${paths}`, import.meta.url).href
        },

        getSmallPicUrl(pic) {
            return new URL(`${import.meta.env.VITE_IMAGES_BASE_URL}/animal/animal_pic/${pic}`, import.meta.url).href
        },
        selectPic(pic) {
            this.bigPic = new URL(`${import.meta.env.VITE_IMAGES_BASE_URL}/animal/animal_pic/${pic}`, import.meta.url).href
            console.log(this.bigPic)
        },
        getAnimalSound(paths){
            return new URL(`${import.meta.env.VITE_IMAGES_BASE_URL}/animal/audio/${paths}`, import.meta.url).href

        },
        animalSoundPlay(){
            var sound = new Audio(this.animalSoundPath)
            console.log(sound)
            sound.play();
        },
        // 選單收合，雖然功能有出來但不確定寫得對不對
        toggleShow(isShow,index) {
            this.animals_species[index].isShow = !this.animals_species[index].isShow;
            this.animals_species.forEach((item, i) => {
            if (i !== index) {
            item.isShow = false;
            }

        });  
        },
        //回到上頁
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
