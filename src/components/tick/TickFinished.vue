<template>
    <!-- part3 購票完成 -->
    <section class="tickFinished">
        <!-- 本頁待辦:
            2.訂單建立進資料庫，資料庫AI產生訂單編號
        -->

        <section>
            <!-- click for測試用，正式上線要拿掉!!! -->
            <h2 @click="previousStep" v-html=" paywayData === '信用卡'? cardFinished : cashFinished " class="pcSmTitle"></h2>

            <p class="pcInnerText">畫面將於 {{sec}} 秒鐘後跳轉回首頁。</p>
            <button @click="useGoHome" class="defaultBtn pcInnerText">
                返回首頁
                <img src="@/assets/images/login/icon/btnArrow.svg">
            </button>
        </section>

        <article>
            <hgroup class="important">
                <p class="pcInnerText">訂單編號</p>
                <h2 class="pcSmTitle">1</h2>
            </hgroup>
            <hgroup>
                <p class="pcInnerText">票卷日期</p>
                <h2 class="mixedFont pcSmTitle">
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
                <p>優惠折扣</p>
                <p>{{ couData }}</p>
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
                    <p>{{paypriceData}}</p>
                </div>
            </div>
            <article class="payWay pcInnerText">
                <hgroup>
                    <p>付款方式</p>
                    <p>{{paywayData}}</p>
                </hgroup>
                <div class="price important">
                    <p>票券型態</p>
                    <p>{{paywayTTData}}</p>
                </div>
                <div class="price important">
                    <p>處理狀態</p>
                    <p>{{tickStatusData}}</p>
                </div>
            </article>
        </article>
    </section>
</template>

<script>
import {goHome} from '@/assets/js/common.js';
export default {
    components:{},
    props:{
        tickStep:{
        // 測試用，正式上線要拿掉!!!
            type: Number,
        },
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
        paywayData: {
            type: String,
            required: true,
        },
        paywayTTData: {
            type: String,
            required: true,
        },
        tickStatusData: {
            type: String,
            required: true,
        }
    },
    data(){
        return {
            cashFinished: '訂單完成，訂單編號請見：會員中心 - 購票記錄，<br>入園當天請至服務台「快速通道」告知訂單編號，將由專人協助您，<br>PXZoO 的獨家動物冒險之旅，等您來探索！',
            cardFinished: '付款完成，數位票券已發送至：會員中心 - 購票記錄，<br>入園當天請憑數位票卷入場， PXZoO 的獨家動物冒險之旅，等您來探索！',
            timer: null,
        }
    },
    methods:{
        previousStep(){
            // 測試用，正式上線要拿掉!!!
            this.$emit('goPreviousStep');
        },
        useGoHome(){
            clearInterval(this.timer);
            goHome(this);
        },
        countDown(){
            this.timer = setInterval( () => {
                // setInterval 按照指定的時間間隔循環執行指定的程式碼。
                // setTimeout 在指定的時間間隔後執行一次指定的程式碼。

                if(this.sec>0){
                    this.sec--;
                }else{
                    clearInterval(this.timer);
                    this.$router.push({ name: 'home' })
                }
            }, 1000 );
                // this.$router.push({ name: 'home' }) 編程式導航
                // 倒計時 沒有自己的 this，它會捕獲所在上下文的 this 值(全域對象window)
                // 使用 Vue Router 的 $router 對象，通過 push 方法將路由切換到名稱為 'home' 的路由，完成跳轉
                // 導航方法 push 會保留之前的路由，新的路由會被加入歷史記錄中。(replace是替代)
                // 每秒倒數，因此數值為1000
        },
    },
    computed:{},
    watch:{},
    created(){
        this.countDown();
        this.couData;
    },
    beforeUnmount() {
        console.log("end");
        clearInterval(this.timer); // 清理定时器
        console.log(`clearInterval(this.timer)`)
    },
}

</script>

<style>



</style>