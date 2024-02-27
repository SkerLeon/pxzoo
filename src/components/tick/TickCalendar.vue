<template>
  <!-- part0-2 日曆 -->
  <section class="tickCalendar">

    <article>

      <hgroup>
        <h2 class="pcSmTitle">選擇日期</h2>
        <main v-show="cantNextPage" class="tickPrompt">
          <article v-html="cantNextPage" class="pcInnerText">
          </article>
          <img src="@/assets/images/ticket/tickConversation_0.png" alt="提示訊息">
        </main>
        <img src="@/assets/images/vetor/vetor_animal_fox.svg" alt="ticket_decoratoin">
      </hgroup>

      <Calendar name="ord_tidate" class="calendar" v-model="bindTidateData" :cell-height=38
        :locale="{ today: '本月', type: { month: '月', year: '年' }, weekDays: ['日', '一', '二', '三', '四', '五', '六'], months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'] }">
        <template #month="{ date, data }">
          <div>
            <Badge text="休園" v-if="offDate(data.day)" />
          </div>
        </template>
      </Calendar>

    </article>

    <main class="tickBtn">
      <button type="button" class="defaultBtn tickLBtn pcInnerText" @click="nextStep">
        票種數量
        <img src="@/assets/images/login/icon/btnArrow.svg">
      </button>
    </main>

    <img v-if="windowWidth.isBoard" src="@/assets/images/vetor/vetor_animal_squirrel_1.svg" alt="eagle">

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
  },
  data() {
    return {
      cantNextPage: false,
    }
  },
  methods: {
    nextStep() {
      const today = new Date();
      today.setHours(17, 0, 0, 0);

      if (this.offDate(this.tidateData)) {
        this.cantNextPage = "<p class='promptYellow'>休園日nono</p><p>請重新選擇!</p>";
      }else if ( // 購票日期為今天&&時間>=17.
        this.tidateData.getFullYear() === today.getFullYear() && 
        this.tidateData.getMonth() === today.getMonth() && 
        this.tidateData.getDate() === today.getDate() && 
        this.tidateData.getHours() >= today.getHours() 
      ){
        this.cantNextPage = "<p class='promptYellow'>時間已過</p><p>請重新選擇!</p>";
      }else if ( this.tidateData < (today-3600 * 1000 * 17) ){ // 購票日期早於今天
        this.cantNextPage = "<p class='promptYellow'>時間已過</p><p>請重新選擇!</p>";
      } else {
        this.$emit('goNextStep');
      }
    },
    offDate(day) {
      // 星期一 && 不是1/1 && 不是3/12 && 不是 6/10 
      return new Date(day).getDay() === 1 && !(new Date(day).getMonth() === 0 && new Date(day).getDate() === 1) && !(new Date(day).getMonth() === 2 && new Date(day).getDate() === 12) && !(new Date(day).getMonth() === 5 && new Date(day).getDate() === 10);
    },
  },
  computed: {
    bindTidateData: {
      get() {
        return this.tidateData;
      },
      set(value) {
        this.$emit('newDate', value);
      },
    },
  },
}
</script>