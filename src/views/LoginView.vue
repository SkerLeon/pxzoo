<template>
  <section class="loginPage forHeader">
    <div class="forgetPsw">
      <img src="/public/images/login/lion.svg" alt="" />
      <p class="pcInnerText">歡迎阿<br />忘記密碼再問我</p>
    </div>
    <div class="cloud">
      <img src="/public/images/login/cloudb.svg" alt="" />
    </div>
    <div class="cloudSun">
      <img src="/public/images/login/cloudsun.svg" alt="" />
    </div>
    <for class="login active" id="loginForm">
      <div class="loginBtnGroup">
        <button class="loginBtn pcSmTitle">會員登入</button>
        <button class="signupBtn pcSmTitle">註冊會員</button>
      </div>
      <div class="loginInputGroup">
        <div class="acc">
          <div class="img">
            <img src="/public/images/login/icon/account.svg" alt="" />
          </div>

          <input type="text" placeholder="帳號" class="pcMarkText" />
        </div>
        <div class="psw">
          <div class="img">
            <img src="/public/images/login/icon/psw.svg" alt="" />
          </div>
          <input type="password" placeholder="密碼" />
        </div>
        <myButton />
      </div>
    </for>
  </section>
</template>

<script>
import myButton from "@/components/btn.vue";
export default {
  components: {
    myButton,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
