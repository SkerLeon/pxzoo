<template>
  <section class="home">
    <div id="bannersliderBoard">
      <ul id="banner">
        <li>
          <div class="banner1"></div>
        </li>
        
        <li>
          <div class="banner2"></div>
        </li>

        <li>
          <div class="banner3"></div>
        </li>

        <li>
          <div class="banner4"></div>
        </li>
      </ul>

      <ul id="bannerButton">
        <!-- <li class="clicked"></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li> -->
      </ul>
    </div>

    

</section>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  components: {
      RouterLink,
  },
  data() {
      return {
      targetValue: 0,
      };
  },
  created() {},
  methods: {},
};
</script>
