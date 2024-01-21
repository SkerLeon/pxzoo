<template>
    <!-- part2 選擇數量 -->
    <section class="tickNum">

        <hgroup>
            <h2>選擇數量</h2>
            <img src="@/assets/images/ticket/refresh.svg">
        </hgroup>

        <article v-if="isMobile"  class="tickOption PH">
            <div v-for=" ticket in tickets" :key="ticket.id">
                <div>
                    <p>{{ ticket.name }}</p>
                    <p>{{ ticket.rule }}</p>
                </div>
                <div>
                    <h2>NT$ {{ ticket.price }}</h2>
                    <p>/ 人</p>
                    <div class="countBTN">
                        <button>+</button>
                        <form action="ticket.php" method="post">
                            <input type="number" :name="ticket.name" :id="ticket.id" placeholder="0" inputmode="numeric" min="0" max="999">
                        </form>
                        <button>-</button>
                    </div>
                </div>
            </div>
        </article>
        <div v-else class="tickOption PC">
            <article v-for=" ticket in tickets" :key="ticket.id">
                <img :src="ticket.src" :alt="ticket.name">
                <div class="countBTN">
                    <button>+</button>
                    <form action="ticket.php" method="post">
                        <input type="number" :name="ticket.name" :id="ticket.id" placeholder="0" inputmode="numeric" min="0" max="999">
                    </form>
                    <button>-</button>
                </div>
            </article>
        </div>

        <div class="price firstLine">
            <p>票券金額</p>
            <h2 class="important mixedFont"><p>NT$</p> 260</h2>
        </div>

        <main class="tickBtn">
            <button class="defaultBtn">上一步</button>
            <button class="tickLBtn defaultBtn">立即購票</button>
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