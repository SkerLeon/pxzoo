<template>
    <section class="tickNum">


    <!-- part2 選擇數量 -->
        <hgroup>
            <h2>選擇數量</h2>
            <img src="@/assets/images/ticket/refresh.svg">
        </hgroup>

        <article v-if="isMobile">
            <div v-for=" ticket in tickets" :key="ticket.id">
                <div>
                    <p>{{ ticket.name }}</p>
                    <p>{{ ticket.rule }}</p>
                </div>
                <div>
                    <h2>NT$ {{ ticket.price }}</h2>
                    <p>/ 人</p>
                    <div>
                    <button>+</button>
                    <input type="number" name="0" id="tickNumber">
                    <button>-</button>
                </div>
                </div>
            </div>
        </article>
        <div v-else>
            <article v-for=" ticket in tickets" :key="ticket.id">
                <img :src="ticket.src" :alt="ticket.name">
                <div>
                    <button>+</button>
                    <input type="number" name="0" id="tickNumber">
                    <button>-</button>
                </div>
            </article>
        </div>

        <div class="tickMoney"> <!-- 可以改成資料庫名稱 -->
            <p>票券金額</p>
            <p>NT$ </p>
            <h2>260</h2>
        </div>

        <div class="tickBtn">
            <button>上一步</button>
            <button class="tickLBtn">票種數量</button>
        </div>

    
    </section>
</template>

<script>
export default {
    components:{
        // RouterLink,

    },
    data() {
        return {
            isMobile: window.innerWidth <= 768,
            tickets:[
                {
                    id: 1,
                    name: '成人票',
                    rule: '18~64 歲',
                    price: 100,
                    src: '/images/ticket/ticket1.svg'
                },
                {
                    id: 2,
                    name: '兒童票',
                    rule: '4~11 歲',
                    price: 80,
                    src: '/images/ticket/ticket2.svg'
                },
                {
                    id: 3,
                    name: '學生票',
                    rule: '12 歲以上(含)持學生證者',
                    price: 40,
                    src: '/images/ticket/ticket3.svg'
                },
                {
                    id: 4,
                    name: '愛心票',
                    rule: '65 歲以上(含)',
                    price: 4100,
                    src: '/images/ticket/ticket4.svg'
                },
                {
                    id: 5,
                    name: '團體票',
                    rule: '15 人以上適用',
                    price: 60,
                    src: '/images/ticket/ticket5.svg'
                },
            ]
            // targetValue:0,
        }
    },
    created(){
        window.addEventListener('resize', this.windowSize);
    },
    methods:{
        windowSize(){
            this.isMobile = window.innerWidth <= 768;
        },
    }
}

</script>

<style>



</style>