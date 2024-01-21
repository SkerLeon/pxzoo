<template>
    <!-- part3 付款頁 -->
    <section class="tickPayway">

        <main class="grid2">

            <!-- part3-1 確認訂單資訊 -->
            <article class="checkOrder">
                <h2>請確認您的訂單資訊</h2>
                <hgroup>
                    <p>票卷日期</p>
                    <h2 class="mixedFont">2024 <p>年</p> 01 <p>月</p> 12 <p>日</p> </h2>
                </hgroup>
                <main v-for=" ticket in tickets" :key="ticket.id" class="choosed">
                    <div>
                        <p>{{ ticket.name }}</p>
                        <span>{{ ticket.rule }}</span>
                    </div>
                    <h2>1 <span>張</span></h2>
                </main>
                <div class="price firstLine">
                    <p>票券金額</p>
                    <h2 class="important mixedFont"><p>NT$</p> 260</h2>
                </div>
            </article>

            <!-- part3-2 優惠券&付款方式 -->
            <article>
                <article class="coupon">
                    <hgroup>
                        <h2>優惠折扣</h2>
                        <p v-if="noCoupon">目前沒有優惠券</p>
                        <select v-else name="" id=""></select>
                    </hgroup>
                    <div class="price">
                        <span>優惠金額</span>
                        <span class="mixedFont">NT$ <p>26</p></span>
                    </div>
                    <div class="price">
                        <p>付款金額</p>
                        <h2 class="important mixedFont"><p>NT$</p> 234</h2>
                    </div>
                </article>


                <article class="pay">
                    <hgroup>
                        <h2>付款方式</h2>
                        <select name="" id=""></select>
                    </hgroup>
                    <div class="price">
                        <p>票券型態</p>
                        <p class="important">實體票券</p>
                    </div>
                    <article>
                        <p>信用卡卡號</p>
                        <input type="number" placeholder="請輸入卡號">
                        <p>有效日期</p>
                        <main>
                            <input type="number" placeholder="請輸入信用卡月">
                             / 
                            <input type="number" placeholder="請輸入信用卡年">
                        </main>
                        
                        <p>驗證碼</p>
                        <input type="number" placeholder="請輸入卡片背後末三碼">
                    </article>


                    
                </article>
            </article>
        </main>

        <main class="tickBtn">
            <button>上一步</button>
            <button class="tickLBtn">送出訂單</button>
        </main>
    </section>
</template>

<script>
export default {
    components:{
        // RouterLink,
        search: '',
    },
    data(){
        return {
            isMobile: window.innerWidth <= 768,
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
        window.addEventListener('resize', this.windowSize);
    },
    methods:{
        windowSize(){
            this.isMobile = window.innerWidth <= 768;
        },
    },
    computed:{
        // search(){}
    },
    watch:{
        search(newSearch, oldSearch){
            console.log(this.Search); // 監聽search的值            
            console.log('new:', +newSearch);
            console.log('old:', +oldSearch);
            // 可以調用下面的函數
            this.filterHandle();
        }
    }
}

</script>

<style>



</style>