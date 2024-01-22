<template>
    <div class="fixed_vote">
        <RouterLink to="/vote">
            <span class="fixed_top pcInnerText">人氣投票</span>
            <br>
            <span class="fixed_bottom pcInnerText">活動進行中</span>
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
