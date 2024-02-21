<template>
  <MainFixedVote v-if="!isMobile" />
  <LoginLightBox v-show="showLogin" @closeLoginBox="updateLoginBox"/>
  <section class="tick forheader">
    <div class="tickStep">
      <img :src="tickStepImg" alt="立即購票進度條">
    </div>

<!-- 0% -->
    <main v-if="tickStep === 0" class="tickFrame">
      <TickInfo 
      v-if="!isBoard || !TickCalendar" 
      @TickCalendar="showTickCalendar" 
      />
      <TickCalendar 
      v-if="!isBoard ||TickCalendar" 
      :tidateData="tidate" 
      @newDate="updateDate" 
      @goNextStep="showNextStep" 
      />
    </main>

<!-- 30% -->
    <main v-else-if="tickStep === 1">
      <TickNum 
      :ticketsData="tickets"  
      :ticketsQtyData="ticketsQty" 
      :tipriceData="tiprice" 
      @newTiprice="updateTiprice"
      @goNextStep="showNextStep" 
      @goPreviousStep="backPreviousStep"
      />
    </main>

<!-- 60% -->
    <main v-else-if="tickStep === 2">
      <TickCheck  
      :tidateData="tidate" 
      :ticketsData="tickets" 
      :tipriceData="tiprice" 
      
      :couponsData="coupons"
      :couData="selectedCou" 
      :coupriceData="couprice" 
      :paypriceData="payprice"
      :paywaysData="payways" 

      :paywayData="selectedPW" 
      :paywayTTData="selectedPWTT"

      @newCardId="updateCardId" 
      @newCoupon="updateCoupon" 
      @newPayway="updatePayway" 
      @goNextStep="showNextStep" 
      @goPreviousStep="backPreviousStep" 
      />
    </main>

<!-- 100% -->
    <main v-else="tickStep === 3">
      <TickFinished   
      :tidateData="tidate" :ticketsData="tickets" 
      :tipriceData="tiprice"
      :couData="selectedCou" 
      :coupriceData="couprice" 
      :paypriceData="payprice" 
      :paywayData="selectedPW" 
      :paywayTTData="selectedPWTT" 
      :tickStatusData="tickstatus"
      />
    </main>

  </section>
</template>

<script>
import axios from 'axios';
import { getMemId } from '@/stores/getMemId.js';
import tickStepImg0 from "@/assets/images/ticket/PC0.png";
import tickStepImg1 from "@/assets/images/ticket/PC1.png";
import tickStepImg2 from "@/assets/images/ticket/PC2.png";
import tickStepImg3 from "@/assets/images/ticket/PC3.png";
import MainFixedVote from '@/components/MainFixedVote.vue';
import TickInfo from '@/components/tick/TickInfo.vue';
import TickCalendar from '@/components/tick/TickCalendar.vue';
import TickNum from '@/components/tick/TickNum.vue';
import TickCheck from '@/components/tick/TickCheck.vue';
import TickFinished from '@/components/tick/TickFinished.vue';
import LoginLightBox from '@/components/loginLightBox.vue';

export default {
  mixins: [getMemId],
  components:{
    MainFixedVote,
    TickInfo,
    TickCalendar,
    TickNum,
    TickCheck,
    TickFinished,
    LoginLightBox
},
  props:{},
  data() {
    return {
      showLogin: false,
      tickStepImgs: [
        tickStepImg0,
        tickStepImg1,
        tickStepImg2,
        tickStepImg3,
      ],
      tickStep: 0,
      TickCalendar: false,
      tiprice: 0,
      selectedCou: null, 
      couprice: 0,
      payprice: 0,
      tidate: new Date(),
      tickets: [],
      ticketsQty:[],
      ord_detail_qty: 0,
      coupons: [],
      selectedCouId: null,
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
      selectedPW: null,
      cardId: null,
      tickstatus: '',
      selectedCouDetailId: null,
    }
  },
  methods:{
    fetchTickets(){
      axios.get(`${import.meta.env.VITE_API_URL}/ticketsShow.php`)
      .then(response => {
        // 確保 response.data 是數組
        if (Array.isArray(response.data)) {
          this.tickets = response.data;

          // 為每個 ticket 添加 qty 屬性
          this.tickets.forEach(ticket => {
            ticket.ord_detail_qty = 0;
          });
        } else {
          console.error('Invalid data format'); // 處理非數組的情況
        } 
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
    },
    fetchMemCou(){
      axios.post(`${import.meta.env.VITE_API_URL}/couShowDistinct.php`,{
        mem_id: this.mem_id,
      },{
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then( response => {
        if(response.data.errMsg){
          this.coupons = response.data.errMsg;
        }else if(!Array.isArray(response.data)){
          this.coupons=Object.values(response.data)[0]; // this.coupons isArray
        }else{ this.coupons = response.data; }
      })
      .catch(error=>{
        console.error('Error fetching data:', error);
      })
    },
    fetchOrderInsert(){
      const requestData = {
        mem_id: this.mem_id,
        cou_id: this.selectedCouId,
        ord_tidate: this.tidate.toISOString().split('T')[0],
        ord_tiprice: this.tiprice,
        ord_couprice: this.couprice,
        ord_payprice: this.payprice,
        ord_payway: this.selectedPW,
        ord_ticktype: this.selectedPWTT,
        ord_cardid: this.cardId,
        ord_status: this.tickstatus,
        ord_detail_tick: this.tickets,
        cou_detail_id: this.selectedCouDetailId,
      };
      axios.post(`${import.meta.env.VITE_API_URL}/orderInsert.php`, requestData, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(response => { 
        response.data;
        this.fetchMemCou();
      })
      .catch(error=>{
        console.error('Error fetching data:', error);
      })
    },
    updateLoginBox(bool){
      this.showLogin=bool;
    },
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
    updateDate(newDate){
      this.tidate=newDate;
    },
    showNextStep(){
      // 如果沒有登入，則顯示登入燈箱
      if(this.tickStep === 0){
        if(this.mem_id === null){
          this.showLogin=(this.mem_id === null);
        }else{
          this.fetchTickets();
          this.fetchMemCou();
          this.tickStep++;
        }
      }else{
        // 送出訂單階段
        if(this.tickStep === 2){
          // 如果沒有選優惠券，則顯示不使用
          if(this.selectedCou === null){
            this.selectedCou = "不使用優惠券";
          }
          this.fetchOrderInsert();
        }
        this.tickStep++;
      }
      this.startFromTop();
    },
    backPreviousStep(){
      this.tickStep--;
      this.startFromTop();
    },
    showTickCalendar(){
      this.TickCalendar=true;
      this.startFromTop();
    },
    updateTiprice(newTiprice){

      this.tiprice = newTiprice;
      this.payprice = newTiprice;
    },
    updateCoupon(newCoupon){
      if(newCoupon!=="不使用優惠券"){
        var coupon =this.coupons.find(
          (cou) => cou.cou_name === newCoupon
        );
        this.selectedCouId=coupon.cou_id;
        this.selectedCouDetailId=coupon.cou_detail_id;
        this.couprice =  parseInt(
          (this.tiprice * (1 - coupon.cou_discount)).toFixed(2)
        );
        // 由於 JS 浮點數的表示並不是精確的，計算結果可能會導致誤差(電腦內部使用二進制表示浮點數)
      }
      this.selectedCou = newCoupon;

      this.payprice = this.tiprice - this.couprice;
    },
    updatePayway(newPayway){
      this.selectedPW = newPayway;

      if(this.selectedPW === '信用卡'){
        this.selectedPWTT = '數位票券',
        this.tickstatus = '未用票';
      }else{
        this.selectedPWTT = '實體票券',
        this.tickstatus = '未取票';
      }
    },
    updateCardId(newCardId){
      this.cardId = newCardId;
    },
  },
  computed:{
    tickStepImg(){
      return this.tickStepImgs[this.tickStep];
    },
  },
  created(){
    this.windowSize();
    window.addEventListener('resize', this.windowSize);

  },
  beforeUnmount() {
      window.removeEventListener('resize', this.windowSize);
  },
}

</script>

<style>



</style>