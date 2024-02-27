<template>
  <MainFixedVote />
  <main class="memPage forHeader">
    <div class="qrCodeLb" v-if="showQRCode" @click.self="closeQRCode">
      <qrcodeLB
        @close-qrcode="closeQRCode"
        :selectTicketDetail="selectTicketDetail"
      />
    </div>

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
          <p class="sidebarText">會員資訊</p>
        </li>
        <li
          @click="activeTab = 'ticket'"
          :class="{ active: activeTab === 'ticket' }"
        >
          <img src="../assets/images/member/memicon/2.svg" alt="" />
          <p class="sidebarText">購票紀錄</p>
        </li>
        <li
          @click="activeTab = 'coupon'"
          :class="{ active: activeTab === 'coupon' }"
        >
          <img src="../assets/images/member/memicon/3.svg" alt="" />
          <p class="sidebarText">優惠票券</p>
        </li>
        <li
          @click="activeTab = 'comment'"
          :class="{ active: activeTab === 'comment' }"
        >
          <img src="../assets/images/member/memicon/4.svg" alt="" />
          <p class="sidebarText">會員留言</p>
        </li>
        <li @click="logout">
          <img src="../assets/images/member/memicon/5.svg" alt="" />
          <p class="sidebarText">會員登出</p>
        </li>
      </ul>
    </aside>
    <section
      class="infoArea"
      id="info"
      v-show="activeTab === 'info'"
      :class="{ active: activeTab === 'info' }"
    >
      <div class="innerInfo">
        <h2 class="pcBigTitle">會員資訊</h2>
        <div class="memInfo">
          <div class="picArea">
            <img
              src="@/assets/images/member/Group 561.png"
              alt="picFrame"
              class="picFrame"
            />
            <img
              :src="getMemPicUrl(userStore.userData.mem_pic)"
              alt=""
              class="memPic"
            />
            <input type="file" @change="handleFileUpload" accept="image/*" />
            <p class="memPicText pcMarkText">點擊相框內更換頭貼</p>
          </div>
          <div class="info pcSmTitle">
            <div v-for="field in fields" :key="field.key">
              <label>{{ field.label }}:</label>
              <input class="infoInput" v-model="profile[field.key]" />
            </div>
            <button
              @click="reviseMemProfile"
              class="defaultBtn pcInnerText infoBtn"
            >
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
        <div v-if="ticketDetail.length > 0" class="buyHistory">
          <div
            v-for="(group, groupIndex) in ticketDetail"
            :key="groupIndex"
            class="buyList"
            @click="openQRCode(groupIndex)"
          >
            <div class="listTitle">
              <p
                v-for="title in ticketsTitle"
                :key="title"
                class="listTitle pcSmTitle"
              >
                {{ title }}
              </p>
            </div>

            <div
              v-for="(ticket, index) in group.tickets"
              :key="index"
              class="listInfo"
            >
              <p class="pcInnerText idColor">{{ ticket.ord_id }}</p>
              <p class="pcInnerText">{{ ticket.ord_tidate }}</p>
              <p class="pcInnerText">{{ ticket.ord_tiprice }}</p>
              <p class="pcInnerText">{{ ticket.ord_payprice }}</p>
              <p class="pcInnerText">{{ ticket.ord_ticktype }}</p>
              <p class="pcInnerText">{{ ticket.ord_status }}</p>
            </div>
          </div>
        </div>

        <div v-else>
          <p>尚無購票紀錄</p>
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
        <div class="couponGroup" v-if="coupontDetail.length > 0">
          <div
            class="coupon"
            v-for="(coupon, index) in coupontDetail"
            :key="index"
          >
            <img :src="getCouPicUrl(coupon.cou_pic)" alt="" />
            <button class="couponBtn pcInnerText" @click="toTicketPage">
              購票去
              <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
            </button>
          </div>
        </div>
        <div v-else>
          <p>尚無優惠券</p>
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
        <h2 class="pcBigTitle">會員留言</h2>
        <div class="commentGroup" v-if="commentDetail.length > 0">
          <div
            class="comment"
            v-for="(comment, index) in commentDetail"
            :key="index"
          >
            <img
              src="@/assets/images/member/papper.png"
              alt="commentBg"
              class="commentBg"
            />
            <img
              :src="getCommPicUrl(comment.com_pic)"
              alt="commentPic"
              class="commentPic"
            />
            <div class="commentArea">
              <p class="commentTitle pcSmTitle">{{ this.profile.mem_name }}</p>
              <textarea
                maxlength="60"
                name=""
                id=""
                cols="30"
                rows="4"
                class="commentText"
                v-model="comment.com_text"
              ></textarea>
            </div>
            <button
              class="defaultBtn pcInnerText commentBtn"
              @click="reviseMemCommProfile(comment.com_id, comment.com_text)"
            >
              修改評論
              <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
            </button>
            <img
              src="../assets/images/member/memicon/green_close.svg"
              alt="green_close"
              class="greenClose"
              @click="delComm(index)"
            />
          </div>
        </div>
        <div v-else><p>尚無留言紀錄</p></div>
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
import qrcodeLB from "@/components/QRcodeLightBox.vue";
import MainFixedVote from "@/components/MainFixedVote.vue";
import userStore from "../stores/auth";
import axios from "axios";
import { mapActions } from "pinia";
export default {
  data() {
    return {
      userStore: userStore(),
      activeTab: "info",
      showQRCode: false,
      profile: [],
      fields: [
        { key: "mem_name", label: "姓名" },
        { key: "mem_title", label: "稱謂" },
        { key: "mem_birthday", label: "生日" },
        { key: "mem_email", label: "信箱" },
        { key: "mem_phone", label: "電話" },
      ],
      ticketsTitle: [
        "訂單編號:",
        "票券日期:",
        "付款金額:",
        "總票數:",
        "票券型態:",
        "處理狀態:",
      ],
      ticketDetail: [],
      selectTicketDetail: [],
      coupontDetail: [],
      commentDetail: [],
    };
  },
  components: {
    qrcodeLB,
    MainFixedVote,
  },
  created() {
    //抓取localStorage內的會員資料
    this.profile.mem_name = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData")).mem_name
      : "";
    this.profile.mem_title = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData")).mem_title
      : "";
    this.profile.mem_email = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData")).mem_email
      : "";
    this.profile.mem_phone = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData")).mem_phone
      : "";
    this.profile.mem_birthday = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData")).mem_birthday
      : "";
    this.profile.mem_id = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData")).mem_id
      : "";
    this.profile.mem_pic = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData")).mem_pic
      : "";
    this.profile.mem_status = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData")).mem_status
      : "";
    this.userStore.updateUserData(this.profile);
    //從LS取出會員資料
    const memberId = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData")).mem_id
      : "";
    //訂單資訊
    if (memberId) {
      // 資料庫會員資料需要與LS內的ID一樣
      axios
        .get(
          `${
            import.meta.env.VITE_API_URL
          }/memberOrderInfo.php?mem_id=${memberId}`
        )
        .then((res) => {
          // console.log(res);
          // 將從資料庫獲取的票券資料格式化成適合於渲染的格式
          if (!res.data || !Array.isArray(res.data)) {
            return;
          }
          const formattedTicketDetail = res.data.map((ticket) => {
            return {
              tickets: [ticket],
            };
          });
          this.ticketDetail = formattedTicketDetail;
        })
        .catch((error) => {
          console.error("Error fetching member orders:", error);
        });
    } else {
      console.log("重新查詢");
    }
    //留言資訊
    if (memberId) {
      // 資料庫會員資料需要與LS內的ID一樣
      axios
        .get(
          `${
            import.meta.env.VITE_API_URL
          }/memberCommentInfo.php?mem_id=${memberId}`
        )
        .then((res) => {
          this.commentDetail = res.data;
        })
        .catch((error) => {
          console.error("Error fetching member orders:", error);
        });
    } else {
      console.log("重新查詢");
    }
    //優惠票券
    if (memberId) {
      // 資料庫會員資料需要與LS內的ID一樣
      axios
        .get(
          `${
            import.meta.env.VITE_API_URL
          }/memberCouponInfo.php?mem_id=${memberId}`
        )
        .then((res) => {
          this.coupontDetail = res.data;
          localStorage.setItem("cou", JSON.stringify(res.data));
        })
        .catch((error) => {
          console.error("Error fetching member orders:", error);
        });
    } else {
      console.log("重新查詢");
    }
  },
  watch: {
    "userStore.token": {
      handler(nVal) {
        if (!nVal) {
          this.$router.push("/");
        }
      },
      immediate: true,
    },
  },
  computed: {
    ticketGroups() {
      // 根據需要，這裡可以將資料庫回傳的資料分組，例如按照日期、類型等，以便動態新增包含標題的 div
      // 這裡假設 ticketDetail 已經是分組好的資料了，每一個元素是一個物件，包含 tickets 屬性，裡面是相同分組的票券詳情
      return this.ticketDetail;
    },
  },
  methods: {
    ...mapActions(userStore, ["updateName", "updateUserData"]),
    //將會員圖片從memberPic中取出
    getMemPicUrl(image) {
      return new URL(
        `${import.meta.env.VITE_IMAGES_BASE_URL}/memberPic/` + image,
        import.meta.url
      ).href;
    },
    //會員圖片上傳
    handleFileUpload(event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("mem_pic", file);
      formData.append("mem_id", this.profile.mem_id);

      axios
        .post(`${import.meta.env.VITE_API_URL}/memberPicUpload.php`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          this.userStore.updateUserData({
            ...this.userStore.userData,
            mem_pic: res.data.mem_pic,
          });
          console.log({
            ...this.userStore.userData,
            mem_pic: res.data.mem_pic,
          });
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    },
    //留言圖片
    getCommPicUrl(image) {
      return new URL(
        `${import.meta.env.VITE_IMAGES_BASE_URL}/comm/` + image,
        import.meta.url
      ).href;
    },
    //優惠券樣式
    getCouPicUrl(image) {
      return new URL(
        `${import.meta.env.VITE_IMAGES_BASE_URL}/coupon/` + image,
        import.meta.url
      ).href;
    },
    //刪除留言
    delComm(index) {
      if (confirm("確定要刪除嗎?")) {
        const com_id = this.commentDetail[index].com_id;
        const formData = new FormData();
        formData.append("com_id", com_id);

        axios
          .post(
            `${import.meta.env.VITE_API_URL}/memberCommDelete.php`,
            formData
          )
          .then((res) => {
            // console.log(res);
            if (!res.data.error) {
              alert(res.data.msg);
              this.commentDetail.splice(index, 1);
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    },
    toTicketPage() {
      this.$router.push("ticket");
    },
    closeQRCode() {
      this.showQRCode = false;
      document.body.style.overflow = "auto";
    },
    openQRCode(groupIndex) {
      if (
        this.ticketDetail[groupIndex].tickets[0].ord_ticktype === "數位票券"
      ) {
        if (this.ticketDetail[groupIndex].tickets[0].ord_status === "未用票") {
          this.showQRCode = true;
          this.selectTicketDetail = this.ticketDetail[groupIndex].tickets[0];
          document.body.style.overflow = "hidden";
        } else {
          alert("您好！該張數位票劵已使用！");
        }
      } else {
        alert("您好！實體票卷沒有QRcode喔！");
      }
    },
    //會員評論更新
    reviseMemCommProfile(com_id, com_text) {
      const postData = {
        com_id: com_id,
        com_text: com_text,
      };

      axios
        .post(
          `${import.meta.env.VITE_API_URL}/memberCommRevise.php`,
          postData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          // console.log(res);
          alert("更新完成");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    },
    //會員資料確認修改
    reviseMemProfile() {
      const data = {
        mem_id: this.profile.mem_id,
        mem_name: this.profile.mem_name,
        mem_title: this.profile.mem_title,
        mem_birthday: this.profile.mem_birthday,
        mem_email: this.profile.mem_email,
        mem_phone: this.profile.mem_phone,
      };
      axios
        .post(`${import.meta.env.VITE_API_URL}/memberRevise.php`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          // console.log(res);
          const userData = JSON.parse(localStorage.getItem("userData"));
          if (userData) {
            userData.mem_name = data.mem_name;
            userData.mem_title = data.mem_title;
            userData.mem_birthday = data.mem_birthday;
            userData.mem_email = data.mem_email;
            userData.mem_phone = data.mem_phone;
            localStorage.setItem("userData", JSON.stringify(userData));
          }

          this.profile.mem_name = data.mem_name;
          this.profile.mem_title = data.mem_title;
          this.profile.mem_birthday = data.mem_birthday;
          this.profile.mem_email = data.mem_email;
          this.profile.mem_phone = data.mem_phone;
          alert("更新成功");
        })
        .catch((error) => {
          console.error(error);
        });
    },
    logout() {
      this.$router.push("/");
      this.userStore.updateToken("");
      this.userStore.updateUserData("");
      alert("已登出");
    },
  },
  mounted() {
    this.mem_name = localStorage.getItem("name") || "";
  },
};
</script>
