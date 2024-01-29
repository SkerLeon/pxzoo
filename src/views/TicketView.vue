<template>
  <section class="tick forheader">
    <div class="tickStep">
      <img :src="getImagePath()" alt="立即購票進度條">
    </div>

<!-- 0% -->
    <main v-if="tickStep === 0" class="tickFrame">
      <TickInfo 
      v-if="!isBoard || !TickCalendar" 
      @TickCalendar="showTickCalendar" 
      />
      <TickCalendar 
      v-if="!isBoard ||TickCalendar" 
      @goNextStep="showNextStep" 
      />
    </main>

<!-- 30% -->
    <main v-else-if="tickStep === 1">
      <TickNum 
      :ticketsData="tickets" 
      :tipriceData="tiprice" 
      @newTiprice="updateTiprice"
      @goNextStep="showNextStep" 
      @goPreviousStep="backPreviousStep" 
      />
    </main>

<!-- 60% -->
    <main v-else-if="tickStep === 2">
      <TickCheck 
      :ticketsData="tickets" 
      :tipriceData="tiprice" 
      @goNextStep="showNextStep" 
      @goPreviousStep="backPreviousStep" 
      />
    </main>

<!-- 100% -->
    <main v-else="tickStep === 3">
      <TickFinished  :ticketsData="tickets" 
      :tipriceData="tiprice" 
      />
    </main>

  </section>
</template>

<script>
import TickInfo from '@/components/tick/TickInfo.vue';
import TickCalendar from '@/components/tick/TickCalendar.vue';
import TickNum from '@/components/tick/TickNum.vue';
import TickCheck from '@/components/tick/TickCheck.vue';
import TickFinished from '@/components/tick/TickFinished.vue';

export default {
  components:{
    TickInfo,
    TickCalendar,
    TickNum,
    TickCheck,
    TickFinished,
  },
  props:{},
  data() {
    return {
      tickStep: 0,
      TickCalendar: false,
      tiprice: 0,
      tickets:[
          {
            id: 1,
            name: '成人票',
            rule: '18~64 歲',
            price: 100,
            src: 'src/assets/images/ticket/ticket1.svg',
            qty: 0,
          },
          {
            id: 2,
            name: '學生票',
            rule: '12 歲以上(含)持學生證者',
            price: 80,
            src: 'src/assets/images/ticket/ticket2.svg',
            qty: 0,
          },
          {
            id: 3,
            name: '團體票',
            rule: '15 人以上適用',
            price: 60,
            src: 'src/assets/images/ticket/ticket3.svg',
            qty: 0,
          },
          {
            id: 4,
            name: '兒童票',
            rule: '4~11 歲',
            price: 40,
            src: 'src/assets/images/ticket/ticket4.svg',
            qty: 0,
          },
          {
            id: 5,
            name: '愛心票',
            rule: '65 歲以上(含)',
            price: 40,
            src: 'src/assets/images/ticket/ticket5.svg',
            qty: 0,
          },
      ],
      // 🐢:之後組件中的資料可以放在這邊，用props傳進去
      // 🐢:組件中資料填寫完成，用emit傳過來
    }
  },
  methods:{
    windowSize(){
      this.isMobile = window.innerWidth <= 768;
      this.isBoard = window.innerWidth < 1200;
    },
    getImagePath(){
      return `src/assets/images/ticket/PC${this.tickStep}.svg`;
    },
    showNextStep(){
      this.tickStep++;
    },
    backPreviousStep(){
      this.tickStep--;
    },
    showTickCalendar(){
      this.TickCalendar=true;
    },
    // updateDate(newDate){
    //   console.log(newDate);
    //   this.tidate = newDate;
    //   console.log(this.tidate);
    // },
    updateTiprice(newTiprice){
      this.tiprice = newTiprice;
    },
  },
  // watch: {
  //   tiprice: {
  //   handler(newVal, oldVal) {
  //     this.$nextTick(() => {
  //       console.log('tiprice 更新，新值:', newVal);
  //     });
  //   },
  //   deep: true,
  //   immediate: true,
  // },
  // },
  created(){
    this.windowSize();
    window.addEventListener('resize', this.windowSize);
    // console.log('Vue 主頁面 created，tiprice 值:', this.tiprice);
  },
  mounted() {
    // console.log('Vue 主頁面 mounted，tiprice 值:', this.tiprice);
  },
  beforeDestroy() {
      window.removeEventListener('resize', this.windowSize);
  },
}

</script>

<style>



</style>