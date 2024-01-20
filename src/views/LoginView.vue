<template>
  <section class="loginPage forHeader">
    <a href="#" class="forgetPsw">
      <img src="@/assets/images/login/lion.svg" alt="" />
      <p class="pcInnerText">歡迎阿!!<br />忘記密碼再問我</p>
    </a>
    <div class="cloud">
      <img src="@/assets/images/login/cloudb.svg" alt="" />
    </div>
    <div class="cloudSun">
      <img src="@/assets/images/login/cloudsun.svg" alt="" />
    </div>
    <div>
      <div class="loginSingupArea">
        <div class="loginBtnGroup">
          <button
            class="loginBtn pcSmTitle"
            @click="activeTab = 'loginForm'"
            :class="{ active: activeTab === 'loginForm' }"
          >
            會員登入
          </button>
          <button
            class="signupBtn pcSmTitle"
            @click="activeTab = 'signForm'"
            :class="{ active: activeTab === 'signForm' }"
          >
            註冊會員
          </button>
        </div>
        <form class="myLog" id="loginForm" v-show="activeTab === 'loginForm'">
          <img
            src="@/assets/images/login/login-bg/login.png"
            alt=""
            class="loginSigninBg"
          />
          <div class="loginInputGroup">
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
            <button class="defaultBtn pcSmTitle">
              登入
              <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
            </button>
          </div>
        </form>

        <form class="myLog" id="signForm" v-show="activeTab === 'signForm'">
          <img
            src="@/assets/images/login/login-bg/signup.png"
            alt=""
            class="loginSigninBg"
          />
          <div class="loginInputGroup">
            <div class="acc">
              <div class="img">
                <img src="@/assets/images/login/icon/account.svg" alt="" />
              </div>

              <input type="text" placeholder="帳號" class="pcMarkText" />
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
              <input type="password" placeholder="密碼" />
            </div>
            <button class="defaultBtn pcSmTitle">
              註冊
              <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      activeTab: "loginForm", // 默认显示登录表单
    };
  },
};
</script>
