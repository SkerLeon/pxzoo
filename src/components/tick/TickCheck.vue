<template>
    <!-- part2 付款頁 -->
    <section class="tickCheck">
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
            <main v-for=" ticket in tickets" :key="ticket.id">
                <div>
                    <p class="pcInnerText">{{ ticket.name }}</p>
                    <span class="pcMarkText">{{ ticket.rule }}</span>
                </div>
                <h2 class="pcSmTitle">1 
                    <span class="pcMarkText">張</span>
                </h2>
            </main>
        </article>
        <hgroup class="coupon pcInnerText">
            <h2 class="pcSmTitle">優惠折扣</h2>
            <p v-if="noCoupon">目前沒有優惠券</p>
            <select v-else name="" id="coupon" v-model="selectedCoupon">
                <option value="" disabled selected hidden>請選擇優惠券</option>
                <option v-for="(coupon, couponIndex) in couponList" :key="coupon.Id" :value="coupon.value">{{ coupon.option }}</option>
            </select>
        </hgroup>
        <div class="price">
            <span>票券金額</span>
            <div class="pcInnerText">
                <span class="pcMarkText">NT$</span>
                <p>260</p>
            </div>
        </div>
        <div class="price">
            <span>優惠金額</span>
            <div class="pcInnerText">
                <span class="pcMarkText">NT$</span>
                <p>26</p>
            </div>
        </div>
        <div class="price important">
            <p class="pcInnerText">付款金額</p>
            <div class="mixedFont pcSmTitle">
                <p class="pcInnerText">NT$</p>
                <h2>234</h2>
            </div>
        </div>
        <article class="payWay">
            <hgroup>
                <h2 class="pcSmTitle">付款方式</h2>
                <select name="" id="payway" v-model="selectedPay">
                    <option value="" disabled selected hidden>請選擇付款方式</option>
                    <option v-for="(payway, paywayIndex) in paywayList" :key="payway.Id" :value="payway">{{ payway.option }}</option>
                </select>
            </hgroup>
            <div class="price pcInnerText important">
                <p>票券型態</p>
                <p >{{ selectedPay.tickType }}</p>
            </div>
            <article v-if="selectedPay.value === 'card'">
                <main class="pcInnerText">
                    <p>信用卡卡號</p>
                    <input v-model.lazy="cardid" type="number" placeholder="請輸入卡號">
                </main>
                <main class="pcInnerText carddate">
                    <p>有效日期</p>
                    <main>
                        <input v-model.lazy="cardMonth" type="number" :placeholder=" isSmallPH? '信用卡月' : '請輸入信用卡月' ">
                        <p> / </p> 
                        <input v-model.lazy="cardYear" type="number" :placeholder=" isSmallPH? '信用卡年' : '請輸入信用卡年' ">
                    </main>
                </main>
                <main class="pcInnerText">
                    <p>驗證碼</p>
                    <input v-model.lazy="cardCode" type="text" :placeholder=" isSmallPH? '卡後末三碼' : '請輸入卡片背面末三碼' " class="defaultInput">
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
        // RouterLink,
    },
    props:{
        // 丟資料的key值
        'tickStep':{ type: Number },
    },
    data(){
        return {
            tickets: [
                {
                    id: 1,
                    name: '成人票',
                    rule: '18~64 歲',
                    price: 100,
                    src: 'src/assets/images/ticket/ticket1.svg'
                },
                {
                    id: 2,
                    name: '兒童票',
                    rule: '4~11 歲',
                    price: 80,
                    src: 'src/assets/images/ticket/ticket2.svg'
                },
                {
                    id: 3,
                    name: '學生票',
                    rule: '12 歲以上(含)持學生證者',
                    price: 40,
                    src: 'src/assets/images/ticket/ticket3.svg'
                },
                {
                    id: 4,
                    name: '愛心票',
                    rule: '65 歲以上(含)',
                    price: 4100,
                    src: 'src/assets/images/ticket/ticket4.svg'
                },
                {
                    id: 5,
                    name: '團體票',
                    rule: '15 人以上適用',
                    price: 60,
                    src: 'src/assets/images/ticket/ticket5.svg'
                },
            ],
            isSmallPH: false,
            selectedCoupon: '',
            selectedPay: '',
            couponList: [
                { 
                    id: 1,
                    option: '不使用優惠券',
                    value: 1,
                },
                {
                    id: 2,
                    option: '付款金額 9 折',
                    value: 0.9,
                },
                { 
                    id: 3,
                    option: '付款金額 95 折',
                    value: 0.95,
                },
            ],
            paywayList: [
                { 
                    id: 1,
                    option: '信用卡',
                    value: 'card',
                    tickType: '數位票券',
                },
                {
                    id: 2,
                    option: '現場付款',
                    value: 'cash',
                    tickType: '實體票券',
                },
            ],
        }
    },
    methods:{
        nextStep(){
            // 999寫確認有選付款方式的判斷式
            // 999寫確認信用卡的判斷式
            this.$emit('nextStep');
        },
        previousStep(){
            this.$emit('previousStep');
        },
        windowSize(){
            this.isSmallPH = window.innerWidth <= 430;
        },
    },
    computed:{},
    watch:{
        selectedCoupon(newValue){
            console.log("當前Coupon", newValue);
            
            this.$emit("transferCoupon", this.selectedCoupon);
        },
        selectedPay(newValue){
            console.log("當前Pay", newValue);
            console.log("當前Pay", newValue.value);
            console.log("當前Pay", newValue.tickType);
            // 觸發 transferPay 事件，傳遞選擇的支付方式選項
            this.$emit("transferPay", newValue.value);
            this.$emit("transferTickType", newValue.tickType);
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

<style>



</style>