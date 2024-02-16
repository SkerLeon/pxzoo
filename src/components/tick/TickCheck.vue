<template>
    <!-- part2 付款頁 -->
    <section class="tickCheck">
        <!-- 本頁待辦:
            2.信用卡卡號篩選(only0-9、上限19位數)
            3.有效日期月篩選(only1-12)
            4.有效日期年篩選(only今年-+50年)
            5.驗證碼篩選(only0-9、上限3位數)
            6.下一步條件: 
                (3)信用卡input篩選
            7.界接綠界(或下一步條件篩信用卡發款邏輯)
            8.noCoupon: false, // 等界接後這個值由會員優惠紀錄決定
        -->

        <h2 class="pcSmTitle">請確認您的訂單資訊</h2>
        <hgroup class="pcInnerText">
            <p>票卷日期</p>
            <h2 class="pcSmTitle mixedFont">
                {{tidateData.getFullYear()}} 
                <p class="pcInnerText">年</p>
                {{tidateData.getMonth()+1}}
                <p class="pcInnerText">月</p>
                {{tidateData.getDate()}}
                <p class="pcInnerText">日</p>
            </h2>
        </hgroup>
        <article class="choosed">
            <main v-for=" t in ticketsData" :key="t.tickets_id">
                <div>
                    <p class="pcInnerText">{{ t.tickets_name }}</p>
                    <span class="pcMarkText">{{ t.tickets_rule }}</span>
                </div>
                <h2 class="pcSmTitle">
                        {{ t.qty }} 
                    <span class="pcMarkText">張</span>
                </h2>
            </main>
        </article>
        <hgroup class="coupon pcInnerText">
            <h2 class="pcSmTitle">優惠折扣</h2>
            <p v-if="noCoupon">目前沒有優惠券</p>
            <select v-else class="pcInnerText" v-model="couData">
                <option value="null" disabled hidden>請選擇優惠券</option>
                <option v-for="(coupon, couponIndex) in couponsData" :key="coupon.id" :value="coupon.option">{{ coupon.option }}</option>
            </select>
        </hgroup>
        <div class="price">
            <span>票券金額</span>
            <div class="pcInnerText">
                <span class="pcMarkText">NT$</span>
                <p>{{tipriceData}}</p>
            </div>
        </div>
        <div class="price">
            <span>優惠金額</span>
            <div class="pcInnerText">
                <span class="pcMarkText">NT$</span>
                <p>{{coupriceData}}</p>
            </div>
        </div>
        <div class="price important">
            <p class="pcInnerText">付款金額</p>
            <div class="mixedFont pcSmTitle">
                <p class="pcInnerText">NT$</p>
                <h2>{{paypriceData}}</h2>
            </div>
        </div>
        <article class="payWay">
            <hgroup>
                <h2 class="pcSmTitle">付款方式</h2>
                <select v-model="paywayData" 
                class="pcInnerText">
                    <option value="null" disabled hidden>請選擇付款方式</option>
                    <option v-for="(payway, paywayIndex) in paywaysData" :key="payway.Id" :value="payway.option">{{ payway.option }}</option>
                </select>
            </hgroup>
            <div class="price pcInnerText important">
                <p>票券型態</p>
                <p >{{ paywayTTData }}</p>
            </div>
            <article v-if="paywayData === '信用卡'
            ">
                <main class="pcInnerText">
                    <p>信用卡卡號</p>
                    <input v-model.trim="cardId" @input="enterCardId" type="number" placeholder="請輸入卡號">
                </main>
                <main class="pcInnerText carddate">
                    <p>有效日期</p>
                    <main>
                        <input v-model.trim="cardMonth" @input="enterCardMonth" type="number" :placeholder=" isSmallPH? '信用卡月' : '請輸入信用卡月' ">
                        <p> / </p> 
                        <input v-model.trim="cardYear" @input="enterCarYear" type="number" :placeholder=" isSmallPH? '信用卡年' : '請輸入信用卡年' ">
                    </main>
                </main>
                <main class="pcInnerText">
                    <p>驗證碼</p>
                    <input v-model.trim="cardCode" @input="enterCardCode" type="text" :placeholder=" isSmallPH? '卡後末三碼' : '請輸入卡片背面末三碼' " class="defaultInput">
                </main>
            </article>
        </article>

        <main class="tickBtn relative">
            <button class="defaultBtn pcInnerText" @click="previousStep">
                上一步
                <img src="@/assets/images/login/icon/btnArrow.svg">
            </button>

            <main v-show="cantNextPage" class="tickPrompt">
                <article v-html="cantNextPage" class="pcInnerText">
                </article>
                <img src="@/assets/images/ticket/tickConversation_2.png" alt="提示訊息">
            </main>
            <button class="tickLBtn defaultBtn pcInnerText" @click="nextStep">
                送出訂單
                <img src="@/assets/images/login/icon/btnArrow.svg">
            </button>
        </main>
    </section>
</template>

<script>
export default {
    components:{},
    props:{
        tidateData:{
            type: Date,
            required: true,
        },
        ticketsData: {
            type: Array,
            required: true,
        },
        tipriceData: {
            type: Number,
            required: true,
        },
        couponsData: {
            type: Array,
            required: true,
        },
        couData: {
            type: String,
            required: true,
        },
        coupriceData: {
            type: Number,
            required: true,
        },
        paypriceData: {
            type: Number,
            required: true,
        },
        paywaysData: {
            type: Array,
            required: true,
        },
        paywayData: {
            type: String,
            required: true,
        },
        paywayTTData: {
            type: String,
            required: true,
        },
    },
    data(){
        return {
            noCoupon: false, // 等界接後這個值由會員優惠券紀錄決定
            isSmallPH: false,
            cantNextPage: false,
            cardId: null,
            cardMonth: null,
            cardYear: null,
            cardCode: null,
        }
    },
    // computed: { //watch要做其他事情,value綁id跟值比較好
    //     selectedPayway: {
    //         get() {
    //             return this.paywayOpData
    //         },
    //         set(newVal) {
    //            this.$emit('newPayway', newVal)
    //         },
    //     }
    // },
    methods:{
        checkInputs(){
            // const inputs = [this.cardId, this.cardMonth, this.cardYear, this.cardCode];
            // inputs.forEach( (value, index) =>{
            //     console.log(index);
            //     console.log(value);

            //     if(value === null){
            //         this.focus();
            //     }
            // });
        },
        nextStep(){
            if(this.paywayData === null){
                this.cantNextPage="<p class='promptYellow'>付款方式</p><p>請選擇~</p>";
            }else if(this.paywayData === '信用卡'){
                this.checkInputs();
                // 999寫確認信用卡的判斷式
                this.cantNextPage="<p>請填寫~</p><p class='promptYellow'>信用卡資訊</p>";
            }else{
                this.$emit('goNextStep');
            }
        },
        previousStep(){
            this.$emit('goPreviousStep');
        },
        windowSize(){
            this.isSmallPH = window.innerWidth <= 430;
        },
    },
    computed:{
        couData:{
            get(){
                return this.couData;
            },
            set(value){
                this.$emit('newCoupon', value);
            },
        },
        paywayData:{
            get(){
                return this.paywayData;
            },
            set(value){
                console.log(value);
                this.$emit('newPayway', value);
            },
        },

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