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
      <div class="teacher">
        <img src="@/assets/images/school/teacher.svg" alt="teacher">
      </div>
    </div>
    <!-- 初始畫面 -->
    <div :class="{ 'content1': isContent1 }">
      <div v-if="isContent1" class="school_content_1">
        <div class="school_title forHeader">
          <div class="number_8">
            <img src="@/assets/images/vetor/number_8.svg" alt="8">
          </div>
          <div class="number_n">
            <img src="@/assets/images/vetor/number_n.svg" alt="n">
          </div>
          <div class="number_i">
            <img src="@/assets/images/vetor/number_i.svg" alt="i">
          </div>
          <div class="number_m">
            <img src="@/assets/images/vetor/number_m.svg" alt="m">
          </div>
          <div class="number_a">
            <img src="@/assets/images/vetor/number_a.svg" alt="a">
          </div>
          <div class="number_l">
            <img src="@/assets/images/vetor/number_l.svg" alt="l">
          </div>
        </div>
        <!-- 遊戲規則 -->
        <div class="school_name pcBigTitle">動物小學堂</div>
        <button @click="toggleContent" class="school_button pcInnerText defaultBtn">進入學堂</button>
      </div>
      <div v-else class="school_content_2">
        <div v-if="!isGameStarted">
          <div class="title pcBigTitle">歡迎參加動物小學堂</div>
          <div class="rule pcSmTitle">
            遊戲規則<br>總共有十個問題，每個問題都與動物有關<br>答對八題以上即可獲得門票折價優惠券
          </div>
          <button @click="startGame" class="school_button pcInnerText defaultBtn">開始</button>
        </div>
        <div v-else>
          <!-- 開始進行遊戲畫面 -->

          <div v-if="currentQuestionIndex < questions.length" class="question_all">
            <div v-for="(question, index) in questions" :key="index" class="question"
              v-show="index === currentQuestionIndex">
              <!-- 顯示問題內容 -->
              <div class="question_text pcSmTitle">{{ question.text }}
                <img v-if="question.image" :src="getImageUrl(question.image)" alt="question-image"
                  class="question-image" />
              </div>

              <div class="option_all">
                <div v-for="(option, optionIndex) in question.options" :key="optionIndex" class="option pcInnerText">
                  <div v-if="option.image" class="option-image-container">

                    <img :src="getImageUrl(option.image)" alt="option-image" class="option-image" />

                  </div>

                  
                    <label class="option_input">
                      <input type="radio" name="answer" @click="checkAnswer(index, option)" :value="option.text"
                        style="display: none;">
                      {{ option.text }}
                    </label>
                  
                </div>
              </div>

              <div v-if="showAnswer[index]">
                <!-- 顯示正確答案跟解析 -->
                <div class="correct_answer pcSmTitle">正確答案：{{ question.correctAnswer }}</div>
                <div class="explanation pcSmTitle">解析：{{ question.explanation }}</div>
                <button v-if="currentQuestionIndex < questions.length - 1" @click="showNextQuestion"
                  class="pcInnerText defaultBtn">下一題</button>
              </div>
            </div>
          </div>

          <div v-if="isGameFinished">
            <div class="result">
              {{ successfulQuestionsCount >= 8 ? '破關成功！' : '破關失敗' }}
              <br>
              總分：{{ totalScore }}
            </div>
            <button v-if="successfulQuestionsCount < 8" @click="resetGame" class="pcInnerText defaultBtn">重新開始</button>
          </div>
        </div>
      </div>
    </div>


  </section>
</template> 

<script>
export default {
  data() {
    return {
      isContent1: true,
      isGameStarted: false,
      isGameFinished: false,
      successfulQuestionsCount: 0,
      currentQuestionIndex: 0,
      totalScore: 0,
      questions: [
        // 問題列表
        {
          text: "1.哪個動物天生沒有聲帶?", image: '',
          options: [
            { text: "A 長頸鹿", image: 'giraffe' },
            { text: "B 無尾熊", image: 'koala' },
            { text: "C 熊貓", image: 'panda' },
            { text: "D 犀牛", image: 'rhino' },

          ],
          correctAnswer: "A 長頸鹿",
          explanation: "解析1",
        },
        {
          text: "2.樹懶需要幾星期消化食物?", image: 'sloth',
          options: [
            { text: "A 一個星期", image: 'sloth' },
            { text: "B 兩個星期", image: 'sloth' },
            { text: "C 三個星期", image: 'sloth' },
            { text: "D 四個星期", image: 'sloth' },

          ],
          correctAnswer: "B 兩個星期",
          explanation: "解析2",
        },
        {
          text: "3.哪隻是世上唯一不會跳躍的動物?", image: '',
          options: [
            { text: "A 斑馬", image: 'zebra' },
            { text: "B 獅子", image: 'lion' },
            { text: "C 大象", image: 'elephant' },
            { text: "D 以上皆是", image: '' },
          ],
          correctAnswer: "C 大象",
          explanation: "解析3",
        },
        {
          text: "4.什麼動物的指紋跟人類非常相似，難以分辨?", image: '',
          options: [
            { text: "A 浣熊", image: 'red_panda' },
            { text: "B 狐蒙 ", image: 'meerkat' },
            { text: "C 袋鼠", image: 'kangaroo' },
            { text: "D 無尾熊", image: 'koala' },
          ],
          correctAnswer: "D 無尾熊",
          explanation: "解析4",
        },
        {
          text: "5.為什麼蛇要一直吐舌頭?", image: 'snake',
          options: [
            { text: "A 為了聞氣味", image: 'odor' },
            { text: "B 為了釋放毒液", image: 'liquid' },
            { text: "C 為了與同類傳達訊息", image: 'message' },
            { text: "D 為了散熱", image: 'heat' },
          ],
          correctAnswer: "A 為了聞氣味",
          explanation: "解析5",
        },
        {
          text: "6.哪一個動物不會游泳?", image: 'swim',
          options: [
            { text: "A 河馬", image: 'hippo' },
            { text: "B 鱷魚", image: 'Crocodile' },
            { text: "C 海象", image: 'walrus' },
            { text: "D 水獺", image: 'otter' },
          ],
          correctAnswer: "A 河馬",
          explanation: "解析6",
        },
        {
          text: "7.哪個動物不會倒退走?", image: '',
          options: [
            { text: "A 犀牛", image: 'rhino' },
            { text: "B 鱷魚", image: 'Crocodile' },
            { text: "C 袋鼠", image: 'kangaroo' },
            { text: "D 長頸鹿", image: 'giraffe' },
          ],
          correctAnswer: "C 袋鼠",
          explanation: "解析7",
        },
        {
          text: "8.哪隻動物的視野幾乎360度?", image: '',
          options: [
            { text: "A 豹", image: 'cheetah' },
            { text: "B 山羊", image: 'goat' },
            { text: "C 梅花鹿", image: 'sika_deer' },
            { text: "D 獅子", image: 'lion' },
          ],
          correctAnswer: "B 山羊",
          explanation: "解析8",
        },
        {
          text: "9.樹懶游泳的速度是在陸地上的幾倍?", image: 'sloth',
          options: [
            { text: "A 兩倍", image: 'cheetah' },
            { text: "B 三倍", image: 'cheetah' },
            { text: "C 四倍", image: 'cheetah' },
            { text: "D 五倍", image: 'cheetah' },
          ],
          correctAnswer: "B 三倍",
          explanation: "解析9",
        },
        {
          text: "什麼動物的大便是立方體?", image: '',
          options: [
            { text: "A 鴨嘴獸", image: 'platypus' },
            { text: "B 龍貓", image: 'chinchilla' },
            { text: "C 無尾熊", image: 'koala' },
            { text: "D 袋熊", image: 'wombat' },
          ],
          correctAnswer: "D 袋熊",
          explanation: "解析10",
        },

      ],
      showAnswer: Array(10).fill(false), //是否顯示答案跟解析
    };
  },
  methods: {
    toggleContent() {
      this.isContent1 = !this.isContent1;
    },
    startGame() {
      this.isGameStarted = true;
    },
    checkAnswer(index, selectedOption) {
      if (!this.showAnswer[index]) {
        const correctAnswer = this.questions[index].correctAnswer;
        this.showAnswer[index] = true;

        if (selectedOption.text === correctAnswer) {
          this.successfulQuestionsCount++;
          this.totalScore += 10; // 每題10分
          console.log(`回答正確，目前總分：${this.totalScore}`);
        }

        if (this.currentQuestionIndex === 9) {
          this.isGameFinished = true;
          console.log(`遊戲結束，最終總分：${this.totalScore}`);
        }
      }
    },

    showNextQuestion(index) {
      this.showAnswer[index] = false;

      if (this.currentQuestionIndex < this.questions.length - 1) {
        // 如果問題不是最後一題，切換到下一題
        this.currentQuestionIndex++;
      } else {
        // 如果問題是最後一題，標記遊戲結束
        this.isGameFinished = true;
      }
    },
    resetGame() {
      this.isGameStarted = false;
      this.isGameFinished = false;
      this.successfulQuestionsCount = 0;
      this.currentQuestionIndex = 0;
      this.showAnswer = Array(10).fill(false);
    },
    endGame() {
      // 成功破關後結束遊戲的邏輯
      console.log("成功破關，結束遊戲");
      this.isGameFinished = true;
      // 計算得分
      const score = this.successfulQuestionsCount * 10;
      console.log(`得分：${score} 分`);
      // 可以在這裡進行其他相應的處理，例如統計分數、顯示獎勵等
    },
    getScore() {
      return this.successfulQuestionsCount * 10;
    },
    getImageUrl(img) {
      return new URL(`../assets/images/school/animal/${img}.png`, import.meta.url).href
    },
  },
};
</script>



