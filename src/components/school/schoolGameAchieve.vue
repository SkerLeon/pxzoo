<template>
    <section class="game_Achieve">
        <div class="game_Achieve_win">
            <img class="game_Achieve_win" src="@/assets/images/school/win.svg" alt="win圖片">
        </div>

        <p class="pcSmTitle game_Achieve_text">
            太棒了！你的總得分為：{{ totalScore }}！
            <br>
            你展現了出色的動物知識，獲得了一張PX ZOO門票優惠券。
            <br>
            享受門票優惠，探索動物王國的奇妙世界快來一場奇妙的冒險，發現動物的奇蹟。<br>
            感謝你的參與，期待在PX ZOO見到你！ 
        </p>

        <div class="game_Achieve_coupon">
            <img :src="getCouponPicUrl(coupon[random]?.cou_pic)" alt="優惠卷圖片">
        </div>

        <button class="pk_button defaultBtn pcInnerText" @click="receiveCoupon()">
            領取優惠卷
            <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
        </button>

    </section>
    <loginLightBox v-show="loginLightBoxSwitch" @memIdData="getMemId" @closeLoginBox="closeLoginBox"/>
</template>

<script>
import axios from 'axios';
import loginLightBox from '@/components/loginLightBox.vue'

export default {
    props:{
        totalScore:Number
    },
    components: {
        loginLightBox,
    },
    data() {
        return {
            coupon:[],
            random:0,
            loginLightBoxSwitch : false,
            couponAndMemderData : {
                mem_id: null,
                cou_id:0,
            },
            couponData:[],
            couponDataBool:false,
            today:0,
            mem_id:null,
        };
    },
    watch:{
        memData:{
            deep: true,
            handler(value){
                // console.log(value);
                if(value && 'mem_id' in value){
                // newValue 為 null 或 undefined時，即為 false
                    this.mem_id = value.mem_id;
                }else{
                    this.mem_id = null;
                }
                // console.log('now', this.mem_id);
            },
        }
    },
    created() {
        axios.get(`${import.meta.env.VITE_API_URL}/couponShow.php`)
        .then(response => {
            this.coupon = response.data; // 假設返回的數據是一個數組
            this.randomCoupon(0,this.coupon.length)
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
        });
    },
    methods: {
        getCouponPicUrl(paths){
            return new URL(`${import.meta.env.VITE_IMAGES_BASE_URL}/coupon/${paths}`,import.meta.url).href;
        },
        randomCoupon(min,max){
            min = Math.ceil(min);
            max = Math.floor(max);
            this.random = Math.floor(Math.random() * (max - min)) + min;
        },
        closeLoginBox(bool){
            this.loginLightBoxSwitch = bool
        },
        receiveCoupon(){
            const userDataString = localStorage.getItem("userData")
            if(userDataString){
                var user = JSON.parse(userDataString)
            }
            if( this.mem_id !== null || user.mem_id ){
                this.today = this.convertToday();
                this.couponAndMemderData.mem_id = JSON.parse(localStorage.getItem('userData')).mem_id
                this.couponAndMemderData.cou_id = this.random + 1

                // 調用 getMemberCoupon 並等待它完成
                this.getMemberCoupon().then(() => {
                    // 現在這裡的代碼會在 getMemberCoupon 完成後執行
                    if(this.couponDataBool === false){
                        axios.post(`${import.meta.env.VITE_API_URL}/couponSend.php`, this.couponAndMemderData,{
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(() => {
                            alert("該優惠卷已儲存至會員中心！")
                            location.reload()

                        })
                        .catch(error => {
                            console.error('更新錯誤:', error);
                        });
                    } else{
                        alert("今天已經領過優惠卷囉！")
                    }
                });
            } else{
                this.loginLightBoxSwitch = !this.loginLightBoxSwitch
            }
        },
        getMemberCoupon(){
            return new Promise((resolve, reject) => {
                axios.post(`${import.meta.env.VITE_API_URL}/couponDetailShow.php`, this.couponAndMemderData,{
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((res) => {
                    this.couponData = res.data
                    for(let i=0; i < this.couponData.length; i++){
                        if(this.convertToday(this.couponData[i].cou_detail_time) === this.today){
                            this.couponDataBool = true
                            break;
                        }
                    }
                    resolve(); // 異步操作完成後調用 resolve
                })
                .catch(error => {
                    console.error('更新錯誤:', error);
                    reject(); // 異步操作錯誤時調用 reject
                });
            });
        },
        convertToday(couponDate) {
            const now = couponDate ? new Date(couponDate) : new Date();
            let year = now.getFullYear();
            let month = now.getMonth() + 1;
            let day = now.getDate();

            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;

            return year + '-' + month + '-' + day;
        },
        getMemId(value){
            this.mem_id = value;
        },

    },
};
</script>

<style lang="scss">

.game_Achieve{
    position: absolute;
    top: 55%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3vw;
    @media (max-width:768px) {
        gap: 3.5vw;
    }
    .game_Achieve_win{
        width: 20.46vw;
        @media (max-width:768px) {
            width: 34.76vw;
        }
        img{
            width: 100%;
        }
    }
    p{
        color: #ffffff;
        text-align: center;
        letter-spacing: 0.3vw;
        @media (max-width:768px) {
            width: 65.625vw;
            font-size: 16px;
        }
    }
    .game_Achieve_coupon{
        width: 30vw;
        @media (max-width:768px) {
            width: 52.08vw;
        }
        img{
            width: 100%;
        }
    }
}
</style>