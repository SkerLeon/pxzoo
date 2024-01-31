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
        @click="Animal_details_open"
        :class="`pk_animal_default pk_animal_icon${index+1}`">
          <div v-show="!isHidden(index)" class="pk_animal_icon_dialog_content">
            <img class="pk_animal_icon_dialog" src="@/assets/images/park/pk_animal_icon_dialog_green.png" alt="園區動物hover的圖片">
            <div class="pk_animal_icon_dialog_content_text">
              <p class="pcMarkText">{{ animal.Library }}</p>
              <p class="pcMarkText">{{ animal.name }}</p>
            </div>
          </div>
          <img v-show="!isHidden(index)" :src="getAnimalIconUrl(animal.icon)" alt="園區動物icon的圖片">
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

      <div class="home_qkpage_park">
        <div class="parkmark">
          <img
            class="prevbtn"
            src="@/assets/images/home/home_banner_prevarrow.svg"
            alt="arrow"
          />
          <span class="pcMarkText">左右滑動</span>
          <img
            class="nextbtn"
            src="@/assets/images/home/home_banner_nextarrow.svg"
            alt="arrow"
          />
        </div>
        <div class="parkgroup">
          <parkmap />
        </div>

        <!-- <img src="@/assets/images/home/home_map.jpg" alt="map"> -->
      </div>
    </section>

    <section v-show="AnimalDetails" class="pk_Animal_details">
      <div class="pk_Animal_details_content_align">
        <h1>草原之聲</h1>
        <div class="pk_Animal_details_closure_icon">
          <img @click="Animal_details_closure" class="pk_Animal_details_closure_icon" src="@/assets/images/park/pk_Animal_details_closure_icon.svg" alt="關閉按鈕">
        </div>
      </div>

      <div class="pk_Animal_details_img">
        <img src="@/assets/images/animal/small_pic/small_pic_lion.png" alt="動物照片">

        <div class="pk_Animal_details_frame">
          <img src="@/assets/images/park/pk_Animal_details_frame.svg" alt="像素邊框">
        </div>
      </div>

      <div class="pk_Animal_details-text">
        <p class="pcInnerText">獅子</p>
        <p class="pcInnerText">威廉</p>
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

export default {
  
  components: {
    MainFixedVote,
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
      hoverStatus:{},
      icon_animals:[{
        Library:"草原之聲",
        name:"曼陀",
        icon:"animal_icon_zebra"
      },{
        Library:"草原之聲",
        name:"蘇菲",
        icon:"animal_icon_giraffe",
      },{
        Library:"草原之聲",
        name:"空位置",
        icon:"animal_icon_default",
      },{
        Library:"草原之聲",
        name:"斑斑",
        icon:"animal_icon_cheetah",
      },{
        Library:"草原之聲",
        name:"空位置",
        icon:"animal_icon_default",
      },{
        Library:"草原之聲",
        name:"威廉",
        icon:"animal_icon_lion",
      },{
        Library:"草原之聲",
        name:"索拉",
        icon:"animal_icon_elephant",
      },{
        Library:"草原之聲",
        name:"馬克",
        icon:"animal_icon_meerkat",
      },{
        Library:"極地秘境",
        name:"亞當",
        icon:"animal_icon_magellanicPenguin",
      },{
        Library:"極地秘境",
        name:"空位置",
        icon:"animal_icon_default",
      },{
        Library:"極地秘境",
        name:"空位置",
        icon:"animal_icon_default",
      },{
        Library:"極地秘境",
        name:"寶拉",
        icon:"animal_icon_polarBear",
      },{
        Library:"極地秘境",
        name:"小雪",
        icon:"animal_icon_kingPenguin",
      },{
        Library:"極地秘境",
        name:"空位置",
        icon:"animal_icon_default",
      },{
        Library:"極地秘境",
        name:"雪球",
        icon:"animal_icon_arcticFox",
      },{
        Library:"極地秘境",
        name:"波比",
        icon:"animal_icon_seal",
      },{
        Library:"鳥園樂章",
        name:"小瑜",
        icon:"animal_icon_pelican",
      },{
        Library:"鳥園樂章",
        name:"曉曉",
        icon:"animal_icon_flamingo",
      },{
        Library:"鳥園樂章",
        name:"阿翔",
        icon:"animal_icon_peacock",
      },{
        Library:"鳥園樂章",
        name:"艾妮",
        icon:"animal_icon_owl",
      },{
        Library:"鳥園樂章",
        name:"晴空",
        icon:"animal_icon_japaneseCrane",
      },{
        Library:"鳥園樂章",
        name:"嘟嘟",
        icon:"animal_icon_toucan",
      },{
        Library:"鳥園樂章",
        name:"空位置",
        icon:"animal_icon_default",
      },{
        Library:"海洋奇觀",
        name:"海妞",
        icon:"animal_icon_shark",
      },{
        Library:"海洋奇觀",
        name:"空位置",
        icon:"animal_icon_default",
      },{
        Library:"海洋奇觀",
        name:"巴奇",
        icon:"animal_icon_octopus",
      },{
        Library:"海洋奇觀",
        name:"空位置",
        icon:"animal_icon_default",
      },{
        Library:"海洋奇觀",
        name:"馬林",
        icon:"animal_icon_clownFish",
      },{
        Library:"海洋奇觀",
        name:"藍波",
        icon:"animal_icon_stingray",
      },{
        Library:"海洋奇觀",
        name:"燈燈",
        icon:"animal_icon_eel",
      },{
        Library:"叢林奇蹟",
        name:"空位置",
        icon:"animal_icon_default",
      },{
        Library:"叢林奇蹟",
        name:"空位置",
        icon:"animal_icon_default",
      },{
        Library:"叢林奇蹟",
        name:"栗栗",
        icon:"animal_icon_malayanTapir",
      },{
        Library:"叢林奇蹟",
        name:"珍珍",
        icon:"animal_icon_capybara",
      },{
        Library:"叢林奇蹟",
        name:"中中",
        icon:"animal_icon_monkey",
      },{
        Library:"叢林奇蹟",
        name:"曼曼",
        icon:"animal_icon_sloth",
      },{
        Library:"叢林奇蹟",
        name:"瑪雅",
        icon:"animal_icon_tiger",
      },{
        Library:"叢林奇蹟",
        name:"狄恩",
        icon:"animal_icon_orangutan",
      }],
      AnimalDetails:false,
    };
  },
  created() {
    // 生命週期鉤子
  },
  mounted() {
    
  },
  methods: {
    getAnimalIconUrl(paths){
      return new URL(`../assets/images/animal/animal_icon/${paths}.png`, import.meta.url).href
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
      const hiddenIndexes = [3, 5, 10, 11, 14, 23, 25, 27, 32, 31];
      return hiddenIndexes.includes(index + 1);
    },
    Animal_details_closure(){
      this.AnimalDetails = false
    },
    Animal_details_open(){
      this.AnimalDetails = true
    },
    link_animal_information(){
      this.$router.push('/animalDetail');
    }, 
    Mobile_filtering() {
      this.hover = !this.hover; 
      this.$refs.Sidebar.style.left = this.hover ? '0' : '-29%';
    },
  },
};
</script>
