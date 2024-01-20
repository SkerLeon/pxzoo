<template>  
<section class="forHeader">
  <div class="animal_banner">
    <img src="../../public/images/animal/banner_animal.png" alt="animal_banner">
  </div>

    <main class="animal_overview">
      <div class="animal_park">
        <h2 class="animal_park_name pcBigTitle">草原之聲</h2>
        <div class="animal_info">
          <div v-for="(animal, index) in animals_grass" :key="index" class="animal_each col-md-3 col-sm-6">
              <img :src="animal.image" alt="Animal">
              <h3 class="animal_name pcSmTitle">{{ animal.name }}</h3>
          </div>
        </div>
      </div>

      <div class="animal_park">
        <h2 class="animal_park_name pcBigTitle">極地秘境</h2>
        <div class="animal_info">
          <div v-for="(animal, index) in animals_polar" :key="index" class="animal_each col-md-3 col-sm-6">
              <img :src="animal.image" alt="Animal">
              <h3 class="animal_name pcSmTitle">{{ animal.name }}</h3>
          </div>
        </div>
      </div>

      <div class="animal_park">
        <h2 class="animal_park_name pcBigTitle">叢林奇蹟</h2>
        <div class="animal_info">
          <div v-for="(animal, index) in animals_jungle" :key="index" class="animal_each col-md-3 col-sm-6">
              <img :src="animal.image" alt="Animal">
              <h3 class="animal_name pcSmTitle">{{ animal.name }}</h3>
            </div>
          </div>
        </div>

      <div class="animal_park">
        <h2 class="animal_park_name pcBigTitle">鳥園樂章</h2>
        <div class="animal_info">
          <div v-for="(animal, index) in animals_birds" :key="index" class="animal_each col-md-3 col-sm-6">
              <img :src="animal.image" alt="Animal">
              <h3 class="animal_name pcSmTitle">{{ animal.name }}</h3>
          </div>
        </div>
      </div>
      <div class="animal_park">
        <h2 class="animal_park_name pcBigTitle">海洋奇觀</h2>
        <div class="animal_info">
          <div v-for="(animal, index) in animals_aqua" :key="index" class="animal_each col-md-3 col-sm-6">
              <img :src="animal.image" alt="Animal">
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
        {name: '獅子', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
        { name: '長頸鹿', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
        { name: '非洲象', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
        { name: '獵豹', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
        { name: '斑馬', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
        { name: '狐獴', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
    ],
    animals_polar: [
        { name: '北極熊', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
        { name: '國王企鵝', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
        { name: '麥哲倫企鵝', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
        { name: '北極狐', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
        { name: '海豹', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
    ],
    animals_jungle: [
        {name: '水豚', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
        {name: '馬來貘', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
        {name: '紅毛猩猩', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
        {name: '孟加拉虎', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
        {name: '二趾樹懶', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
        {name: '台灣獼猴', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
    ],
    animals_birds: [
        { name: '孔雀', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
        { name: '紅鶴', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
        { name: '丹頂鶴', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
        { name: '貓頭鷹', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
        { name: '老鷹', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
        { name: '巨嘴鳥', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
        { name: '鵜鶘', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
    ],
    animals_aqua: [
        {name: '魟魚', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
        {name: '鯊魚', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
        {name: '海鰻', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
        {name: '小丑魚', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
        {name: '章魚', image: '../../public/images/animal/small_pic/small_pic_lion.png' },
      ],
    };
  },
  methods: {

  },
  created() {
},
};
</script>

<style scoped>
/* 在這裡添加樣式 */
</style>