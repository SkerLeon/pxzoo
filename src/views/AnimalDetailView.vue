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
                v-for="(category, index) in animals_sidebar"
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
                        <li v-for="child in category.animals" class="fade">
                            <a class="pcInnerText" href="#" @click="toOtherPage(child.animals_id)">{{ child.species }}{{ child.id }}</a>
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
// import animalSound from "../../public/audio/sound_lion.mp3";     
import axios from 'axios';
export default {
    data() {
        return {
            animalDetailData: [],//data
            bigPic:'',
            smallPics: [],
            sidebarClick_id:'',
            //側邊欄
            animals_sidebar : [
                {
                    park:'草原之聲',
                    id:1,
                    isShow: false,
                    animals: [],//動物種類，動態渲染
                    animals_id:[],
                    icon:'giraffe'
                },
                {
                    park:'極地秘境',
                    id:2,
                    isShow: false,
                    animals: [],
                    animals_id:[],
                    icon:'penguin'
                },
                {
                    park:'叢林奇蹟',
                    id:3,
                    isShow: false,
                    animals: [],
                    animals_id:[],
                    icon:'monkey'
                },
                {
                    park:'鳥園樂章',
                    id:4,
                    isShow: false,
                    animals: [],
                    animals_id:[],
                    icon:'flamingo'
                },
                {
                    park:'海洋奇觀',
                    id:5,
                    isShow: false,
                    animals: [],
                    animals_id:[],
                    icon:'fish'
                },
            ],

            //小圖換大圖
            imgnum: 1,
            //關提示
            showHint: true,
            
        };
    },
    created(){
        //定住畫面
        document.body.style.overflow = 'hidden';
        const closed = sessionStorage.getItem('hintClosed');
        if (closed) {
            this.showHint = false;
            document.body.style.overflow = ''
        }
        const animalId = this.$route.params.id;
        this.fetchAnimalDetail(animalId);

        // 側邊欄
        axios.get(`${import.meta.env.VITE_API_URL}/animalShow.php?type=categories`)
        .then(response => {
            this.categories = response.data; // 假設返回的數據是一個數組
        // console.log(this.categories)
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
        });

    },
    mounted() {
        // 從後端獲取動物數據並填充到對應的館別下面
        this.fetchSidebarData();
        // this.fetchAnimalDetail(animalId);
    },
    beforeDestroy() {
    var sound = new Audio(this.animalSoundPath);
    console.log('stop')
    sound.pause();
    sound.currentTime = 0;
    },
    computed:{
        //監控目前動物頁面找聲音
        animalSoundPath(){
            return this.getAnimalSound(this.animalDetailData.animal_sound)
        },
        audioPlayer() {
            return new Audio(this.animalSoundPath) 
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
        //側邊欄
        fetchSidebarData(){
            axios.get(`${import.meta.env.VITE_API_URL}/animalDetailShow.php?type=speciesname`)
            .then(response => {
                const animalsData = response.data;
                // 遍歷每一筆動物資料
                animalsData.forEach(animal => {
                // 根據動物所屬的館別，在 this.animals_sidebar 陣列中找到對應的館別索引
                const parkIndex = this.animals_sidebar.findIndex(category => category.park === animal.category_name);
                // 檢查是否找到對應的館別
                if (parkIndex !== -1) {
                    this.animals_sidebar[parkIndex].animals.push({ 
                    species: animal.animal_species,
                    animals_id: animal.animal_id  // 在这里为每个 child 对象添加 animals_id 属性
                    });
                }
                });
            })
            .catch(error => {
                console.error('Error fetching animal data:', error);
            });
        },
        //關閉提示
        closeHint() {
            sessionStorage.setItem('hintClosed', 'true');
            this.showHint = false;
            document.body.style.overflow = ''
        },
        //側邊欄的icon
        getIconUrl(paths) {
            return new URL(`../assets/images/animal/icon/${paths}.svg`, import.meta.url).href
        },
        //動物icon(連資料庫)
        getAnimalIconUrl(paths) {
            return new URL(`${import.meta.env.VITE_IMAGES_BASE_URL}/animal/animal_icon/${paths}`, import.meta.url).href
        },
        //動物圖片(連資料庫)
        getSmallPicUrl(pic) {
            return new URL(`${import.meta.env.VITE_IMAGES_BASE_URL}/animal/animal_pic/${pic}`, import.meta.url).href
        },
        //動物圖片(大圖)，根據圖片選擇切換this.bigPic
        selectPic(pic) {
            this.bigPic = new URL(`${import.meta.env.VITE_IMAGES_BASE_URL}/animal/animal_pic/${pic}`, import.meta.url).href
            //console.log(this.bigPic)
        },
        //動物聲音路徑
        getAnimalSound(paths){
            return new URL(`${import.meta.env.VITE_IMAGES_BASE_URL}/animal/audio/${paths}`, import.meta.url).href
        },
        //播放聲音
        animalSoundPlay(){
            this.audioPlayer.play()
        },
        // 選單收合，雖然功能有出來但不確定寫得對不對
        toggleShow(isShow,index) {
            this.animals_sidebar[index].isShow = !this.animals_sidebar[index].isShow;
            this.animals_sidebar.forEach((item, i) => {
            if (i !== index) {
            item.isShow = false;
            }

        });  
        },
        toOtherPage(id){
            this.sidebarClick_id = id
            this.$router.push({
            name: 'animalDetail', params: { id:this.sidebarClick_id},})
            // location.reload()
        },
        //回到上頁
        backtoAnimal(){
        this.$router.push({
        path:'./animal',})
        },
    },
    //離開這頁時暫停音檔
    beforeRouteLeave(to, from, next) {
        this.audioPlayer.pause()
        next()
    },
    watch:{
        sidebarClick_id: {
        handler(newVal, oldVal) {
            // 在这里进行数据更新或其他操作
            // console.log('animals_id 变化了：', newVal);
            // 你可以在这里触发重新渲染页面的逻辑或者执行其他操作
            this.fetchAnimalDetail(newVal)
        },
        deep: true // 如果 animals_id 是一个对象或数组，需要使用 deep: true 来深度监测变化
    }
    },
    components: {
       MainFixedVote,
     },
};
</script>

deep:true