<template>
  <section class="school">
    <!-- 背景 -->
    <div class="school_tree">
      <div class="tree_3">
        <img src="@/assets/images/vetor/nature_tree_3.svg" alt="tree">
      </div>
      <div class="tree_5">
        <img src="@/assets/images/vetor/nature_tree_5.svg" alt="tree">
      </div>
      <div class="grasses_6">
        <img src="@/assets/images/vetor/nature_grasses_6.svg" alt="grasses">
      </div>
      <div class="grasses_7">
        <img src="@/assets/images/vetor/nature_grasses_7.svg" alt="grasses">
      </div>
      <div class="tree_8">
        <img src="@/assets/images/vetor/nature_tree_8.svg" alt="tree">
      </div>
      <div class="tree_1">
        <img src="@/assets/images/vetor/nature_tree_1.svg" alt="tree">
      </div>


    </div>
    <!-- 初始畫面 -->
    <div :class="{ 'content1': isContent1 }">
      <div v-if="isContent1" class="school_content_1">
        <div class="school_title forHeader">
          <div class="number_8" :class="{ 'jump-up': showAnimation8 }">
            <img src="@/assets/images/vetor/number_8.svg" alt="8">
          </div>
          <div class="number_n" :class="{ 'jump-up': showAnimationN }">
            <img src="@/assets/images/vetor/number_n.svg" alt="n">
          </div>
          <div class="number_i" :class="{ 'jump-up': showAnimationI }">
            <img src="@/assets/images/vetor/number_i.svg" alt="i">
          </div>
          <div class="number_m" :class="{ 'jump-up': showAnimationM }">
            <img src="@/assets/images/vetor/number_m.svg" alt="m">
          </div>
          <div class="number_a" :class="{ 'jump-up': showAnimationA }">
            <img src="@/assets/images/vetor/number_a.svg" alt="a">
          </div>
          <div class="number_l" :class="{ 'jump-up': showAnimationL }">
            <img src="@/assets/images/vetor/number_l.svg" alt="l">
          </div>

        </div>
        <!-- 遊戲規則 -->
        <div class="school_name pcBigTitle">動物小學堂</div>
        <button @click="toggleContent" class="school_button pcInnerText defaultBtn">進入學堂<img
            src="@/assets/images/login/icon/btnArrow.svg" alt="" />
        </button>
        <div class="teacher">
          <img src="@/assets/images/school/teacher.svg" alt="teacher">
        </div>
      </div>
      <div v-else class="school_content_2">
        <div v-if="!isGameStarted">
          <div class="title pcBigTitle">歡迎參加動物小學堂</div>
          <div class="rule pcSmTitle">
            遊戲規則<br>總共有十個問題，每個問題都與動物有關<br>答對八題以上即可獲得門票折價優惠券
          </div>
          <button @click="startGame" class="school_button pcInnerText defaultBtn">開始<img
              src="@/assets/images/login/icon/btnArrow.svg" alt="" />
          </button>

          <div class="teacher">
            <img src="@/assets/images/school/teacher.svg" alt="teacher">
          </div>
        </div>

        <div v-else>
          <!-- 開始進行遊戲畫面 -->
          <div v-if="currentQuestionIndex < questions.length" class="question_all">
            <div v-for="(question, index) in questions" :key="index" class="question"
              v-show="index === currentQuestionIndex">
              <!-- 顯示問題內容 -->
              <div class="question_text pcSmTitle">{{ question.question_number }}. {{ question.question_text }}
                <!-- <img v-if="question.image" :src="getImageUrl(question.image)" alt="question-image"
                  class="question-image" /> -->
              </div>

              <div class="option_all">
                <div v-for="optionPara in ['a', 'b', 'c', 'd']" :key="optionPara" class="option pcInnerText">
                  <div v-if="question['question_img_' + optionPara]" class="option-image-container">
                    <img :src="getImageUrl(question['question_img_' + optionPara])" :alt="question['question_img_' + optionPara]" class="option-image" />
                  </div>
                  <label class="option_input">
                      <input class="option_input_as" type="radio" :name="'answer' + index"
                          @click="checkAnswer(index, optionPara)"
                          :value="question['question_option_' + optionPara]" style="display: none;">
                      {{ question['question_option_' + optionPara] }}
                  </label>
                </div>
              </div>

          
            <div class="eat_coin">

              <div class="chimpanzees">
                <img src="@/assets/images/vetor/vetor_animal_chimpanzees.svg" alt="chimpanzees">
              </div>
              <div v-for="(coin, index) in 10" :key="index" :class="{ eaten: index < chimpanzeesPosition }" class="coin">
                <img src="@/assets/images/school/coin.svg" alt="coin">
              </div>
            </div>

            <div v-if="showAnswer[index]" class="lightbox">
              <div class="lightbox-content">

                <div class="user_answer pcSmTitle" v-if="userSelectedOption">
                  你的答案：{{ userSelectedOption }}
                  <span v-if="userSelectedOption === question.question_correctanswer" style="color: green;">（正確）</span>
                  <span v-else style="color: red;">（錯誤）</span>
                </div>
                <div class="correct_answer pcSmTitle">正確答案：{{ question.question_correctanswer }}</div>
                <div class="explanation pcSmTitle"> 解析：<br><span style="color: #ff6100;">{{
                  question.question_answer_illustrate }}</span></div>
                <button v-if="currentQuestionIndex < questions.length - 1" @click="showNextQuestion"
                  class="pcInnerText defaultBtn">
                  <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />下一題
                </button>
                <button v-else @click="endGame" class="pcInnerText defaultBtn">
                  <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />結束遊戲
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="isGameFinished" class="result_all">
          <div class="result pcSmTitle">
            {{ resultMessage }}
          </div>

          <button v-if="successfulQuestionsCount < 8" @click="resetGame" class="pcInnerText defaultBtn">
            <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />重新開始
          </button>
        </div>

        
      </div>
    </div>
  </div>

  <schoolGameAchieve v-if="GameAchieveSwitch" :totalScore="totalScore"/>

  
  </section>
</template> 

<script>
import axios from 'axios';
import schoolGameAchieve from '@/components/school/schoolGameAchieve.vue'

export default {
  data() {
    return {
      GameAchieveSwitch:false,
      showAnimation8: false,
      showAnimationN: false,
      showAnimationI: false,
      showAnimationM: false,
      showAnimationA: false,
      showAnimationL: false,
      isContent1: true,
      isGameStarted: false,
      isGameFinished: false,
      successfulQuestionsCount: 0,
      currentQuestionIndex: 0,
      chimpanzeesPosition: '',
      totalScore: 0,
      userSelectedOption: null,
      showAnimation: false,
      questions: [
        // 問題列表
        // {
        //   question_text: "1.哪個動物天生沒有聲帶?", image: '',
        //   options: [
        //     { text: "長頸鹿", image: 'giraffe' },
        //     { text: "無尾熊", image: 'koala' },
        //     { text: "熊貓", image: 'panda' },
        //     { text: "犀牛", image: 'rhino' },

        //   ],
        //   question_correctanswer: "長頸鹿",
        //   question_answer_illustrate: "長頸鹿是沒有聲帶的。但是美國科學家的最新研究表明，長頸鹿事實上能夠彼此交談。我們聽不到它們的聲音是因為它們發出的聲音屬於次聲，次聲是一種低頻音波，遠遠低於人耳所能達到的聽力範圍。"
        // },
        // {
        //   question_text: "2.樹懶至少需要幾星期消化食物?", image: '',
        //   options: [
        //     { text: "一個星期", image: 'q1' },
        //     { text: "兩個星期", image: 'q2' },
        //     { text: "三個星期", image: 'q3' },
        //     { text: "四個星期", image: 'q4' },

        //   ],
        //   question_correctanswer: "兩個星期",
        //   question_answer_illustrate: "樹懶是擁有非常緩慢的新陳代謝的動物，因此它們需要相當長的時間來消化食物。",
        // },
        // {
        //   question_text: "3.哪隻是唯一不會跳躍的動物?", image: '',
        //   options: [
        //     { text: "斑馬", image: 'zebra' },
        //     { text: "獅子", image: 'lion' },
        //     { text: "大象", image: 'elephant' },
        //     { text: "無尾熊", image: 'koala' },
        //   ],
        //   question_correctanswer: "大象",
        //   question_answer_illustrate: "大象不會跳的原因主要與它們的身體結構和體重有關。大象是非常大型且重量龐大的動物，牠們的身體組成並不適合進行跳躍動作。大象的骨架、肌肉和關節都是為了支撐巨大的體重而設計，這種結構並不適合做高強度的運動",
        // },
        // {
        //   question_text: "4.什麼動物的指紋跟人類非常相似，難以分辨?", image: '',
        //   options: [
        //     { text: "浣熊", image: 'red_panda' },
        //     { text: "狐獴", image: 'meerkat' },
        //     { text: "袋鼠", image: 'kangaroo' },
        //     { text: "無尾熊", image: 'koala' },
        //   ],
        //   question_correctanswer: "無尾熊",
        //   question_answer_illustrate: "無尾熊的指紋和人類的非常相似，這使得它們很難在犯罪現場留下證據。無尾熊的指紋結構與人類的指紋相似，都有獨特的紋路和特徵，這使得研究人員難以將無尾熊的指紋與人類的指紋區分開來。這也意味著在犯罪現場發現的無尾熊指紋可能會與人類指紋混淆，增加了辨識的困難。",
        // },
        // {
        //   question_text: "5.為什麼蛇要一直吐舌頭?", image: '',
        //   options: [
        //     { text: "聞氣味", image: 'odor' },
        //     { text: "釋放毒液", image: 'liquid' },
        //     { text: "傳達訊息", image: 'message' },
        //     { text: "散熱", image: 'heat' },
        //   ],
        //   question_correctanswer: "聞氣味",
        //   question_answer_illustrate: "蛇伸出舌頭是為了嗅覺，舌尖接觸氣味分子，幫助它們尋找食物、識別潛在危險..等。",
        // },
        // {
        //   question_text: "6.哪一個動物不會游泳?", image: '',
        //   options: [
        //     { text: "河馬", image: 'hippo' },
        //     { text: "鱷魚", image: 'Crocodile' },
        //     { text: "海象", image: 'walrus' },
        //     { text: "水獺", image: 'otter' },
        //   ],
        //   question_correctanswer: "河馬",
        //   question_answer_illustrate: "河馬雖然是半水生動物，但它們實際上並不會游泳。相反，當河馬在水中移動時，牠們通常是步行或是跳躍，並且可以在水中推進自己。雖然河馬可以在水中移動，但牠們通常是在淺水區或是河流底部行走，而不是真正的游泳。",
        // },
        // {
        //   question_text: "7.哪個動物不會倒退走?", image: '',
        //   options: [
        //     { text: "犀牛", image: 'rhino' },
        //     { text: "鱷魚", image: 'Crocodile' },
        //     { text: "袋鼠", image: 'kangaroo' },
        //     { text: "長頸鹿", image: 'giraffe' },
        //   ],
        //   question_correctanswer: "袋鼠",
        //   question_answer_illustrate: "袋鼠的身體結構和肌肉組織使其不太適合倒退走。牠們的後肢非常強壯且發達，主要用於向前跳躍。牠們的尾巴也扮演著平衡和支撐的重要角色。由於牠們的身體設計，倒退走對袋鼠來說並不是一個自然的動作，因此牠們通常更傾向於向前跳躍或向前移動。",
        // },
        // {
        //   question_text: "8.哪隻動物的視野幾乎360度?", image: '',
        //   options: [
        //     { text: "豹", image: 'cheetah' },
        //     { text: "山羊", image: 'goat' },
        //     { text: "梅花鹿", image: 'sika_deer' },
        //     { text: "獅子", image: 'lion' },
        //   ],
        //   question_correctanswer: "山羊",
        //   question_answer_illustrate: "山羊擁有幾乎360度的視野。它們的眼睛位於頭部兩側，幾乎水平分佈，這使得它們能夠在幾乎所有方向上觀察周圍的環境，從而更好地辨識潛在的威脅或尋找食物。這種廣闊的視野範圍有助於山羊在野外生活中保持警惕，並且在岩石和崎嶇的地形中尋找安全的路徑。",
        // },
        // {
        //   question_text: "9.樹懶游泳的速度是在陸地上的幾倍?", image: '',
        //   options: [
        //     { text: "兩倍", image: 'q2' },
        //     { text: "三倍", image: 'q3' },
        //     { text: "四倍", image: 'q4' },
        //     { text: "五倍", image: 'q5' },
        //   ],
        //   question_correctanswer: "三倍",
        //   question_answer_illustrate: "樹懶動作是出了名的緩慢，在陸地上行走的時候，每分鐘只能移動2公尺。不過，樹懶游泳的時候，速度竟然可以快轉三倍，簡直就像開外掛一樣！",
        // },
        // {
        //   question_text: "10.什麼動物的大便是立方體?", image: '',
        //   options: [
        //     { text: "鴨嘴獸", image: 'platypus' },
        //     { text: "龍貓", image: 'chinchilla' },
        //     { text: "無尾熊", image: 'koala' },
        //     { text: "袋熊", image: 'wombat' },
        //   ],
        //   question_correctanswer: "袋熊",
        //   question_answer_illustrate: "牠們的糞便特別之處在於其形狀可以呈現出立方體的形狀。這種特殊的形狀有助於牠們將糞便放置在領地邊界上，以作為標記。這種立方體形狀的糞便是由於袋熊的消化系統特殊的生物力學機制所致。",
        // },

      ],
      showAnswer: Array(10).fill(false), //是否顯示答案跟解析

      
    };
  },
  components:{
    schoolGameAchieve,
  },
  computed: {
    resultMessage() {
      if (this.successfulQuestionsCount >= 8) {
        this.GameAchieveSwitch = true;
      } else {
        return '很抱歉你未能成功破關，但冒險並不僅僅是成功與否每一次的嘗試都是對知識的探索和成長失敗並不代表結束，而是迎接更多挑戰的開始「失敗只是成功的一部分，堅持不懈才是真正的勇氣。」我們鼓勵你繼續保持好奇心，學習更多關於動物的知識下一次冒險可能就是你獲得成功的時刻！加油，未來的動物知識王！';
      }
    }
  },
  mounted() {
    axios.get(`${import.meta.env.VITE_API_URL}/questionsfront.php`)
      .then(response => {
        this.questions = response.data; // 假設返回的數據是一個數組
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
    },
    // 使用 Axios 發送 GET 請求
    // axios.get(`${import.meta.env.VITE_API_URL}/questionshow.php`)
    //   .then(response => {
    //     // 請求成功，處理回應資料
    //     this.question = response.data.map(option => {
    //       return {
    //         text: [option.question_option_a, option.question_option_b, option.question_option_c, option.question_option_d]
    //       };
    //     });
    //   })
    //   .catch(error => {
    //     // 請求失敗，處理錯誤
    //     console.error('Error fetching data:', error);
    //   });
  // },

  methods: {
    toggleContent() {
      this.isContent1 = !this.isContent1;
    },
    startGame() {
      this.isGameStarted = true;
    },
    checkAnswer(index, selectedOption) {
  if (!this.showAnswer[index]) {
    const question = this.questions[index];
    const question_correctanswer = question.question_correctanswer;
    const selectedAnswer = question[`question_option_${selectedOption}`];
    
    this.userSelectedOption = selectedAnswer; // 存儲使用者選擇的答案
    this.showAnswer[index] = true;

    if (selectedAnswer === question_correctanswer) {
      this.successfulQuestionsCount++;
      this.totalScore += 10; // 每題10分
      console.log(`回答正確，目前總分：${this.totalScore}`);
    }

    if (this.currentQuestionIndex === 10) {
      this.isGameFinished = true;
      console.log(`遊戲結束，最終總分：${this.totalScore}`);
    }
  }
},
    closeLightbox() {
      // 重置相關狀態，關閉燈箱
      this.showAnswer[this.currentQuestionIndex] = false;
      this.userSelectedOption = null;
    },

    showNextQuestion() {
      // 重置相關狀態，顯示下一題
      this.showAnswer[this.currentQuestionIndex] = false;
      this.userSelectedOption = null;

      if (this.currentQuestionIndex < this.questions.length - 1) {
        // 如果問題不是最後一題，切換到下一題
        this.currentQuestionIndex++;
      } else {
        // 如果問題是最後一題，不觸發遊戲結束，而是顯示結果燈箱
        this.showResultLightbox();
      }
    },


    resetGame() {
      this.isGameStarted = false;
      this.isGameFinished = false;
      this.successfulQuestionsCount = 0;
      this.currentQuestionIndex = 0;
      this.totalScore = 0; // 將分數歸零
      this.showAnswer = Array(10).fill(false);
    },
    endGame() {
      // 成功破關後結束遊戲的邏輯
      console.log("成功破關，結束遊戲");
      this.isGameFinished = true;
      // 關閉燈箱
      this.closeLightbox();
      // 重置顯示答案的狀態
      this.showAnswer = Array(10).fill(false);
      // 重置使用者選擇的答案
      this.userSelectedOption = null;
      // 計算得分
      const score = this.successfulQuestionsCount * 10;
      console.log(`得分：${score} 分`);
      // 顯示結果，但不顯示題目和選項
      this.isContent1 = false;
      //不顯示題目
      this.currentQuestionIndex = false;
    },
    getScore() {
      return this.successfulQuestionsCount * 10;
    },
    
    getImageUrl(img) {
      
      return new URL(`${import.meta.env.VITE_IMAGES_BASE_URL}/school/animal/${img}`, import.meta.url).href
      // return  `${import.meta.env.VITE_IMAGES_BASE_URL}/school/animal/${img}`;
      // console.log(`${import.meta.env.VITE_IMAGES_BASE_URL}/school/animal/${img}`);
    },

    
  },
};
</script>



