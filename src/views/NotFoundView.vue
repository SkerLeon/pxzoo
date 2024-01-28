<template>
  <div class="notFound forHeader">
    <h1 class="errorTitle phDecBigTitle">
      404<br />
      ERROR
    </h1>
    <img
      src="../../page/cautionSign.svg"
      alt="cautionSign"
      class="cautionSign"
    />
    <img
      src="../assets/images/vetor/vetor_animal_chicken_4.svg"
      alt="errorChicken"
      class="errorChicken"
    />
    <img
      src="../assets/images/vetor/vetor_animal_alpaca.svg"
      alt="errorAlpaca"
      class="errorAlpaca"
    />
  </div>
</template>

<script>
import { goHome } from "@/assets/js/common.js";

export default {
  data() {
    return {};
  },
  methods: {
    useGoHome() {
      goHome(this);
    },
  },
};
</script>
