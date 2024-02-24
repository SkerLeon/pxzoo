<template>
    <section class="pk_com_map">
        <img class="pk_com_map_bg" src="@/assets/images/park/pk_map_bg.png" alt="園區地圖">

        <div class="pk_com_Store_icon">
            <div v-for="num in 2" :class="`pk_com_Store_default pk_com_Store_icon_VC${num}`">
                <img src="@/assets/images/park/pk_Store_icon1.png" alt="遊客中心icon">
            </div>

            <div v-for="num in 5" :class="`pk_com_Store_default pk_com_Store_icon_WC${num}`">
                <img src="@/assets/images/park/pk_Store_icon2.png" alt="餐廳icon">
            </div>

            <div v-for="num in 5" :class="`pk_com_Store_default pk_com_Store_icon_RC${num}`">
                <img src="@/assets/images/park/pk_Store_icon3.png" alt="廁所icon">
            </div>
        </div>
        
        <div class="pk_com_animal_icon">
            <div v-for="(animal,index) in icon_animals" :class="`pk_com_animal_default pk_com_animal_icon${index+1}`">
                <img v-if="!isHidden(index)" :src="getAnimalIconUrl(animal.animal_icon)" alt="園區動物icon的圖片">
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    
    components: {
        
    },
    data() {
        return {
            hoverStatus:{},
            icon_animals:[],
            hiddenIndexes:[],
        };
    },
    created() {
        axios.get(`${import.meta.env.VITE_API_URL}/parkMapIcon.php`)

        .then((response) => {
            this.icon_animals = response.data;
            this.fillHiddenIndexes(); 
        })
        .catch(error => {
            console.error("Error fetching data: ", error);
        });
    },
    mounted() {
        // 生命週期鉤子
    },
    methods: {
        getAnimalIconUrl(paths){
            return new URL(`${import.meta.env.VITE_IMAGES_BASE_URL}/animal/animal_icon/${paths}`,import.meta.url).href;
        },
        fillHiddenIndexes() {
            this.hiddenIndexes = this.icon_animals
            .map((animal, index) => animal.animal_name === null || animal.animal_status === 0 ? index : null)
            .filter(index => index !== null);
        },
        isHidden(index) {
            return this.hiddenIndexes.includes(index);
        },
    },
};
</script>

<style lang="scss">
@use 'sass:math';
//位置 px換算%數
@mixin icon-top-location($location) {
    top: math.div(math.div($location, 1px), 923) * 100 * 1%;
}
@mixin icon-left-location($location) {
    left: math.div(math.div($location, 1px), 1920) * 100 * 1%;
}
@mixin icon-right-location($location) {
    right: math.div(math.div($location, 1px), 1920) * 100 * 1%;
}
//高度寬度px換算%數
@mixin mapicon-px-percentage-size($wsize,$hsize){  
    width: math.div(math.div($wsize, 1px), 1920) * 100 * 1%;
    height: math.div(math.div($hsize, 1px), 923) * 100 * 1%; 
}
.pk_com_map{
        width:100%;
        position: relative;
        .pk_com_map_bg{
            width: 100%;
            vertical-align: middle;
        }
        .pk_com_animal_icon{
            .pk_com_animal_default{
                position: absolute;
                @include mapicon-px-percentage-size(75px,75px);
                transition: 0.3s;
                img{
                    width: 100%;
                }
                .pk_com_animal_icon_dialog_content{
                    display: none;
                    position:absolute;
                    top: -110%;
                    .pk_com_animal_icon_dialog{
                        width: 140%;
                        position: relative;
                        bottom: 5%;
                        right: 10%
                    }
                    .pk_com_animal_icon_dialog_content_text{
                        width: 200%;
                        height: 140%;
                        position: absolute;
                        top: 14%;
                        right: -58%;
                        color: #FFFFFF;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        gap: 2%;
                        font-weight: bold;
                        p{
                            @media (max-width:1280px) and (min-width:768px) {
                                font-size: 10px;
                            }
                            @media (min-width:1440px) {
                                font-size: 12px;
                            }  
                            @media (min-width:1600px) {
                                font-size: 12.8px;
                            }  
                        }
                    }
                }
            }
            .pk_com_animal_icon1{
                @include icon-top-location(170px);
                @include icon-left-location(430px);
            }
            .pk_com_animal_icon2{
                @include icon-top-location(150px);
                @include icon-left-location(530px);
            }
            .pk_com_animal_icon3{
                @include icon-top-location(180px);
                @include icon-left-location(620px);
            }
            .pk_com_animal_icon4{
                @include icon-top-location(200px);
                @include icon-left-location(750px);
            }
            .pk_com_animal_icon5{
                @include icon-top-location(330px);
                @include icon-left-location(760px);
            }
            .pk_com_animal_icon6{
                @include icon-top-location(280px);
                @include icon-left-location(680px);
            }
            .pk_com_animal_icon7{
                @include icon-top-location(260px);
                @include icon-left-location(520px);
            }
            .pk_com_animal_icon8{
                @include icon-top-location(260px);
                @include icon-left-location(410px);
            }
            .pk_com_animal_icon9{
                @include icon-top-location(200px);
                @include icon-right-location(800px);
            }
            .pk_com_animal_icon10{
                @include icon-top-location(140px);
                @include icon-right-location(750px);
            }
            .pk_com_animal_icon11{
                @include icon-top-location(230px);
                @include icon-right-location(680px);
            }
            .pk_com_animal_icon12{
                @include icon-top-location(200px);
                @include icon-right-location(580px);
            }
            .pk_com_animal_icon13{
                @include icon-top-location(160px);
                @include icon-right-location(480px);
            }
            .pk_com_animal_icon14{
                @include icon-top-location(280px);
                @include icon-right-location(560px);
            }
            .pk_com_animal_icon15{
                @include icon-top-location(300px);
                @include icon-right-location(690px);
            }
            .pk_com_animal_icon16{
                @include icon-top-location(310px);
                @include icon-right-location(780px);
            }
            .pk_com_animal_icon17{
                @include icon-top-location(490px);
                @include icon-right-location(650px);
            }
            .pk_com_animal_icon18{
                @include icon-top-location(430px);
                @include icon-right-location(580px);
            }
            .pk_com_animal_icon19{
                @include icon-top-location(420px);
                @include icon-right-location(510px);
            }
            .pk_com_animal_icon20{
                @include icon-top-location(380px);
                @include icon-right-location(440px);
            }
            .pk_com_animal_icon21{
                @include icon-top-location(420px);
                @include icon-right-location(370px);
            }
            .pk_com_animal_icon22{
                @include icon-top-location(470px);
                @include icon-right-location(450px);
            }
            .pk_com_animal_icon23{
                @include icon-top-location(500px);
                @include icon-right-location(550px);
            }
            .pk_com_animal_icon24{
                @include icon-top-location(640px);
                @include icon-right-location(790px);
            }
            .pk_com_animal_icon25{
                @include icon-top-location(580px);
                @include icon-right-location(730px);
            }
            .pk_com_animal_icon26{
                @include icon-top-location(570px);
                @include icon-right-location(580px);
            }
            .pk_com_animal_icon27{
                @include icon-top-location(630px);
                @include icon-right-location(640px);
            }
            .pk_com_animal_icon28{
                @include icon-top-location(730px);
                @include icon-right-location(530px);
            }
            .pk_com_animal_icon29{
                @include icon-top-location(770px);
                @include icon-right-location(600px);
            }
            .pk_com_animal_icon30{
                @include icon-top-location(700px);
                @include icon-right-location(660px);
            }
            .pk_com_animal_icon31{
                @include icon-top-location(650px);
                @include icon-left-location(450px);
            }
            .pk_com_animal_icon32{
                @include icon-top-location(700px);
                @include icon-left-location(580px);
            }
            .pk_com_animal_icon33{
                @include icon-top-location(560px);
                @include icon-left-location(530px);
            }
            .pk_com_animal_icon34{
                @include icon-top-location(590px);
                @include icon-left-location(630px);
            }
            .pk_com_animal_icon35{
                @include icon-top-location(550px);
                @include icon-left-location(740px);
            }
            .pk_com_animal_icon36{
                @include icon-top-location(510px);
                @include icon-left-location(830px);
            }
            .pk_com_animal_icon37{
                @include icon-top-location(610px);
                @include icon-left-location(940px);
            }
            .pk_com_animal_icon38{
                @include icon-top-location(620px);
                @include icon-left-location(840px);
            }
        } 
        .pk_com_Store_icon{
            .pk_com_Store_default{
                position: absolute;
                transition: 0.3s;
                @include mapicon-px-percentage-size(75px,75px);
                img{
                    width: 100%;
                }
                .pk_com_Store_icon_dialog_content{
                    display: none;
                    position:absolute;
                    top: -65%;
                    .pk_com_Store_icon_dialog_content_text{
                        position: absolute;
                        top: 25%;
                        left: 10%;
                        color: #FFFFFF;
                        font-weight: bold;
                        p{
                            @media (max-width:1280px) and (min-width:768px) {
                                font-size: 10px;
                            }
                            @media (min-width:1440px) {
                                font-size: 12px;
                            }  
                            @media (min-width:1600px) {
                                font-size: 15px;
                            }  
                        }
                    }

                }
            }
            .pk_com_Store_icon_VC1{
                @include icon-top-location(490px);
                @include icon-left-location(440px);
            }
            .pk_com_Store_icon_VC2{
                @include icon-top-location(340px);
                @include icon-right-location(620px);
            }

            .pk_com_Store_icon_WC1{
                @include icon-top-location(550px);
                @include icon-left-location(450px);
            }
            .pk_com_Store_icon_WC2{
                @include icon-top-location(320px);
                @include icon-left-location(310px);
            }
            .pk_com_Store_icon_WC3{
                @include icon-top-location(420px);
                @include icon-right-location(730px);
            }
            .pk_com_Store_icon_WC4{
                @include icon-top-location(510px);
                @include icon-right-location(470px);
            }
            .pk_com_Store_icon_WC5{
                @include icon-top-location(730px);
                @include icon-right-location(730px);
            }
            
            .pk_com_Store_icon_RC1{
                @include icon-top-location(520px);
                @include icon-left-location(360px);
            }
            .pk_com_Store_icon_RC2{
                @include icon-top-location(290px);
                @include icon-left-location(380px);
            }
            .pk_com_Store_icon_RC3{
                @include icon-top-location(345px);
                @include icon-right-location(700px);
            }
            .pk_com_Store_icon_RC4{
                @include icon-top-location(520px);
                @include icon-right-location(400px);
            }
            .pk_com_Store_icon_RC5{
                @include icon-top-location(750px);
                @include icon-right-location(800px);
            }
        }
    }
</style>