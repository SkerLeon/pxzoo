<template>
  <section class="tick forheader">
    <div class="tickStep">
      <img src="@/assets/images/ticket/PC0.svg" alt="立即購票進度條">
    </div>

    <!-- 安安 小龜老師，我是一畫 -->
    <!-- 還深陷排版泥沼，寫不到太多vue的東東......
      🐢：你這頁可以寫很多vue~~放心，切完你就變組件大師，prop/emit功力會大增，有些公司就在考你這種頁面功能，好好寫捏

      排版的問題可否請教您: 

      1. PHP上課說"需要把資料傳到後端的，要用<form>包"，請問所有<input>、<select>、<option>...都要用<form>包嗎？（降我排版要全部重新檢查了）
        🐢：不要用form包，傳資料可以用axios裡的post就好了(用chartGPT問一下範例)

      2. 請問下拉式選單中option的樣式設計，我研究了一下，option能寫的樣式極少，一般建議用div>ul>li來做......請教您：是這樣嗎？如果用div>ul>li在後續抓資料上會比較麻煩嗎？（還不太懂怎麼抓資料、傳到後端><）
        🐢：用iview再改樣式，用div自己刻太浪費時間了

      目前對立即購票執行的規劃&理解:
        (1) 這個檔案只有進度條&接渲染資料，預計每次下一頁時，更改進度條的圖片檔案。
            🐢：沒錯用step去理解
        (2) 使用者選擇的資料先都存在local host，直到TickFinished資料才存到後端。
            🐢：這邊不一定要用local storage，通常這種流程不會幫使用者緩存，不過要寫也是可以
        (3) 所有頁面的js會另開一個ticket.js，按鈕控制&各種條件篩選會寫在那裏。
            🐢：都分好組件了，你就寫在組件裡就好了，不然也蠻麻煩的
        (4) 後面且戰且走orz
            🐢：寫完這一頁再說吧

      -->

<!-- 0% -->
    <!-- <article v-if="isMobile">
      <TickInfo :open="TickInfoOpen" />
      <TickCalendar />
    </article>
    <main v-else>
      <TickInfo :open="true" />
      <TickCalendar />
    </main> -->

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
// import TickInfo from '@/components/tick/TickInfo.vue';
// 把以下這些組件移到tick目錄裡
import TickInfo from '@/components/tick/TickInfo.vue';
import TickCalendar from '@/components/tick/TickCalendar.vue';
import TickNum from '@/components/tick/TickNum.vue';
import TickCheck from '@/components/tick/TickCheck.vue';
import TickFinished from '@/components/tick/TickFinished.vue';

export default {
  components:{
    // RouterLink,
    TickInfo,
    TickCalendar,
    TickNum,
    TickCheck,
    TickFinished,
  },
  data() {
    return {
      // 🐢:之後組件中的資料可以放在這邊，用props傳進去
      // 🐢:組件中資料填寫完成，用emit傳過來
      // targetValue:0,
    }
    
  },
  created(){
    this.windowSize();
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