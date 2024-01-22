<template>
    <!-- part1 日曆 -->
    <section class="tickCalendar">

        <article>
            <hgroup>
                <h2>選擇日期</h2>
                <img src="@/assets/images/ticket/refresh.svg">
            </hgroup>
            <article>
                <img src="@/assets/images/ticket/PHcalender.svg" alt="" class="fakeCalendar">
            </article>
        </article>
        <form class="tickBtn" action="ticket.php" method="post">
            <button type="submit" class="defaultBtn tickLBtn">票種數量</button>

        </form>

    
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