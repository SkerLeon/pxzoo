<template>
  <!-- part1 選擇數量 -->
  <section class="tickNum">

    <hgroup>
      <h2 class="pcSmTitle">選擇數量</h2>
      <button @click="tickReset">
        <img src="@/assets/images/ticket/refresh.png">
      </button>
    </hgroup>
    <main>
      <article v-for=" t in ticketsData" :key="t.tickets_id">
        <div v-if="windowWidth.isBoard" class="tickOption pcInnerText">
          <p>{{ t.tickets_name }}</p>
          <span class="pcMarkText">{{ t.tickets_rule }}</span>
        </div>
        <article>
          <main v-if="windowWidth.isBoard" class="tickOption pcInnerText">
            <h2 class="pcSmTitle">NT$ {{ t.tickets_price }}</h2>
            <p>/ 人</p>
          </main>
          <article v-else class="tickOption PC">
            <img :src="getTickImgUrl(t.tickets_id)" :alt="t.tickets_name">
          </article>
          <div class="countBTN">
            <button @click="decrease(t.tickets_id)" class="pcDecMarkText">-</button>
            <input v-model.trim="t.ord_detail_qty" @input="alterQty(t.tickets_id)" type="number" placeholder="0"
              inputmode="numeric" step="1" min="0" max="999">
            <button @click="increase(t.tickets_id)" class="pcDecMarkText">+</button>
          </div>
        </article>
      </article>
    </main>

    <div class="price firstLine pcInnerText important">
      <p>票券金額</p>
      <div class="pcSmTitle">
        <p>NT$</p>
        <h2>{{ tipriceData }}</h2>
      </div>
    </div>

    <main class="tickBtn relative">
      <button class="defaultBtn pcInnerText" @click="previousStep">
        上一步
        <img src="@/assets/images/login/icon/btnArrow.svg">
      </button>
      <main v-show="cantNextPage" class="tickPrompt">
        <article v-html="cantNextPage" class="pcInnerText">
        </article>
        <img v-if="windowWidth.isSmallPH" src="@/assets/images/ticket/tickConversation_1s.png" alt="提示訊息">
        <img v-else src="@/assets/images/ticket/tickConversation_1.png" alt="提示訊息">
      </main>

      <button type="button" class="tickLBtn defaultBtn pcInnerText" @click="nextStep">
        立即購票
        <img src="@/assets/images/login/icon/btnArrow.svg">
      </button>

    </main>
  </section>
</template>

<script>
export default {
  inject: ['windowWidth'],
  props: {
    ticketsData: {
      type: Array,
      required: true,
    },
    ticketsQtyData: {
      type: Array,
      required: true,
    },
    tipriceData: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      cantNextPage: false,
    }
  },
  methods: {
    tickReset() {
      this.ticketsData.forEach((ticket) => {
        ticket.ord_detail_qty = 0;
      });
      this.tipriceCalculate();
    },
    getTickImgUrl(path) {
      return new URL(`../../assets/images/ticket/ticket${path}.png`, import.meta.url).href
    },
    nextStep() {
      let teamQty = this.ticketsData[2].ord_detail_qty;

      if (this.tipriceData > 0) {
        if (teamQty > 0 && teamQty < 15) {
          this.cantNextPage = "<p>團體票須</p><p><span class='promptYellow'>15人以上</span>!</p>";
        } else {
          this.$emit('goNextStep');
        }
      } else {
        this.cantNextPage = "<p class='promptYellow'>票券數量,</p><p>請選擇!</p>";
      }
    },
    previousStep() {
      this.$emit('goPreviousStep');
    },
    increase(ticketId) {
      if (this.ticketsData[ticketId - 1].ord_detail_qty < 999) {
        this.ticketsData[ticketId - 1].ord_detail_qty++;
        this.tipriceCalculate();

        return this.ticketsData[ticketId - 1].ord_detail_qty;
      }
    },
    decrease(ticketId) {
      if (this.ticketsData[ticketId - 1].ord_detail_qty > 0) {
        this.ticketsData[ticketId - 1].ord_detail_qty--;
        this.tipriceCalculate();
        return this.ticketsData[ticketId - 1].ord_detail_qty;
      }
    },
    tipriceCalculate() {
      let newTiprice = this.ticketsData.reduce(
        (sum, tick) =>
          sum + tick.ord_detail_qty * tick.tickets_price,
        0);

      if (isNaN(newTiprice)) {
        newTiprice = 0;
      }

      this.$emit('newTiprice', newTiprice);

      // arr.reduce(function(accumulator, currentValue, index, array) {
      // Do stuff with accumulator and currentValue (index, array, and initialValue are optional)
      // }, initialValue);
    },
    alterQty(ticketId) {
      // 因為HTML設定input type="number"，所以這邊用typeof都會得到"number"，但事實上所有input都是字串

      if (isNaN(this.ticketsData[ticketId - 1].ord_detail_qty)) {
        this.ticketsData[ticketId - 1].ord_detail_qty = 0;
      }

      // 單票種上限
      if (parseInt(this.ticketsData[ticketId - 1].ord_detail_qty) > 999) {
        this.ticketsData[ticketId - 1].ord_detail_qty = 999;
      }

      // 將數值轉為整數數字
      this.ticketsData[ticketId - 1].ord_detail_qty = parseInt(this.ticketsData[ticketId - 1].ord_detail_qty);

      this.tipriceCalculate();
    },
  },
  computed: {
    // computed 不需 $emit 傳遞值，會自動被 Vue 監聽，當值發生變化時，它會通知使用這個值的地方進行更新
  },
  watch: {},
}
</script>