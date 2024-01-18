<template>
    <header>
        <div class="wrapper" id="app">
            <!-- <HelloWorld msg="WELCOME to PXZoO" /> -->
            <nav>
                <ul>
                    <li class="headerbtn">
                        <RouterLink to="/news">最新消息</RouterLink>
                    </li>

                    <li class="headerbtn">
                        <RouterLink to="/park">園區介紹</RouterLink>
                    </li>

                    <li class="headerbtn">
                        <RouterLink to="/animal">動物資訊</RouterLink>
                    </li>
                    

                    <li class="logo">
                        <RouterLink to="/">
                            <img src="@/assets/images/header/header_logo.svg" alt="logo" />
                        </RouterLink>
                    </li>

                    <li class="headerbtn">
                        <RouterLink to="/vote">人氣投票</RouterLink>
                    </li>

                    <li class="headerbtn">
                        <RouterLink to="/school">知識學堂</RouterLink>
                    </li>

                    <li class="headerbtn">
                        <RouterLink to="/ticket">立即購票</RouterLink>
                    </li>

                    <li class="headerbtn">
                        <RouterLink to="/login">
                            <img src="@/assets/images/header/header_member.svg" alt="member" />
                        </RouterLink>
                    </li>
                </ul>
            <!-- 
            
            <RouterLink to="/member">Member</RouterLink> -->
            
            
            
            
            
            
            </nav>
        </div>
    </header>
</template>

<script>   
import { RouterLink } from 'vue-router'
    export default {
        components:{
            RouterLink
        },
        data() {
            return {
                targetValue: 0
            }   
        },
        created() {},
        methods: {}
    }
</script>