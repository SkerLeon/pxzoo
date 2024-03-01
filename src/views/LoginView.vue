<template>
  <MainFixedVote />
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
        @submit.prevent="login"
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
            <input type="password" placeholder="密碼" v-model="loginau4a83" />
          </div>
          <button type="submit" class="defaultBtn pcInnerText">
            登入
            <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
          </button>
        </div>
      </form>

      <form
        class="myLog forSignup"
        id="signForm"
        v-show="activeTab === 'signForm'"
        @submit.prevent="register"
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

            <input
              type="text"
              placeholder="用戶名"
              class="pcMarkText"
              v-model="name"
            />
          </div>
          <div class="acc">
            <div class="img">
              <img src="@/assets/images/login/icon/account.svg" alt="" />
            </div>

            <input
              type="text"
              placeholder="帳號"
              class="pcMarkText"
              v-model="acc"
            />
          </div>
          <div class="psw">
            <div class="img">
              <img src="@/assets/images/login/icon/psw.svg" alt="" />
            </div>
            <input
              type="password"
              placeholder="密碼至少8個字"
              v-model="au4a83"
            />
          </div>
          <div class="psw">
            <div class="img">
              <img src="@/assets/images/login/icon/psw.svg" alt="" />
            </div>
            <input
              type="password"
              placeholder="再次輸入密碼"
              v-model="au4a83again"
            />
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
import { mapActions } from "pinia";
import userStore from "../stores/auth";
import apiInstance from "@/stores/acc";
import MainFixedVote from "@/components/MainFixedVote.vue";
const imgUrl = new URL(
  "../../public/images/login/login_btn_area.png",
  import.meta.url
).href;
const imgUrl2 = new URL(
  "../assets/images/login/login-bg/signin_btn_area.png",
  import.meta.url
).href;
export default {
  data() {
    return {
      activeTab: "loginForm",
      currentImage: imgUrl,
      loginAccount: "",
      loginau4a83: "",
      message: "",
      name: "",
      acc: "",
      au4a83: "",
      au4a83again: "",
    };
  },
  created() {
    // 判斷有沒有登入過，如果沒有token等同於沒有登入
    const user = this.checkLogin();
    if (user) {
      this.$router.push("member");
    }
  },
  components: { MainFixedVote },
  methods: {
    //(我要調用的js檔案,調用裡面的哪些函式)
    ...mapActions(userStore, [
      "updateToken",
      "updateName",
      "checkLogin",
      "updateUserData",
    ]),
    login() {
      const bodyFormData = new FormData();
      bodyFormData.append("mem_acc", this.loginAccount);
      bodyFormData.append("mem_psw", this.loginau4a83);

      // 請記得將php埋入跨域
      apiInstance({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}/memberLogin.php`,
        headers: { "Content-Type": "multipart/form-data" },
        data: bodyFormData,
      })
        .then((res) => {
          if (res && res.data) {
            if (res.data.code == 1 && res.data.memInfo.mem_status == 1) {
              // console.log(res);
              this.updateToken(res.data.session_id);
              this.updateUserData(res.data.memInfo);
              alert(res.data.memInfo.mem_name + " 歡迎來到PxZoO~");
              this.$router.push("member");
            } else if (res.data.memInfo.mem_status == 0) {
              alert("此帳號因違反規定已停權");
            } else {
              console.log(res);
              alert("登入失敗");
            }
          }
        })
        .catch((error) => {
          alert("帳號密碼錯誤");
        });
    },
    register() {
      if (this.au4a83 !== this.au4a83again) {
        alert("請確認密碼");
      } else if (this.au4a83.length < 8 && this.au4a83.length < 8) {
        alert("密碼至少8個字");
      } else if (this.acc == "") {
        alert("請輸入帳號");
      } else if (
        !/^[0-9a-zA-Z]+$/.test(this.acc) ||
        !/^[0-9a-zA-Z]+$/.test(this.au4a83)
      ) {
        alert("帳號和密碼只能包含數字和英文字母");
      } else {
        const bodyFormData = new FormData();
        bodyFormData.append("mem_name", this.name);
        bodyFormData.append("mem_acc", this.acc);
        bodyFormData.append("mem_psw", this.au4a83);
        apiInstance({
          method: "post",
          url: `${import.meta.env.VITE_API_URL}/register.php`,
          headers: { "Content-Type": "multipart/form-data" },
          data: bodyFormData,
        })
          .then((res) => {
            if (res && res.data && res.data.msg === "success") {
              alert("註冊成功");
              location.reload();
            } else {
              alert("請檢查輸入資訊");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    changeImage(imageNumber) {
      if (imageNumber === 1) {
        this.currentImage = imgUrl;
      } else if (imageNumber === 2) {
        this.currentImage = imgUrl2;
      }
    },
  },
};
</script>
