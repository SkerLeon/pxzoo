<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  test
</template>

<script>
  export default {
  name: 'YourComponentName', // 如果需要的話
  components: {
    // 組件
  },
  props: {
    // 組件接收的外部數據
  },
  data() {
    return {
      // 變數放這裡
    };
  },
  computed: {
    // 函數也可以放這裡!但是放在這裡的函數，不能傳參數，一定要有傳回值(return)
  },
  watch: {
    // 偵聽器 主要用來偵聽data和computed的變化
  },
  created() {
    // 生命週期鉤子
  },
  mounted() {
    // 生命週期鉤子
  },
  methods: {
    // 函式
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/page/park.scss";
</style>
