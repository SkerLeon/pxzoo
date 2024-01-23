<template>
    <div class="notFound forHeader">
        <h1 class="pcDecBigTitle phDecBigTitle">404</h1>
        <Button type="info" @click="useGoHome" class="defaultBtn">返回首頁</Button>
    </div>
</template>

<script>
import {goHome} from '@/assets/js/common.js';

export default {
    data () {
        return {}
    },
    methods: {
        useGoHome(){
            goHome(this);
        },
    },
};
</script>

<style lang="scss">


</style>