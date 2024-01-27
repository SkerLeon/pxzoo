<template>
  <div class="qrCodeArea">
    <img
      src="@/assets/images/member/memicon/green_close.svg"
      alt="greenCross"
      class="qrGc"
      id="qrGc"
      @click="hideQRCode"
    />
    <img
      src="@/assets/images/member/qr_code 1.svg"
      alt="qrcode"
      class="qrImg"
    />
    <h3 class="pcSmTitle">訂單編號:<span>0000000</span></h3>
    <div class="newsFrame">
      <img
        src="@/assets/images/news/newsFrame/orangeFrame.svg"
        alt="orangeFrame"
        class="newsFramePic"
      />
      <p class="newsFrameText">票券核銷</p>
    </div>
    <div class="useNote pcInnerText">
      <p v-for="note in notes" :key="note">{{ note }}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      notes: [
        " 1.本筆訂單限用一次，請勿自行點擊按鈕，以免票券失效。",
        "2. 請開啟本畫面掃碼入園，或由服務人員進行票券核銷。",
        "3.本筆訂單限於票券日期當日有效，逾期無效，恕不改期、退款。",
        "4. 其他規定詳見購票須知，PXZoO 保留解釋修改之權力。",
      ],
      show: true,
    };
  },
  methods: {
    hideQRCode() {
      this.$emit("close-qrcode");
    },
  },
};
</script>

<!-- 1.  本筆訂單限用一次，請勿自行點擊按鈕，
　 以免票券失效。
2. 請開啟本畫面掃碼入園，或由服務人員進
　 行票券核銷。
3. 本筆訂單限於票券日期當日有效，逾期無
　 效，恕不改期、退款。
4. 其他規定詳見購票須知，PXZoO 保留解
　 釋修改之權力。 -->

訂單編號:0000000 票券核銷
