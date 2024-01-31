<template>
  <MainFixedVote v-if="!isMobile" />
  <section class="tick forheader">
    <div class="tickStep">
      <img :src="tickStepImg" alt="立即購票進度條">
    </div>
<!-- 小龜老師您好:
  除了calendar不太會用，其他數據我都有綁定了，請老師幫忙看一下(底下componet的標籤好醜，這樣是對的嗎???)
-->
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
      :couponsData="coupons"
      :couponOpData="selectedCouOp" 
      :couponValData="selectedCouVal" 
      :coupriceData="couprice" 
      :paypriceData="payprice"
      :paywaysData="payways" 
      :paywayOpData="selectedPWOp" 
      :paywayTTData="selectedPWTT"
      @newCoupon="updateCoupon" 
      @newPayway="updatePayway" 
      @goNextStep="showNextStep" 
      @goPreviousStep="backPreviousStep" 
      />
    </main>

<!-- 100% -->
    <main v-else="tickStep === 3">
      <TickFinished  :ticketsData="tickets" 
      :tipriceData="tiprice"
      :couponOpData="selectedCouOp" 
      :coupriceData="couprice" 
      :paypriceData="payprice" 
      :paywayOpData="selectedPWOp" 
      :paywayTTData="selectedPWTT" 
      :tickStatusData="status" 
      @goPreviousStep="backPreviousStep" 
      />
      <!-- goPreviousStep for 測試，正式上線要拿掉!!! -->
    </main>

  </section>
</template>

<script>
import tickStepImg0 from "@/assets/images/ticket/PC0.svg";
import tickStepImg1 from "../assets/images/ticket/PC1.svg";
import tickStepImg2 from "../assets/images/ticket/PC2.svg";
import tickStepImg3 from "../assets/images/ticket/PC3.svg";
import ticketImg1 from "@/assets/images/ticket/ticket1.svg";
import ticketImg2 from "@/assets/images/ticket/ticket2.svg";
import ticketImg3 from "@/assets/images/ticket/ticket3.svg";
import ticketImg4 from "@/assets/images/ticket/ticket4.svg";
import ticketImg5 from "@/assets/images/ticket/ticket5.svg";
import MainFixedVote from '@/components/MainFixedVote.vue';
import TickInfo from '@/components/tick/TickInfo.vue';
import TickCalendar from '@/components/tick/TickCalendar.vue';
import TickNum from '@/components/tick/TickNum.vue';
import TickCheck from '@/components/tick/TickCheck.vue';
import TickFinished from '@/components/tick/TickFinished.vue';

export default {
  components:{
    MainFixedVote,
    TickInfo,
    TickCalendar,
    TickNum,
    TickCheck,
    TickFinished,
  },
  props:{},
  data() {
    return {
      tickStepImgs: [
        tickStepImg0,
        tickStepImg1,
        tickStepImg2,
        tickStepImg3,
      ],
      tickStep: 0,
      TickCalendar: false,
      tiprice: 0,
      selectedCouOp: '', 
      selectedCouVal: 0, 
      couprice: 0,
      payprice: 0,
      tickets:[
          {
            id: 1,
            name: '成人票',
            rule: '18~64 歲',
            price: 100,
            src: ticketImg1,
            qty: 0,
          },
          {
            id: 2,
            name: '學生票',
            rule: '12 歲以上(含)持學生證者',
            price: 80,
            src: ticketImg2,
            qty: 0,
          },
          {
            id: 3,
            name: '團體票',
            rule: '15 人以上適用',
            price: 60,
            src: ticketImg3,
            qty: 0,
          },
          {
            id: 4,
            name: '兒童票',
            rule: '4~11 歲',
            price: 40,
            src: ticketImg4,
            qty: 0,
          },
          {
            id: 5,
            name: '愛心票',
            rule: '65 歲以上(含)',
            price: 40,
            src: ticketImg5,
            qty: 0,
          },
      ],
      coupons: [
        { 
          id: 1,
          option: '不使用優惠券',
          value: 1,
        },
        {
          id: 2,
          option: '付款金額 9 折',
          value: 0.9,
        },
        { 
          id: 3,
          option: '付款金額 95 折',
          value: 0.95,
        },
      ],
      payways: [
        { 
          id: 1,
          option: '信用卡',
          value: 'card',
          tickType: '數位票券',
        },
        {
          id: 2,
          option: '現場付款',
          value: 'cash',
          tickType: '實體票券',
        },
      ],
      selectedPWTT: '',
      selectedPWOp: '',
      status: '',
      // 🐢:之後組件中的資料可以放在這邊，用props傳進去
      // 🐢:組件中資料填寫完成，用emit傳過來
    }
  },
  methods:{
    windowSize(){
      this.isMobile = window.innerWidth <= 768;
      this.isBoard = window.innerWidth < 1200;
    },
    startFromTop(){
      // 使用 window.scrollTo() 滾動到頂部
      window.scrollTo({
          top: 0,
          behavior: 'smooth', // 使用平滑滾動效果
      });
    },
    showNextStep(){
      // 如果沒有選優惠券，則顯示不使用
      if(this.tickStep === 2 && this.selectedCouOp === ''){
        this.selectedCouOp = this.coupons[0].option;
      }
      this.tickStep++;
      // this.startFromTop();
    },
    backPreviousStep(){
      this.tickStep--;
      // this.startFromTop();
    },
    showTickCalendar(){
      this.TickCalendar=true;
      // this.startFromTop();
    },
    // updateDate(newDate){
    //   console.log(newDate);
    //   this.tidate = newDate;
    //   console.log(this.tidate);
    // },
    updateTiprice(newTiprice){
      this.tiprice = newTiprice;
      this.payprice = newTiprice;
    },
    updateCoupon(newCouponOp, newCouponVal, newCouprice, newPayprice){
      console.log(this.selectedCouOp);
      this.selectedCouOp = newCouponOp;
      this.selectedCouVal = newCouponVal;
      this.couprice = newCouprice;
      this.payprice = newPayprice;
    },
    updatePayway(newPaywayOp, newPaywayTT){
      this.selectedPWOp = newPaywayOp;
      this.selectedPWTT = newPaywayTT;

      if(this.selectedPWOp === '信用卡'){
        this.status = '未用票';
      }else{
        this.status = '未取票';
      }
      console.log("主頁更新付款方式", this.selectedPWOp);
      console.log("主頁更新票券型態", this.selectedPWTT);
    },
  },
  computed:{
    tickStepImg() {
      return this.tickStepImgs[this.tickStep];
    },
  },
  created(){
    this.windowSize();
    window.addEventListener('resize', this.windowSize);
  },
  mounted() {
  },
  beforeDestroy() {
      window.removeEventListener('resize', this.windowSize);
  },
}

</script>

<style>



</style>