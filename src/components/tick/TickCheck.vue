<template>
    <!-- part2 付款頁 -->
    <section class="tickCheck">
        <h2>請確認您的訂單資訊</h2>
        <hgroup>
            <p>票卷日期</p>
            <h2 class="mixedFont">2024 <p>年</p> 01 <p>月</p> 12 <p>日</p> </h2>
        </hgroup>
        <article class="choosed">
            <main v-for=" ticket in tickets" :key="ticket.id">
                <div>
                    <p>{{ ticket.name }}</p>
                    <span>{{ ticket.rule }}</span>
                </div>
                <h2>1 <span>張</span></h2>
            </main>
        </article>
        <hgroup class="coupon">
            <h2>優惠折扣</h2>
            <p v-if="noCoupon">目前沒有優惠券</p>
            <select v-else name="payway[]" id="payway" placeholder="請選擇優惠券">
                <option value="noUse">不使用優惠券</option>
                <option value="coupon1">付款金額 9 折</option>
                <option value="coupon2">付款金額 95 折</option>
            </select>
        </hgroup>
        <div class="price">
            <span>票券金額</span>
            <span class="mixedFont">NT$ <p>260</p></span>
        </div>
        <div class="price">
            <span>優惠金額</span>
            <span class="mixedFont">NT$ <p>26</p></span>
        </div>
        <div class="price">
            <p>付款金額</p>
            <h2 class="important mixedFont"><p>NT$</p> 234</h2>
        </div>
        <article class="payWay">
            <hgroup>
                <h2>付款方式</h2>

                <select name="payway[]" id="payway" placeholder="請選擇付款方式">
                    <option value="card">信用卡</option>
                    <option value="cash">現場付款</option>
                </select>

            </hgroup>
            <div class="price">
                <p>票券型態</p>
                <p class="important">實體票券</p>
            </div>
            <main>
                <p>信用卡卡號</p>
                <input type="number" placeholder="請輸入卡號">
            </main>
            <main>
                <p>有效日期</p>
                <main>
                    <input type="number" placeholder="請輸入信用卡月">
                    <p> / </p> 
                    <input type="number" placeholder="請輸入信用卡年">
                </main>
            </main>
            <main>
                <p>驗證碼</p>
                <input type="text" placeholder="請輸入卡片背後末三碼" class="defaultInput">
            </main>
        </article>

        <main class="tickBtn">
            <button class="defaultBtn" @click="previousStep">
                上一步
                <img src="@/assets/images/login/icon/btnArrow.svg">
            </button>
            <button class="tickLBtn defaultBtn" @click="nextStep">
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
    props:[
        // 丟資料的key值
        'tickStep',
    ],
    data(){
        return {
            tickets:[
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
        }
    },
    created(){
    },
    methods:{
        nextStep(){
            // 999寫確認有選付款方式的判斷式
            // 999寫確認信用卡的判斷式
            this.$emit('nextStep');
        },
        previousStep(){
            this.$emit('previousStep');
        }
    },
    computed:{
    },
    watch:{
    }
}

</script>

<style>



</style>