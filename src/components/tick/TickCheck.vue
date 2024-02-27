<template>
  <!-- part2 付款頁 -->
  <section class="tickCheck">

    <h2 class="pcSmTitle">請確認您的訂單資訊</h2>

    <hgroup class="pcInnerText">
      <p>票卷日期</p>
      <h2 class="pcSmTitle mixedFont">
        {{ tidateData.getFullYear() }}
        <p class="pcInnerText">年</p>
        {{ tidateData.getMonth() + 1 }}
        <p class="pcInnerText">月</p>
        {{ tidateData.getDate() }}
        <p class="pcInnerText">日</p>
      </h2>
    </hgroup>

    <article class="choosed">
      <main v-for=" t in ticketsData" :key="t.tickets_id">
        <div>
          <p class="pcInnerText">{{ t.tickets_name }}</p>
          <span class="pcMarkText">{{ t.tickets_rule }}</span>
        </div>
        <h2 class="pcSmTitle">
          {{ t.ord_detail_qty }}
          <span class="pcMarkText">張</span>
        </h2>
      </main>
    </article>

    <hgroup class="coupon pcInnerText">
      <h2 class="pcSmTitle">優惠折扣</h2>
      <p v-if="typeof this.couponsData === 'string'">{{ this.couponsData }}</p>
      <select v-else class="pcInnerText" v-model="selectedCoupon">
        <option value="null" disabled hidden>請選擇優惠券</option>
        <option v-for="coupon in couponsData" :key="coupon.cou_detail_id" :value="coupon.cou_name">{{ coupon.cou_name }}
        </option>
      </select>
    </hgroup>

    <div class="price">
      <span>票券金額</span>
      <div class="pcInnerText">
        <span class="pcMarkText">NT$</span>
        <p>{{ tipriceData }}</p>
      </div>
    </div>

    <div class="price">
      <span>優惠金額</span>
      <div class="pcInnerText">
        <span class="pcMarkText">NT$</span>
        <p>{{ coupriceData }}</p>
      </div>
    </div>

    <div class="price important">
      <p class="pcInnerText">付款金額</p>
      <div class="mixedFont pcSmTitle">
        <p class="pcInnerText">NT$</p>
        <h2>{{ paypriceData }}</h2>
      </div>
    </div>

    <article class="payWay">
      <hgroup>
        <h2 class="pcSmTitle">付款方式</h2>
        <select v-model="selectedPayway" class="pcInnerText">
          <option value="null" disabled hidden>請選擇付款方式</option>
          <option v-for="(payway, paywayIndex) in paywaysData" :key="payway.Id" :value="payway.option">{{ payway.option }}
          </option>
        </select>
      </hgroup>
      <div class="price pcInnerText important">
        <p>票券型態</p>
        <p>{{ paywayTTData }}</p>
      </div>
      <article v-if="paywayData === '信用卡'">
        <main class="pcInnerText">
          <p>信用卡卡號</p>
          <input v-model.trim="cardId" title="" @change="isCardConformFormat('卡號', cardId, 15, 19)" @focus="stopPrompt"
            type="number" placeholder="請輸入卡號" inputmode="numeric" step="1">
        </main>
        <main class="pcInnerText carddate">
          <p>有效日期</p>
          <main>
            <select v-model="selectedMonth" @focus="stopPrompt" :class="['pcInnerText', { heavy: cardMonth !== null }]">
              <option value="null" disabled hidden>{{ windowWidth.isSmallPH ? '信用卡月' : '請選擇信用卡月' }}</option>
              <option v-for="i in 12" :key="i" :value="i">{{ i }} 月</option>
            </select>
            <p> / </p>
            <select v-model="selectedYear" @focus="stopPrompt" :class="['pcInnerText', { heavy: cardYear !== null }]">
              <option value="null" disabled hidden>{{ windowWidth.isSmallPH ? '信用卡年' : '請選擇信用卡年' }}</option>
              <option v-for="i in 30" :key="i" :value="new Date().getFullYear() - 1 + i">{{ new Date().getFullYear() - 1 + i }} 年
              </option>
            </select>
          </main>
        </main>
        <main class="pcInnerText">
          <p>驗證碼</p>
          <input v-model.trim="cardCode" @change="isCardConformFormat('驗證碼', cardCode, 3)" @focus="stopPrompt"
            :placeholder="windowWidth.isSmallPH ? '卡後驗證碼' : '請輸入卡片背面驗證碼'" type="number" inputmode="numeric" step="1"
            class="defaultInput">
        </main>
        <div v-html="cardPrompt" class="cardPrompt pcInnerText"></div>
      </article>
    </article>

    <main class="tickBtn relative">
      <button class="defaultBtn pcInnerText" @click="previousStep">
        上一步
        <img src="@/assets/images/login/icon/btnArrow.svg">
      </button>
      <main v-show="cantNextPage" class="tickPrompt">
        <article v-html="cantNextPage" class="pcInnerText">
        </article>
        <img src="@/assets/images/ticket/tickConversation_2.png" alt="提示訊息">
      </main>
      <button class="tickLBtn defaultBtn pcInnerText" @click="nextStep">
        送出訂單
        <img src="@/assets/images/login/icon/btnArrow.svg">
      </button>
    </main>

  </section>
</template>

<script>
export default {
  inject: ['windowWidth'],
  props: {
    tidateData: {
      type: Date,
      required: true,
    },
    ticketsData: {
      type: Array,
      required: true,
    },
    tipriceData: {
      type: Number,
      required: true,
    },
    couponsData: {
      required: true,
    },
    couData: {
      required: true,
    },
    coupriceData: {
      type: Number,
      required: true,
    },
    paypriceData: {
      type: Number,
      required: true,
    },
    paywaysData: {
      type: Array,
      required: true,
    },
    paywayData: {
      required: true,
    },
    paywayTTData: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      cantNextPage: false,
      cardId: null,
      cardMonth: null,
      cardYear: null,
      cardCode: null,
      cardPrompt: '',
      wrongCard: "<p>信用卡資訊有誤，請確認填寫內容是否正確或聯繫發卡銀行，新卡片請確認是否已開卡。</p>"
    }
  },
  methods: {
    isCardConformFormat(name, val, min, max = null) {
      // @change，每次改變先取消過去cardPrompt
      this.cardPrompt = '';
      if (typeof val === 'number') {
        var string = val.toString();
      } else {
        var string = val;
      }

      // 確認input是否含數字符號
      const allowedChars = ['+', '-', '.'];
      if ([...string].every(char => allowedChars.includes(char))) {
        // 使用 every 方法檢查字串中的每個字元是否都包含在 allowedChars 中
        // 使用展開運算子 (...) 將字串轉換為字元陣列
        this.cardPrompt = `<p>${name}請輸入半形數字</p>`;
        return false;
      }

      if (max !== null) { // 卡號由15~19位數字組成
        if (string.length < min || string.length > max) {
          this.cardPrompt = `<p>${name}由${min}~${max}位數字組成</p>`;
          return false;
        } else { return true; }
      } else { // 驗證碼由3位數字組成
        if (string.length !== min) {
          this.cardPrompt = `<p>${name}由${min}位數字組成</p>`;
          return false;
        } else { return true; }
      }
    },
    isCardIdValid() { // 驗證卡號符合發卡規則、Luhn算法
      if (typeof this.cardId === 'number') {
        var string = this.cardId.toString();
      } else {
        var string = this.cardId;
      }

      // 確認卡號沒有0、7、8、9開頭
      if (parseInt(string.charAt(0)) >= 7 || string.charAt(0) === '0') {
        return false;
      }

      let sum = 0;

      // 1.從校驗位開始，從右往左，偶數位乘2，若是兩位數則個位與十位相加
      // 因此length-2，因為長度扣1教驗位扣1
      // i-2，因為只要奇數位
      for (let i = string.length - 2; i >= 0; i--) {
        let digit = parseInt(string[i]);

        if ((string.length - i) % 2 === 1) { // 奇數位，權重1
          sum += digit;
        } else {// 偶數位，權重2
          digit *= 2;
          if (digit > 9) {
            digit -= 9;
          }
          // 2.把得到的數字加在一起
          sum += digit;
        }
      }
      // 3.將數字的和取模10（本例中得到7），再用10去減（本例中得到3），得到校驗位。
      const checkSum = 10 - (sum % 10);
      const lastDigit = parseInt(string[string.length - 1]);

      return checkSum === lastDigit;
    },
    checkInputs() {
      let cardInfo = [this.cardId, this.cardMonth, this.cardYear, this.cardCode];

      return !cardInfo.some((value) => value === null);
    },
    stopPrompt() {
      this.cantNextPage = false;
    },
    nextStep() {
      if (this.paywayData === null) {
        this.cantNextPage = "<p class='promptYellow'>付款方式</p><p>請選擇~</p>";
      } else if (this.paywayData === '信用卡') {
        // 確認信用卡都有填寫
        if (!this.checkInputs()) {
          this.cantNextPage = "<p>請填寫~</p><p class='promptYellow'>信用卡資訊</p>";
        } else if (!this.isCardConformFormat('卡號', this.cardId, 15, 19)) {
          this.cardPrompt = this.wrongCard;
        } else if (!this.isCardConformFormat('驗證碼', this.cardCode, 3)) {
          this.cardPrompt = this.wrongCard;
        } else if (!this.checkCardTime()) {
          this.cardPrompt = this.wrongCard;
        } else if (!this.isCardIdValid()) {
          this.cardPrompt = this.wrongCard;
        } else {
          this.$emit('newCardId', this.cardId);
          this.$emit('goNextStep');
        }
      } else { this.$emit('goNextStep'); }
    },
    previousStep() {
      this.$emit('goPreviousStep');
    },
    checkCardTime() {
      return !(this.cardMonth < parseInt(new Date().getMonth() + 1) && this.cardYear === parseInt(new Date().getFullYear()));
    }
  },
  computed: {
    selectedCoupon: {
      get() { return this.couData; },
      set(value) { 
        console.log(value);
        this.$emit('newCoupon', value); 
      },
    },
    selectedPayway: {
      get() { return this.paywayData; },
      set(value) {
        console.log('測試用信用卡號: ', 4556749097057162);
        this.cantNextPage = false;
        this.$emit('newPayway', value);
      },
    },
    selectedMonth: {
      get() { return this.cardMonth; },
      set(val) { this.cardMonth = val; },
    },
    selectedYear: {
      get() { return this.cardYear; },
      set(val) { this.cardYear = val; },
    },
  },
}
</script>