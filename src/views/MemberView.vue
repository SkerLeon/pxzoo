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
              <input
                v-model="field.value"
                class="infoInput"
                :placeholder="placeholderLabel(field.key)"
              />
            </div>
            <button
              type="submit"
              @click="saveProfile"
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
        <div class="buyHistory" @click="openQRCode">
          <div class="listTitle">
            <p
              v-for="ticket in ticketsTitle"
              :key="ticketsTitle"
              class="listTitle pcSmTitle"
            >
              {{ ticket }}
            </p>
          </div>

          <div class="listInfo">
            <p class="pcInnerText idColor">
              {{ ticketDetail[0].id }}
            </p>
            <p class="pcInnerText">{{ ticketDetail[0].date }}</p>
            <p class="pcInnerText">{{ ticketDetail[0].pay }}</p>
            <p class="pcInnerText">{{ ticketDetail[0].total }}</p>
            <p class="pcInnerText">{{ ticketDetail[0].type }}</p>
            <p class="pcInnerText">{{ ticketDetail[0].status }}</p>
          </div>
        </div>
        <div class="buyHistory" @click="openQRCode">
          <div class="listTitle">
            <p
              v-for="ticket in ticketsTitle"
              :key="ticketsTitle"
              class="listTitle pcSmTitle"
            >
              {{ ticket }}
            </p>
          </div>

          <div class="listInfo">
            <p class="pcInnerText idColor" @click="openQRCode">
              {{ ticketDetail[1].id }}
            </p>
            <p class="pcInnerText">{{ ticketDetail[1].date }}</p>
            <p class="pcInnerText">{{ ticketDetail[1].pay }}</p>
            <p class="pcInnerText">{{ ticketDetail[1].total }}</p>
            <p class="pcInnerText">{{ ticketDetail[1].type }}</p>
            <p class="pcInnerText">{{ ticketDetail[1].status }}</p>
          </div>
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
          id: "2",
          date: "2023/12/30",
          pay: "NT$800",
          total: "4",
          type: "實體票",
          status: "未取票",
        },
        {
          id: "3",
          date: "2023/12/30",
          pay: "NT$300",
          total: "4",
          type: "電子票",
          status: "已用票",
        },
        {
          id: "4",
          date: "2023/12/30",
          pay: "NT$300",
          total: "4",
          type: "電子票",
          status: "已用票",
        },
        {
          id: "5",
          date: "2023/12/30",
          pay: "NT$300",
          total: "4",
          type: "電子票",
          status: "已用票",
        },
      ],
      userStore: userStore(),
    };
  },
  components: {
    qrcodeLB,
    MainFixedVote,
  },
  //抓取使用者在input輸入的內容
  created() {
    this.profile.mem_name = localStorage.getItem("userData")
      ? JSON.parse(localStorage.getItem("userData")).name
      : "";
    axios
      .get(`${import.meta.env.VITE_API_URL}/memberInfo.php`)
      .then((res) => {
        console.log(res);
        this.mem_name = res.data.name; // 將從 API 獲取的名稱賦值給 mem_name
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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
  methods: {
    placeholderLabel(key) {
      const labels = {
        mem_name: this.profile.mem_name,
      };
      return labels[key] || "";
    },
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
    //點擊修改btn會先將值存入localStorage
    saveProfile() {
      this.fields.forEach((field) => {
        localStorage.setItem(`member${field.key}`, field.value);
      });
      alert("資料修改成功");
    },
    logout() {
      this.$router.push("/");
      this.userStore.updateToken("");
    },
  },
  mounted() {
    const savedImg = localStorage.getItem("uploadedImage");
    this.imgUrl = savedImg ? savedImg : imgDefault;
    this.mem_name = localStorage.getItem("name") || "";
  },
};
</script>
