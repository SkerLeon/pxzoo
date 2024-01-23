<template>
  <section class="home">
    <div class="home_bannergroup">
      <div class="home_banner_deco">
        <div class="tree_2"><img src="@/assets/images/vetor/nature_tree_2.svg" alt="tree_2"></div>
        <div class="tree_4"><img src="@/assets/images/vetor/nature_tree_4.svg" alt="tree_4"></div>
        <div class="tree_8"><img src="@/assets/images/vetor/nature_tree_8.svg" alt="tree_8"></div>
        <div class="squirrel_1"><img src="@/assets/images/home/home_animal_squirrel_1.svg" alt="squirrel_1"></div>
        <div class="ostrich"><img src="@/assets/images/vetor/vetor_animal_ostrich.svg" alt="ostrich"></div>
      </div>

      <div class="banner1"></div>
      
    </div>

    <!-- <div id="bannersliderBoard" class="home_bannersliderBoard">
      

      <ul id="banner" class="home_banner">
        <li>
          <div class="banner1"></div>
        </li>
        
        <li>
          <div class="banner2"></div>
        </li>

        <li>
          <div class="banner3"></div>
        </li>

        <li>
          <div class="banner4"></div>
        </li>
      </ul>

      <ul id="bannerButton">
        <li class="clicked"></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div> -->

    <div class="home_qkmnu">
      <button 
        class="home_qkmnu_btn home_qkmnu_time pcInnerText" 
        @click="showContent('home_qkpage_time')"
        @mouseover="setHoverState('home_qkpage_time')"
        :class="{ 'hovered': currentContent === 'home_qkpage_time' }"
        >
        營業時間
      </button>

      <button 
        class="home_qkmnu_btn home_qkmnu_ticket pcInnerText" 
        @click="showContent('home_qkpage_ticket')"
        @mouseover="setHoverState('home_qkpage_ticket')"
        :class="{ 'hovered': currentContent === 'home_qkpage_ticket' }"
        >
        票價資訊
      </button>

      <button 
        class="home_qkmnu_btn home_qkmnu_park pcInnerText" 
        @click="showContent('home_qkpage_park')"
        @mouseover="setHoverState('home_qkpage_park')"
        :class="{ 'hovered': currentContent === 'home_qkpage_park' }"
        >
        園區地圖
      </button>

      <button 
        class="home_qkmnu_btn home_qkmnu_traffic pcInnerText" 
        @click="showContent('home_qkpage_traffic')"
        @mouseover="setHoverState('home_qkpage_traffic')"
        :class="{ 'hovered': currentContent === 'home_qkpage_traffic' }">
        交通指南
      </button>
    </div>

    <div class="home_qkpage">
      <div class="home_qkpage_time" v-if="currentContent === 'home_qkpage_time'">
        <div class="time">
          <div class="timeite pcInnerText">
            <div class="title">開放時間</div>
            <div class="clock">09:00~17:00</div>
          </div>

          <div class="timeitem pcInnerText">
            <div class="title">最後購票時間</div>
            <div class="clock">15:50</div>
          </div>

          <div class="timeitem pcInnerText">
            <div class="title">停止入園時間</div>
            <div class="clock">16:00</div>
          </div>
        </div>

        <div class="notice">
          <h2 class="pcSmTitle">溫馨提醒</h2>
          <ul class="pcInnerText">
            <li>每週一及除夕休園。</li>
            <li>連續假期遇到週一則是視同假日開園。113年週一開園日(1月1日、2月12日、6月10日)。</li>
            <li>因天災（颱風）經桃園市政府宣布停班，為維護遊客安全，本園將於停班日休園。</li>
          </ul>
        </div>
      </div>

      <div class="home_qkpage_ticket"  v-if="currentContent === 'home_qkpage_ticket'">
        <div class="ticket_heading pcInnerText">
          <p>票種</p>
          <p>票價</p>
          <p>適用對象</p>
        </div>

        <div class="ticket_type" v-for="(ticket, index) in tickets" :key="index">
          <h2 class="pcSmTitle">{{ticket.title}}</h2>
          <div class="line"></div>
          <div class="price">
            <p class="pcInnerText">NT$</p>
            <p class="pcSmTitle">{{ticket.price}}</p>
          </div>
          <div class="line"></div>
          <p class="pcInnerText">{{ticket.rule}}</p>
        </div>
      </div>

      <div class="home_qkpage_park"  v-if="currentContent === 'home_qkpage_park'"></div>

      <div class="home_qkpage_traffic"  v-if="currentContent === 'home_qkpage_traffic'">
        <div class="traffic_btn">
          <button 
            class="iconBtn pcInnerText" 
            @click="showContent('traffic_page_train')">
            <p class="iconText">
              <img
                src="@/assets/images/home/home_icon_train.svg"
                alt=""
                class="buttonIcon"
              />
              火車
            </p>
            <img
              src="@/assets/images/login/icon/btnArrow.svg"
              alt=""
              class="arrowIcon"
            />
          </button>
          
          <button class="iconBtn pcInnerText" @click="showContent('traffic_page_bus')">
            <p class="iconText">
              <img
                src="@/assets/images/home/home_icon_bus.svg"
                alt=""
                class="buttonIcon"
              />
              公車
            </p>
            <img
              src="@/assets/images/login/icon/btnArrow.svg"
              alt=""
              class="arrowIcon"
            />
          </button>

          <button class="iconBtn pcInnerText" @click="showContent('traffic_page_ubike')">
            <p class="iconText">
              <img
                src="@/assets/images/home/home_icon_ubike.svg"
                alt=""
                class="buttonIcon"
              />
              UBIKE
            </p>
            <img
              src="@/assets/images/login/icon/btnArrow.svg"
              alt=""
              class="arrowIcon"
            />
          </button>

          <button class="iconBtn pcInnerText" @click="showContent('traffic_page_parking')">
            <p class="iconText">
              <img
                src="@/assets/images/home/home_icon_parking.svg"
                alt=""
                class="buttonIcon"
              />
              停車
            </p>
            <img
              src="@/assets/images/login/icon/btnArrow.svg"
              alt=""
              class="arrowIcon"
            />
          </button>
        </div>

        <div class="traffic_page">
          <div class="traffic_page_deco">
            <div class="cloud_6"><img src="@/assets/images/vetor/nature_cloud_6.svg" alt="cloud_6"></div>
            <div class="cloud_2"><img src="@/assets/images/vetor/nature_cloud_2.svg" alt="cloud_2"></div>
            <div class="hedgehog"><img src="@/assets/images/vetor/vetor_animal_hedgehog.svg" alt="hedgehog"></div>
          </div>
          <div class="traffic_page_map">
            <div class="traffic_page_map_map"><img src="@/assets/images/home/home_traffic_map.svg" alt="map"></div>

            <div class="traffic_page_map_location">
              <div class="ground"><img src="@/assets/images/home/home_traffic_ground.svg" alt="ground"></div>

              <div class="location"><img src="@/assets/images/home/home_traffic_location.svg" alt="location"></div>
              <div class="ladybug"><img src="@/assets/images/vetor/vetor_animal_ladybug.svg" alt="ladybug"></div>

              <div class="conversation"><img src="@/assets/images/home/home_traffic_conversation.svg" alt="conversation"></div>
            </div>
          </div>
          
          <div class="traffic_page_train">
            <img src="@/assets/images/home/home_traffic_mark_train.svg" alt="trainmark" class="trainmark_1">
          </div>

          <div class="traffic_page_bus">
            <img src="@/assets/images/home/home_traffic_mark_bus.svg" alt="busmark" class="busmark_1">
            <img src="@/assets/images/home/home_traffic_mark_bus.svg" alt="busmark" class="busmark_2">
            <img src="@/assets/images/home/home_traffic_mark_bus.svg" alt="busmark" class="busmark_3">
            <img src="@/assets/images/home/home_traffic_mark_bus.svg" alt="busmark" class="busmark_4">
            <img src="@/assets/images/home/home_traffic_mark_bus.svg" alt="busmark" class="busmark_5">
            <img src="@/assets/images/home/home_traffic_mark_bus.svg" alt="busmark" class="busmark_6">
            <img src="@/assets/images/home/home_traffic_mark_bus.svg" alt="busmark" class="busmark_7">
            <img src="@/assets/images/home/home_traffic_mark_bus.svg" alt="busmark" class="busmark_8">
            <img src="@/assets/images/home/home_traffic_mark_bus.svg" alt="busmark" class="busmark_9">
            <img src="@/assets/images/home/home_traffic_mark_bus.svg" alt="busmark" class="busmark_10">
            <img src="@/assets/images/home/home_traffic_mark_bus.svg" alt="busmark" class="busmark_11">
            <img src="@/assets/images/home/home_traffic_mark_bus.svg" alt="busmark" class="busmark_12">
            <img src="@/assets/images/home/home_traffic_mark_bus.svg" alt="busmark" class="busmark_13">
            <img src="@/assets/images/home/home_traffic_mark_bus.svg" alt="busmark" class="busmark_14">
            <img src="@/assets/images/home/home_traffic_mark_bus.svg" alt="busmark" class="busmark_15">
          </div>

          <div class="traffic_page_ubike">
            <img src="@/assets/images/home/home_traffic_mark_ubike.svg" alt="ubikemark" class="ubikemark_1">
            <img src="@/assets/images/home/home_traffic_mark_ubike.svg" alt="ubikemark" class="ubikemark_2">
          </div>

          <div class="traffic_page_parking">
            <img src="@/assets/images/home/home_traffic_mark_parking.svg" alt="parkingmark" class="parkingmark_1">
            <img src="@/assets/images/home/home_traffic_mark_parking.svg" alt="parkingmark" class="parkingmark_2">
            <img src="@/assets/images/home/home_traffic_mark_parking.svg" alt="parkingmark" class="parkingmark_3">
            <img src="@/assets/images/home/home_traffic_mark_parking.svg" alt="parkingmark" class="parkingmark_4">
            <img src="@/assets/images/home/home_traffic_mark_parking.svg" alt="parkingmark" class="parkingmark_5">
            <img src="@/assets/images/home/home_traffic_mark_parking.svg" alt="parkingmark" class="parkingmark_6">
            <img src="@/assets/images/home/home_traffic_mark_parking.svg" alt="parkingmark" class="parkingmark_7">
          </div>
        </div>
      </div>
      
    </div>

    <!-- <div class="home_news">
      <div class="newsgroup">
        <div class="news">1</div>
        <div class="news">2</div>
        <div class="news">3</div>
        <div class="news">4</div>
        <div class="news">5</div>
        <div class="news">6</div>
        <div class="news">7</div>
      </div>
    </div> -->

    <div class="tree_2"><img src="@/assets/images/vetor/nature_tree_2.svg" alt="tree_2"></div>
        <div class="tree_4"><img src="@/assets/images/vetor/nature_tree_4.svg" alt="tree_4"></div>
        <div class="tree_8"><img src="@/assets/images/vetor/nature_tree_8.svg" alt="tree_8"></div>
        <div class="squirrel_1"><img src="@/assets/images/home/home_animal_squirrel_1.svg" alt="squirrel_1"></div>
        <div class="ostrich"><img src="@/assets/images/vetor/vetor_animal_ostrich.svg" alt="ostrich"></div>

    



    

</section>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  components: {
      RouterLink,
  },
  data() {
      return {
        currentContent: 'home_qkpage_time', // 初始值可以是空字串或其他適合的值
        tickets:[{
          title:"成人票",
          price:"100",
          rule:"18~64歲",
        },{
          title:"學生票",
          price:"80",
          rule:"12歲以上(含)持學生證者",
        },{
          title:"兒童票",
          price:"40",
          rule:"4~11歲",
        },{
          title:"愛心票",
          price:"40",
          rule:"65歲以上(含)",
        },{
          title:"團體票",
          price:"60",
          rule:"15人以上適用",
        }]
      };
  },
  created() {},
  methods: {
    showContent(Content) {
      this.currentContent = Content;
    },
    setHoverState(content){
      this.currentContent = content;
    }
  },
};
</script>
