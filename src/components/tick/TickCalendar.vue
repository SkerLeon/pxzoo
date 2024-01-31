<template>
    <!-- part0-2 日曆 -->
    <section class="tickCalendar">
        <!-- 本頁待辦:
            1.取得當前選擇的日子的值(分年、月、日)
            2.選擇日期傳到其他componet
            3.1/1是週一但沒休園日，條件要補改
            4.已過期的日子要呈現灰色
            5.已過期的日子&休園日都不能被選擇(滑鼠不會變成手指)
            6.下一步按鈕篩選已過期的日子&休園日，跳提示訊息
            7.下一步按鈕接會員登入篩選，if未登入則跳燈箱，else則下一頁
            8.有時間再寫localhost緩存
        -->
        <!-- ???請教老師: 
            1. 怎麼取得當前選擇的日子的值?
            2. 週一休園的標示，夜輔的老師有幫我用v-if="new Date(data.day).getDay() === 1" 抓出來，但我還是不太懂日曆套件怎麼設定，請問要寫在標籤裡、還是寫在methods裡？
        -->
        <article>
            <hgroup>
                <h2 class="pcSmTitle">選擇日期</h2>
                <img src="@/assets/images/vetor/vetor_animal_fox.svg" alt="ticket">
            </hgroup>

            <Calendar class="calendar" 
            :cell-height=38 
            :locale="{ today: '本月', type: { month: '月', year: '年' }, weekDays: ['日', '一', '二', '三', '四', '五', '六'], months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'] }"
            >
                <template #month="{date, data}">
                    <div>
                      <Badge text="休園" v-if="new Date(data.day).getDay() === 1" />
                    </div>
                </template>
            </Calendar>

        </article>

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
    },
    props:{
        tickStep:{ type: Number, },
    },
    data() {
        return {
            // date: new Date(),
            // dateFormat: 'YYYY-MM-DD',
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
            this.$emit('goNextStep');
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