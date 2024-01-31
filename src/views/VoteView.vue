<template>
  <!-- 上個月投票結果 -->
  <section class="vote_top forHeader">
    <div class="banner">
      <!-- 月份看資料庫設計，如果要做到月份統計這邊要寫動態的 -->
      <h1 class="title pcBigTitle">
        12月動物人氣投票冠軍揭曉！<br />前三名登場！
      </h1>
      <div class="podium_no">

        <div v-for="podium in podium_list" :class="podium.class">
          <img class="vote_img" :src="getImageUrl(podium.animal_img)" alt="Animal" />
          <div class="vote_name pcDecSmTitle">{{ podium.name }}</div>
          <div class="podium_box">
            <img class="NO" :src="getNoUrl(podium.NO)" alt="NO" />
          </div>
          <div class="score pcSmTitle">{{ podium.score }}</div>
        </div>
      </div>
      <!-- <div class="podium1">
          <img class="vote_img" src="@/assets/images/animal/small_pic/small_pic_elephant.png" alt="sheep" />
          <div class="vote_name pcDecSmTitle">艾迪</div>
          <div class="podium_box">
            <img class="NO" src="@/assets/images/vote/NO1.svg" alt="NO1" />
            <div class="score pcDecSmTitle">205</div>
          </div>
        </div> -->
      <!-- </div> -->
      <img class="tree_bg" src="@/assets/images/vote/tree.svg" alt="tree_bg" />
 
      <img class="sheep" src="@/assets/images/vetor/vetor_animal_sheep.svg" alt="sheep" />
       <img class="balloon" src="@/assets/images/vote/balloon.svg" alt="balloon" />
    </div>
  </section>
  <!-- 投票規則 -->
  <section class="vote_activity">

    <div class="vote_activity_wrap">
      <h1 class="pcBigTitle">探索動物奇蹟<br />2024年1月動物園之星投票大賽！</h1>
      <p class="pcInnerText">
        大象以其智慧和巨大的魅力蟬聯人氣王！長頸鹿優雅的身姿總是令人難以忘懷。而獅子勇猛的王者氣質讓人讚嘆。這些動物都擁有獨特的故事和魅力，誰將在本月成為動物園之星？你最喜歡哪一種動物？快來投票選你最愛的動物！
      </p>
      <div class="vote_rule">
        <div class="time pcInnerText newsFrame">
          <img src="../assets/images/news/newsFrame/orangeFrame.svg" alt="orangeFrame" class="newsFramePic" />
          <div class=" newsFrameText pcInnerText">投票時間</div>
        </div>
        <p class="time_text pcInnerText">
          即日起~<span>1</span>月<span>31</span>日<span>23:59</span>截止
        </p>
      </div>
      <div class="vote_rule">
        <div class="time pcInnerText newsFrame">
          <img src="../assets/images/news/newsFrame/orangeFrame.svg" alt="orangeFrame" class="newsFramePic" />
          <div class="newsFrameText pcInnerText">投票方式</div>
        </div>
        <p class="time_text pcInnerText">
          參與投票非常簡單！只需登入你的會員帳號，每天可投三票，不限館別。前往我們的動物園官網，點擊你最喜歡的動物，為它投上珍貴的一票。記得，每個參與者每天可投三票，所以請謹慎選擇，支持你心愛的動物。
        </p>
      </div>
    </div>
    <div class="cloud_6">
      <img src="@/assets/images/vote/clouda_6.svg" alt="雲" />
    </div>
    <div class="cloud_2">
      <img src="@/assets/images/vote/clouda_2.svg" alt="雲" />
    </div>
    <div class="squirrel_2">
      <img src="@/assets/images/vote/squirrel_2.svg" alt="松鼠" />
    </div>
    <div class="conversation-vote-text pcSmTitle " @click="scrollToVoteList">快來投票</div>
    <div class="AnimalSquirrel"></div>
  </section>
  <!-- 人氣投票TOP3 -->

  <section class="vote_popular">
    <div class="title pcInnerText">
      <h1>目前人氣<span>TOP3</span></h1>
    </div>

    <div v-for="(ranking, index) in ranking_list" :key="index" class="ranking"  data-aos="zoom-in-up">
      <div class="content" >
        <div class="number pcDecBigTitle">{{ ranking.number }}</div>
        <div class="img"> <img :src="getImageUrl(ranking.animal_img)" alt="Animal" /></div>

        <div class="name pcSmTitle">{{ ranking.name }}</div>
        <div class="votes phSmTitle">{{ ranking.point }}票</div>
        <button class="phInnerText defaultBtn" @click="voteTop3(ranking)"> <img
            src="@/assets/images/login/icon/btnArrow.svg" alt="" />
          立即投票

        </button>
      </div>
    </div>
    <!-- 蟲在平板大小會蓋到，讓他移動XD -->
    <div class="caterpillar">
      <img src="@/assets/images/vetor/vetor_animal_caterpillar.svg" alt="蟲" />
    </div>

  </section>

  <!-- 投票列表 -->

  <section class="vote_overview_all">
    <div class="vote_overview_content">
      <div class="vote_button">
        <button @click="showContent('vote_grass')" @mouseover="setHoverState('vote_grass')"
          class="animals_grass pcInnerText" :class="{ hovered: currentContent === 'vote_grass' }">
          草原之聲

        </button>


        <button @click="showContent('vote_polar')" @mouseover="setHoverState('vote_polar')"
          class="animals_polar pcInnerText" :class="{ hovered: currentContent === 'vote_polar' }">
          極地秘境
        </button>
        <button @click="showContent('vote_jungle')" @mouseover="setHoverState('vote_jungle')"
          class="animals_jungle pcInnerText" :class="{ hovered: currentContent === 'vote_jungle' }">
          叢林奇蹟
        </button>
        <button @click="showContent('vote_birds')" @mouseover="setHoverState('vote_birds')"
          class="animals_birds pcInnerText" :class="{ hovered: currentContent === 'vote_birds' }">
          鳥園樂章
        </button>
        <button @click="showContent('vote_aqua')" @mouseover="setHoverState('vote_aqua')" class="animals_aqua pcInnerText"
          :class="{ hovered: currentContent === 'vote_aqua' }">
          海洋奇觀
        </button>
      </div>

      <div class="vote_wrap">
        <div v-for="(voteItem, index) in currentVoteList" :key="index" class="vote_item">
         
          <div class="vote_card">
            <router-link :to="'/animalDetail/' ">
            <div class="vote_wrap_animal">
              <img :src="getImageUrl(voteItem.animal_img)" alt="Animal" />
              <div class="vote_wrap_animal_txt pcInnerText">
                前往動物詳細資訊
              </div>
            </div>
          </router-link>
            <div class="vote_name pcSmTitle">{{ voteItem.name }}</div>
            <div class="vote_icon pcInnerText">
              <img src="@/assets/images/vote/star.svg" alt="" />{{
                voteItem.point
              }}票
            </div>
            <button @click="vote_animal(voteItem)" class="pcInnerText defaultBtn">
              <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
              立即投票
            </button>
          </div>
        </div>
      </div>
      <div class="elephant1">
        <img src="@/assets/images/vetor/vetor_animal_elephant_1.svg" alt="大象" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {

      votedCount: 0,
      currentContent: "vote_grass",

      podium_list: [
        {
          name: "琳達",
          // medal: "第二名獎牌",
          score: 197,
          animal_img: 'giraffe',
          NO: '2',
          class: 'podium2'
        },
        {
          name: "艾迪",
          // medal: "第一名獎牌",
          animal_img: 'elephant',
          score: 205,
          NO: '1',
          class: 'podium1'
        },
        {
          name: "阿斯蘭",
          // medal: "第三名獎牌",
          animal_img: 'lion',
          score: 146,
          NO: '3',
          class: 'podium3'
        },
      ],
      ranking_list: [
        {
          number: 1,
          name: "威廉",
          point: 300,
          animal_img: "lion",
        },
        {
          number: 2,
          name: "琳達",
          point: 250,
          animal_img: "giraffe",
        },
        {
          number: 3,
          name: "馬克",
          point: 200,
          animal_img: "meerkat",
        },
      ],

      vote_grass_list: [
        { animal_img: "lion", name: "威廉", point: "10" },
        { animal_img: "giraffe", name: "琳達", point: "23" },
        { animal_img: "elephant", name: "索拉", point: "12" },
        { animal_img: "cheetah", name: "豹哥", point: "123" },
        { animal_img: "zebra", name: "小班", point: "263" },
        { animal_img: "meerkat", name: "馬克", point: "237" },
      ],

      vote_polar_list: [
        { animal_img: "polarBear", name: "寶拉", point: "1223" },
        { animal_img: "kingPenguin", name: "小雪", point: "13" },
        { animal_img: "magellanicPenguin", name: "亞當", point: "1423" },
        { animal_img: "arcticFox", name: "雪球", point: "13" },
        { animal_img: "seal", name: "波比", point: "113" },
      ],

      vote_jungle_list: [
        { animal_img: "capybara", name: "珍珍", point: "120" },
        { animal_img: "malayanTapir", name: "栗栗", point: "178" },
        { animal_img: "orangutan", name: "狄恩", point: "124" },
        { animal_img: "tiger", name: "瑪雅", point: "423" },
        { animal_img: "sloth", name: "曼曼", point: "43" },
        { animal_img: "monkey", name: "中中", point: "123" },
      ],

      vote_birds_list: [
        { animal_img: "flamingo", name: "阿翔", point: "13" },
        { animal_img: "japaneseCrane", name: "曉曉", point: "23" },
        { animal_img: "owl", name: "晴空", point: "32" },
        { animal_img: "eagle", name: "艾妮", point: "98" },
        { animal_img: "toucan", name: "嘟嘟", point: "100" },
        { animal_img: "pelican", name: "小瑜", point: "78" },
      ],

      vote_aqua_list: [
        { animal_img: "stingray", name: "藍波", point: "95" },
        { animal_img: "shark", name: "海妞", point: "456" },
        { animal_img: "eel", name: "燈燈", point: "37" },
        { animal_img: "clownfish", name: "馬林", point: "1" },
        { animal_img: "octopus", name: "巴奇", point: "0" },
      ],
    };
  },
  methods: {
    scrollToVoteList() {
      const voteListElement = document.querySelector('.vote_overview_all');
      voteListElement.scrollIntoView({ behavior: 'smooth' });
    },

    getImageUrl(img) {
      return new URL(
        `../assets/images/animal/small_pic/small_pic_${img}.png`,
        import.meta.url
      ).href;
    },

    getNoUrl(NO) {
      return new URL(
        `../assets/images/vote/NO${NO}.svg`,
        import.meta.url
      ).href;
    },

    voteTop3(animal) {
      // 檢查用戶是否已經投過三票
      if (this.votedCount >= 3) {
        console.log("你今天已經投過三票了！");
        // 在界面上顯示訊息
        alert("今天已經投過三票了！");

        return; // 如果已經投過三票，退出方法
      }

      // 在 ranking_list 中找到被選中動物的索引
      const index = this.ranking_list.findIndex(item => item.name === animal.name);
      // 如果找到該動物
      if (index !== -1) {
        // 增加票數
        this.ranking_list[index].point++;
        // 更新已經投票的次數
        this.votedCount++;
        console.log("投票成功！");
      } else {
        console.error("未找到該動物！");
      }
    },
    vote_animal(animal2) {
      // 檢查用戶是否已經投過三票
      if (this.votedCount >= 3) {
        console.log("今天已經投過三票！");
        // 在界面上顯示訊息
        alert("你今天已經投過三票！");

        return; // 如果已經投過三票，退出方法
      }

      // 在 currentVoteList 中找到被選中動物的索引
      const index = this.currentVoteList.findIndex(item => item.name === animal2.name);
      // 如果找到該動物
      if (index !== -1) {
        // 增加票數
        this.currentVoteList[index].point++;
        // 更新已經投票的次數
        this.votedCount++;
        console.log("投票成功！");
      } else {
        console.error("未找到該動物！");
      }
    },

    showContent(content) {
      this.currentContent = content;
    },

    setHoverState(content) {
      // 如果只是要變樣式，沒有要做其他js程序，不要用vue用css就好了
      this.currentContent = content;
    },

  },

  mounted() {
    // // 在mounted鉤子中綁定滾動到投票列表的函數
    // this.scrollToVoteList();
  },
  computed: {
    currentVoteList() {
      // 除非資料庫存五張類型動物的tabla，可以這樣寫
      // 如果是同一張table記得要用filter類型，不然之後會寫不出來
      switch (this.currentContent) {
        case "vote_grass":
          return this.vote_grass_list;
        case "vote_jungle":
          return this.vote_jungle_list;
        case "vote_polar":
          return this.vote_polar_list;
        case "vote_birds":
          return this.vote_birds_list;
        case "vote_aqua":
          return this.vote_aqua_list;
        // Add conditions for other content sections if needed
        default:
          return [];
      }
    },
  },
};
</script>
