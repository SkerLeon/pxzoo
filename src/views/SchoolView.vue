<template>
  <section class="school">

    <div class="school_tree">
      <div class="tree_3">
        <img src="@/assets/images/vetor/nature_tree_3.svg" alt="tree">
      </div>
      <div class="tree_5">
        <img src="@/assets/images/vetor/nature_tree_5.svg" alt="tree">
      </div>
      <div class="grasses_6">
        <img src="@/assets/images/vetor/nature_grasses_6.svg" alt="grasses">
      </div>
      <div class="grasses_7">
        <img src="@/assets/images/vetor/nature_grasses_7.svg" alt="grasses">
      </div>
      <div class="tree_8">
        <img src="@/assets/images/vetor/nature_tree_8.svg" alt="tree">
      </div>
      <div class="tree_1">
        <img src="@/assets/images/vetor/nature_tree_1.svg" alt="tree">
      </div>
      <div class="teacher">
        <img src="@/assets/images/school/teacher.svg" alt="teacher">
      </div>
    </div>
    <div :class="{ 'content1': isContent1}">
      <div v-if="isContent1" class="school_content_1">
        <div class="school_title forHeader">
          <div class="number_8">
            <img src="@/assets/images/vetor/number_8.svg" alt="8">
          </div>
          <div class="number_n">
            <img src="@/assets/images/vetor/number_n.svg" alt="n">
          </div>
          <div class="number_i">
            <img src="@/assets/images/vetor/number_i.svg" alt="i">
          </div>
          <div class="number_m">
            <img src="@/assets/images/vetor/number_m.svg" alt="m">
          </div>
          <div class="number_a">
            <img src="@/assets/images/vetor/number_a.svg" alt="a">
          </div>
          <div class="number_l">
            <img src="@/assets/images/vetor/number_l.svg" alt="l">
          </div>
        </div>

        <div class="school_name pcBigTitle" >動物小學堂</div>
        <button @click="toggleContent" class="school_button pcInnerText defaultBtn">進入學堂</button>
      </div>

      <div v-else class="school_content_2">
        <div class="title pcBigTitle">歡迎參加動物小學堂</div>
        <div class="rule pcSmTitle">遊戲規則<br>
          總共有十個問題，每個問題都與動物有關<br>
          答對八題以上即可獲得門票折價優惠券</div>
        <button  @click="startgame"  class="school_button pcInnerText defaultBtn">
          開始
        </button>
      </div>
    </div>



  </section>
</template> 

<script>


export default {

  data() {
    return {
      isContent1: true,
    

    };

  },
  methods: {
    toggleContent() {
      this.isContent1 = !this.isContent1;
    },
  }
};

</script>


<!-- <style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style> -->
