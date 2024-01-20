<template>
  <section class="tick forheader">
    <div class="tickStep">
      <img src="/images/ticket/PC0.svg" alt="立即購票進度條">
    </div>

    <main>
      <article v-if="isMobile">
        <TickInfo/>
      </article>
      <div v-else class="tickJCSB">
        <TickInfo/>
        <TickCalendar/>
      </div>
    </main>

    <main>
        <TickNum/>
    </main>

    <!-- <div class="tickBtn">
        <button>上一步</button>
        <button class="tickLBtn">票種數量</button>
    </div> -->
    <!-- button 兩個都設定變數:
        1. 隱藏這個componet
        2. 渲染下一個componet-->
    <!-- init PH的按鈕是選擇日期，PC的按鈕比他多一階段，是票種數量 -->
    <!-- init PH的按鈕功能: 
        1.隱藏購票須知
        2.show進度條
        3.渲染calender-->
  </section>
</template>

<script>
import TickInfo from '@/components/TickInfo.vue';
import TickCalendar from '@/components/TickCalendar.vue';
import TickNum from '@/components/TickNum.vue';

export default {
  components:{
    // RouterLink,
    TickInfo,
    TickCalendar,
    TickNum,
  },
  data() {
    return {
      isMobile: window.innerWidth <= 768,
      // targetValue:0,
    }
    
  },
  created(){
    window.addEventListener('resize', this.windowSize);
  },
  methods:{
    windowSize(){
      this.isMobile = window.innerWidth <= 768;
    },
  }
}

</script>

<style>



</style>