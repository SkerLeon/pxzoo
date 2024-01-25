<template>
    <!-- part1 選擇數量 -->
    <section class="tickNum">

        <hgroup>
            <h2 class="pcSmTitle">選擇數量</h2>
    <!-- 999reset -->
            <img src="@/assets/images/ticket/refresh.svg">
        </hgroup>
        <main>
            <article v-for=" ticket in tickets" :key="ticket.id">
                <div v-if="isMobile" class="tickOption PH pcInnerText">
                    <div>
                        <p>{{ ticket.name }}</p>
                        <p class="pcMarkText">{{ ticket.rule }}</p>
                    </div>
                    <div>
                        <h2  class="pcSmTitle">NT$ {{ ticket.price }}</h2>
                        <p>/ 人</p>
                    </div>
                </div>
                <article v-else class="tickOption PC">
                    <img :src="ticket.src" :alt="ticket.name">
                </article>
                <div class="countBTN">
<!-- +-btn -->
                    <button class="pcDecMarkText">+</button>
                    <input type="number" :name="ticket.name" :id="ticket.id" placeholder="0" inputmode="numeric" step="1" min="0" max="999">
                    <button class="pcDecMarkText">-</button>
                </div>
            </article>
        </main>

        <div class="price firstLine pcInnerText important">
            <p>票券金額</p>
<!-- 999sum of tickets -->
            <h2 class="pcSmTitle">
                <p>NT$</p> 
                260
            </h2>
        </div>

        <main class="tickBtn">
            <button class="defaultBtn pcInnerText" @click="previousStep">
                上一步
                <img src="@/assets/images/login/icon/btnArrow.svg">
            </button>
            <button type="button" class="tickLBtn defaultBtn pcInnerText" @click="nextStep">
                立即購票
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
        this.windowSize();
        window.addEventListener('resize', this.windowSize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.windowSize);
    },
    methods:{
        windowSize(){
            this.isMobile = window.innerWidth <= 768;
        },
        nextStep(){
            // 999寫確認有選票券的判斷式
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