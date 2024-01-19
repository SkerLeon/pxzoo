<template>
  <section class="forHeader pk_content">
    <section class="pk_map">
      <img src="/images/park/pk_map_bg.png" alt="">
      
        <!-- 這裡要設定v-for 自動新增圖片.class.id -->
        <div class="pk_animal_default pk_animal_icon$1" id="location_id$1">
      </div>
    </section>

    <section class="pk_Tickets"></section>
    <section class="pk_origin"></section>
    <section class="pk_Park_information"></section>
  </section>
</template>

<script>
export default {
  name: "YourComponentName", // 如果需要的話
  components: {
    // 組件
  },
  data() {
    return {
      // 變數放這裡
    };
  },
  created() {
    // 生命週期鉤子
  },
  mounted() {
    // 生命週期鉤子
  },
  methods: {
    // 函式
  },
};
</script>
