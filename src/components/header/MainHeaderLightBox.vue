<template>
    <div class="header_ph_hb_menu">
        <div class="header_router_links">
            <router-link to="/news" class="phSmTitle" @click.native="closeMenu">最新消息</router-link>
            <router-link to="/park" class="phSmTitle" @click.native="closeMenu">園區介紹</router-link>
            <router-link to="/animal" class="phSmTitle" @click.native="closeMenu">動物資訊</router-link>
            <router-link to="/vote" class="phSmTitle" @click.native="closeMenu">人氣投票</router-link>
            <router-link to="/school" class="phSmTitle" @click.native="closeMenu">知識學堂</router-link>
            <router-link to="/ticket" class="phSmTitle" @click.native="closeMenu">立即購票</router-link>
            <router-link to="/login" class="phSmTitle" @click.native="closeMenu">會員登入</router-link>
        </div>
    </div>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
    props: {
    closeMenu: Function 
    },
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

<style>
</style>