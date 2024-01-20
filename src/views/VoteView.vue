<template id="app">
<!-- 上個月投票結果 -->
  <section class="vote_top">
   <div class="banner">
       
  <div v-for="podium in podium_list" class="podium">
    <div class="podium_no">
            <div class="podium_img">
              <img :src="podium.animal_img" >
            </div>  
              <h2>{{podium.name}}</h2>
              <img :src="podium.icon_img"  >
              <div class="podium_box">
                <h2>{{podium.score}}</h2>
              </div>
             <img class="sheep" src="@/assets/images/vote/sheep.svg" alt="sheep" />
    </div>
  </div>
   </div>
</section>
<!-- 投票規則 -->
   <section class="vote_activity">
      <h1 class="pcBigTitle">
        探索動物奇蹟<br /><span>2024</span
        >年<span>1</span>月動物園之星投票大賽！
      </h1>
      <p class="pcInnerText">
        大象以其智慧和巨大的魅力蟬聯人氣王！長頸鹿優雅的身姿總是令人難以忘懷。而獅子勇猛的王者氣質讓人讚嘆。這些動物都擁有獨特的故事和魅力，誰將在本月成為動物園之星？你最喜歡哪一種動物？快來投票選你最愛的動物！
      </p>
      <div class="vote_rule pcInnerText">
        <div class="time ">投票時間</div>
        <img src="" alt="">
        <p class="pcInnerText">即日起~<span>1</span>月<span>31</span>日<span>23:59</span>截止</p>
      </div>
      <div class="vote_rule pcInnerText">
        <div class="time">投票方式</div>
        <img src="" alt="">
        <p class="pcInnerText">
          參與投票非常簡單！只需登入你的會員帳號，每天可投三票，不限館別。前往我們的動物園官網，點擊你最喜歡的動物，為它投上珍貴的一票。記得，每個參與者每天可投三票，所以請謹慎選擇，支持你心愛的動物。
        </p>
      </div>
      <div class="cloud_6"><img src="@/assets/images/vote/clouda_6.svg" alt="雲" /></div>
      <div class="cloud_2"><img src="@/assets/images/vote/clouda_2.svg" alt="雲" /></div>
      <div class="squirrel_2"><img src="@/assets/images/vote/squirrel_2.svg" alt="松鼠" /></div>
      <div class="AnimalSquirrel"></div>
    </section>
    <!-- 人氣投票TOP3 -->

    <section class="vote_popular">
     
      <div class="title  pcBigTitle">
      <h1 class="pcBigTitle">目前人氣<span>TOP3</span></h1>
    </div>
     
     
    <div  v-for="ranking in ranking_list" class="ranking">
      <div class="number">{{ ranking.number }}</div>
      <div class="content">
        <img :src="ranking.animal_img"  >
        <div class="name">{{ranking.name}}</div>
        <div class="votes">{{ranking.votes}}票</div>
        <button>立即投票</button>
      </div>
    </div>
  
    </section>

<!-- 投票列表 -->
</template>


<script>

export default{
  data(){
    return{
      podium_list : [
  {
    name: "琳達",
    // medal: "第二名獎牌",
    score: 197,
    animal_img:"@/assets/images/animal/small_pic/small_pic_giraffe.png",
  
  },
  {
    name: "艾迪",
    // medal: "第一名獎牌",
    animal_img:"@/assets/images/animal/small_pic/small_pic_elephant.png",
    score: 205,
  },
  {
    name: "阿斯蘭",
    // medal: "第三名獎牌",
    animal_img:"@/assets/images/animal/small_pic/small_pic_lion.png",
    score: 146,
  },
],
ranking_list:[
{
    number: 1,
    name: "威廉",
    votes: 300,
    animal_img: "@/assets/images/animal/small_pic/small_pic_lion.png"
  },
{
    number: 2,
    name: "琳達",
    votes: 250,
    animal_img: "@/assets/images/animal/small_pic/small_pic_giraffe.png"
  },
{
    number: 3,
    name: "馬克",
    votes: 200,
    animal_img: "@/assets/images/animal/small_pic/small_pic_meerkat.png"
  },
]



    }
  }
  }


</script>
