<template>
    <!-- part10-2 日曆 -->
    <section class="tickCalendar">

        <article>
            <hgroup>
                <h2 class="pcSmTitle">選擇日期</h2>
                <img src="@/assets/images/vetor/vetor_animal_fox.svg" alt="ticket">
            </hgroup>

            <Calendar class="calendar" 
            v-model="tidate" 
            :cell-height=40 
            :date-format="dateFormat" 
            :locale="{ today: '本月', type: { month: '月', year: '年' }, weekDays: ['日', '一', '二', '三', '四', '五', '六'], months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'] }"
            >
                <template v-slot:month="{date, data}">
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
        <img v-if="isBoard" src="@/assets/images/vetor/vetor_animal_squirrel_1.svg" alt="eagle">
    </section>
</template>

<script>
export default {
    components:{
        // RouterLink,
        tickStep:1,
        tidate: new Date,

    },
    props:{
        // 丟資料的key值
        'tickStep':{ type: Number },
        // 'tidate': {
        //     type: Date,
        //     required: true,
        // },
    },
    data() {
        return {
            dateFormat: 'YYYY-MM-DD',
            selectedDate: new Date(),
            // TickNumOpen: true,
            // targetValue:0,
        }
    },
    methods:{
        windowSize(){
            this.isBoard = window.innerWidth < 1200;
        },
        nextStep(){
            // 999寫確認有選日期的判斷式
            this.$emit('nextStep');
        }
    },
    watch:{
        // selectedDate(newValue){
        //     console.log("當前Date", newValue);
            
        //     this.$emit("transferDate", this.selectedDate);
        // },
    },
    created(){
        this.windowSize();
        window.addEventListener('resize', this.windowSize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.windowSize);
    },
}

</script>

<style>



</style>