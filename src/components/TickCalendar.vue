<template>
    <!-- part1 日曆 -->
    <section class="tickCalendar">

        <article>
            <hgroup>
                <h2>選擇日期</h2>
                <img src="@/assets/images/ticket/refresh.svg">
            </hgroup>
            <article></article>

                <Calendar v-model="value" type="year" cell-height="40" class="calendar">
                    <template #month="{date, data}">
                        <!-- <div>
                            <Badge status="warning" text="看苹果发布会" v-if="data.day === '2019-09-11'" />
                            <Badge status="success" text="中秋节" v-if="data.day === '2019-09-13'" />
                            <Badge status="error" text="国庆节" v-if="data.day === '2019-10-01'" />
                        </div> -->
                    </template>
                </Calendar>





            <!-- <article>
                <img src="@/assets/images/ticket/PHcalender.svg" alt="" class="fakeCalendar">
            </article> -->
        </article>
        <!-- 
            這邊不要用form表單，用axios傳送post會比較好掌握
            通常這邊不用換頁面(url)的方式做，資料會容易消失
            用div去控制步驟就好了
         -->
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