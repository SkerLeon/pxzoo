<template>
    <footer class="mainFooter">
        <div class="footer_deco">
            <div class="grasses_1"><img src="@/assets/images/vetor/nature_grasses_1.svg" alt="grasses_1"></div>
            <div class="grasses_9"><img src="@/assets/images/vetor/nature_grasses_9.svg" alt="grasses_9"></div>
            <div class="grasses_5"><img src="@/assets/images/vetor/nature_grasses_5.svg" alt="grasses_5"></div>
            
        </div>

        <div class="footer_ground">
            <img src="@/assets/images/footer/footer_ground.svg" alt="ground">
        </div>
        
        <div class="footer_first">
            <div class="footer_front">
                <div class="footer_logo">
                    <RouterLink to="/">
                        <img src="@/assets/images/footer/footer_logo.svg" alt="logo" />
                    </RouterLink>
                </div>

                <div class="footer_media">
                    <a target="_blank" href="https://www.facebook.com/"><img src="@/assets/images/footer/footer_fb.svg" alt="fb" /></a>
                    <a target="_blank" href="https://www.instagram.com/"><img src="@/assets/images/footer/footer_ig.svg" alt="ig" /></a>
                    <a target="_blank" href="https://line.me/tw/"><img src="@/assets/images/footer/footer_line.svg" alt="line" /></a>
                    <a target="_blank" href="https://www.youtube.com/"><img src="@/assets/images/footer/footer_yt.svg" alt="yt" /></a>
                </div>
            </div>

            

            <div class="footer_info">
                <div class="footer_item pcInnerText">
                    營業時間｜09:00-17:00
                </div>  
                <br>
                <div class="footer_item pcInnerText">
                    <RouterLink to="tel:+886-3-4251234">
                        聯絡電話｜03-425-1234 
                    </RouterLink>
                </div>
                
                <br>
                <div class="footer_item pcInnerText">
                    <RouterLink to="https://maps.app.goo.gl/apyan9qoHcT4gzZeA">
                        園區地址｜320 桃園市中壢區復興路46號8樓
                    </RouterLink> 
                </div>
            </div>

            <div class="footer_tourists  pcInnerText">
                <span>今日入園人數：<span id="tourists_num">23</span>人</span>
            </div>

            
        </div>

        <div class="footer_line"></div>
        
        <div class="footer_bottom pcMarkText">
            <span>@2024 PXZoO</span>
            <br>
            <span>本網站為緯育TibaMe_前端設計工程師班第88期學員專題成果作品，本平台僅供學習、展示之用。若有抵觸有關著作權或有第三人主張侵害智慧財產權等情事，均由學員負法律上責任，緯育公司概不負責。若有侵權疑慮，您可以私訊<RouterLink to="https://www.facebook.com/TibaMe">[緯育TibaMe]</RouterLink>，後續會由專人協助處理。</span>
        </div>

        <div class="footer_top pcDecMarkText">
            <button @click="scrollToTop">
                <span>TOP</span>
                <br>
                <img src="@/assets/images/vetor/vetor_animal_frog.svg" alt="top">
            </button>
        </div>

        
        
    </footer>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
    components: {
        RouterLink,
    },
    data() {
        return {
        // targetValue: 0,
        };
    },
    created() {},
    methods: {
        scrollToTop(){
            console.log(1);
            // 使用 window.scrollTo() 滾動到頂部
            window.scrollTo({
                top: 0,
                behavior: 'smooth', // 使用平滑滾動效果
            });
        }
    },
};
</script>
