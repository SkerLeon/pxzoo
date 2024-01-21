<template>
  <div>
    <section class="memLightBox forHeader">
      <img
        src="@/assets/images/login/lightbox/memLightBox.png"
        alt=""
        class="LBBg"
      />
      <div class="LBTextArea">
        <img
          src="@/assets/images/login/lightbox/close.svg"
          alt=""
          class="closeIcon"
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
        <a href="#" class="LBForget">忘記密碼?</a>
      </div>
      <div class="LBBtnArea">
        <button class="defaultBtn pcInnerText">
          登入
          <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
        </button>
        <button class="defaultBtn pcInnerText">
          註冊
          <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
        </button>
      </div>
    </section>
  </div>
</template>
