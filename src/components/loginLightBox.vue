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
          <input type="text" placeholder="帳號" class="pcInnerText" v-model="loginAccount" />
        </div>
        <div class="LBInput">
          <div class="inputIconBg">
            <img src="@/assets/images/login/lightbox/lock.svg" alt="" />
          </div>
          <input type="password" placeholder="密碼" class="pcInnerText" v-model="loginau4a83" />
        </div>
        <RouterLink to="/login" class="LBForget pcMarkText"
          >忘記密碼?</RouterLink
        >
      </div>
      <div class="LBBtnArea">
        <button class="defaultBtn pcInnerText" @click="login">
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
import { mapActions } from "pinia";
import userStore from "../stores/auth";
import apiInstance from "@/stores/acc";
export default {
  data() {
    return {
      loginAccount: "",
      loginau4a83: "",
    };
  },
  created() {
    // 判斷有沒有登入過，如果沒有token等同於沒有登入
    const user = this.checkLogin();
    if (user) {
      // this.$router.push("member");
    }
  },
  props: {},
  methods: {
    ...mapActions(userStore, [
      "updateToken",
      "updateName",
      "checkLogin",
      "updateUserData",
    ]),
    closeMemLightBox() {
      this.$emit("closeLoginBox", false);
    },
    login() {
      const bodyFormData = new FormData();
      bodyFormData.append("mem_acc", this.loginAccount);
      bodyFormData.append("mem_psw", this.loginau4a83);

      this.$emit("closeLoginBox", false);

      // 請記得將php埋入跨域
      apiInstance({
        method: "post",
        url: `${import.meta.env.VITE_API_URL}/memberLogin.php`,
        headers: { "Content-Type": "multipart/form-data" },
        data: bodyFormData,
      })
        .then((res) => {
          if (res && res.data) {
            if (res.data.code == 1) {
              this.updateToken(res.data.session_id);
              this.updateUserData(res.data.memInfo);
              alert(res.data.memInfo.mem_name + " 歡迎來到PxZoO~");
              
              this.$emit("memIdData", res.data.memInfo.mem_id);
              // this.$router.push("member");
              this.closeMemLightBox()
            } else if (res.data.code == 2) {
              alert("你被ban了 好可憐");
            } else {
              // console.log(res);
              alert("登入失敗");
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    goSignUp() {
      this.$router.push({
        name: "login",
        // 須與index.js中首頁的名稱一致
      });
    },
  },
};
</script>
