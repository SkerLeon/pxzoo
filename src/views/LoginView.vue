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
          <!-- <div class="loginBtnGroup">
            <button class="loginBtn pcSmTitle active">會員登入</button>
            <button class="signupBtn pcSmTitle">註冊會員</button>
          </div> -->
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
            <button class="defaultBtn">
              登入
              <img src="/public/images/login/icon/btnArrow.svg" alt="" />
            </button>
          </div>
        </form>

        <form class="myLog" id="signForm" v-show="activeTab === 'signForm'">
          <div class="loginInputGroup">
            <div class="acc">
              <div class="img">
                <img src="/public/images/login/icon/account.svg" alt="" />
              </div>

              <input type="text" placeholder="帳號" class="pcMarkText" />
            </div>
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
            <div class="psw">
              <div class="img">
                <img src="/public/images/login/icon/psw.svg" alt="" />
              </div>
              <input type="password" placeholder="密碼" />
            </div>
            <button class="defaultBtn">
              註冊
              <img src="/public/images/login/icon/btnArrow.svg" alt="" />
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
