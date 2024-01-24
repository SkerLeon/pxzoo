<template>
  <section class="forHeader pk_content">
    <section class="pk_map">
      <img class="pk_map_bg" src="@/assets/images/park/pk_map_bg.png" alt="園區地圖">

      <div v-show="show_facilities" class="pk_Store_icon">
        <div v-for="num in 2" :class="`pk_Store_default pk_Store_icon_VC${num}`">
          <img src="@/assets/images/park/pk_Store_icon1.svg" alt="遊客中心icon">
        </div>

        <div v-for="num in 5" :class="`pk_Store_default pk_Store_icon_WC${num}`">
          <img src="@/assets/images/park/pk_Store_icon2.svg" alt="餐廳icon">
        </div>

        <div v-for="num in 5" :class="`pk_Store_default pk_Store_icon_RC${num}`">
          <img src="@/assets/images/park/pk_Store_icon3.svg" alt="廁所icon">
        </div>
      </div>
      
      <div v-show="show_animals" class="pk_animal_icon">
        <div v-for="num in 38" :class="`pk_animal_default pk_animal_icon${num}`" :id="`location_id${num}`">
          <img :src="getAnimalIconUrl(num)" alt="園區動物icon的圖片">
        </div>
      </div>

      <aside class="Sidebar" @mouseenter="hover = true" @mouseleave="hover = false">
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
              <h1 class="pcSmTitle">{{ticket.title}}</h1>
              <p class="pcInnerText">{{ticket.rule}}</p>
              <p class="pcInnerText">NT$ {{ticket.price}}</p>
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
        <img src="@/assets/images/park/pk_content_bg_eagle.svg" alt="老鷹圖片">
      </div>

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
        rule:"18~64歲",
        price:"100",
      },{
        title:"學生票",
        rule:"12歲以上持學生證者",
        price:"80",
      },{
        title:"團體票",
        rule:"15人以上適用",
        price:"60",
      },
      {
        title:"兒童票",
        rule:"4~11歲",
        price:"40",
      },{
        title:"愛心票",
        rule:"65歲以上",
        price:"40",
      }],
      hoverStatus:{}
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
    }
  },
};
</script>
