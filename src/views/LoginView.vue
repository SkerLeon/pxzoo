<template>
  <section class="loginPage forHeader">
    <a href="#" class="forgetPsw">
      <img src="@/assets/images/login/lion1.png" alt="" />
      <p>歡迎阿!!<br />忘記密碼再問我</p>
    </a>
    <div class="cloud">
      <img src="@/assets/images/login/cloudb.svg" alt="" />
    </div>
    <div class="cloudSun">
      <img src="@/assets/images/login/cloudsun.svg" alt="" />
    </div>
    <div class="loginSingupArea">
      <div class="loginBtnGroup">
        <img :src="currentImage" alt="" class="loginSigninBg" />
        <button
          class="loginBtn pcSmTitle"
          @click="
            activeTab = 'loginForm';
            changeImage(1);
          "
          :class="{ active: activeTab === 'loginForm' }"
        >
          會員登入
        </button>
        <button
          class="signupBtn pcSmTitle"
          @click="
            activeTab = 'signForm';
            changeImage(2);
          "
          :class="{ active: activeTab === 'signForm' }"
        >
          註冊會員
        </button>
      </div>
      <form
        class="myLog"
        id="loginForm"
        v-show="activeTab === 'loginForm'"
        @submit.prevent="userLogin"
      >
        <img
          src="@/assets/images/login/login-bg/login_input.png"
          alt=""
          class="loginSigninBg"
        />
        <div class="loginInputGroup">
          <div class="acc">
            <div class="img">
              <img src="@/assets/images/login/icon/account.svg" alt="" />
            </div>

            <input
              type="text"
              placeholder="帳號"
              class="pcMarkText"
              v-model="loginAccount"
            />
          </div>
          <div class="psw">
            <div class="img">
              <img src="@/assets/images/login/icon/psw.svg" alt="" />
            </div>
            <input type="password" placeholder="密碼" v-model="loginPassword" />
          </div>
          <button
            type="submit"
            class="defaultBtn pcInnerText"
            @click="toMemberPage()"
          >
            登入
            <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
          </button>
        </div>
      </form>

      <form
        class="myLog forSignup"
        id="signForm"
        v-show="activeTab === 'signForm'"
      >
        <img
          src="@/assets/images/login/login-bg/login_input.png"
          alt=""
          class="loginSigninBg"
        />
        <div class="loginInputGroup">
          <div class="acc">
            <div class="img">
              <img src="@/assets/images/login/icon/user.svg" alt="" />
            </div>

            <input type="text" placeholder="用戶名" class="pcMarkText" />
          </div>
          <div class="acc">
            <div class="img">
              <img src="@/assets/images/login/icon/account.svg" alt="" />
            </div>

            <input type="text" placeholder="帳號" class="pcMarkText" />
          </div>
          <div class="psw">
            <div class="img">
              <img src="@/assets/images/login/icon/psw.svg" alt="" />
            </div>
            <input type="password" placeholder="密碼" />
          </div>
          <div class="psw">
            <div class="img">
              <img src="@/assets/images/login/icon/psw.svg" alt="" />
            </div>
            <input type="password" placeholder="再次輸入密碼" />
          </div>
          <button class="defaultBtn pcInnerText">
            註冊
            <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { mapActions } from "pinia";
import userStore from "@/stores/auth";
export default {
  data() {
    return {
      activeTab: "loginForm",
      loginAccount: "mor_2314",
      loginPassword: "83r5^_",
      currentImage: `/src/assets/images/login/login-bg/login_btn_area.png`,
    };
  },
  components: {},
  methods: {
    //(我要調用的js檔案,調用裡面的哪些函式)
    ...mapActions(userStore, ["updateToken", "updateName", "checkLogin"]),
    signin() {
      axios
        .post(
          "https://fakestoreapi.com/auth/login",
          {
            // username: "mor_2314",
            // password: "83r5^_"
            username: this.username,
            password: this.pswdddv,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          if (response.data && response.data.token) {
            // localStorage.setItem('token', response.data.token)
            this.updateToken(response.data.token);
            this.$router.push("/");
          }
        })
        .catch((error) => console.error(error));
    },
    userLogin() {
      console.log(this.loginAccount);
      console.log(this.loginPassword);
    },
    toMemberPage() {
      this.$router.push("member");
    },
    changeImage(imageNumber) {
      if (imageNumber === 1) {
        this.currentImage = `/src/assets/images/login/login-bg/login_btn_area.png`;
      } else if (imageNumber === 2) {
        this.currentImage = `/src/assets/images/login/login-bg/signin_btn_area.png`;
      }
    },
  },
};
</script>
