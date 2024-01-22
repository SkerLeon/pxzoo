<template>
  <section class="tick forheader">
    <div class="tickStep">
      <img src="@/assets/images/ticket/PC0.svg" alt="立即購票進度條">
    </div>

    <!-- 安安 小龜老師，我是一畫 -->
    <!-- 還深陷排版泥沼，寫不到太多vue的東東......
      排版的問題可否請教您: 

      1. PHP上課說"需要把資料傳到後端的，要用<form>包"，請問所有<input>、<select>、<option>...都要用<form>包嗎？
      （降我排版要全部重新檢查了）
      2. 請問下拉式選單中option的樣式設計，我研究了一下，option能寫的樣式極少，一般建議用div>ul>li來做......請教您：是這樣嗎？如果用div>ul>li在後續抓資料上會比較麻煩嗎？（還不太懂怎麼抓資料、傳到後端><）

      目前對立即購票執行的規劃&理解:
        (1) 這個檔案只有進度條&接渲染資料，預計每次下一頁時，更改進度條的圖片檔案。
        (2) 使用者選擇的資料先都存在local host，直到TickFinished資料才存到後端。
        (3) 所有頁面的js會另開一個ticket.js，按鈕控制&各種條件篩選會寫在那裏。
        (4) 後面且戰且走orz
      -->

<!-- 0% -->
    <article v-if="isMobile">
      <TickInfo :open="TickInfoOpen" />
      <TickCalendar />
    </article>
    <main v-else>
      <TickInfo :open="true" />
      <TickCalendar />
    </main>

<!-- 30% -->
    <!-- <main>
        <TickNum />
    </main> -->

<!-- 60% -->
    <!-- <main>
      <TickPayway />
    </main> -->

<!-- 100% -->
    <!-- <main>
      <TickFinished />
    </main> -->

  </section>
</template>

<script>
import TickInfo from '@/components/TickInfo.vue';
import TickCalendar from '@/components/TickCalendar.vue';
import TickNum from '@/components/TickNum.vue';
import TickPayway from '@/components/TickPayway.vue';
import TickFinished from '@/components/TickFinished.vue';

export default {
  components:{
    // RouterLink,
    TickInfo,
    TickCalendar,
    TickNum,
    TickPayway,
    TickFinished,
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