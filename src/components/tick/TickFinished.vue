<template>
    <!-- part3 購票完成 -->
    <section class="tickFinished">

        <section>
            <h2 v-if="cash">
                訂單完成，訂單編號請見：會員中心 - 購票記錄，<br>
                入園當天請至服務台「快速通道」告知訂單編號，將由專人協助您，<br>
                PXZoO 的獨家動物冒險之旅，等您來探索！
            </h2>
            <h2 v-else>
                付款完成，數位票券已發送至：會員中心 - 購票記錄，<br>
                入園當天請憑數位票卷入場， PXZoO 的獨家動物冒險之旅，等您來探索！
            </h2>
            <p>畫面將於 5 秒鐘後跳轉回首頁。</p>
            <button @click="useGoHome" class="defaultBtn">
                返回首頁
                <img src="@/assets/images/login/icon/btnArrow.svg">
            </button>
        </section>

        <article>
            <hgroup>
                <p>訂單編號</p>
                <h2 class="important">1</h2>
            </hgroup>
            <hgroup>
                <p>票卷日期</p>
                <h2 class="mixedFont">2024 <p>年</p> 01 <p>月</p> 12 <p>日</p> </h2>
            </hgroup>
            <article class="choosed">
                <main v-for="ticket in tickets" :key="ticket.id">
                    <div>
                        <p>{{ ticket.name }}</p>
                        <span>{{ ticket.rule }}</span>
                    </div>
                    <h2>1 <span>張</span></h2>
                </main>
            </article>
            <hgroup class="coupon">
                <p>優惠折扣</p>
                <p>付款金額 9 折</p>
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
                    <p>付款方式</p>
                    <p>信用卡</p>
                </hgroup>
                <div class="price">
                    <p>票券型態</p>
                    <p class="important">實體票券</p>
                </div>
                <div class="price">
                    <p>處理狀態</p>
                    <p class="important">未用票</p>
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