<template>
    <section class="forHeader animal_detail_section">
         <!-- menu button -->
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
        <div class="animal_detail_overview">
            <div class="animal_detail_info">
                <div class="animal_detail_text">
                    <div class="animal_detail_title">
                        <h2 class="animal_detail_species">獅子</h2>
                        <div class="animal_detail_sound">
                            <img src="../assets/images/animal/icon/Sound.svg" alt="">
                        </div>
                    </div>
                    <div class="animal_detail_sec-section">
                        <div class="animal_detail_name">
                            <h5>名字</h5>
                            <p>威廉</p>
                        </div>
                        <div class="animal_detail_life">
                            <h5>平均壽命</h5>
                            <p>10-14年</p>
                        </div>
                    </div>
                    <div class="animal_detail_live">
                        <h5>分布地區</h5>
                        <p>主要分布在非洲和印度次大陸</p>
                    </div>
                    <div class="animal_detail_food">
                        <h5>食性</h5>
                        <p>獅子是肉食性動物，主食包括水牛、斑馬、角馬等大型草食動物</p>
                    </div>
                    <div class="animal_detail_feature">
                        <h5>特徵</h5>
                        <p>獅子以強壯的身軀、金黃色的鬃毛和威風凜凜的咆哮聲著稱。雄性獅子的鬃毛不僅吸引雌性，也象徵領導地位。發達的四肢和肌肉是成功捕獵的關鍵</p>
                    </div>
                </div>
                <div class="animal_detail_img_list">
                    <div class="big_pic">
                        <img src="https://picsum.photos/673/600/?random=10">
                    </div>
                    <div class="small_pic">
                        <img src="https://picsum.photos/211/180/?random=10">
                        <img src="https://picsum.photos/211/180/?random=10">
                        <img src="https://picsum.photos/211/180/?random=10">
                    </div>
                </div>
            </div>
            <div class="animal_detail_intro">
                <div class="animal_detail__icon">
                    <img src="../assets/images/park/pk_animal_icon6.png" alt="lion">
                </div>
                <p> 獅子，草原之王，是大自然中的傑出代表。其金黃色的身軀和宏偉的鬃毛賦予了牠們令人難以忽視的外貌。作為社會性動物，獅子以群體合作和狩獵技巧而聞名。這些特質讓獅子在草原生態中扮演重要角色，體現著大自然的神奇和生命的韌性。</p>
            </div>
        </div>


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
                { species: 'eagle', name: '老鷹' },
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

            //select
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
    },
    created() {
    },
};
</script>

<style scoped>
/* 在這裡添加樣式 */
</style>