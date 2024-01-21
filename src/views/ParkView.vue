<template>
  <section class="forHeader pk_content">
    <section class="pk_map">
      <img class="pk_map_bg" src="@/assets/images/park/pk_map_bg.png" alt="園區地圖">

      <div v-show="show_facilities" class="pk_Store_icon">
        <div v-for="num in 2" :class="`pk_Store_default pk_Store_icon_VC${num}`">
          <img src="@/assets/images/park/pk_Store_icon1.png" alt="遊客中心icon">
        </div>

        <div v-for="num in 5" :class="`pk_Store_default pk_Store_icon_WC${num}`">
          <img src="@/assets/images/park/pk_Store_icon2.png" alt="餐廳icon">
        </div>

        <div v-for="num in 5" :class="`pk_Store_default pk_Store_icon_RC${num}`">
          <img src="@/assets/images/park/pk_Store_icon3.png" alt="廁所icon">
        </div>
      </div>
      
      <div v-show="show_animals" class="pk_animal_icon">
        <div v-for="num in 38" :class="`pk_animal_default pk_animal_icon${num}`" :id="`location_id${num}`">
          <img :src="getImageUrl(num)" alt="園區動物icon的圖片">
        </div>
      </div>

      <aside class="pk_Sidebar">
        <img class="pk_Sidebar_icon" src="@/assets/images/park/pk_Sidebar_icon_crab.png" alt="螃蟹icon">

        <ul class="pk_Sidebar_filter_btns">
          <li class="pk_filter_btn_item" @click="showAnimalsAndFacilities()">
            <img src="@/assets/images/park/pk_filter_icon_Overview.svg" alt="篩選icon">
            <p class="pcInnerText">園區總攬</p>
          </li>

          <li class="pk_filter_btn_item" @click="showFacilities()">
            <img src="@/assets/images/park/pk_filter_icon_facility.svg" alt="篩選icon">
            <p class="pcInnerText">園區設施</p>
          </li>

          <li class="pk_filter_btn_item" @click="showAnimals()">
            <img src="@/assets/images/park/pk_filter_icon_Vector.svg" alt="篩選icon">
            <p class="pcInnerText">動物分館</p>
          </li>
        </ul>

        <div class="pk_Sidebar_guide">   
          <img  src="@/assets/images/park/pk_Sidebar_guide_icon.svg" alt="導引icon">
        </div>
      </aside>
    </section>

    <section class="pk_Tickets"></section>
    <section class="pk_origin"></section>
    <section class="pk_Park_information"></section>
  </section>
</template>

<script>
export default {
  components: {
    // 組件
  },
  data() {
    return {
      show_animals:true,
      show_facilities:true,
    };
  },
  created() {
    // 生命週期鉤子
  },
  mounted() {
    // 生命週期鉤子
  },
  methods: {
    getImageUrl(paths){
      return new URL(`../assets/images/park/pk_animal_icon${paths}.png`, import.meta.url).href
    },
    showAnimals(){
      this.show_animals = true
      this.show_facilities = false
    },
    showFacilities(){
      this.show_animals = false
      this.show_facilities = true
    },
    showAnimalsAndFacilities(){
      this.show_animals = true
      this.show_facilities = true
    }
  },
};
</script>
