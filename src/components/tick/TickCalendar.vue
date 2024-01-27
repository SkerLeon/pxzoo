<template>
    <!-- part10-2 日曆 -->
    <section class="tickCalendar">

        <article>
            <hgroup>
                <h2 class="pcSmTitle">選擇日期</h2>
    <!-- 999加一隻動物取代reset的位置 -->
                <!-- <img src="@/assets/images/ticket/refresh.svg"> -->
            </hgroup>

                <Calendar v-model="value" cell-height="40" class="calendar">
                    <template #month="{date, data}">
                        <div>
    <!-- 999休園日: 1.不能被選擇 2.游標禁止樣式 3.處理特殊開園日 -->
                            <Badge text="休園" v-if="new Date(data.day).getDay() === 1" />
                        </div>
                    </template>
                </Calendar>

        </article>
        <!-- 🐢:
            這邊不要用form表單，用axios傳送post會比較好掌握
            通常這邊不用換頁面(url)的方式做，資料會容易消失
            用div去控制步驟就好了
        -->
        <main class="tickBtn">
            <button type="button" class="defaultBtn tickLBtn pcInnerText" @click="nextStep">
                票種數量
                <img src="@/assets/images/login/icon/btnArrow.svg">
            </button>
        </main>
    
    </section>
</template>

<script>
export default {
    components:{
        // RouterLink,
        tickStep:1,

    },
    props:[
        // 丟資料的key值
        'tickStep',
    ],
    data() {
        return {
            // TickNumOpen: true,
            // targetValue:0,
        }
    },
    created(){
        // this.windowSize();
        // window.addEventListener('resize', this.windowSize);
    },
    methods:{
        // windowSize(){
        //     this.isMobile = window.innerWidth <= 768;
        //     this.isSmallPC = window.innerWidth <= 1350;
        // },
        nextStep(){
            // 999寫確認有選日期的判斷式
            this.$emit('nextStep');
        }

    }
}

</script>

<style>



</style>