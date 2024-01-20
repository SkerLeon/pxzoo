<template>
    <section class="tickCalendar">


    <!-- part1 日曆 -->
        <article>
            <hgroup>
                <h2>選擇日期</h2>
                <img src="/images/ticket/refresh.svg">
            </hgroup>
            <article>
                <img src="/images/ticket/PHcalender.svg" alt="" class="fakeCalendar">
            </article>
        </article>
        <div class="tickBtn">
            <button  v-if="isMobile">上一步</button>
            <button class="tickLBtn">票種數量</button>
        </div>

    
    </section>
</template>

<script>
export default {
    components:{
        // RouterLink,

    },
    data() {
        return {
            isMobile: window.innerWidth <= 768,
            // targetValue:0,
        }
    },
    created(){
        window.addEventListener('resize', this.windowSize);
    },
    methods:{
        windowSize(){
            this.isMobile = window.innerWidth <= 768;
        },
    }
}

</script>

<style>



</style>