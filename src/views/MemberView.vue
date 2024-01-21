<template>
  <memLightBox />
</template>

<script>
import memLightBox from "@/components/loginLightBox.vue";

export default {
  components: {
    memLightBox,
  },
};
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
