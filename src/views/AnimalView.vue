<template>
    <section class="forHeader animal_section">
        <!-- banner -->
        <div class="animal_banner">
            <img src="@/assets/images/animal/banner_animal.png" alt="animal_banner">
        </div>

        <!-- menu button(pc) -->
        <div class="animal_pc_sidebar">
            <aside class="Sidebar no_slide">
                <!-- 側邊欄上方動物icon -->
                <img class="Sidebar_icon octopus" src="@/assets/images/vetor/vetor_animal_octopus.svg" alt="螃蟹icon">

                <!-- ul裡面的li是主要存放按鈕的區塊 -->
                <!-- 之後想優化程式碼把這邊變成v-for -->
                <ul class="Sidebar_filter_btns">
                    <li class="filter_btn_item"
                    v-for="category in animalsCategoryPc"
                    @click="scrollTo(category.value)">
                    <img :src="getIconUrl(category.icon)" alt="category.label">
                        <p class="pcInnerText">{{category.label}}</p>
                    </li>
                </ul>

                <!-- 導引按鈕(我還沒讓它收起來時可以自動變icon) -->
                <div class="Sidebar_guide hidden_buttom">   
                    <img  src="@/assets/images/park/pk_Sidebar_guide_icon.svg" alt="導引icon">
                </div>
            </aside>
        </div>

        <!-- 動物列表 -->
        <main class="animal_overview">
            <!-- select(mb) -->
            <Select class="animal_select" v-model="model" style="width:200px">
                <Option v-for="category in animalsCategoryPh" :value="category.value" :key="category.value">{{ category.label }}</Option>
            </Select>

            <div class="animal_park" ref="grassLand">
                <!-- 分館名稱 -->
                <h2 class="animal_park_name pcBigTitle">草原之聲</h2>
                <div class="animal_info">
                    <!-- 個別動物種類名+圖片 -->
                    <a v-for="(animal, index) in animals_grass" :key="index" class="animal_each col-md-4 col-sm-6"
                    @click="toAnimalDetail()">
                        <img :src="getImageUrl(animal.species)" alt="animal_small_pic">
                        <h3 class="animal_name pcSmTitle">{{ animal.name }}</h3>
                    </a>
                </div>
            </div>

            <div class="animal_park" ref="polar">
                <h2 class="animal_park_name pcBigTitle">極地秘境</h2>
                <div class="animal_info">
                    <a v-for="(animal, index) in animals_polar" :key="index" class="animal_each col-md-4 col-sm-6"
                    @click="toAnimalDetail()">
                        <img :src="getImageUrl(animal.species)" alt="animal_small_pic">
                        <h3 class="animal_name pcSmTitle">{{ animal.name }}</h3>
                    </a>
                </div>
            </div>

            <div class="animal_park" ref="jungle">
                <h2 class="animal_park_name pcBigTitle">叢林奇蹟</h2>
                <div class="animal_info">
                    <a v-for="(animal, index) in animals_jungle" :key="index" class="animal_each col-md-4 col-sm-6"
                    @click="toAnimalDetail()">
                        <img :src="getImageUrl(animal.species)" alt="animal_small_pic">
                        <h3 class="animal_name pcSmTitle">{{ animal.name }}</h3>
                    </a>
                </div>
            </div>

            <div class="animal_park" ref="birds">
                <h2 class="animal_park_name pcBigTitle">鳥園樂章</h2>
                <div class="animal_info">
                    <a v-for="(animal, index) in animals_birds" :key="index" class="animal_each col-md-4 col-sm-6"
                    @click="toAnimalDetail()">
                        <img :src="getImageUrl(animal.species)" alt="animal_small_pic">
                        <h3 class="animal_name pcSmTitle">{{ animal.name }}</h3>
                    </a>
                </div>
            </div>
            <div class="animal_park" ref="aqua">
                <h2 class="animal_park_name pcBigTitle">海洋奇觀</h2>
                <div class="animal_info">
                    <a v-for="(animal, index) in animals_aqua" :key="index" class="animal_each col-md-4 col-sm-6"
                    @click="toAnimalDetail()">
                        <img :src="getImageUrl(animal.species)" alt="animal_small_pic">
                        <h3 class="animal_name pcSmTitle">{{ animal.name }}</h3>
                    </a>
                </div>
            </div>
        </main>
    </section>
</template>

<script>
export default {
    data() {
        return {
            //animal
            animals_grass: [
                { species: 'lion', name: '獅子' },
                { species: 'giraffe', name: '長頸鹿' },
                { species: 'elephant', name: '非洲象' },
                { species: 'cheetah', name: '獵豹' },
                { species: 'zebra', name: '斑馬' },
                { species: 'meerkat', name: '狐獴' },
            ],
            animals_polar: [
                { species: 'polarBear', name: '北極熊' },
                { species: 'kingPenguin', name: '國王企鵝' },
                { species: 'magellanicPenguin', name: '麥哲倫企鵝' },
                { species: 'arcticFox', name: '北極狐' },
                { species: 'seal', name: '海豹' },
            ],
            animals_jungle: [
                { species: 'capybara', name: '水豚' },
                { species: 'malayanTapir', name: '馬來貘' },
                { species: 'orangutan', name: '紅毛猩猩' },
                { species: 'tiger', name: '孟加拉虎' },
                { species: 'sloth', name: '二趾樹懶' },
                { species: 'monkey', name: '台灣獼猴' },
            ],
            animals_birds: [
                { species: 'peacock', name: '孔雀' },
                { species: 'flamingo', name: '紅鶴' },
                { species: 'japaneseCrane', name: '丹頂鶴' },
                { species: 'owl', name: '貓頭鷹' },
                { species: 'toucan', name: '巨嘴鳥' },
                { species: 'pelican', name: '鵜鶘' },
            ],
            animals_aqua: [
                { species: 'stingray', name: '魟魚' },
                { species: 'shark', name: '鯊魚' },
                { species: 'eel', name: '海鰻' },
                { species: 'clownfish', name: '小丑魚' },
                { species: 'octopus', name: '章魚' },
            ],

            //select ph
            animalsCategoryPh: [
                {
                    value: 'All',
                    label: 'ALL'
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

            //pc
            animalsCategoryPc: [
                {
                    value: 'grassLand',
                    label: '草原之聲',
                    icon: 'giraffe'
                },
                {
                    value: 'polar',
                    label: '極地秘境',
                    icon: 'penguin'
                },
                {
                    value: 'jungle',
                    label: '叢林奇蹟',
                    icon: 'monkey'
                },
                {
                    value: 'birds',
                    label: '鳥園樂章',
                    icon: 'flamingo'
                },
                {
                    value: 'aqua',
                    label: '海洋奇觀',
                    icon: 'fish'
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
        scrollTo(el){
            const scrollTarget = this.$refs[el]
            if (scrollTarget) {
                // 使用 nextTick 來確保 DOM 已經更新
                this.$nextTick(() => {
                    // 使用 scrollIntoView 滾動到頂部
                    scrollTarget.scrollIntoView({ behavior: 'smooth' })
                })
            }
        },
        toAnimalDetail(){
        this.$router.push({
        path:'./AnimalDetail',
    })
    }
    },
    created() {
    },
};
</script>

<style scoped>
/* 在這裡添加樣式 */
</style>