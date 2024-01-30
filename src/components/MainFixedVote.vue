<template>
    <div class="fixed_vote">
        <RouterLink to="/vote" class="fixed_pc">
            <span class="fixed_top pcInnerText">人氣投票</span>
            <br>
            <span class="fixed_bottom pcInnerText">活動進行中</span>
        </RouterLink>

        <RouterLink to="/vote" class="fixed_ph pcInnerText">
            人氣投票<br>活動進行中
        </RouterLink>
    </div>
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
