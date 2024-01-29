<template>
    <!-- part3 購票完成 -->
    <section class="tickFinished">

        <section>
            <h2 v-html=" cashFinished " class="pcSmTitle"></h2>
            <p class="pcInnerText">畫面將於 5 秒鐘後跳轉回首頁。</p>
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
                <h2 class="mixedFont pcSmTitle">2024 
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
                <p>優惠折扣</p>
                <p>付款金額 9 折</p>
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
                    <p>26</p>
                </div>
            </div>
            <div class="price important">
                <p class="pcInnerText">付款金額</p>
                <div class="mixedFont pcSmTitle">
                    <p class="pcInnerText">NT$</p>
                    <p>234</p>
                </div>
            </div>
            <article class="payWay pcInnerText">
                <hgroup>
                    <p>付款方式</p>
                    <p>信用卡</p>
                </hgroup>
                <div class="price important">
                    <p>票券型態</p>
                    <p>數位票券</p>
                </div>
                <div class="price important">
                    <p>處理狀態</p>
                    <p>未用票</p>
                </div>
            </article>
        </article>
    </section>
</template>

<script>
import {goHome} from '@/assets/js/common.js';
export default {
    components:{
        // RouterLink,
    },
    props:{
        // 丟資料的key值
        // validator 驗證規則內不可讀取 data. computed 屬性
        // validator: value => value>0,
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

            cashFinished: '訂單完成，訂單編號請見：會員中心 - 購票記錄，<br>入園當天請至服務台「快速通道」告知訂單編號，將由專人協助您，<br>PXZoO 的獨家動物冒險之旅，等您來探索！',
            cardFinished: '付款完成，數位票券已發送至：會員中心 - 購票記錄，<br>入園當天請憑數位票卷入場， PXZoO 的獨家動物冒險之旅，等您來探索！',
        }
    },
    created(){
    },
    methods:{
        useGoHome(){
            goHome(this);
        },
    },
    computed:{

    },
    watch:{

    }
}

</script>

<style>



</style>