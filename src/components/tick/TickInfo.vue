<template>
  <!-- part0-1 購票須知 -->
  <section class="tickInfo" @click.self="TickCalendar">
    <!-- 修飾符.self 的作用，只會觸發元素自己的事件行為，由子層元素傳遞來的事件則不會觸發。 -->

    <article>
      <h2 class="pcSmTitle">購票須知</h2>
      <ol>
        <li v-for="info in tickInfomation" :key="info.id" class="pcInnerText">{{ info.content }}
          <ul v-if="info.subRules">
            <li v-for="subInfo in info.subRules" :key="subInfo.id">{{ subInfo.subContent }}</li>
          </ul>
        </li>
      </ol>
    </article>

    <div v-if="windowWidth.isBoard" class="tickLightbox">
      <img v-if="windowWidth.isMidPH" src="@/assets/images/ticket/PHinfoXS.png" alt="購票須知布告欄" class="" />
      <img v-else src="@/assets/images/ticket/PHinfoL.png" alt="購票須知布告欄" class="" />
      <img @click="TickCalendar" class="tickIcon" src="@/assets/images/ticket/tickClose.png" alt="關閉按鈕">
    </div>
    <div v-else class="tickBgc">
      <img src="@/assets/images/ticket/eagle.png" alt="eagle" class="tickEagle">
      <img v-if="windowWidth.isSmallPC" src="@/assets/images/ticket/PCinfoS.png" alt="購票須知布告欄" class="tickBoard" />
      <img v-else-if="windowWidth.isMidPC" src="@/assets/images/ticket/PCinfoM.png" alt="購票須知布告欄" class="tickBoard" />
      <img v-else src="@/assets/images/ticket/PCinfoL.png" alt="購票須知布告欄" class="tickBoard" />
    </div>

  </section>
</template>

<script>
export default {
  inject: ['windowWidth'],
  data() {
    return {
      tickInfomation: [
        {
          id: 1,
          content: "未滿 4 歲的兒童由家長陪同，可免費入場。",
        },
        {
          id: 2,
          content: "整筆訂單的「票券日期」，皆為下訂時所選日期，無法變更，敬請留意。",
        },
        {
          id: 3,
          content: "訂單恕不接受分票及部分變更，若需分開使用票券，或變更日期、票種、數量，請整筆重新下訂。",
        },
        {
          id: 4,
          content: "訂購時請務必確認票種，並符合使用規則。入場時需備妥相關證件，供驗票人員進行抽查。",
          subRules: [
            {
              id: 1,
              subContent: "學生票：本人持有有效學生證正本，或正式入學通知單，或註冊單。",
            },
            {
              id: 2,
              subContent: "兒童票：國民身分證或政府核發附有照片、身分證字號及出生年月日等足以證明身分之證件。",
            },
            {
              id: 3,
              subContent: "愛心票：適用對象限孕婦、65 歲以上(含)長者、持有身心障礙證明者與其陪同者 1 位。請攜帶孕婦健康手冊、身心障礙證明、國民身分證或政府核發之足以證明身分的證件。",
            },
          ],
        },
      ],
    }
  },
  methods: {
    TickCalendar(){
      if(window.innerWidth < 1200){
        this.$emit('TickCalendar');
      }
    }
  },
}
</script>