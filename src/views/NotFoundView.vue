<template>
    <div class="notFound forHeader">
        <h1>404</h1>
        <Button type="info" @click="goHome">返回首頁</Button>
    </div>
</template>

<script>
    export default {
        data () {
            return {}
        },
        methods: {
            goHome() {
                this.$router.push({ 
                    name: 'home'
                // 須與index.js寫的一致
                })
            }
        },
    };
</script>
  
<style lang="scss">
</style>
  