<template >
  <!-- 上個月投票結果 -->
  <section class="vote_top forHeader">
    <div class="banner">
      <!-- 月份看資料庫設計，如果要做到月份統計這邊要寫動態的 -->
      <h1 class="title pcBigTitle">12月動物人氣投票冠軍揭曉！<br />前三名登場！</h1>
      <div class="podium_no">
        <div v-for="podium in podium_list" class="podium">

          <img :src="getImageUrl(podium.animal_img)" alt="Animal">
          <h2>{{ podium.name }}</h2>
          <div class="podium_box">
            <h2>{{ podium.score }}</h2>
          </div>

        </div>
      </div>
      <img class="sheep" src="@/assets/images/vetor/vetor_animal_sheep.svg" alt="sheep" />
    </div>

  </section>
  <!-- 投票規則 -->
  <section class="vote_activity">
    <h1 class="pcBigTitle">
      探索動物奇蹟<br />2024年1月動物園之星投票大賽！
    </h1>
    <p class="pcInnerText">
      大象以其智慧和巨大的魅力蟬聯人氣王！長頸鹿優雅的身姿總是令人難以忘懷。而獅子勇猛的王者氣質讓人讚嘆。這些動物都擁有獨特的故事和魅力，誰將在本月成為動物園之星？你最喜歡哪一種動物？快來投票選你最愛的動物！
    </p>
    <div class="vote_rule pcInnerText">
      <div class="time ">投票時間</div>
      <img src="" alt="">
      <p class="pcInnerText">即日起~<span>1</span>月<span>31</span>日<span>23:59</span>截止</p>
    </div>
    <div class="vote_rule pcInnerText">
      <div class="time">投票方式</div>
      <img src="" alt="">
      <p class="pcInnerText">
        參與投票非常簡單！只需登入你的會員帳號，每天可投三票，不限館別。前往我們的動物園官網，點擊你最喜歡的動物，為它投上珍貴的一票。記得，每個參與者每天可投三票，所以請謹慎選擇，支持你心愛的動物。
      </p>
    </div>
    <div class="cloud_6"><img src="@/assets/images/vote/clouda_6.svg" alt="雲" /></div>
    <div class="cloud_2"><img src="@/assets/images/vote/clouda_2.svg" alt="雲" /></div>
    <div class="squirrel_2"><img src="@/assets/images/vote/squirrel_2.svg" alt="松鼠" /></div>
    <div class="AnimalSquirrel"></div>
  </section>
  <!-- 人氣投票TOP3 -->

  <section class="vote_popular">

    <div class="title  phDecInnerText">
      <h1>目前人氣<span>TOP3</span></h1>
    </div>


    <div v-for="(ranking, index ) in ranking_list" :key="index" class="ranking">

      <div class="content">
        <div class="number pcDecBigTitle">{{ ranking.number }}</div>
        <img :src="getImageUrl(ranking.animal_img)" alt="Animal">
        <div class="name pcSmTitle">{{ ranking.name }}</div>
        <div class="votes phSmTitle">{{ ranking.point }}票</div>
        <button class="phInnerText defaultBtn" @click="voteTop3(ranking)">立即投票<img src="@/assets/images/login/icon/btnArrow.svg" alt="" /></button>
      </div>
    </div>
    <!-- 蟲在平板大小會蓋到，讓他移動XD -->
    <div class="caterpillar"><img src="@/assets/images/vetor/vetor_animal_caterpillar.svg" alt="蟲" /></div>
  </section>

  <!-- 投票列表 -->

  <section class="vote_overview_all">
    <div class="vote_button">
      <button @click="showContent('vote_grass')" @mouseover="setHoverState('vote_grass')"
        class="animals_grass pcInnerText" :class="{ 'hovered': currentContent === 'vote_grass' }">草原之聲</button>
      <button @click="showContent('vote_polar')" @mouseover="setHoverState('vote_polar')"
        class="animals_polar pcInnerText" :class="{ 'hovered': currentContent === 'vote_polar' }">極地秘境</button>
      <button @click="showContent('vote_jungle')" @mouseover="setHoverState('vote_jungle')"
        class="animals_jungle pcInnerText" :class="{ 'hovered': currentContent === 'vote_jungle' }">叢林奇蹟</button>
      <button @click="showContent('vote_birds')" @mouseover="setHoverState('vote_birds')"
        class="animals_birds pcInnerText" :class="{ 'hovered': currentContent === 'vote_birds' }">鳥園樂章</button>
      <button @click="showContent('vote_aqua')" @mouseover="setHoverState('vote_aqua')" class="animals_aqua pcInnerText"
        :class="{ 'hovered': currentContent === 'vote_aqua' }">海洋奇觀</button>
    </div>

    <div class="vote_wrap">
      <div v-for="(voteItem, index) in currentVoteList" :key="index" class="vote_item">
        <div class="vote_card">
          <img :src="getImageUrl(voteItem.animal_img)" alt="Animal">
          <div class="vote_name pcSmTitle">{{ voteItem.name }}</div>
          <div class="vote_icon pcInnerText"><img src="@/assets/images/vote/star.svg" alt="">{{ voteItem.point }}票</div>
          <button class="phInnerText defaultBtn">立即投票
            <!-- <img src="@/assets/images/login/icon/btnArrow.svg" alt="" /> -->
          </button>
        </div>
      </div>
    </div>
    <div class="elephant1">
      <img src="@/assets/images/vetor/vetor_animal_elephant_1.svg" alt="大象" />
    </div>
  </section>
</template>


<script>

export default {
  data() {
    return {
      currentContent: 'vote_grass',

      podium_list: [
        {
          name: "琳達",
          // medal: "第二名獎牌",
          score: 197,
          animal_img: 'giraffe',

        },
        {
          name: "艾迪",
          // medal: "第一名獎牌",
          animal_img: 'elephant',
          score: 205,
        },
        {
          name: "阿斯蘭",
          // medal: "第三名獎牌",
          animal_img: 'lion',
          score: 146,
        },
      ],
      ranking_list: [
        {
          number: 1,
          name: "威廉",
          point: 300,
          animal_img: 'lion',
        },
        {
          number: 2,
          name: "琳達",
          point: 250,
          animal_img: 'giraffe',
        },
        {
          number: 3,
          name: "馬克",
          point: 200,
          animal_img: 'meerkat',
        },
      ],

      vote_grass_list: [

        { animal_img: 'lion', name: '獅子', point: '10' },
        { animal_img: 'giraffe', name: '長頸鹿', point: '23' },
        { animal_img: 'elephant', name: '非洲象', point: '12' },
        { animal_img: 'cheetah', name: '獵豹', point: '123' },
        { animal_img: 'zebra', name: '斑馬', point: '263' },
        { animal_img: 'meerkat', name: '狐獴', point: '237' },],

      vote_polar_list: [
        { animal_img: 'polarBear', name: '北極熊', point: '1223' },
        { animal_img: 'kingPenguin', name: '國王企鵝', point: '13' },
        { animal_img: 'magellanicPenguin', name: '麥哲倫企鵝', point: '1423' },
        { animal_img: 'arcticFox', name: '北極狐', point: '13' },
        { animal_img: 'seal', name: '海豹', point: '113' },],

      vote_jungle_list: [
        { animal_img: 'capybara', name: '水豚', point: '120' },
        { animal_img: 'malayanTapir', name: '馬來貘', point: '178' },
        { animal_img: 'orangutan', name: '紅毛猩猩', point: '124' },
        { animal_img: 'tiger', name: '孟加拉虎', point: '423' },
        { animal_img: 'sloth', name: '二趾樹懶', point: '43' },
        { animal_img: 'monkey', name: '台灣獼猴', point: '123' },],

      vote_birds_list: [
        { animal_img: 'peacock', name: '孔雀', point: '235' },
        { animal_img: 'flamingo', name: '紅鶴', point: '13' },
        { animal_img: 'japaneseCrane', name: '丹頂鶴', point: '23' },
        { animal_img: 'owl', name: '貓頭鷹', point: '32' },
        { animal_img: 'eagle', name: '老鷹', point: '98' },
        { animal_img: 'toucan', name: '巨嘴鳥', point: '100' },
        { animal_img: 'pelican', name: '鵜鶘', point: '78' },],

      vote_aqua_list: [
        { animal_img: 'stingray', name: '魟魚', point: '95' },
        { animal_img: 'shark', name: '鯊魚', point: '456' },
        { animal_img: 'eel', name: '海鰻', point: '37' },
        { animal_img: 'clownfish', name: '小丑魚', point: '1' },
        { animal_img: 'octopus', name: '章魚', point: '0' },
      ],





    }
  },
  methods: {
    getImageUrl(img) {
      return new URL(`../assets/images/animal/small_pic/small_pic_${img}.png`, import.meta.url).href
    },

    voteTop3(animal) {
      console.log(animal);
    },

    showContent(content) {
      this.currentContent = content;
    },

    setHoverState(content) {                           
      // 如果只是要變樣式，沒有要做其他js程序，不要用vue用css就好了
      this.currentContent = content;
    }
  },
  created() {
  },
  computed: {
    currentVoteList() {
      // 除非資料庫存五張類型動物的tabla，可以這樣寫
      // 如果是同一張table記得要用filter類型，不然之後會寫不出來
      switch (this.currentContent) {
        case 'vote_grass':
          return this.vote_grass_list;
        case 'vote_jungle':
          return this.vote_jungle_list;
        case 'vote_polar':
          return this.vote_polar_list;
        case 'vote_birds':
          return this.vote_birds_list;
        case 'vote_aqua':
          return this.vote_aqua_list;
        // Add conditions for other content sections if needed
        default:
          return [];
      }
    }
  },
}


</script>
