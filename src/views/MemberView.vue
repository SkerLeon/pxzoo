<template>
  <main class="memPage forHeader">
    <aside class="memSidebar">
      <ul>
        <li
          @click="activeTab = 'info'"
          :class="{ active: activeTab === 'info' }"
        >
          <img
            src="../assets/images/member/chameleon_2.svg"
            alt=""
            class="chameleon"
          />
          <img src="../assets/images/member/memicon/1.svg" alt="" />
          <p class="pcInnerText">會員資訊</p>
        </li>
        <li
          @click="activeTab = 'ticket'"
          :class="{ active: activeTab === 'ticket' }"
        >
          <img src="../assets/images/member/memicon/2.svg" alt="" />
          <p class="pcInnerText">購票紀錄</p>
        </li>
        <li
          @click="activeTab = 'coupon'"
          :class="{ active: activeTab === 'coupon' }"
        >
          <img src="../assets/images/member/memicon/3.svg" alt="" />
          <p class="pcInnerText">優惠票券</p>
        </li>
        <li
          @click="activeTab = 'comment'"
          :class="{ active: activeTab === 'comment' }"
        >
          <img src="../assets/images/member/memicon/4.svg" alt="" />
          <p class="pcInnerText">會員評論</p>
        </li>
        <li @click="toHomePage()">
          <img src="../assets/images/member/memicon/5.svg" alt="" />
          <p class="pcInnerText">會員登出</p>
        </li>
      </ul>
    </aside>
    <section class="infoArea" id="info" v-show="activeTab === 'info'">
      <div class="innerInfo">
        <h2 class="pcBigTitle">會員資訊</h2>
        <div class="memInfo">
          <div class="picArea">
            <img
              src="@/assets/images/member/Group 561.png"
              alt="picFrame"
              class="picFrame"
            />
            <input type="file" style="display: none" />
          </div>
          <div class="info pcSmTitle">
            <p v-for="infoItem in info">{{ infoItem }}</p>
            <button type="submit" class="defaultBtn pcInnerText infoBtn">
              修改資料
              <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
      <img src="@/assets/images/member/camel.svg" alt="camel" class="camel" />
    </section>
    <section class="ticketArea" id="ticket" v-show="activeTab === 'ticket'">
      <div class="innerTicket">
        <h2 class="pcBigTitle">購票紀錄</h2>
        <div class="listTitle">
          <p
            v-for="ticket in ticketsTitle"
            :key="ticketsTitle"
            class="pcSmTitle"
          >
            {{ ticket }}
          </p>
        </div>
        <div
          v-for="detail in ticketDetail"
          :key="ticketDetail"
          class="listInfo"
        >
          <p>{{ detail.id }}</p>
          <p>{{ detail.date }}</p>
          <p>{{ detail.pay }}</p>
          <p>{{ detail.total }}</p>
          <p>{{ detail.type }}</p>
          <p>{{ detail.status }}</p>
        </div>
      </div>
      <img
        src="@/assets/images/member/crocodile.svg"
        alt="crocodile"
        class="ticketCrocodile"
      />
    </section>
    <section class="couponArea" id="coupon" v-show="activeTab === 'coupon'">
      <div class="innerCoupon">
        <h2 class="pcBigTitle">優惠票券</h2>
        <div class="couponGroup">
          <div class="coupon">
            <img src="../assets/images/member/discount10.svg" alt="" />
            <button class="couponBtn pcInnerText">
              購票去
              <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
            </button>
          </div>
          <div class="coupon">
            <img src="../assets/images/member/discount15.svg" alt="" />
            <button class="couponBtn pcInnerText">
              購票去
              <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
            </button>
          </div>
          <div class="coupon">
            <img src="../assets/images/member/discount20.svg" alt="" />
            <button class="couponBtn pcInnerText">
              購票去
              <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
      <img
        src="@/assets/images/member/elephant_1.svg"
        alt="elephant"
        class="elephant"
      />
    </section>

    <section class="commentArea" id="comment" v-show="activeTab === 'comment'">
      <div class="innerComment">
        <h2 class="pcBigTitle">會員評論</h2>
        <div class="commentGroup">
          <div class="comment">
            <img
              src="@/assets/images/member/papper.png"
              alt="commentBg"
              class="commentBg"
            />
            <img
              src="../assets/images/member/commentPic.png"
              alt="commentPic"
              class="commentPic"
            />
            <div class="commentArea">
              <p class="commentTitle pcSmTitle">Emily L.</p>
              <p class="commentText pcInnerText">
                我喜歡這個動物園的環境，很寧靜舒適。工作人員非常熱心，他們對動物的照顧真的很投入。強烈推薦！
              </p>
            </div>
            <button class="defaultBtn pcInnerText commentBtn">
              修改評論
              <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
            </button>
            <img
              src="../assets/images/member/memicon/green_close.svg"
              alt="green_close"
              class="greenClose"
            />
          </div>
        </div>
      </div>
      <img
        src="../assets/images/member/flamingo.svg"
        alt="flamingo"
        class="flamingo"
      />
    </section>
  </main>
</template>

<script>
import login from "@/components/loginLightBox.vue";
export default {
  data() {
    return {
      activeTab: "info",
      info: ["姓名", "稱謂", "生日", "信箱", "電話"],
      ticketsTitle: [
        "訂單編號",
        "票券日期",
        "付款金額",
        "總票數",
        "票券型態",
        "處理狀態",
      ],
      ticketDetail: [
        {
          id: "1",
          date: "2023/12/30",
          pay: "NT$300",
          total: "4",
          type: "電子票",
          status: "已用票",
        },
        {
          id: "1",
          date: "2023/12/30",
          pay: "NT$300",
          total: "4",
          type: "電子票",
          status: "已用票",
        },
        {
          id: "1",
          date: "2023/12/30",
          pay: "NT$300",
          total: "4",
          type: "電子票",
          status: "已用票",
        },
        {
          id: "1",
          date: "2023/12/30",
          pay: "NT$300",
          total: "4",
          type: "電子票",
          status: "已用票",
        },
        {
          id: "1",
          date: "2023/12/30",
          pay: "NT$300",
          total: "4",
          type: "電子票",
          status: "已用票",
        },
      ],
    };
  },
  components: {
    login,
  },
  methods: {
    toHomePage() {
      this.$router.push("/");
    },
  },
};
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
