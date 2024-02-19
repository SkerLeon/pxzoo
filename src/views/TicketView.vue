<template>
  <!-- 本頁待辦:
    1.TickNum接tickets資料庫
  -->
  <MainFixedVote v-if="!isMobile" />
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
      @goPreviousStep="backPreviousStep" 
      />
      <!-- goPreviousStep for 測試，正式上線要拿掉!!! -->
    </main>

  </section>
</template>

<script>
import axios from 'axios';
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
      selectedCou: null, 
      selectedCouOp: '',
      couprice: 0,
      payprice: 0,
      tidate: new Date(),
      tickets: [],
      ticketsQty:[],
      ord_detail_qty: 0,
      coupons: [
        // 之後抓資料表，要寫"去除重複"!!!!!
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
      selectedPW: null,
      cardId: null,
      tickstatus: '',
      // 🐢:之後組件中的資料可以放在這邊，用props傳進去
      // 🐢:組件中資料填寫完成，用emit傳過來
    }
  },
  methods:{
    // fetchOrderInsert(){
    //   axios.post(`${import.meta.env.VITE_API_URL}/orderInsert.php`, {
    //     mem_id: 1,
    //     cou_id: ,  // couData是string
    //     ord_tidate: this.tidate, 
    //     ord_tiprice: this.tiprice, 
    //     ord_couprice: this.couprice, 
    //     ord_payprice: this.payprice, 
    //     ord_payway: this.selectedPW, 
    //     ord_ticktype: this.selectedPWTT, 
    //     ord_cardid: this., //還沒驗證綁值
    //     ord_status: this.tickstatus
    //   }, {
    //     headers: {
    //       'Content-Type': 'application/json',
    //     }
    //   })
    // },
    getMemId(){
      // 在此之前補: 先判斷有沒有陣列
      let a = json.parse(localStorage[member陣列]);
      // 抓到陣列，轉成字串，使用他

      // 再把傳來的給自己的值(v-model)
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

      // const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
      // this.tidate=newDate.toLocaleDateString('zh-TW', options);
      // console.log('this.calDate type', typeof this.calDate);
      // console.log('this.calDate',this.calDate);
      console.log('typeof',typeof this.tidate);
      console.log('this.tidate',this.tidate);

      // toLocaleDateString 方法，該方法將日期轉換為當地日期字符串。它的第一個參數是區域設置（locale），這裡設置為 'zh-TW'，表示使用中文（台灣）的日期格式。第二個參數是 options 物件，用於指定日期的顯示格式。
    },
    showNextStep(){
      // 如果沒有選優惠券，則顯示不使用
      if(this.tickStep === 2 && this.selectedCou === null){
        this.selectedCou = this.coupons[0].option;
      }

      this.tickStep++;
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
      this.selectedCou = newCoupon;

      let couVal = this.coupons.find(
          (cou) => cou.option === newCoupon
      );

      this.couprice =  parseInt(
          (this.tiprice * (1 - couVal.value)).toFixed(2)
      );
            // 由於 JS 浮點數的表示並不是精確的，計算結果可能會導致誤差(電腦內部使用二進制表示浮點數)
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
    tickStepImg() {
      return this.tickStepImgs[this.tickStep];
    },
  },
  created(){
    this.windowSize();
    window.addEventListener('resize', this.windowSize);

    // 引入tickets資料
    axios.get(`${import.meta.env.VITE_API_URL}/ticketsShow.php`)
    .then(response => {
      // 確保 response.data 是數組
      if (Array.isArray(response.data)) {
        this.tickets = response.data;

        // 為每個 ticket 添加 qty 屬性
        this.tickets.forEach(ticket => {
          ticket.qty = 0;
        });
      } else {
        console.error('Invalid data format'); // 处理非数组的情况
      } 
    })
    .catch(error => {
      console.error("Error fetching data: ", error);
    });
    
  },
  beforeUnmount() {
      window.removeEventListener('resize', this.windowSize);
  },
}

</script>

<style>



</style>