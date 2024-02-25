<template>
  <div class="qrCodeArea">
    <img
      src="@/assets/images/member/memicon/green_close.svg"
      alt="greenCross"
      class="qrGc"
      id="qrGc"
      @click="hideQRCode"
    />

    <vue-qrcode :value="qrCodeUrl"></vue-qrcode>

    <h3>訂單編號:<span>{{ selectTicketDetail.ord_id }}</span></h3>

    <div class="useNote pcInnerText">
      <p v-for="note in notes" :key="note">{{ note }}</p>
    </div>

  </div>
</template>
<script>
import VueQrcode from '@chenfengyuan/vue-qrcode';

export default {
  components:{
    VueQrcode
  },
  props:{
    selectTicketDetail:Array
  },
  data() {
    return {
      notes: [
        " 1.本筆訂單限用一次，請勿自行掃描QRcode，以免票券失效。",
        "2. 請開啟本畫面掃碼入園，或由服務人員進行票券核銷。",
        "3.本筆訂單限於票券日期當日有效，逾期無效，恕不改期、退款。",
        "4. 其他規定詳見購票須知，PXZoO 保留解釋修改之權力。",
      ],
      show: true,
      qrCodeUrl:`${import.meta.env.VITE_API_URL}/qrcodeSeed.php?mem_id=${this.selectTicketDetail.mem_id}&ord_id=${this.selectTicketDetail.ord_id}`,
    };
  },
  methods: {
    hideQRCode() {
      this.$emit("close-qrcode");
      console.log(this.qrCodeUrl);
    },
  },
};
</script>
