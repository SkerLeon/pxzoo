<template>
    <div class="writetqp">
        <img
            src="@/assets/images/member/memicon/green_close.svg"
            alt="close"
            class="close"
            id="close"
            @click="hideWriteTqp"
        />
        <div class="tqp_logo"><img src="@/assets/images/home/home_comm_logo.svg" alt=""></div>
        <h2 class="tqp_title pcBigTitle">THANK YOU！</h2>
        <p class="tqp_text pcInnerText">謝謝您的留言<br>期待下次見到您!</p>
        <RouterLink to="/">
            <button class="defaultBtn pcInnerText" @click="hideWriteTqp">
                返回首頁
                <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
            </button>
        </RouterLink>
        

        <div class="writetqp_decotop">
            <div class="cloud_6"><img src="@/assets/images/vetor/nature_cloud_6.svg" alt="cloud_6"></div>
            <div class="cloud_7"><img src="@/assets/images/vetor/nature_cloud_7.svg" alt="cloud_7"></div>
            <div class="cloud_5"><img src="@/assets/images/vetor/nature_cloud_5.svg" alt="cloud_5"></div>
        </div>
        
        <div class="writetqp_decobottom">
            <div class="tree_8"><img src="@/assets/images/vetor/nature_tree_8.svg" alt="tree_8"></div>
            <div class="horse"><img src="@/assets/images/vetor/vetor_animal_horse.svg" alt="horse"></div>
            <div class="kangaroo"><img src="@/assets/images/vetor/vetor_animal_kangaroo.svg" alt="kangaroo"></div>
            <div class="tree_2"><img src="@/assets/images/vetor/nature_tree_2.svg" alt="tree_2"></div>
            <div class="ground"><img src="@/assets/images/footer/footer_ground.svg" alt="ground"></div>
        </div>
    
    </div>
</template>
<script>
export default {
    components: {
        
    },
    data() {
        return {
            show: true,
        };
    },
    methods: {
        hideWriteTqp() {
            this.$emit("close-writetqp");
        },
    },
};
</script>
