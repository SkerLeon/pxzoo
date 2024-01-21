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
          <img :src="getAnimalIconUrl(num)" alt="園區動物icon的圖片">
        </div>
      </div>

      <aside class="Sidebar" @mouseenter="hover = true" @mouseleave="hover = false">
        <img class="Sidebar_icon" src="@/assets/images/park/pk_Sidebar_icon_crab.png" alt="螃蟹icon">

        <ul class="Sidebar_filter_btns">
          <li class="filter_btn_item" @click="showAnimalsAndFacilities()">
            <img src="@/assets/images/park/pk_filter_icon_Overview.svg" alt="篩選icon">
            <p class="pcInnerText">園區總覽</p>
          </li>

          <li class="filter_btn_item" @click="showFacilities()">
            <img src="@/assets/images/park/pk_filter_icon_facility.svg" alt="篩選icon">
            <p class="pcInnerText">園區設施</p>
          </li>

          <li class="filter_btn_item" @click="showAnimals()">
            <img src="@/assets/images/park/pk_filter_icon_Vector.svg" alt="篩選icon">
            <p class="pcInnerText">動物分館</p>
          </li>
        </ul>

        <div :class="['Sidebar_guide', { 'Sidebar_guide_rotate': hover }]" >   
          <img  src="@/assets/images/park/pk_Sidebar_guide_icon.svg" alt="導引icon">
        </div>
      </aside>
    </section>

    <section class="pk_content_bg">
      <section class="pk_Tickets">
        <div class="pk_Tickets_items">
          <RouterLink v-for="(ticket, index) in tickets" :key="index" to="/ticket" class="pk_Tickets_item">
            <img class="pk_Tickets_item_top" :src="getItemTopUrl(index+1)" alt="門票上半部">
            <img class="pk_Tickets_item_mid" :src="getItemMidUrl(index+1)" alt="中間的擋板">
            <img class="pk_Tickets_item_animal" :src="getItemAnimalUrl(index+1)" alt="中間的動物">
            <img class="pk_Tickets_item_bottom" :src="getItemBottomUrl(index+1)" alt="門票下半部">
            <div class="pk_Tickets_item_text">
              <h1 class="pcSmTitle">{{ticket.title}}</h1>
              <p class="pcInnerText">{{ticket.content}}</p>
              <p class="pcInnerText">{{ticket.content2}}</p>
            </div>
          </RouterLink>
        </div>
        
      </section>

      <section class="pk_Origin">
      </section>
    </section>
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
      hover : false,
      tickets:[{
        title:"成人票",
        content:"18~64歲可使用",
        content2:"NT$ 100",
      },{
        title:"兒童票",
        content:"4~11歲可使用",
        content2:"NT$ 40",
      },{
        title:"成人票",
        content:"12歲以上持學生證",
        content2:"NT$ 80",
      },{
        title:"愛心票",
        content:"65歲以上可使用",
        content2:"NT$ 40",
      },{
        title:"團體票",
        content:"15人以上可使用",
        content2:"NT$ 60",
      }]
    };
  },
  created() {
    // 生命週期鉤子
  },
  mounted() {
    // 生命週期鉤子
  },
  methods: {
    getAnimalIconUrl(paths){
      return new URL(`../assets/images/park/pk_animal_icon${paths}.png`, import.meta.url).href
    },
    getItemTopUrl(paths){
      return new URL(`../assets/images/park/pk_Tickets_item_top${paths}.png`, import.meta.url).href
    },
    getItemMidUrl(paths){
      return new URL(`../assets/images/park/pk_Tickets_item_mid${paths}.png`, import.meta.url).href
    },
    getItemAnimalUrl(paths){
      return new URL(`../assets/images/park/pk_Tickets_item_animal1${paths}.png`, import.meta.url).href
    },
    getItemBottomUrl(paths){
      return new URL(`../assets/images/park/pk_Tickets_item_bottom${paths}.png`, import.meta.url).href
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
