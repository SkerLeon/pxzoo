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
            <article v-for=" t in ticketsData" :key="t.tickets_id">
                <div v-if="isBoard" class="tickOption pcInnerText">
                    <p>{{ t.tickets_name }}</p>
                    <span class="pcMarkText">{{ t.tickets_rule }}</span>
                </div>
                <article>
                    <main v-if="isBoard" class="tickOption pcInnerText">
                        <h2 class="pcSmTitle">NT$ {{ t.tickets_price }}</h2>
                        <p>/ 人</p>
                    </main>
                    <article v-else class="tickOption PC">
                        <img :src="getTickImgUrl(t.tickets_id)" :alt="t.tickets_name">
                    </article>
                    <div class="countBTN">
                        <button @click="decrease(t.tickets_id)" class="pcDecMarkText">-</button>
                        <input v-model.trim="t.qty" @input="alterQty(t.tickets_id)" type="number" placeholder="0" inputmode="numeric" step="1" min="0" max="999">
                        <button @click="increase(t.tickets_id)" class="pcDecMarkText">+</button>
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

        <main class="tickBtn relative">
            <button class="defaultBtn pcInnerText" @click="previousStep">
                上一步
                <img src="@/assets/images/login/icon/btnArrow.svg">
            </button>
            <main v-show="cantNextPage" class="tickPrompt">
                <article v-html="cantNextPage" class="pcInnerText">
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
    props:{
        ticketsData: {
            type: Array,
            required: true,
        },
        ticketsQtyData:{
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
            this.isSmallPH = window.innerWidth <= 430;
            this.isBoard = window.innerWidth < 1200;
        },
        tickReset(){
            this.ticketsData.forEach((ticket) => {
                ticket.qty = 0;
            });
            this.tipriceCalculate();
        },
        getTickImgUrl(path){
            return new URL(`../../assets/images/ticket/ticket${path}.svg`, import.meta.url).href
        },
        nextStep(){
            let teamQty = this.ticketsData[2].qty;

            if(this.tipriceData > 0){
                if(teamQty>0 && teamQty<15){
                    this.cantNextPage="<p>團體票須</p><p><span class='promptYellow'>15人以上</span>!</p>";
                }else{
                    
                    // let ticketsWithQty  = this.ticketsData.filter(tick => tick.qty > 0);
                    // console.log(ticketsWithQty);

                    // ticketsWithQty.forEach(tick =>{
                    //     this.ticketsQtyData.push({
                    //         tickets_id: tick.tickets_id, 
                    //         detail_qty: tick.qty,
                    //     })
                    // })
                    // console.log(this.ticketsQtyData);

                    // qty歸零的話，原本的會刪掉嗎?
                    // 應該先抓tickets_id是否已存在，若存在則更新數值
                    // 若不存在再push
                    // 若tick.qty=0，則必須從陣列移除
                    // 或是之後直接把qty 篩選>0的pass到資料庫就好，不用寫入陣列了
                    this.$emit('goNextStep');
                }
            }else{
                this.cantNextPage="<p class='promptYellow'>票券數量,</p><p>請選擇!</p>";
            }
        },
        previousStep(){
            this.$emit('goPreviousStep');
        },
        increase(ticketId){
            if(this.ticketsData[ticketId-1].qty<999){
                this.ticketsData[ticketId-1].qty++;
                this.tipriceCalculate();
                
                console.log(this.ticketsQtyData);
                return this.ticketsData[ticketId-1].qty;
            }
        },
        decrease(ticketId){
            if(this.ticketsData[ticketId-1].qty>0){
                this.ticketsData[ticketId-1].qty--;
                this.tipriceCalculate();
                return this.ticketsData[ticketId-1].qty;
            }
        },
        tipriceCalculate(){
            let newTiprice=this.ticketsData.reduce(
                (sum, tick)=>
                sum + tick.qty* tick.tickets_price,
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
            // 因為HTML設定input type="number"，所以這邊用typeof都會得到"number"，但事實上所有input都是字串

            if(isNaN(this.ticketsData[ticketId-1].qty)){
                this.ticketsData[ticketId-1].qty = 0;
            }

            // 單票種上限
            if( parseInt(this.ticketsData[ticketId-1].qty) >999 ){
                this.ticketsData[ticketId-1].qty = 999;
            }

            // 將數值轉為整數數字
            this.ticketsData[ticketId-1].qty = parseInt(this.ticketsData[ticketId-1].qty);

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
    beforeUnmount() {
        window.removeEventListener('resize', this.windowSize);
    },
}

</script>