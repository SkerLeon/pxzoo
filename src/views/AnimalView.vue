<template>
    <MainFixedVote />
    <section class="forHeader animal_section" ref="containerRef">
        <!-- banner -->
        <div class="animal_banner">
            <img src="@/assets/images/animal/banner_animal_full.png" alt="animal_banner">
            <h2 class="pcBigTitle">動物資訊</h2>
        </div>

        <aside class="animal_anchorlink" :class="{ 'sidebar_fixed': isFixed },
            { 'sidebar_absolute': isAbsolute }">
            <img class="monkey" src="../assets/images/vetor/vetor_animal_monkey.svg" alt="monkey">
            <ul class="animal_link_btn">
                <li class="animal_btn_item" v-for="category in animalsCategoryPc" @click="scrollTo(category.value)">
                    <img class="btn_icon" :src="getIconUrl(category.icon)" alt="category.label">
                    <p class="pcInnerText">{{ category.label }}</p>
                </li>
            </ul>
        </aside>
        <!-- 篩選-ph有 -->
        <select name="payway[]" placeholder="ALL" class="pcInnerText animal_select" v-model="selectedCategory"
            @change="selectTypeChange">
            <option value="ALL" disabled hidden>ALL</option>
            <option v-for="category in animalsCategoryPh" :value="category.value" :key="category.value">{{ category.label }}
            </option>
        </select>
        <section class="grassland" v-show="showingSections.grassLand">
            <!-- 動物列表 -->
            <div class="animal_park grassLand" ref="grassLand">
                <!-- 分館名稱 -->
                <h2 class="animal_park_name pcBigTitle">草原之聲</h2>
                <div class="animal_info" data-aos="fade-up" data-aos-easing="ease-in-out">
                    <!-- 個別動物種類名+圖片 -->
                    <a v-for="(each, index) in animal_List[0].animals" :key="index" class="animal_each col-md-4 col-sm-6"
                        @click="toAnimalDetail(each.id)">
                        <div class="animal_frame">
                            <img :src="getImageUrl(each.animal_pic)" alt="animal_small_pic">
                        </div>
                        <h3 class="animal_name pcSmTitle">{{ each.species }}</h3>
                    </a>
                </div>
            </div>
        </section>

        <section class="polar" v-show="showingSections.polar">
            <div class="animal_park" ref="polar">
                <h2 class="animal_park_name pcBigTitle">極地秘境</h2>
                <div class="animal_info" data-aos="fade-up" data-aos-easing="ease-in-out">
                    <a v-for="(each, index) in animal_List[1].animals" :key="index" class="animal_each col-md-4 col-sm-6"
                        @click="toAnimalDetail(each.id)">
                        <div class="animal_frame">
                            <img :src="getImageUrl(each.animal_pic)" alt="animal_small_pic">
                        </div>
                        <h3 class="animal_name pcSmTitle">
                            {{ each.species }}</h3>
                    </a>
                </div>
            </div>
        </section>

        <section class="jungle" v-show="showingSections.jungle">
            <div class="animal_park" ref="jungle">
                <h2 class="animal_park_name pcBigTitle">叢林奇蹟</h2>
                <div class="animal_info" data-aos="fade-up" data-aos-easing="ease-in-out">
                    <a v-for="(each, index) in animal_List[2].animals" :key="index" class="animal_each col-md-4 col-sm-6"
                        @click="toAnimalDetail(each.id)">
                        <div class="animal_frame">
                            <img :src="getImageUrl(each.animal_pic)" alt="animal_small_pic">
                        </div>
                        <h3 class="animal_name pcSmTitle">{{ each.species }}</h3>
                    </a>
                </div>
            </div>
        </section>

        <section class="birds" v-show="showingSections.birds">
            <div class="animal_park" ref="birds">
                <h2 class="animal_park_name pcBigTitle">鳥園樂章</h2>
                <div class="animal_info" data-aos="fade-up" data-aos-easing="ease-in-out">
                    <a v-for="(each, index) in animal_List[3].animals" :key="index" class="animal_each col-md-4 col-sm-6"
                        @click="toAnimalDetail(each.id)">
                        <div class="animal_frame">
                            <img :src="getImageUrl(each.animal_pic)" alt="animal_small_pic">
                        </div>
                        <h3 class="animal_name pcSmTitle">{{ each.species }}</h3>
                    </a>
                </div>
            </div>
        </section>

        <section class="aqua" v-show="showingSections.aqua">
            <div class="animal_park" ref="aqua">
                <h2 class="animal_park_name pcBigTitle">海洋奇觀</h2>
                <div class="animal_info" data-aos="fade-up" data-aos-easing="ease-in-out">
                    <a v-for="(each, index) in animal_List[4].animals" :key="index" class="animal_each col-md-4 col-sm-6"
                        @click="toAnimalDetail(each.id)">
                        <div class="animal_frame">
                            <img :src="getImageUrl(each.animal_pic)" alt="animal_small_pic">
                        </div>
                        <h3 class="animal_name pcSmTitle">{{ each.species }}</h3>
                    </a>
                </div>
            </div>
        </section>

    </section>
</template>

<script>
import MainFixedVote from '@/components/MainFixedVote.vue'
import axios from 'axios';
export default {
    data() {
        return {
            animal_List: [
                {
                    park: '草原之聲',

                },
                {
                    park: '極地秘境',

                },
                {
                    park: '叢林奇蹟',

                },
                {
                    park: '鳥園樂章',

                },
                {
                    park: '海洋奇觀',

                },
            ],

            //animal
            // animals_grassland: [
            //     { value: 'grassLand', species: 'lion', name: '獅子' },
            //     { value: 'grassLand', species: 'giraffe', name: '長頸鹿' },
            //     { value: 'grassLand', species: 'elephant', name: '非洲象' },
            //     { value: 'grassLand', species: 'cheetah', name: '獵豹' },
            //     { value: 'grassLand', species: 'zebra', name: '斑馬' },
            //     { value: 'grassLand', species: 'meerkat', name: '狐獴' },
            // ],
            // animals_polar: [
            //     { value: 'polar', species: 'polarBear', name: '北極熊' },
            //     { value: 'polar', species: 'kingPenguin', name: '國王企鵝' },
            //     { value: 'polar', species: 'magellanicPenguin', name: '麥哲倫企鵝' },
            //     { value: 'polar', species: 'arcticFox', name: '北極狐' },
            //     { value: 'polar', species: 'seal', name: '海豹' },
            // ],
            // animals_jungle: [
            //     { value: 'jungle', species: 'capybara', name: '水豚' },
            //     { value: 'jungle', species: 'malayanTapir', name: '馬來貘' },
            //     { value: 'jungle', species: 'orangutan', name: '紅毛猩猩' },
            //     { value: 'jungle', species: 'tiger', name: '孟加拉虎' },
            //     { value: 'jungle', species: 'sloth', name: '二趾樹懶' },
            //     { value: 'jungle', species: 'monkey', name: '台灣獼猴' },
            // ],
            // animals_birds: [
            //     { value: 'birds', species: 'peacock', name: '孔雀' },
            //     { value: 'birds', species: 'flamingo', name: '紅鶴' },
            //     { value: 'birds', species: 'japaneseCrane', name: '丹頂鶴' },
            //     { value: 'birds', species: 'owl', name: '貓頭鷹' },
            //     { value: 'birds', species: 'toucan', name: '巨嘴鳥' },
            //     { value: 'birds', species: 'pelican', name: '鵜鶘' },
            // ],
            // animals_aqua: [
            //     { value: 'aqua', species: 'stingray', name: '魟魚' },
            //     { value: 'aqua', species: 'shark', name: '鯊魚' },
            //     { value: 'aqua', species: 'eel', name: '海鰻' },
            //     { value: 'aqua', species: 'clownfish', name: '小丑魚' },
            //     { value: 'aqua', species: 'octopus', name: '章魚' },
            // ],

            //select ph
            selectedCategory: 'ALL',
            showingSections: {
                grassLand: true,
                polar: true,
                jungle: true,
                birds: true,
                aqua: true
            },

            animalsCategoryPh: [
                {
                    value: 'ALL',
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
            isFixed: true,
            isAbsolute: false,
            containerHeight: 0
        };
    },
    mounted() {
        window.addEventListener('scroll', this.handleScroll);
        const containerHeight = this.$refs.containerRef.clientHeight;
        // console.log('容器高度：', containerHeight);

        this.fetchAnimalData();
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        fetchAnimalData() {
            axios.get(`${import.meta.env.VITE_API_URL}/animalDetailShow.php?type=animalList`)
                .then(response => {
                    const animalsData = response.data.map(item=>{
                        return{
                            ...item,
                            animal_status: parseInt(item.animal_status)
                        }
                    });

                    // 清空animal_List數組，以便重新填充
                    this.animal_List = [];
                    // 遍歷每一筆動物資料
                    animalsData.forEach(animal => {
                        // 根據動物所屬的館別，在 this.animals_sidebar 陣列中找到對應的館別索引
                        //animal_status = 0 則返回不渲染
                        if (animal.animal_status === 0) {
                            return
                        }
                        const parkIndex = this.animal_List.findIndex(category => category.park === animal.category_name);
                        // 檢查是否找到對應的館別

                        // 如果館別不存在，則創建一個新的館別對象並添加到animal_List數組中
                        if (parkIndex === -1) {
                            this.animal_List.push({
                                park: animal.category_name,
                                animals: [{
                                    id: animal.animal_id,
                                    species: animal.animal_species,
                                    animal_pic: animal.animal_small_pic
                                }]
                            });
                        } else {
                            // 如果館別已存在，則將動物數據添加到相應館別的animals數組中
                            this.animal_List[parkIndex].animals.push({
                                id: animal.animal_id,
                                species: animal.animal_species,
                                animal_pic: animal.animal_small_pic
                            });
                        }
                    });
                })
                .catch(error => {
                    // console.error('Error fetching animal data:', error);
                });
        },


        selectTypeChange() {
            if (this.selectedCategory === 'ALL') {
                // 顯示所有分類
                for (let key in this.showingSections) {
                    this.showingSections[key] = true;
                }
            } else {
                // 顯示選擇的分類
                for (let key in this.showingSections) {
                    if (key !== this.selectedCategory) {
                        this.showingSections[key] = false;
                    } else {
                        this.showingSections[key] = true;
                    }
                }
            }
        },


        getImageUrl(paths) {
            return new URL(`${import.meta.env.VITE_IMAGES_BASE_URL}/animal/small_pic/${paths}`, import.meta.url).href
        },
        getIconUrl(paths) {
            return new URL(`../assets/images/animal/icon/${paths}.svg`, import.meta.url).href
        },
        scrollTo(el) {
            const scrollTarget = this.$refs[el]
            if (scrollTarget) {
                // 使用 nextTick 來確保 DOM 已經更新
                this.$nextTick(() => {
                    // 使用 scrollIntoView 滾動到頂部
                    scrollTarget.scrollIntoView({ behavior: 'smooth' })
                })
            }
        },

        //想控制fixed範圍(不碰到footer)，想知道有沒有偵測最外層section高度的方式
        handleScroll() {
            let threshold = 0
            // console.log(threshold)
            if (window.innerWidth <= 1920 && window.innerWidth > 1600) {
                threshold = 4200
            } else if (window.innerWidth <= 1600 && window.innerWidth > 1440) {
                threshold = 3500
            }
            else if (window.innerWidth <= 1440 && window.innerWidth > 1280) {
                threshold = 3300
            } else if (window.innerWidth <= 1280) {
                threshold = 3000
            }
            if (window.scrollY > threshold) {
                this.isFixed = false;
                this.isAbsolute = true;
            } else {
                this.isFixed = true;
                this.isAbsolute = false;
            }
        },
        toAnimalDetail(animalId) {
            // console.log(animalId)
            this.$router.push({
                name: 'animalDetail', params: { id: animalId },
            })

        }
    },
    components: {
        MainFixedVote,
    },
}


</script>

<style scoped>
/* 在這裡添加樣式 */
</style>