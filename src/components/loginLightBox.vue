<template>
  <div class="memLightBox_bg" @click.self="closeMemLightBox">
    <section class="memLightBox forHeader">
      <img
        src="@/assets/images/ticket/lightBox.png"
        alt="會員登入燈箱"
        class="LBBg"
      />
      <div class="LBTextArea">
        <img
          src="@/assets/images/login/lightbox/close.svg"
          alt=""
          class="closeIcon"
          @click.self="closeMemLightBox"
        />
        <p class="LBTextAreaP pcBigTitle">會員登入</p>
      </div>
      <div class="LBInputArea">
        <div class="LBInput">
          <div class="inputIconBg">
            <img src="@/assets/images/login/lightbox/email.svg" alt="" />
          </div>
          <input type="text" placeholder="帳號" />
        </div>
        <div class="LBInput">
          <div class="inputIconBg">
            <img src="@/assets/images/login/lightbox/lock.svg" alt="" />
          </div>
          <input type="password" placeholder="密碼" />
        </div>
        <RouterLink to="/login" class="LBForget pcMarkText">忘記密碼?</RouterLink>
      </div>
      <div class="LBBtnArea">
        <button class="defaultBtn pcInnerText">
          登入
          <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
        </button>
        <button @click="goSignUp" class="defaultBtn pcInnerText">
          註冊
          <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
        </button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props:{},
  methods:{
    closeMemLightBox(){
      this.$emit('closeLoginBox',false);
    },
    goSignUp(){
      this.$router.push({ 
        name: 'login'
    // 須與index.js中首頁的名稱一致
    });
    },
  },
}
</script>