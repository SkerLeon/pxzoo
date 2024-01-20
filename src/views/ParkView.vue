<template>
  <section class="forHeader pk_content">
    <section class="pk_map">
      <img class="pk_map_bg" src="/images/park/pk_map_bg.png" alt="園區地圖">
      <div v-for="num in 40" :class="`pk_animal_default pk_animal_icon${num}`" :id="`location_id${num}`">
        <img :src="`/images/park/pk_animal_icon${num}.png`" alt="園區動物icon">
      </div>

    </section>
    <section class="pk_Tickets"></section>
    <section class="pk_origin"></section>
    <section class="pk_Park_information"></section>
  </section>
</template>

<script>
export default {
  components: {
    // 組件
  },
  data() {
    return {

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
