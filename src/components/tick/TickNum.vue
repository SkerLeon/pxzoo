<template>
    <!-- part1 選擇數量 -->
    <section class="tickNum">

        <hgroup>
            <h2 class="pcSmTitle">選擇數量</h2>
    <!-- 999reset input的reset必須跟對象在同個form，因此無法使用-->
            <img src="@/assets/images/ticket/refresh.svg">
        </hgroup>
        <main>
            <article v-for=" ticket in tickets" :key="ticket.id">
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
    <!-- 999有空寫: input框寫JS限定 -->
                        <input v-model.trim="ticket.qty" @input="alterQty(ticket.id)" type="number" placeholder="0" inputmode="numeric" step="1" min="0" max="999" value="0" readonly>
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
                <h2>{{tiprice}}</h2>
            </div>
        </div>

        <main class="tickBtn">
            <button class="defaultBtn pcInnerText" @click="previousStep">
                上一步
                <img src="@/assets/images/login/icon/btnArrow.svg">
            </button>
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
        'tickStep':{ type: Number },
        // 'tiprice': {
        //     type: Number,
        //     required: true,
        //     // 驗證規則內不可讀取 data. computed 屬性
        //     // validator: value => value>0,
        // },
    },
    data(){
        return {
            tickets:[
                {
                    id: 1,
                    name: '成人票',
                    rule: '18~64 歲',
                    price: 100,
                    src: 'src/assets/images/ticket/ticket1.svg',
                    qty: 0,
                },
                {
                    id: 2,
                    name: '學生票',
                    rule: '12 歲以上(含)持學生證者',
                    price: 80,
                    src: 'src/assets/images/ticket/ticket2.svg',
                    qty: 0,
                },
                {
                    id: 3,
                    name: '團體票',
                    rule: '15 人以上適用',
                    price: 60,
                    src: 'src/assets/images/ticket/ticket3.svg',
                    qty: 0,
                },
                {
                    id: 4,
                    name: '兒童票',
                    rule: '4~11 歲',
                    price: 40,
                    src: 'src/assets/images/ticket/ticket4.svg',
                    qty: 0,
                },
                {
                    id: 5,
                    name: '愛心票',
                    rule: '65 歲以上(含)',
                    price: 40,
                    src: 'src/assets/images/ticket/ticket5.svg',
                    qty: 0,
                },
            ],
        }
    },
    methods:{
        windowSize(){
            // this.isMobile = window.innerWidth <= 768;
            this.isBoard = window.innerWidth < 1200;
        },
        nextStep(){
            // 999寫確認有選票券的判斷式
            this.$emit('nextStep');
        },
        previousStep(){
            this.$emit('previousStep');
        },
        increase(ticketId){
            let ticket = this.tickets.find(
                (tick) => tick.id === ticketId
            );

            if(ticket.qty<999){
                ticket.qty++;
                return ticket.qty;
            }
        },
        decrease(ticketId){
            let ticket = this.tickets.find(
                (tick) => tick.id === ticketId
            );

            if(ticket.qty>0){
                ticket.qty--;
                return ticket.qty;
            }
        },
        alterQty(ticketId){
            let ticket = this.tickets.find(
                (tick) => tick.id === ticketId
            );

            console.log(ticket.qty);
            console.log(typeof ticket.qty); // 因為HTML設定input type="number"，所以這邊用typeof都會得到"number"，但事實上所有input都是字串


            // newQty=ticket.qty.replace(/[^\d]/g, '');
            // console.log(newQty);
            // return newQty // 正規表示式抓出非數字字元

            // console.log(e);
            // console.log(this);

            // for(let i=0; i<qty.length; i++){
            //     let t =qty.charAt(i);
            //     if(t = /[^\d]/g)
            // }


            // let f=qty.charAt(0);

            // if(qty>999){
            //     qty=999;
            //     return qty;
            // }

            // return qty;
        },

    },
    computed:{
    // computed 不需 $emit 傳遞值，會自動被 Vue 監聽，當值發生變化時，它會通知使用這個值的地方進行更新

        tiprice(){
            console.log(this.tickets.reduce(
                (sum, ticket)=>
                sum + ticket.qty* ticket.price,
            0));
            return this.tickets.reduce(
                (sum, ticket)=>
                sum + ticket.qty* ticket.price,
            0);
        // arr.reduce(function(accumulator, currentValue, index, array) {
            // Do stuff with accumulator and currentValue (index, array, and initialValue are optional)
        // }, initialValue);
        },
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