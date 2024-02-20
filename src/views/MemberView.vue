<template>
  <MainFixedVote />
  <main class="memPage forHeader">
    <div class="qrCodeLb" v-if="showQRCode" @click.self="closeQRCode">
      <qrcodeLB @close-qrcode="closeQRCode" />
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
          <p class="sidebarText">會員評論</p>
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
            <img :src="imgUrl" alt="" class="memPic" />
            <input type="file" @change="imgChange" accept="image/*" />
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
        <div
          v-if="ticketDetail.length > 0"
          class="buyHistory"
          @click="openQRCode"
        >
          <div
            v-for="(group, groupIndex) in ticketDetail"
            :key="groupIndex"
            class="buyList"
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
        <div class="couponGroup">
          <div class="coupon">
            <img src="../assets/images/member/discount10.svg" alt="" />
            <button class="couponBtn pcInnerText" @click="toTicketPage">
              購票去
              <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
            </button>
          </div>
          <div class="coupon">
            <img src="../assets/images/member/discount15.svg" alt="" />
            <button class="couponBtn pcInnerText" @click="toTicketPage">
              購票去
              <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
            </button>
          </div>
          <div class="coupon">
            <img src="../assets/images/member/discount20.svg" alt="" />
            <button class="couponBtn pcInnerText" @click="toTicketPage">
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
              <textarea name="" id="" cols="30" rows="4" class="commentText">
我喜歡這個動物園的環境，很寧靜舒適。工作人員非常熱心，他們對動物的照顧真的很投入。強烈推薦！
              </textarea>
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
              <textarea name="" id="" cols="30" rows="4" class="commentText">
我喜歡這個動物園的環境，很寧靜舒適。工作人員非常熱心，他們對動物的照顧真的很投入。強烈推薦！
              </textarea>
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
import qrcodeLB from "@/components/QRcodeLightBox.vue";
import MainFixedVote from "@/components/MainFixedVote.vue";
import userStore from "../stores/auth";
import axios from "axios";
import { Alert } from "view-ui-plus";
const imgDefault = new URL("../assets/images/member/", import.meta.url).href;
export default {
  data() {
    return {
      activeTab: "info",
      showQRCode: false,
      imgUrl: imgDefault,
      profile: {
        mem_name: "",
        mem_title: "",
        mem_birthday: "",
        mem_email: "",
        mem_phone: "",
        mem_token: "",
        mem_id: "",
      },
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
      userStore: userStore(),
    };
  },
  components: {
    qrcodeLB,
    MainFixedVote,
  },
  created() {
    //抓取localStorage內會員資料
    this.profile.mem_name = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData")).name
      : "";
    this.profile.mem_title = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData")).title
      : "";
    this.profile.mem_email = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData")).email
      : "";
    this.profile.mem_phone = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData")).phone
      : "";
    this.profile.mem_birthday = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData")).birthday
      : "";
    this.profile.mem_id = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData")).id
      : "";

    //訂單資訊
    //從LS取出會員資料
    const memberId = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData")).id
      : "";
    if (memberId) {
      // 資料庫會員資料需要與LS內的ID一樣
      axios
        .get(
          `${import.meta.env.VITE_API_URL}/memOrderInfo.php?mem_id=${memberId}`
        )
        .then((res) => {
          console.log(res);
          // 將從資料庫獲取的票券資料格式化成適合於渲染的格式
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
    toTicketPage() {
      this.$router.push("ticket");
    },
    closeQRCode() {
      this.showQRCode = false;
      document.body.style.overflow = "auto";
    },
    openQRCode() {
      this.showQRCode = true;
      document.body.style.overflow = "hidden";
    },
    imgChange(event) {
      const file = event.target.files[0];
      if (file) {
        //限定尺寸
        const size = 1024;
        if (file.size <= size * 1024) {
          const reader = new FileReader();

          reader.onload = (e) => {
            this.imgUrl = e.target.result;
            this.saveImg();
          };
          reader.readAsDataURL(file);
        } else {
          alert("檔案過大");
          this.imgUrl = "";
        }
      }
    },
    //將圖片存入localStorage
    saveImg() {
      localStorage.setItem("uploadedImage", this.imgUrl);
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
          console.log(res);
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
      alert("bye~");
    },
  },
  mounted() {
    const savedImg = localStorage.getItem("uploadedImage");
    this.imgUrl = savedImg ? savedImg : imgDefault;
    this.mem_name = localStorage.getItem("name") || "";
  },
};
</script>
