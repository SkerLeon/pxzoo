<template>
  <!-- 上個月投票結果 -->
  <section class="vote_top forHeader">
    <div class="banner">
      <!-- 月份看資料庫設計，如果要做到月份統計這邊要寫動態的 -->
      <h1 class="title pcBigTitle">
        12月動物人氣投票冠軍揭曉！<br />前三名登場！
      </h1>
      <div  v-for="podium in podium_list"  class="podium_no">

        <div  :class="podium.class">
          <img class="vote_img" :src="getImageUrl(podium.animal_pic_a)" alt="Animal" />
          <div class="vote_name pcDecSmTitle">{{ podium.animal_name }}</div>
          <div class="podium_box">
            <img  class="NO" :src="getNoUrl(podium.NO)" alt="NO" />
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
        </div> 
      </div> -->
      <img class="tree_bg" src="@/assets/images/vote/tree.svg" alt="tree_bg" />
 
      <img class="sheep" src="@/assets/images/vetor/vetor_animal_sheep.svg" alt="sheep" />
       <img class="balloon" src="@/assets/images/vote/balloon.svg" alt="balloon" />
       <div>
      <img  class="cloud_6_top" src="@/assets/images/vote/clouda_6.svg" alt="雲" />
    </div>
       <div>
      <img  class="cloud_1_top" src="@/assets/images/vetor/nature_cloud_1.svg" alt="雲" />
    </div>
    </div>
  </section>
  <!-- 投票規則 -->
  <section class="vote_activity">

    <div class="vote_activity_wrap">
      <h1 class="pcBigTitle">探索動物奇蹟<br />動物園之星投票大賽！</h1>
      <p class="pcInnerText">
        動物人氣投票活動開始啦！每月一次的盛事，每天都能投三票，無論您在哪個館別發現心愛的動物，都能為它投票！快來參與，讓我們一起為動物園添上美好的色彩！
      </p>
      <div class="vote_rule">
        <div class="time pcInnerText newsFrame">
          <img src="../assets/images/news/newsFrame/orangeFrame.svg" alt="orangeFrame" class="newsFramePic" />
          <div class=" newsFrameText pcInnerText">投票時間</div>
        </div>
        <p class="time_text pcInnerText">
          活動持續至本月底截止。
        </p>
      </div>
      <div class="vote_rule">
        <div class="time pcInnerText newsFrame">
          <img src="../assets/images/news/newsFrame/orangeFrame.svg" alt="orangeFrame" class="newsFramePic" />
          <div class="newsFrameText pcInnerText">投票方式</div>
        </div>
        <p class="time_text pcInnerText">
          參與投票非常簡單！每天可投三票，不限館別，可重複投下同一隻動物，點擊你最喜歡的動物，為他投上珍貴的一票。記得，每個參與者每天可投三票，所以請謹慎選擇，支持你心愛的動物。
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
        <div class="img"> <img :src="getImageUrl(ranking.animal_pic_a)" alt="Animal" /></div>

        <div class="name pcSmTitle">{{ ranking.animal_name }}</div>
        <div class="votes phSmTitle">{{ ranking.animal_vote }}票</div>
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
        <div v-if="currentContent === 'vote_grass'" class="vote_wrap">
        <div v-for="(voteItem, index) in vote_grass_list" :key="index" class="vote_item">
          <div class="vote_card">
            <router-link :to="'/animalDetail/' + voteItem.animal_id">
              <div class="vote_wrap_animal">
                <img :src="getImageUrl(voteItem.animal_small_pic)" alt="Animal" />
                <div class="vote_wrap_animal_txt pcInnerText">
                  前往動物詳細資訊
                </div>
              </div>
            </router-link>
            <div class="vote_name pcSmTitle">{{ voteItem.animal_name }}</div>
            <div class="vote_icon pcInnerText">
              <img src="@/assets/images/vote/star.svg" alt="" />{{ voteItem.animal_vote }}票
            </div>
            <button @click="vote_grass(voteItem)" class="pcInnerText defaultBtn">
              <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
              立即投票
            </button>
          </div>
        </div>

      </div>

    </div>
    <div class="vote_wrap">
        <div v-if="currentContent === 'vote_polar'" class="vote_wrap">
        <div v-for="(voteItem, index) in vote_polar_list" :key="index" class="vote_item">
          <div class="vote_card">
            <router-link :to="'/animalDetail/' + voteItem.animal_id">
              <div class="vote_wrap_animal">
                <img :src="getImageUrl(voteItem.animal_small_pic)" alt="Animal" />
                <div class="vote_wrap_animal_txt pcInnerText">
                  前往動物詳細資訊
                </div>
              </div>
            </router-link>
            <div class="vote_name pcSmTitle">{{ voteItem.animal_name }}</div>
            <div class="vote_icon pcInnerText">
              <img src="@/assets/images/vote/star.svg" alt="" />{{ voteItem.animal_vote }}票
            </div>
            <button @click="vote_polar(voteItem)" class="pcInnerText defaultBtn">
              <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
              立即投票
            </button>
          </div>
        </div>

      </div>
    </div>
    <div class="vote_wrap">
        <div v-if="currentContent === 'vote_jungle'" class="vote_wrap">
        <div v-for="(voteItem, index) in vote_jungle_list" :key="index" class="vote_item">
          <div class="vote_card">
            <router-link :to="'/animalDetail/' + voteItem.animal_id">
              <div class="vote_wrap_animal">
                <img :src="getImageUrl(voteItem.animal_small_pic)" alt="Animal" />
                <div class="vote_wrap_animal_txt pcInnerText">
                  前往動物詳細資訊
                </div>
              </div>
            </router-link>
            <div class="vote_name pcSmTitle">{{ voteItem.animal_name }}</div>
            <div class="vote_icon pcInnerText">
              <img src="@/assets/images/vote/star.svg" alt="" />{{ voteItem.animal_vote }}票
            </div>
            <button @click="vote_jungle(voteItem)" class="pcInnerText defaultBtn">
              <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
              立即投票
            </button>
          </div>
        </div>

      </div>
    </div>
    <div class="vote_wrap">
        <div v-if="currentContent === 'vote_birds'" class="vote_wrap">
        <div v-for="(voteItem, index) in vote_birds_list" :key="index" class="vote_item">
          <div class="vote_card">
            <router-link :to="'/animalDetail/' + voteItem.animal_id">
              <div class="vote_wrap_animal">
                <img :src="getImageUrl(voteItem.animal_small_pic)" alt="Animal" />
                <div class="vote_wrap_animal_txt pcInnerText">
                  前往動物詳細資訊
                </div>
              </div>
            </router-link>
            <div class="vote_name pcSmTitle">{{ voteItem.animal_name }}</div>
            <div class="vote_icon pcInnerText">
              <img src="@/assets/images/vote/star.svg" alt="" />{{ voteItem.animal_vote }}票
            </div>
            <button @click="vote_birds(voteItem)" class="pcInnerText defaultBtn">
              <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
              立即投票
            </button>
          </div>
        </div>

      </div>
    </div>
    <div class="vote_wrap">
        <div v-if="currentContent === 'vote_aqua'" class="vote_wrap">
        <div v-for="(voteItem, index) in vote_aqua_list" :key="index" class="vote_item">
          <div class="vote_card">
            <router-link :to="'/animalDetail/' + voteItem.animal_id">
              <div class="vote_wrap_animal">
                <img :src="getImageUrl(voteItem.animal_small_pic)" alt="Animal" />
                <div class="vote_wrap_animal_txt pcInnerText">
                  前往動物詳細資訊
                </div>
              </div>
            </router-link>
            <div class="vote_name pcSmTitle">{{ voteItem.animal_name }}</div>
            <div class="vote_icon pcInnerText">
              <img src="@/assets/images/vote/star.svg" alt="" />{{ voteItem.animal_vote }}票
            </div>
            <button @click="vote_aqua(voteItem)" class="pcInnerText defaultBtn">
              <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
              立即投票
            </button>
          </div>
        </div>

      </div>
    </div>
        <!-- <div v-for="(voteItem, index) in currentVoteList" :key="index" class="vote_item">
         
          <div class="vote_card">
            <router-link :to="'/animalDetail/' ">
            <div class="vote_wrap_animal">
              <img :src="getImageUrl(voteItem.animal_pic_a)" alt="Animal" />
              <div class="vote_wrap_animal_txt pcInnerText">
                前往動物詳細資訊
              </div>
            </div>
          </router-link>
            <div class="vote_name pcSmTitle">{{ voteItem.animal_name }}</div>
            <div class="vote_icon pcInnerText">
              <img src="@/assets/images/vote/star.svg" alt="" />{{
                voteItem.animal_vote
              }}票
            </div>
            <button @click="vote_animal(voteItem)" class="pcInnerText defaultBtn">
              <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
              立即投票
            </button>
          </div>
        </div> -->
     
      <div class="elephant1">
        <img src="@/assets/images/vetor/vetor_animal_elephant_1.svg" alt="大象" />
      </div>
      <div class="vote_bottom">PxZoO</div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      // animal_id: 'data', 
      votedCount: 0,//總票數
      votesToday: parseInt(localStorage.getItem('votesToday') || '0'),
      currentContent:"vote_grass",
      podium_list: [
        {
          animal_name: "琳達",
       
          score: 197,
          animal_pic_a: 'giraffe',
          NO: '2',
          class: 'podium2'
        },
        {
          animal_name: "艾迪",
        
          animal_pic_a: 'elephant',
          score: 205,
          NO: '1',
          class: 'podium1'
        },
        {
          animal_name: "阿斯蘭",
      
          animal_pic_a: 'lion',
          score: 146,
          NO: '3',
          class: 'podium3'
        },
      ],
      ranking_list: [
        {
          number: 1,
          animal_name: "威廉",
          animal_vote: 300,
          animal_pic_a: "lion",
        },
        {
          number: 2,
          animal_name: "琳達",
          animal_vote: 250,
          animal_pic_a: "giraffe",
        },
        {
          number: 3,
          animal_name: "馬克",
          animal_vote: 200,
          animal_pic_a: "meerkat",
        },
      ],
     
      vote_grass_list: [
        // { animal_pic_a: "lion", animal_name: "威廉", animal_vote: "10" },
        // { animal_pic_a: "giraffe", animal_name: "琳達", animal_vote: "23" },
        // { animal_pic_a: "elephant", animal_name: "索拉", animal_vote: "12" },
        // { animal_pic_a: "cheetah", animal_name: "豹哥", animal_vote: "123" },
        // { animal_pic_a: "zebra", animal_name: "小班", animal_vote: "263" },
        // { animal_pic_a: "meerkat", animal_name: "馬克", animal_vote: "237" },
      ],

      vote_polar_list: [
        // { animal_pic_a: "polarBear", animal_name: "寶拉", animal_vote: "1223" },
        // { animal_pic_a: "kingPenguin", animal_name: "小雪", animal_vote: "13" },
        // { animal_pic_a: "magellanicPenguin", animal_name: "亞當", animal_vote: "1423" },
        // { animal_pic_a: "arcticFox", animal_name: "雪球", animal_vote: "13" },
        // { animal_pic_a: "seal", animal_name: "波比", animal_vote: "113" },
      ],
      
      vote_jungle_list: [
        // { animal_pic_a: "capybara", animal_name: "珍珍", vote_count: "120" },
        // { animal_pic_a: "malayanTapir", animal_name: "栗栗", vote_count: "178" },
        // { animal_pic_a: "orangutan", animal_name: "狄恩", vote_count: "124" },
        // { animal_pic_a: "tiger", animal_name: "瑪雅", vote_count: "423" },
        // { animal_pic_a: "sloth", animal_name: "曼曼", vote_count: "43" },
        // { animal_pic_a: "monkey", animal_name: "中中", vote_count: "123" },
      ],

      vote_birds_list: [
        // { animal_pic_a: "flamingo", animal_name: "阿翔", vote_count: "13" },
        // { animal_pic_a: "japaneseCrane", animal_name: "曉曉", vote_count: "23" },
        // { animal_pic_a: "owl", animal_name: "晴空", vote_count: "32" },
        // { animal_pic_a: "eagle", animal_name: "艾妮", vote_count: "98" },
        // { animal_pic_a: "toucan", animal_name: "嘟嘟", vote_count: "100" },
        // { animal_pic_a: "pelican", animal_name: "小瑜", vote_count: "78" },
      ],

      vote_aqua_list: [
        // { animal_pic_a: "stingray", animal_name: "藍波", vote_count: "95" },
        // { animal_pic_a: "shark", animal_name: "海妞", vote_count: "456" },
        // { animal_pic_a: "eel", animal_name: "燈燈", vote_count: "37" },
        // { animal_pic_a: "clownfish", animal_name: "馬林", vote_count: "1" },
        // { animal_pic_a: "octopus", animal_name: "巴奇", vote_count: "0" },
      ],
      animal: '' // 初始化動物數據
    };
  },
  methods: {
//     async vote_animal(voteItem) {
//   try {
//     const response = await axios.post(`${import.meta.env.VITE_API_URL}/votescountCreate.php`, {
//       animal_id: voteItem.animal_id,
//     });

//     if (response.status === 200) {
//       console.log('投票數據已成功更新到資料庫');
//       // 更新前端的投票數據
//       voteItem.animal_vote++; // 更新前端的投票數據
//     } else {
//       console.error('更新投票數據時出錯');
//     }
//   } catch (error) {
//     console.error('發生錯誤：', error);
//   }
// },

//草原之聲
  async vote_grass(voteItem) {
    try {
      if (this.votesToday >= 3) {
      alert('您今天已經投了三票，請明天再來！');
      return;
    }
      // 發送投票請求到後端，新增投票紀錄
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/votescountCreate.php`, { animal_id: voteItem.animal_id });

      // 更新畫面上的總票數顯示
      const updatedAnimalVote = response.data.animal_vote;
      const index = this.vote_grass_list.findIndex(animal => animal.animal_id === voteItem.animal_id);
      if (index !== -1) {
        this.vote_grass_list[index].animal_vote = updatedAnimalVote;
      }
       // 增加當天投票次數
    this.votesToday++;
    localStorage.setItem('votesToday', this.votesToday.toString());
      console.log(voteItem)
      // 提示投票成功
      alert('投票成功！');
    } catch (error) {
      console.error('投票失敗：', error);
      alert('投票失敗，請稍後再試！');
    }
  },

//極地秘境
  async vote_polar(voteItem) {
  try {
    if (this.animal_vote >= 3) {
      alert('您今天已經投了三票，請明天再來！');
      return;
    }

    // 發送投票請求到後端，新增投票紀錄
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/votescountCreate.php`, { animal_id: voteItem.animal_id });

    // 更新畫面上的總票數顯示
    const updatedPolarVote = response.data.animal_vote;
    const index = this.vote_polar_list.findIndex(animal => animal.animal_id === voteItem.animal_id);
    if (index !== -1) {
      this.vote_polar_list[index].animal_vote = updatedPolarVote;
    }
  // 增加當天投票次數
  this.votesToday++;
    localStorage.setItem('votesToday', this.votesToday.toString());
      console.log(voteItem)
    // 提示投票成功
    alert('投票成功！');
  } catch (error) {
    console.error('投票失敗：', error);
    alert('投票失敗，請稍後再試！');
  }
},
//叢林奇蹟
async vote_jungle(voteItem) {
  try {
      if (this.votesToday >= 3) {
      alert('您今天已經投了三票，請明天再來！');
      return;
    }

    // 發送投票請求到後端，新增投票紀錄
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/votescountCreate.php`, { animal_id: voteItem.animal_id });

    // 更新畫面上的總票數顯示
    const updatedJungleVote = response.data.animal_vote;
    const index = this.vote_jungle_list.findIndex(animal => animal.animal_id === voteItem.animal_id);
    if (index !== -1) {
      this.vote_jungle_list[index].animal_vote = updatedJungleVote;
    }
  // 增加當天投票次數
  this.votesToday++;
    localStorage.setItem('votesToday', this.votesToday.toString());
      console.log(voteItem)
    // 提示投票成功
    alert('投票成功！');
  } catch (error) {
    console.error('投票失敗：', error);
    alert('投票失敗，請稍後再試！');
  }
},
//鳥園樂章
async vote_birds(voteItem) {
  try {
      if (this.votesToday >= 3) {
      alert('您今天已經投了三票，請明天再來！');
      return;
    }

    // 發送投票請求到後端，新增投票紀錄
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/votescountCreate.php`, { animal_id: voteItem.animal_id });

    // 更新畫面上的總票數顯示
    const updatedBirdsVote = response.data.animal_vote;
    const index = this.vote_birds_list.findIndex(animal => animal.animal_id === voteItem.animal_id);
    if (index !== -1) {
      this.vote_birds_list[index].animal_vote = updatedBirdsVote;
    }
  // 增加當天投票次數
  this.votesToday++;
    localStorage.setItem('votesToday', this.votesToday.toString());
      console.log(voteItem)
    // 提示投票成功
    alert('投票成功！');
  } catch (error) {
    console.error('投票失敗：', error);
    alert('投票失敗，請稍後再試！');
  }
},
//海洋奇觀
async vote_aqua(voteItem) {
  try {
      if (this.votesToday >= 3) {
      alert('您今天已經投了三票，請明天再來！');
      return;
    }

    // 發送投票請求到後端，新增投票紀錄
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/votescountCreate.php`, { animal_id: voteItem.animal_id });

    // 更新畫面上的總票數顯示
    const updatedAquarVote = response.data.animal_vote;
    const index = this.vote_aqua_list.findIndex(animal => animal.animal_id === voteItem.animal_id);
    if (index !== -1) {
      this.vote_aqua_list[index].animal_vote = updatedAquarVote;
    }
  // 增加當天投票次數
  this.votesToday++;
    localStorage.setItem('votesToday', this.votesToday.toString());
      console.log(voteItem)
    // 提示投票成功
    alert('投票成功！');
  } catch (error) {
    console.error('投票失敗：', error);
    alert('投票失敗，請稍後再試！');
  }
},


    scrollToVoteList() {
      const voteListElement = document.querySelector('.vote_overview_all');
      voteListElement.scrollIntoView({ behavior: 'smooth' });
    },

    getImageUrl(img) {
      return new URL(
        `${import.meta.env.VITE_IMAGES_BASE_URL}/animal/small_pic/${img}`
        // `../assets/images/animal/small_pic/small_pic_${img}.png` //方式
        ,import.meta.url
      ).href;
    },

    getNoUrl(NO) {
      return new URL(
        `../assets/images/vote/NO${NO}.svg`,
        import.meta.url
      ).href;
    },

  


    showContent(content) {
      this.currentContent = content;
    },

    setHoverState(content) {
      // 如果只是要變樣式，沒有要做其他js程序，不要用vue用css就好了
      this.currentContent = content;
    },

    fetchDataByCategory(categoryName) {
      // 發送請求到後端以獲取特定館別的投票列表
      axios.get(`${import.meta.env.VITE_API_URL}/votefront.php`, {
        params: {
          category: categoryName
        }
      })
      .then(response => {
        // 將從後端獲取的投票列表資料設置到對應的資料變數中
        switch (categoryName) {
          case '草原之聲':
            this.vote_grass_list = response.data;
            break;
          case '極地秘境':
            this.vote_polar_list = response.data;
            break;
          case '叢林奇蹟':
            this.vote_jungle_list = response.data;
            break;
          case '鳥園樂章':
            this.vote_birds_list = response.data;
            break;
          case '海洋奇觀':
            this.vote_aqua_list = response.data;
            break;
          default:
            break;
        }
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
    },
  

  },
  created() {



    
  },

  mounted() {
    this.fetchDataByCategory('草原之聲');
  this.fetchDataByCategory('極地秘境');
  this.fetchDataByCategory('叢林奇蹟');
  this.fetchDataByCategory('鳥園樂章');
  this.fetchDataByCategory('海洋奇觀');
    
    // axios.get(`${import.meta.env.VITE_API_URL}/votefront.php`)
    //   .then(response => {
    //     this.vote_grass_list = response.data.grass;
    //   this.vote_polar_list = response.data.polar;
    //   this.vote_jungle_list = response.data.jungle;
    //   this.vote_birds_list = response.data.birds;
    //   this.vote_aqua_list = response.data.aqua; // 假設返回的數據是一個數組
    //   })
    //   .catch(error => {
    //     console.error("Error fetching data: ", error);
    //   });
    // // 在mounted鉤子中綁定滾動到投票列表的函數
    // this.scrollToVoteList();
  },
  computed: {
    // currentVoteList() {
    //   // 除非資料庫存五張類型動物的tabla，可以這樣寫
    //   // 如果是同一張table記得要用filter類型，不然之後會寫不出來
    //   switch (this.currentContent) {
    //   case "vote_grass":
    //     return this.vote_grass_list;
    //   case "vote_jungle":
    //     return this.vote_jungle_list;
    //   case "vote_polar":
    //     return this.vote_polar_list;
    //   case "vote_birds":
    //     return this.vote_birds_list;
    //   case "vote_aqua":
    //     return this.vote_aqua_list;
    //   default:
    //     return [];
    //   }
    // },
    currentVoteList() {
    return []; // 將 currentVoteList 定義為 computed 屬性
  },
    currentVoteList() {
  // 從所有投票列表中過濾出符合當前內容的項目
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
    default:
      return [];
  }
},

  },
  
};
</script>
