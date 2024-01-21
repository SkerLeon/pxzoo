<template>
    <div class="fixedvote">
        <RouterLink to="/vote">
            <span class="top pcInnerText">人氣投票</span>
            <br>
            <span class="bottom pcInnerText">活動進行中</span>
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
