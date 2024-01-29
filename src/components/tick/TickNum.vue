<template>
    <!-- part1 選擇數量 -->
    <section class="tickNum">

        <hgroup>
            <h2 class="pcSmTitle">選擇數量</h2>
            <button @click="tickReset">
                <img src="@/assets/images/ticket/refresh.svg">
            </button>
        </hgroup>
        <main>
            <article v-for=" ticket in ticketsData" :key="ticket.id">
                <div v-if="isBoard" class="tickOption pcInnerText">
                    <p>{{ ticket.name }}</p>
                    <span class="pcMarkText">{{ ticket.rule }}</span>
                </div>
                <article>
                    <main v-if="isBoard" class="tickOption pcInnerText">
                        <h2 class="pcSmTitle">NT$ {{ ticket.price }}</h2>
                        <p>/ 人</p>
                    </main>
                    <article v-else class="tickOption PC">
                        <img :src="ticket.src" :alt="ticket.name">
                    </article>
                    <div class="countBTN">
                        <button @click="increase(ticket.id)" class="pcDecMarkText">+</button>
                        <input v-model.trim="ticket.qty" @input="alterQty(ticket.id)" type="number" placeholder="0" inputmode="numeric" step="1" min="0" max="999">
                        <!-- v-model與:value 不建議同時存在 -->
                        <button  @click="decrease(ticket.id)" class="pcDecMarkText">-</button>
                    </div>
                </article>
            </article>
        </main>

        <div class="price firstLine pcInnerText important">
            <p>票券金額</p>
            <div class="pcSmTitle">
                <p>NT$</p> 
                <h2>{{tipriceData}}</h2>
            </div>
        </div>

        <main class="tickBtn">
            <button class="defaultBtn pcInnerText" @click="previousStep">
                上一步
                <img src="@/assets/images/login/icon/btnArrow.svg">
            </button>
            <main v-show="cantNextPage">
                <article class="pcInnerText">
                    <p>票券數量,</p> 
                    <p>請選擇!</p>
                </article>
                <img v-if="isSmallPH" src="@/assets/images/ticket/tickConversation_1s.svg" alt="提示訊息">
                <img v-else src="@/assets/images/ticket/tickConversation_1.svg" alt="提示訊息">
            </main>

            <button type="button" class="tickLBtn defaultBtn pcInnerText" @click="nextStep">
                立即購票
                <img src="@/assets/images/login/icon/btnArrow.svg">
            </button>

        </main>    
    </section>
</template>

<script>
export default {
    components:{
        // RouterLink,
    },
    props:{
        // 丟資料的key值
        // validator 驗證規則內不可讀取 data. computed 屬性
        // validator: value => value>0,
        tickStep:{ type: Number, },
        ticketsData: {
            type: Array,
            required: true,
        },
        tipriceData: {
            type: Number,
            required: true,
        },
    },
    data(){
        return {
            cantNextPage: false,
        }
    },
    methods:{
        windowSize(){
            // this.isMobile = window.innerWidth <= 768;
            this.isSmallPH = window.innerWidth <= 430;
            this.isBoard = window.innerWidth < 1200;
        },
        tickReset(){
            this.ticketsData.forEach((ticket) => {
                ticket.qty = 0;
            });
            this.tipriceCalculate();
        },
        nextStep(){
            // 999寫確認有選票券的判斷式
            if(this.tipriceData > 0){
                this.$emit('goNextStep');
            }else{
                console.log("請至少選擇一張票券");
                this.cantNextPage=true;
            }
        },
        previousStep(){
            this.$emit('goPreviousStep');
        },
        increase(ticketId){
            let ticket = this.ticketsData.find(
                (tick) => tick.id === ticketId
            );
            if(ticket.qty<999){
                ticket.qty++;
                this.tipriceCalculate();
                return ticket.qty;
            }
        },
        decrease(ticketId){
            let ticket = this.ticketsData.find(
                (tick) => tick.id === ticketId
            );
            if(ticket.qty>0){
                ticket.qty--;
                this.tipriceCalculate();
                return ticket.qty;
            }
        },
        tipriceCalculate(){
            let newTiprice=this.ticketsData.reduce(
                (sum, ticket)=>
                sum + ticket.qty* ticket.price,
            0);
            
            if(isNaN(newTiprice)){
                newTiprice = 0;
            }

            this.$emit('newTiprice', newTiprice);

            // arr.reduce(function(accumulator, currentValue, index, array) {
                // Do stuff with accumulator and currentValue (index, array, and initialValue are optional)
            // }, initialValue);
        },
        alterQty(ticketId){
            let ticket = this.ticketsData.find(
                (tick) => tick.id === ticketId
            );
            console.log(ticket.qty);
            console.log(typeof ticket.qty); // 因為HTML設定input type="number"，所以這邊用typeof都會得到"number"，但事實上所有input都是字串

            if(isNaN(ticket.qty)){
                console.log(ticket.qty);
                ticket.qty = 0;
                console.log(ticket.qty);
            }

            // 單票種上限
            if(parseInt(ticket.qty) >999){
                ticket.qty = 999;
                console.log("max", ticket.qty);
            }

            // 將數值轉為整數數字
            ticket.qty = parseInt(ticket.qty);

            this.tipriceCalculate();
        },

    },
    computed:{
    // computed 不需 $emit 傳遞值，會自動被 Vue 監聽，當值發生變化時，它會通知使用這個值的地方進行更新


    },
    watch:{

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