<template>
    <div class="reporttqp">
        <img
            src="@/assets/images/member/memicon/green_close.svg"
            alt="close"
            class="close"
            id="close"
            @click="hideReportTqp"
        />
        <div class="tqp_logo"><img src="@/assets/images/home/home_comm_logo.svg" alt=""></div>
        <h2 class="tqp_title pcBigTitle">THANK YOU！</h2>
        <p class="tqp_text pcInnerText">對這條留言的檢舉已提交<br>感謝您幫助我們改進</p>
        <RouterLink to="/">
            <button class="defaultBtn pcInnerText" @click="hideReportTqp">
                返回首頁
                <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
            </button>
        </RouterLink>
        

        <div class="reporttqp_decotop">
            <div class="cloud_4"><img src="@/assets/images/vetor/nature_cloud_4.svg" alt="cloud_4"></div>
            <div class="cloud_1"><img src="@/assets/images/vetor/nature_cloud_1.svg" alt="cloud_1"></div>
            <div class="cloud_7"><img src="@/assets/images/vetor/nature_cloud_7.svg" alt="cloud_7"></div>
        </div>
        
        <div class="reporttqp_decobottom">
            <div class="tree_7"><img src="@/assets/images/vetor/nature_tree_7.svg" alt="tree_7"></div>
            <div class="tree_1"><img src="@/assets/images/vetor/nature_tree_1.svg" alt="tree_1"></div>
            <div class="rhino"><img src="@/assets/images/vetor/vetor_animal_rhino.svg" alt="rhino"></div>
            <div class="leopard"><img src="@/assets/images/vetor/vetor_animal_leopard.svg" alt="leopard"></div>
            <div class="tree_6"><img src="@/assets/images/vetor/nature_tree_6.svg" alt="tree_6"></div>
            <div class="ground"><img src="@/assets/images/footer/footer_ground.svg" alt="ground"></div>
        </div>
    
    </div>
</template>
<script>
export default {
    el: '#comm_text',
    
    components: {
        
    },
    data() {
        return {
            show: true,
        };
    },
    methods: {
        hideReportTqp() {
            this.$emit("close-reporttqp");
            window.location.reload();
        },
    },
};
</script>
