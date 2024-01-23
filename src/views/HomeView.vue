<template>
  <section class="home">
    <div id="bannersliderBoard">
      <div class="home_banner_deco">
        <div class="grasses_2"><img src="@/assets/images/vetor/nature_grasses_2.svg" alt="grasses_2"></div>
        <div class="grasses_4"><img src="@/assets/images/vetor/nature_grasses_4.svg" alt="grasses_4"></div>
        <div class="grasses_8"><img src="@/assets/images/vetor/nature_grasses_8.svg" alt="grasses_8"></div>
        <div class="squirrel_1"><img src="@/assets/images/home/home_animal_squirrel_1.svg" alt="squirrel_1"></div>
        <div class="ostrich"><img src="@/assets/images/vetor/vetor_animal_ostrich.svg" alt="ostrich"></div>
      </div>

      <ul id="banner">
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
        <!-- <li class="clicked"></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li> -->
      </ul>
    </div>

    <div class="home_qkmnu">
      <button class="home_qkmnu_time pcInnerText" @click="showContent('home_qkpage_time')">
        營業時間
      </button>

      <button class="home_qkmnu_ticket pcInnerText" @click="showContent('home_qkpage_ticket')">
        票價資訊
      </button>

      <button class="home_qkmnu_park pcInnerText" @click="showContent('home_qkpage_park')">
        園區地圖
      </button>

      <button class="home_qkmnu_traffic pcInnerText" @click="showContent('home_qkpage_traffic')">
        交通指南
      </button>
    </div>

    <div class="home_qkpage">
      <div class="home_qkpage_time">
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

      <div class="home_qkpage_ticket">
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

      <div class="home_qkpage_park"></div>

      <div class="home_qkpage_traffic">
        <div class="traffic_btn">
          <button class="iconBtn pcInnerText" @click="showContent('traffic_page_train')">
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
            <img src="@/assets/images/home/home_traffic_mark_train.svg" alt="map" class="trainmark_1">
          </div>
        </div>
      </div>
      
    </div>

    



    

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
  methods: {},
};
</script>
