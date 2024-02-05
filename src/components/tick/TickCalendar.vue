<template>
    <!-- part0-2 日曆 -->
    <section class="tickCalendar">
        <!-- 本頁待辦:
            4.已過期的日子要呈現灰色
            5.已過期的日子&休園日都不能被選擇(滑鼠不會變成手指)
            7.下一步按鈕接會員登入篩選，if未登入則跳燈箱，else則下一頁
            8.有時間再寫localhost緩存
            9.串接行政院行事曆
        -->
        <article>
            <hgroup>
                <h2 class="pcSmTitle">選擇日期</h2>

                <main v-show="cantNextPage" class="tickPrompt">
                    <article v-html="cantNextPage" class="pcInnerText">
                    </article>
                    <img src="@/assets/images/ticket/tickConversation_0.png" alt="提示訊息">
                </main>

                <img src="@/assets/images/vetor/vetor_animal_fox.svg" alt="ticket_decoratoin">
            </hgroup>
            <Calendar class="calendar" 
            v-model="bindTidateData" 
            :cell-height=38 
            :locale="{ today: '本月', type: { month: '月', year: '年' }, weekDays: ['日', '一', '二', '三', '四', '五', '六'], months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'] }" 
            >
                <template #month="{date, data}">
                    <div>
                        <Badge text="休園" v-if="offDate(data.day)" />
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
    props:{
        tidateData:{
            type: Date,
            required: true,
        },
    },
    data() {
        return {
            cantNextPage: false,
        }
    },
    methods:{
        windowSize(){
            this.isBoard = window.innerWidth < 1200;
        },
        nextStep(){
            const today = new Date();
            today.setHours(17, 0, 0, 0);
            // 將 today 變數的時間部分設定為午夜（00:00:00:000），同時保留本地時區，today 代表的是當前日期
            if (this.tidateData.getTime() < today.getTime()) {
                this.cantNextPage="<p class='promptYellow'>時間已過</p><p>請重新選擇!</p>";
            }else if( this.offDate(this.tidateData) ){
                this.cantNextPage="<p class='promptYellow'>休園日nono</p><p>請重新選擇!</p>";
            }else{
                this.$emit('goNextStep');
            }
        },
        offDate(day){
            return new Date(day).getDay() === 1 && !(new Date(day).getMonth() === 0 && new Date(day).getDate() === 1) && !(new Date(day).getMonth() === 2 && new Date(day).getDate() === 12) && !(new Date(day).getMonth() === 5 && new Date(day).getDate() === 10);
        },
        // dateRender(date){
        //     console.log("dateRender");
        // //  date-render 是iView 日曆組件中的 props，允許自定義每個日期的呈現方式。你需要提供一個函數，該函數接受一個日期作為輸入，並返回一個表示應該應用於該日期的樣式的字符串。
        //     const today = new Date();
        //     today.setHours(0, 0, 0, 0);
            
        //     // 將 today 變數的時間部分設定為午夜（00:00:00:000），同時保留本地時區，today 代表的是當前日期
        //     if (date < today) {
        //         return {
        //             disabled: true, // 表示禁用
        //         };
        //     }
        //     return {};
        // },
        // disabledDate(date) {
        //     console.log("disabledDate");
        // // disabled-date 是 iView 日曆組件中的 props，用於禁用日曆中的特定日期。你需要提供一個函數，該函數接受一個日期作為輸入，並返回一個布爾值，指示該日期是否應該被禁用。
        //     const today = new Date();
        //     today.setHours(0, 0, 0, 0);

        //     return date < today;
        // },
    },
    computed:{
        bindTidateData:{
            get(){
                return this.tidateData;
            },
            set(value){
                this.$emit('newDate', value);
            },
        },
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