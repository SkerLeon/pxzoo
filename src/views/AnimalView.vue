<template>  
<section class="forHeader">
    <div class="animal_banner">
    <img src="@/assets/images/animal/banner_animal.png" alt="animal_banner">
    </div>

    <main class="animal_overview">
        <div class="animal_park">
        <h2 class="animal_park_name pcBigTitle">草原之聲</h2>
        <div class="animal_info">
            <div v-for="(animal, index) in animals_grass" :key="index" class="animal_each col-md-3 col-sm-6">
                <img :src="getImageUrl(animal.species)" alt="Animal">
                <h3 class="animal_name pcSmTitle">{{ animal.name }}</h3>
            </div>
        </div>
        </div>

        <div class="animal_park">
        <h2 class="animal_park_name pcBigTitle">極地秘境</h2>
        <div class="animal_info">
            <div v-for="(animal, index) in animals_polar" :key="index" class="animal_each col-md-3 col-sm-6">
                <img :src="getImageUrl(animal.species)" alt="Animal">
                <h3 class="animal_name pcSmTitle">{{ animal.name }}</h3>
            </div>
        </div>
        </div>

        <div class="animal_park">
        <h2 class="animal_park_name pcBigTitle">叢林奇蹟</h2>
        <div class="animal_info">
            <div v-for="(animal, index) in animals_jungle" :key="index" class="animal_each col-md-3 col-sm-6">
                <img :src="getImageUrl(animal.species)" alt="Animal">
                <h3 class="animal_name pcSmTitle">{{ animal.name }}</h3>
            </div>
            </div>
        </div>

        <div class="animal_park">
        <h2 class="animal_park_name pcBigTitle">鳥園樂章</h2>
        <div class="animal_info">
            <div v-for="(animal, index) in animals_birds" :key="index" class="animal_each col-md-3 col-sm-6">
                <img :src="getImageUrl(animal.species)" alt="Animal">
                <h3 class="animal_name pcSmTitle">{{ animal.name }}</h3>
            </div>
        </div>
        </div>
        <div class="animal_park">
        <h2 class="animal_park_name pcBigTitle">海洋奇觀</h2>
        <div class="animal_info">
            <div v-for="(animal, index) in animals_aqua" :key="index" class="animal_each col-md-3 col-sm-6">
                <img :src="getImageUrl(animal.species)" alt="Animal">
                <h3 class="animal_name pcSmTitle">{{ animal.name }}</h3>
            </div>
        </div>
        </div>
    </main>
    </section>
</template>

<script>
export default {
data() {
    return {
    animals_grass: [
        {species:'lion', name:'獅子'},
        {species:'giraffe', name:'長頸鹿'},
        {species:'elephant', name:'非洲象'},
        {species:'cheetah', name:'獵豹'},
        {species:'zebra', name:'斑馬'},
        {species:'meerkat', name:'狐獴'},
    ],
    animals_polar: [
        {species:'polarBear', name:'北極熊'},
        {species:'kingPenguin', name:'國王企鵝'},
        {species:'magellanicPenguin', name:'麥哲倫企鵝'},
        {species:'arcticFox', name:'北極狐'},
        {species:'seal', name:'海豹'},
    ],
    animals_jungle: [
        {species:'capybara', name:'水豚'},
        {species:'malayanTapir', name:'馬來貘'},
        {species:'orangutan', name:'紅毛猩猩'},
        {species:'tiger', name:'孟加拉虎'},
        {species:'sloth', name:'二趾樹懶'},
        {species:'monkey', name:'台灣獼猴'},
    ],
    animals_birds: [
        {species:'peacock', name:'孔雀'},
        {species:'flamingo', name:'紅鶴'},
        {species:'japaneseCrane', name:'丹頂鶴'},
        {species:'owl', name:'貓頭鷹'},
        {species:'eagle', name:'老鷹'},
        {species:'toucan', name:'巨嘴鳥'},
        {species:'pelican', name:'鵜鶘'},
    ],
    animals_aqua: [
        {species:'stingray', name:'魟魚'},
        {species:'shark', name:'鯊魚'},
        {species:'eel', name:'海鰻'},
        {species:'clownfish', name:'小丑魚'},
        {species:'octopus', name:'章魚'},
        ],
    };
    },
    methods: {
    getImageUrl(paths){
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