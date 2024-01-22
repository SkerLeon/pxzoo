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
        <img src="@/assets/images/park/pk_Origin_bg.png" alt="緣起背景圖">
        <div class="pk_Origin_text_bg">
          <p class="pcInnerText">PXZoO結合了樂高積木、像素風以及動物園這三大元素，我們將動物園的魅力與創意相結合，為您呈現一場獨一無二的動物冒險之旅。我們的目標是打造一個充滿樂趣、富有教育性的環境，讓來訪的每位訪客都能在玩樂中學習，同時擁有難忘的體驗。歡迎加入PXZoO大家庭，一同探索奇妙的動物王國，啟發心靈，創造美好時光。    </p>
        </div>
      </section>

      <section class="pk_information">
        <div class="pk_information_bulletin_board">
          <img src="@/assets/images/park/pk_information_bulletin_board.png" alt="入園需知布告欄">
          <p class="pcInnerText">進入園區需要注意以下幾點<br>
            <!-- 以下建議用li排，SEO較好 -->
          1. 不觸摸動物、不投食物給動物、不攀爬圍欄<br>
          2. 不要帶入寵物動物，因為這可能會對動物園的居住動物造成壓力或風險<br>
          3. 請勿靠近動物園的籠舍或圍欄，並遵循指示牌<br>
          4. 請不要騷擾動物，以確保它們在舒適的環境中生活<br>
          5. 將垃圾投放到指定的垃圾桶中，以確保動物園的乾淨和衛生<br>
          6. 若攜帶兒童參觀要特別注意，以確保不會受到危險<br>
          7. 請遵守動物園的攝影規定不要使用閃光燈<br>
          8. 在夏天參觀時要注意防曬及飲水<br>
          9. 請注意園區的開放時間和閉館時間，以保護您的人身安全<br>
          10. 觸摸過公共設施或動物互動區後，應洗手或使用消毒液，以預防疾病傳播。<br>
          11. 大部分動物園內都是禁煙區域，請遵守相關規定以保護動物和其他遊客的健康。
          </p>
        </div>

        <div class="pk_information_img_Billboard">
          <img class="pk_information_img_Billboard" src="@/assets/images/park/pk_information_Billboard.png" alt="告示牌">
        </div>
      </section>

      <div class="pk_content_bg_tree">
        <img src="@/assets/images/park/pk_content_bg_tree.png" alt="造景樹">
      </div>

      <div class="pk_content_bg_cloud">
        <img v-for="num in 4" :class="`pk_content_bg_cloud_default pk_content_bg_cloud${num}`" src="@/assets/images/park/pk_content_bg_cloud1.png" alt="背景雲">
        <img v-for="num in 2" :class="`pk_content_bg_cloud_default pk_content_bg_cloud${num+4}`" src="@/assets/images/park/pk_content_bg_cloud2.png" alt="背景雲">
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
