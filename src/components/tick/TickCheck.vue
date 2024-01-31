<template>
    <!-- part2 付款頁 -->
    <section class="tickCheck">
        <!-- 本頁待辦:
            1.引入票卷日期(格式分 年月日)
            2.信用卡卡號篩選(only0-9、上限19位數)
            3.有效日期月篩選(only1-12)
            4.有效日期年篩選(only今年-+50年)
            5.驗證碼篩選(only0-9、上限3位數)
            6.下一步條件: 
                (1)付款方式必選，跳提示
                (2)if信用卡則input必填，跳提示
                (3)信用卡input
            7.界接綠界(或下一步條件篩信用卡發款邏輯)
            8.noCoupon: false, // 等界接後這個值由會員優惠紀錄決定
        -->

        <h2 class="pcSmTitle">請確認您的訂單資訊</h2>
        <hgroup class="pcInnerText">
            <p>票卷日期</p>
            <h2 class="pcSmTitle mixedFont">2024 
                <p class="pcInnerText">年</p>
                 01  
                <p class="pcInnerText">月</p>
                 12 
                 <p class="pcInnerText">日</p>
            </h2>
        </hgroup>
        <article class="choosed">
            <main v-for=" ticket in ticketsData" :key="ticket.id">
                <div>
                    <p class="pcInnerText">{{ ticket.name }}</p>
                    <span class="pcMarkText">{{ ticket.rule }}</span>
                </div>
                <h2 class="pcSmTitle">
                        {{ ticket.qty }} 
                    <span class="pcMarkText">張</span>
                </h2>
            </main>
        </article>
        <hgroup class="coupon pcInnerText">
            <h2 class="pcSmTitle">優惠折扣</h2>
            <p v-if="noCoupon">目前沒有優惠券</p>
            <select v-else name="" class="pcInnerText" v-model="selectedCoupon" 
            @change="chooseCoupon()">
                <option value="null" disabled hidden>請選擇優惠券</option>
                <option v-for="(coupon, couponIndex) in couponsData" :key="coupon.id" :value="coupon">{{ coupon.option }}</option>
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
                <select name="" v-model="selectedPayway"
                @change="choosePayway()" class="pcInnerText">
                    <option value="null" disabled hidden>請選擇付款方式</option>
                    <option v-for="(payway, paywayIndex) in paywaysData" :key="payway.Id" :value="payway">{{ payway.option }}</option>
                </select>
            </hgroup>
            <div class="price pcInnerText important">
                <p>票券型態</p>
                <p >{{ paywayTTData }}</p>
            </div>
            <article v-if="paywayOpData === '信用卡'">
                <main class="pcInnerText">
                    <p>信用卡卡號</p>
                    <input type="number" placeholder="請輸入卡號">
                </main>
                <main class="pcInnerText carddate">
                    <p>有效日期</p>
                    <main>
                        <input type="number" :placeholder=" isSmallPH? '信用卡月' : '請輸入信用卡月' ">
                        <p> / </p> 
                        <input type="number" :placeholder=" isSmallPH? '信用卡年' : '請輸入信用卡年' ">
                    </main>
                </main>
                <main class="pcInnerText">
                    <p>驗證碼</p>
                    <input type="text" :placeholder=" isSmallPH? '卡後末三碼' : '請輸入卡片背面末三碼' " class="defaultInput">
                </main>
            </article>
        </article>

        <main class="tickBtn">
            <button class="defaultBtn pcInnerText" @click="previousStep">
                上一步
                <img src="@/assets/images/login/icon/btnArrow.svg">
            </button>
            <button class="tickLBtn defaultBtn pcInnerText" @click="nextStep">
                送出訂單
                <img src="@/assets/images/login/icon/btnArrow.svg">
            </button>
        </main>
    </section>
</template>

<script>
export default {
    components:{
    },
    props:{
        // validator 驗證規則內不可讀取 data. computed 屬性
        // validator: value => value>0,
        tickStep:{ type: Number },
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
        couponOpData: {
            type: String,
            required: true,
        },
        couponValData: {
            type: Number,
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
        paywayOpData: {
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
            selectedCoupon: null,
            selectedPayway: null,
        }
    },
    // ???請問小龜老師: 
    // 我目前emit的function都放在methods，但我還不太了解什麼應該放computed/watch/mouted...
    // computed: { //watch要做其他事情,value綁id跟值比較好
    //     selectedPayway: {
    //         get() {
    //             return this.paywayOpData
    //         },
    //         set(nVal) {
    //            this.$emit('newPayway', nVal)
    //         },
    //     }
    // },
    methods:{
        nextStep(){
            // 999寫確認有選付款方式的判斷式
            // 999寫確認信用卡的判斷式
            this.$emit('goNextStep');
        },
        previousStep(){
            this.$emit('goPreviousStep');
        },
        windowSize(){
            this.isSmallPH = window.innerWidth <= 430;
        },
        chooseCoupon(){
            // 不可直接修改props值
            // 由於 JS 浮點數的表示並不是精確的，計算結果可能會導致誤差(電腦內部使用二進製表示浮點數)
            let coupriceCal =  parseInt(
                (this.tipriceData * (1 - this.selectedCoupon.value)).toFixed(2)
            );
            let paypriceCal = this.tipriceData - coupriceCal;

            this.$emit("newCoupon", this.selectedCoupon.option, this.selectedCoupon.value, coupriceCal, paypriceCal);
        },
        choosePayway(){
            console.log("票券型態", this.selectedPayway.tickType);
            console.log("付款方式", this.selectedPayway.option);

            this.$emit("newPayway", this.selectedPayway.option, this.selectedPayway.tickType);
        },
    },
    computed:{},
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