<template>
  <section class="forHeader pk_content">
    
    <section class="pk_map">
      <img class="pk_map_bg" src="@/assets/images/park/pk_map_bg.png" alt="園區地圖">

      <div v-show="show_facilities" class="pk_Store_icon">
        <div v-for="num in 2" :class="`pk_Store_default pk_Store_icon_VC${num}`">
          <div class="pk_Store_icon_dialog_content pk_vc_top">
            <img class="pk_Store_icon_dialog" src="@/assets/images/park/pk_Store_icon_dialog_pink.png" alt="園區動物hover的圖片">
            <div class="pk_Store_icon_dialog_content_text">
              <p class="pcMarkText">遊客中心</p>
            </div>
          </div>
          <img src="@/assets/images/park/pk_Store_icon1.png" alt="遊客中心icon">
        </div>

        <div v-for="num in 5" :class="`pk_Store_default pk_Store_icon_WC${num}`">
          <div class="pk_Store_icon_dialog_content">
            <img class="pk_Store_icon_dialog" src="@/assets/images/park/pk_Store_icon_dialog_pink.png" alt="園區動物hover的圖片">
            <div class="pk_Store_icon_dialog_content_text">
              <p class="pcMarkText">美食餐廳</p>
            </div>
          </div>
          <img src="@/assets/images/park/pk_Store_icon2.png" alt="餐廳icon">
        </div>

        <div v-for="num in 5" :class="`pk_Store_default pk_Store_icon_RC${num}`">
          <div class="pk_Store_icon_dialog_content">
            <img class="pk_Store_icon_dialog" src="@/assets/images/park/pk_Store_icon_dialog_pink.png" alt="園區動物hover的圖片">
            <div class="pk_Store_icon_dialog_content_text">
              <p class="pcMarkText">園區廁所</p>
            </div>
          </div>
          <img src="@/assets/images/park/pk_Store_icon3.png" alt="廁所icon">
        </div>
      </div>
      
      <div v-show="show_animals"  class="pk_animal_icon">
        <div v-for="(animal,index) in icon_animals" 
        @click="Animal_details_open(index)"
        :class="`pk_animal_default pk_animal_icon${index+1}`">
          <div v-show="!isHidden(index)" class="pk_animal_icon_dialog_content">
            <img class="pk_animal_icon_dialog" src="@/assets/images/park/pk_animal_icon_dialog_green.png" alt="園區動物hover的圖片">
            <div class="pk_animal_icon_dialog_content_text">
              <p class="pcMarkText">{{ animal.category_name }}</p>
              <p class="pcMarkText">{{ animal.animal_name }}</p>
            </div>
          </div>
          <img v-show="!isHidden(index)" :src="getAnimalIconUrl(animal.animal_icon)" alt="園區動物icon的圖片">
        </div>
      </div>

      <aside class="Sidebar pk_Sidebar" @mouseenter="hover = true" @mouseleave="hover = false">
        <img class="Sidebar_icon" src="@/assets/images/park/pk_Sidebar_icon_crab.svg" alt="螃蟹icon">

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

        <div class="Sidebar_guide" >   
          <img :class="[{ 'Sidebar_guide_rotate': hover }]" src="@/assets/images/park/pk_Sidebar_guide_icon.svg" alt="導引icon">
        </div>
      </aside>
    </section>

    <div class="parkmark">
        <img
          class="prevbtn" src="@/assets/images/home/home_banner_prevarrow.svg" alt="arrow"
        />
        <span class="pcMarkText">左右滑動</span>
        <img
          class="nextbtn" src="@/assets/images/home/home_banner_nextarrow.svg" alt="arrow"
        />
      </div>

    <section v-show="AnimalDetails" class="pk_Animal_details">
      <div class="pk_Animal_details_content_align">
        <h1>{{ selectedAnimal_location_name }}</h1>
        <div class="pk_Animal_details_closure_icon">
          <img @click="Animal_details_closure" class="pk_Animal_details_closure_icon" src="@/assets/images/park/pk_Animal_details_closure_icon.svg" alt="關閉按鈕">
        </div>
      </div>

      <div class="pk_Animal_details_img">
        <img :src="getAnimalPicUrl(selectedAnimal_pic)" alt="動物照片">

        <div class="pk_Animal_details_frame">
          <img src="@/assets/images/park/pk_Animal_details_frame.svg" alt="像素邊框">
        </div>
      </div>

      <div class="pk_Animal_details-text">
        <p class="pcInnerText">{{ selectedAnimal_species }}</p>
        <p class="pcInnerText">{{ selectedAnimal_name }}</p>
      </div>

      <button @click="link_animal_information" class="pk_button defaultBtn pcInnerText">
        查看詳細資料
        <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
      </button>

      
    </section>

    <section class="pk_content_bg">
      <section class="pk_Tickets">
        <div class="pk_Tickets_items">
          <RouterLink v-for="(ticket, index) in tickets" :key="index" to="/ticket" class="pk_Tickets_item"  @mouseenter="handleMouseEnter(index)" @mouseleave="handleMouseLeave(index)">
            <img class="pk_Tickets_item_top" :class="{ 'pk_Tickets_item_location': hoverStatus[index] }" :src="getItemTopUrl(index+1)" alt="門票上半部">
            <img class="pk_Tickets_item_mid" :class="{ 'pk_Tickets_item_hide': hoverStatus[index] }" :src="getItemMidUrl(index+1)" alt="中間的擋板">
            <div class="pk_Tickets_item_animal">
              <img :src="getItemAnimalUrl(index+1)" alt="中間的動物">
            </div>
            <img class="pk_Tickets_item_bottom" :src="getItemBottomUrl(index+1)" alt="門票下半部">
            <div class="pk_Tickets_item_text">
              <h1 class="pcSmTitle">{{ticket.tickets_name}}</h1>
              <p class="pcInnerText">{{ticket.tickets_rule}}</p>
              <p class="pcInnerText">NT$ {{ticket.tickets_price}}</p>
            </div>
          </RouterLink>
        </div>
      </section>

      <section class="pk_Origin">
        <img src="@/assets/images/park/pk_Origin_bg.png" alt="緣起背景圖">
        <div class="pk_Origin_text_bg">
          <p class="pcInnerText">PXZoO結合了樂高積木、像素風以及動物園這三大元素，我們將動物園的魅力與創意相結合，為您呈現一場獨一無二的動物冒險之旅。我們的目標是打造一個充滿樂趣、富有教育性的環境，讓來訪的每位訪客都能在玩樂中學習，同時擁有難忘的體驗。歡迎加入PXZoO大家庭，一同探索奇妙的動物王國，啟發心靈，創造美好時光。    </p>
        </div>
      </section>

      <section class="pk_information">
        <div class="pk_information_bulletin_board">
          <img src="@/assets/images/park/pk_information_bulletin_board.svg" alt="入園需知布告欄">
          <ul class="pcInnerText">
            進入園區需要注意以下幾點
            <li>1. 不觸摸動物、不投食物給動物、不攀爬圍欄</li>
            <li>2. 不要帶入寵物動物，因為這可能會對動物園的居住動物造成壓力或風險</li>
            <li>3. 請勿靠近動物園的籠舍或圍欄，並遵循指示牌</li>
            <li>4. 請不要騷擾動物，以確保它們在舒適的環境中生活</li>
            <li>5. 將垃圾投放到指定的垃圾桶中，以確保動物園的乾淨和衛生</li>
            <li>6. 若攜帶兒童參觀要特別注意，以確保不會受到危險</li>
            <li>7. 請遵守動物園的攝影規定不要使用閃光燈</li>
            <li>8. 在夏天參觀時要注意防曬及飲水</li>
            <li>9. 請注意園區的開放時間和閉館時間，以保護您的人身安全</li>
            <li>10. 觸摸過公共設施或動物互動區後，應洗手或使用消毒液，以預防疾病傳播。</li>
            <li>11. 大部分動物園內都是禁煙區域，請遵守相關規定以保護動物和其他遊客的健康。</li>
          </ul>
        </div>
        
        <div class="pk_information_Billboard">
          <img class="pk_information_img_Billboard" src="@/assets/images/park/pk_information_Billboard.svg" alt="告示牌">
          <img class="pk_information_img_monkey" src="@/assets/images/park/pk_information_img_monkey.svg" alt="像素猴子圖片">
          <img class="pk_information_img_orangutan" src="@/assets/images/park/pk_information_img_orangutan.svg" alt="像素猩猩圖片">
        </div>
      </section>

      <div class="pk_content_bg_tree">
        <img src="@/assets/images/park/pk_content_bg_tree.png" alt="造景樹">
      </div>

      <div class="pk_content_bg_cloud">
        <img v-for="num in 4" :class="`pk_content_bg_cloud_default pk_content_bg_cloud${num}`" src="@/assets/images/park/pk_content_bg_cloud1.svg" alt="背景雲">
        <img v-for="num in 2" :class="`pk_content_bg_cloud_default pk_content_bg_cloud${num+4}`" src="@/assets/images/park/pk_content_bg_cloud2.svg" alt="背景雲">
      </div>

      <div class="pk_content_bg_eagle">
        <img src="@/assets/images/park/pk_content_bg_eagle.png" alt="老鷹圖片">
      </div>

    </section>

    <aside class="pk_ph_Sidebar" @click="Mobile_filtering()" ref="Sidebar">
        <img class="pk_ph_Sidebar_icon" src="@/assets/images/park/pk_Sidebar_icon_crab.svg" alt="螃蟹icon">

        <ul class="pk_ph_Sidebar_filter_btns">
          <li class="pk_ph_filter_btn_item" @click="showAnimalsAndFacilities()">
            <img src="@/assets/images/park/pk_filter_icon_Overview.svg" alt="篩選icon">
            <p class="phSmTitle">園區總覽</p>
          </li>

          <li class="pk_ph_filter_btn_item" @click="showFacilities()">
            <img src="@/assets/images/park/pk_filter_icon_facility.svg" alt="篩選icon">
            <p class="phSmTitle">園區設施</p>
          </li>

          <li class="pk_ph_filter_btn_item" @click="showAnimals()">
            <img src="@/assets/images/park/pk_filter_icon_Vector.svg" alt="篩選icon">
            <p class="phSmTitle">動物分館</p>
          </li>
        </ul>

        <div class="pk_ph_Sidebar_guide" >   
          <img :class="[{ 'Sidebar_guide_rotate': hover }]" src="@/assets/images/park/pk_Sidebar_guide_icon.svg" alt="導引icon">
        </div>
    </aside>

  </section>
  <MainFixedVote/>
</template>

<script>
import MainFixedVote from '@/components/MainFixedVote.vue'
import axios from 'axios';

export default {
  
  components: {
    MainFixedVote,
  },
  data() {
    return {
      show_animals:true,
      show_facilities:true,
      hover : false,
      tickets:[],
      hoverStatus:{},
      icon_animals:[],
      AnimalDetails:false,
      hiddenIndexes : [],
      selectedAnimal_name: "",
      selectedAnimal_species: "",
      selectedAnimal_location_name: "",
      selectedAnimal_pic: "",
      selectedAnimal_router: "",
    };
  },
  created() {
    //複數串接php
    Promise.all([
      axios.get(`${import.meta.env.VITE_API_URL}/ticketsShow.php`),
      axios.get(`${import.meta.env.VITE_API_URL}/parkMapIcon.php`)
    ])
    .then(([response1, response2]) => {
      this.tickets = response1.data;
      this.icon_animals = response2.data;
      this.fillHiddenIndexes(); 
    })
    .catch(error => {
      console.error("Error fetching data: ", error);
    });
  },
  mounted() {
    
  },
  methods: {
    getAnimalIconUrl(paths){
      return new URL(`${import.meta.env.VITE_IMAGES_BASE_URL}/animal/animal_icon/${paths}`,import.meta.url).href;
    },
    getAnimalPicUrl(paths){
      return new URL(`${import.meta.env.VITE_IMAGES_BASE_URL}/animal/small_pic/${paths}`,import.meta.url).href;
    },
    getItemTopUrl(paths){
      return new URL(`../assets/images/park/pk_Tickets_item_top${paths}.png`, import.meta.url).href
    },
    getItemMidUrl(paths){
      return new URL(`../assets/images/park/pk_Tickets_item_mid${paths}.png`, import.meta.url).href
    },
    getItemAnimalUrl(paths){
      return new URL(`../assets/images/park/pk_Tickets_item_animal${paths}.png`, import.meta.url).href
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
    },
    handleMouseEnter(index) {
      this.hoverStatus[index] = true;
    },
    handleMouseLeave(index) {
      this.hoverStatus[index] = false;
    },
    isHidden(index) {
      return this.hiddenIndexes.includes(index);
    },
    fillHiddenIndexes() {
    this.hiddenIndexes = this.icon_animals
      .map((animal, index) => animal.animal_name === null ? index : null)
      .filter(index => index !== null);
    },
    Animal_details_closure(){
      this.AnimalDetails = false
    },
    Animal_details_open(index){
      this.selectedAnimal_name = this.icon_animals[index].animal_name;
      this.selectedAnimal_species = this.icon_animals[index].animal_species;
      this.selectedAnimal_location_name = this.icon_animals[index].category_name;
      this.selectedAnimal_pic = this.icon_animals[index].animal_small_pic;
      console.log(this.selectedAnimal_pic);
      this.selectedAnimal_router = index+1;
      this.AnimalDetails = true;
    },
    link_animal_information(){
      this.$router.push({ name: 'animalDetail', params: { id: this.selectedAnimal_router } });
    }, 
    Mobile_filtering() {
      this.hover = !this.hover; 
      this.$refs.Sidebar.style.left = this.hover ? '0' : '-29%';
    },
  },
};
</script>
