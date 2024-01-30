<template>
  <section class="home">
    <div class="home_banner">
      <div class="home_banner_deco">
        <div class="tree_2">
          <img src="@/assets/images/vetor/nature_tree_2.svg" alt="tree_2" />
        </div>
        <div class="tree_4">
          <img src="@/assets/images/vetor/nature_tree_4.svg" alt="tree_4" />
        </div>
        <div class="tree_8">
          <img src="@/assets/images/vetor/nature_tree_8.svg" alt="tree_8" />
        </div>
        <div class="squirrel_1">
          <img
            src="@/assets/images/vetor/vetor_animal_squirrel_1.svg"
            alt="squirrel_1"
          />
        </div>
        <div class="ostrich">
          <img
            src="@/assets/images/vetor/vetor_animal_ostrich.svg"
            alt="ostrich"
          />
        </div>
      </div>

      <div class="home_banner_carousel">
        <!-- <img class="home_banner_carousel_img" :src="currentImage" alt="Carousel Image"/> -->
        <div
          class="home_banner_carousel_img"
          :style="{
            backgroundImage: `url(${currentImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }"
        >
          <div class="home_banner_carousel_controls">
            <button @click="prev">
              <img
                class="prevbtn"
                src="@/assets/images/home/home_banner_prevarrow.svg"
                alt="arrow"
              />
            </button>
            <button @click="next">
              <img
                class="nextbtn"
                src="@/assets/images/home/home_banner_nextarrow.svg"
                alt="arrow"
              />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="home_qkmnu">
      <!-- @mouseover="setHoverState('home_qkpage_time')"
      @mouseover="setHoverState('home_qkpage_ticket')"
      @mouseover="setHoverState('home_qkpage_park')"
      @mouseover="setHoverState('home_qkpage_traffic')" -->
      <div class="home_qkmnu_btn">
        <div class="home_qkmnu_btn_img">
          <img
            src="@/assets/images/vetor/vetor_animal_raccoon.svg"
            alt="raccoon"
          />
        </div>
        <button
          class="home_qkmnu_time pcInnerText"
          @click="showContent('home_qkpage_time')"
          :class="{ hovered: currentContent === 'home_qkpage_time' }"
        >
          營業時間
        </button>
      </div>

      <div class="home_qkmnu_btn">
        <div class="home_qkmnu_btn_img">
          <img
            src="@/assets/images/vetor/vetor_animal_monkey.svg"
            alt="monkey"
          />
        </div>
        <button
          class="home_qkmnu_ticket pcInnerText"
          @click="showContent('home_qkpage_ticket')"
          :class="{ hovered: currentContent === 'home_qkpage_ticket' }"
        >
          票價資訊
        </button>
      </div>

      <div class="home_qkmnu_btn">
        <div class="home_qkmnu_btn_img">
          <img src="@/assets/images/vetor/vetor_animal_pig.svg" alt="pig" />
        </div>
        <button
          class="home_qkmnu_park pcInnerText"
          @click="showContent('home_qkpage_park')"
          :class="{ hovered: currentContent === 'home_qkpage_park' }"
        >
          園區地圖
        </button>
      </div>

      <div class="home_qkmnu_btn">
        <div class="home_qkmnu_btn_img">
          <img
            src="@/assets/images/vetor/vetor_animal_chicken_2.svg"
            alt="chicken_2"
          />
        </div>
        <button
          class="home_qkmnu_traffic pcInnerText"
          @click="showContent('home_qkpage_traffic')"
          :class="{ hovered: currentContent === 'home_qkpage_traffic' }"
        >
          交通指南
        </button>
      </div>
    </div>

    <div class="home_qkpage">
      <div
        class="home_qkpage_time"
        v-if="currentContent === 'home_qkpage_time'"
      >
        <div class="time">
          <div class="timeitem pcInnerText">
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
          <h3 class="pcSmTitle">溫馨提醒</h3>
          <ul class="pcInnerText">
            <li>・每週一及除夕休園。</li>
            <li>
              ・連續假期遇到週一則是視同假日開園。113年週一開園日(1月1日、2月12日、6月10日)。
            </li>
            <li>
              ・因天災(颱風)經桃園市政府宣布停班，為維護遊客安全，本園將於停班日休園。
            </li>
          </ul>
        </div>
      </div>

      <div
        class="home_qkpage_ticket"
        v-if="currentContent === 'home_qkpage_ticket'"
      >
        <div class="ticket_heading pcInnerText">
          <p>票種</p>
          <p>票價</p>
          <p>適用對象</p>
        </div>

        <div
          class="ticket_type"
          v-for="(ticket, index) in tickets"
          :key="index"
          :class="ticket.class"
        >
          <img
            class="ticket_bg"
            :src="getTicketUrl(index + 1)"
            alt="ticketbg"
          />

          <div class="ticket_text">
            <div class="ticket_text_title">
              <h2 class="pcSmTitle">{{ ticket.title }}</h2>
              <div class="line"></div>
              <div class="ticket_price">
                <span class="pcInnerText">NT$</span>
                <span class="pcSmTitle">{{ ticket.price }}</span>
              </div>
            </div>
            <div class="line"></div>
            <p class="ticket_rule pcInnerText">{{ ticket.rule }}</p>
          </div>
        </div>
      </div>

      <div
        class="home_qkpage_park"
        v-if="currentContent === 'home_qkpage_park'"
      >
        <div class="parkmark">
          <img
            class="prevbtn"
            src="@/assets/images/home/home_banner_prevarrow.svg"
            alt="arrow"
          />
          <span class="pcMarkText">左右滑動</span>
          <img
            class="nextbtn"
            src="@/assets/images/home/home_banner_nextarrow.svg"
            alt="arrow"
          />
        </div>
        <div class="parkgroup">
          <parkmap />
        </div>

        <!-- <img src="@/assets/images/home/home_map.jpg" alt="map"> -->
      </div>

      <div
        class="home_qkpage_traffic"
        v-if="currentContent === 'home_qkpage_traffic'"
      >
        <div class="traffic_btn">
          <button
            class="iconBtn pcInnerText"
            @click="showSection('traffic_page_train')"
            :class="{ hovered: currentSection === 'traffic_page_train' }"
          >
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

          <button
            class="iconBtn pcInnerText"
            @click="showSection('traffic_page_bus')"
            :class="{ hovered: currentSection === 'traffic_page_bus' }"
          >
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

          <button
            class="iconBtn pcInnerText"
            @click="showSection('traffic_page_ubike')"
            :class="{ hovered: currentSection === 'traffic_page_ubike' }"
          >
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

          <button
            class="iconBtn pcInnerText"
            @click="showSection('traffic_page_parking')"
            :class="{ hovered: currentSection === 'traffic_page_parking' }"
          >
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
          <div class="traffic_page_map_mapimg">
            <img
              class="pcmap"
              src="@/assets/images/home/home_traffic_map.svg"
              alt="map"
            />
            <img
              class="phmap"
              src="@/assets/images/home/home_traffic_map_ph.svg"
              alt="map"
            />
            <div
              class="traffic_page_train"
              v-if="currentSection === 'traffic_page_train'"
            >
              <img
                src="@/assets/images/home/home_traffic_mark_train.svg"
                alt="trainmark"
                class="trainmark_1"
              />
            </div>
          </div>

          <div class="traffic_page_deco">
            <div class="cloud_6">
              <img
                src="@/assets/images/vetor/nature_cloud_6.svg"
                alt="cloud_6"
              />
            </div>
            <div class="cloud_2">
              <img
                src="@/assets/images/vetor/nature_cloud_2.svg"
                alt="cloud_2"
              />
            </div>
            <div class="hedgehog">
              <img
                src="@/assets/images/vetor/vetor_animal_hedgehog.svg"
                alt="hedgehog"
              />
            </div>
          </div>

          <div class="traffic_page_map_location">
            <div class="ground">
              <img
                src="@/assets/images/home/home_traffic_ground.svg"
                alt="ground"
              />
            </div>

            <div class="location">
              <img
                src="@/assets/images/home/home_traffic_location.svg"
                alt="location"
              />
            </div>
            <div class="ladybug">
              <img
                src="@/assets/images/vetor/vetor_animal_ladybug.svg"
                alt="ladybug"
              />
            </div>

            <div class="conversation">
              <img
                src="@/assets/images/home/home_traffic_conversation.svg"
                alt="conversation"
              />
            </div>
          </div>

          <div
            class="traffic_page_bus"
            v-if="currentSection === 'traffic_page_bus'"
          >
            <img
              src="@/assets/images/home/home_traffic_mark_bus.svg"
              alt="busmark"
              class="busmark_1"
            />
            <img
              src="@/assets/images/home/home_traffic_mark_bus.svg"
              alt="busmark"
              class="busmark_2"
            />
            <img
              src="@/assets/images/home/home_traffic_mark_bus.svg"
              alt="busmark"
              class="busmark_3"
            />
            <img
              src="@/assets/images/home/home_traffic_mark_bus.svg"
              alt="busmark"
              class="busmark_4"
            />
            <img
              src="@/assets/images/home/home_traffic_mark_bus.svg"
              alt="busmark"
              class="busmark_5"
            />
            <img
              src="@/assets/images/home/home_traffic_mark_bus.svg"
              alt="busmark"
              class="busmark_6"
            />
            <img
              src="@/assets/images/home/home_traffic_mark_bus.svg"
              alt="busmark"
              class="busmark_7"
            />
            <img
              src="@/assets/images/home/home_traffic_mark_bus.svg"
              alt="busmark"
              class="busmark_8"
            />
            <img
              src="@/assets/images/home/home_traffic_mark_bus.svg"
              alt="busmark"
              class="busmark_9"
            />
            <img
              src="@/assets/images/home/home_traffic_mark_bus.svg"
              alt="busmark"
              class="busmark_10"
            />
            <img
              src="@/assets/images/home/home_traffic_mark_bus.svg"
              alt="busmark"
              class="busmark_11"
            />
            <img
              src="@/assets/images/home/home_traffic_mark_bus.svg"
              alt="busmark"
              class="busmark_12"
            />
            <img
              src="@/assets/images/home/home_traffic_mark_bus.svg"
              alt="busmark"
              class="busmark_13"
            />
            <img
              src="@/assets/images/home/home_traffic_mark_bus.svg"
              alt="busmark"
              class="busmark_14"
            />
            <!-- <img src="@/assets/images/home/home_traffic_mark_bus.svg" alt="busmark" class="busmark_15"> -->
          </div>

          <div
            class="traffic_page_ubike"
            v-if="currentSection === 'traffic_page_ubike'"
          >
            <img
              src="@/assets/images/home/home_traffic_mark_ubike.svg"
              alt="ubikemark"
              class="ubikemark_1"
            />
            <img
              src="@/assets/images/home/home_traffic_mark_ubike.svg"
              alt="ubikemark"
              class="ubikemark_2"
            />
          </div>

          <div
            class="traffic_page_parking"
            v-if="currentSection === 'traffic_page_parking'"
          >
            <img
              src="@/assets/images/home/home_traffic_mark_parking.svg"
              alt="parkingmark"
              class="parkingmark_1"
            />
            <img
              src="@/assets/images/home/home_traffic_mark_parking.svg"
              alt="parkingmark"
              class="parkingmark_2"
            />
            <img
              src="@/assets/images/home/home_traffic_mark_parking.svg"
              alt="parkingmark"
              class="parkingmark_3"
            />
            <img
              src="@/assets/images/home/home_traffic_mark_parking.svg"
              alt="parkingmark"
              class="parkingmark_4"
            />
            <img
              src="@/assets/images/home/home_traffic_mark_parking.svg"
              alt="parkingmark"
              class="parkingmark_5"
            />
            <img
              src="@/assets/images/home/home_traffic_mark_parking.svg"
              alt="parkingmark"
              class="parkingmark_6"
            />
            <img
              src="@/assets/images/home/home_traffic_mark_parking.svg"
              alt="parkingmark"
              class="parkingmark_7"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="home_qkpage_deco">
      <div class="bee">
        <div class="beeconversation">
          <img
            src="@/assets/images/home/home_qkpage_beeconversation.svg"
            alt="conversation"
          />
          <span class="beeconversation_text pcInnerText">WELCOME</span>
        </div>
        <div class="beeimg">
          <img src="@/assets/images/vetor/vetor_animal_bee.svg" alt="bee" />
        </div>
      </div>

      <div class="chameleonconversation">
        <img
          src="@/assets/images/home/home_qkpage_chameleonconversation.svg"
          alt="conversation"
        />
        <span class="chameleonconversation_text pcInnerText">HELLOOO</span>
      </div>
      <div class="chameleon_1">
        <img
          src="@/assets/images/vetor/vetor_animal_chameleon_1.svg"
          alt="chameleon_1"
        />
      </div>
    </div>

    <div class="home_animalfoot">
      <img
        class="foot1"
        src="@/assets/images/home/home_animalfoot_1.svg"
        alt="foot"
      />
      <img
        class="foot2"
        src="@/assets/images/home/home_animalfoot_2.svg"
        alt="foot"
      />
      <img
        class="foot3"
        src="@/assets/images/home/home_animalfoot_3.svg"
        alt="foot"
      />
      <img
        class="foot4"
        src="@/assets/images/home/home_animalfoot_4.svg"
        alt="foot"
      />
      <img
        class="foot5"
        src="@/assets/images/home/home_animalfoot_5.svg"
        alt="foot"
      />
      <img
        class="foot6"
        src="@/assets/images/home/home_animalfoot_6.svg"
        alt="foot"
      />
      <img
        class="foot7"
        src="@/assets/images/home/home_animalfoot_7.svg"
        alt="foot"
      />
      <img
        class="foot8"
        src="@/assets/images/home/home_animalfoot_8.svg"
        alt="foot"
      />
      <img
        class="foot9"
        src="@/assets/images/home/home_animalfoot_9.svg"
        alt="foot"
      />
    </div>

    <div class="home_wn">
      <div class="home_wn_section">
        <!-- v-if="now_area" -->
        <div class="home_wn_weather">
          <div class="weatherlb" v-if="showMoreWeather">
            <moreweather @close-moreweather="closeMoreWeather" />
          </div>
          <h2 class="title pcBigTitle">園區天氣</h2>
          <span class="city pcSmTitle" ref="location"></span>
          <!-- <div class="weatherimg" @click="openMoreWeather"><img src="@/assets/images/home/home_weather_mostly_clear.svg" alt="weather"></div> -->
          <div class="weatherimg" @click="openMoreWeather">
            <img v-if="weatherIcon" :src="weatherIcon" alt="weather icon" />
          </div>
          <span class="temperature pcDecBigTitle" ref="airTemperature"></span>
        </div>

        <div class="home_wn_news">
          <div class="home_wn_news_heading">
            <h2 class="title pcBigTitle">最新消息</h2>
            <RouterLink to="/news">
              <button class="defaultBtn pcInnerText">
                更多消息
                <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
              </button>
            </RouterLink>
          </div>

          <div class="home_wn_news_section">
            <a
              class="news_info"
              @click="toNewsDetail()"
              v-for="item in news_info"
              :key="item"
            >
              <div class="news_datetag">
                <span class="news_time pcInnerText">{{ item.date }}</span>
                <div class="news_tag newsFrame">
                  <img
                    :src="getNewsUrl(item.img)"
                    class="newsFramePic"
                    alt="btnFrame"
                  />
                  <p class="newsFrameText pcInnerText" :class="item.tag_class">
                    {{ item.tag }}
                  </p>
                </div>
              </div>
              <div class="news_title pcInnerText">
                <p>{{ item.title }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div class="home_wn_deco">
        <div class="tree_7">
          <img src="@/assets/images/vetor/nature_tree_7.svg" alt="tree_7" />
        </div>
        <div class="giraffe">
          <img
            src="@/assets/images/home/home_weather_giraffe.svg"
            alt="giraffe"
          />
        </div>
        <div class="grass_1">
          <img src="@/assets/images/vetor/nature_grass_1.svg" alt="grass_1" />
        </div>
        <div class="grass_3">
          <img src="@/assets/images/vetor/nature_grass_3.svg" alt="grass_3" />
        </div>
        <div class="grass_5">
          <img src="@/assets/images/vetor/nature_grass_5.svg" alt="grass_5" />
        </div>
        <div class="tree_1">
          <img src="@/assets/images/vetor/nature_tree_1.svg" alt="tree_1" />
        </div>
      </div>
    </div>

    <div class="home_park">
      <div class="parkmark">
        <img
          class="prevbtn"
          src="@/assets/images/home/home_banner_prevarrow.svg"
          alt="arrow"
        />
        <span class="pcMarkText">左右滑動</span>
        <img
          class="nextbtn"
          src="@/assets/images/home/home_banner_nextarrow.svg"
          alt="arrow"
        />
      </div>
      <div class="parkgroup">
        <parkmap />
      </div>
    </div>

    <div class="home_vote">
      <div class="home_vote_section">
        <div class="home_vote_text">
          <h2 class="pcBigTitle">2023 12月動物王國之星</h2>
          <h3 class="pcSmTitle">立刻投票，支持你最愛的動物朋友！</h3>
          <RouterLink to="/vote">
            <button class="defaultBtn pcInnerText">
              立即投票
              <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
            </button>
          </RouterLink>
        </div>

        <div class="home_vote_podium">
          <div
            class="podium_group"
            v-for="podium in podium_list"
            :class="podium.class"
          >
            <img
              class="vote_img"
              :src="getVoteUrl(podium.animal_img)"
              alt="Animal"
            />
            <div class="vote_name pcSmTitle">{{ podium.name }}</div>
            <div class="podium_box">
              <img class="NO" :src="getNoUrl(podium.NO)" alt="NO" />
              <div class="score pcSmTitle">{{ podium.score }}</div>
            </div>
          </div>

          <!-- <div class="podium1">
            <img class="vote_img" src="@/assets/images/animal/small_pic/small_pic_elephant.png" alt="sheep" />
            <div class="vote_name pcDecSmTitle">艾迪</div>
            <div class="podium_box">
              <img class="NO" src="@/assets/images/vote/NO1.svg" alt="NO1" />
              <div class="score pcDecSmTitle">205</div>
            </div>
          </div> -->
        </div>
      </div>

      <div class="home_vote_decosky">
        <div class="cloud_4">
          <img src="@/assets/images/vetor/nature_cloud_4.svg" alt="cloud_4" />
        </div>
        <div class="cloud_6">
          <img src="@/assets/images/vetor/nature_cloud_6.svg" alt="cloud_6" />
        </div>
        <div class="cloud_3">
          <img src="@/assets/images/vetor/nature_cloud_3.svg" alt="cloud_3" />
        </div>
      </div>

      <div class="home_vote_decoground">
        <div class="grasses_2">
          <img
            src="@/assets/images/vetor/nature_grasses_2.svg"
            alt="grasses_2"
          />
        </div>
        <div class="crocodile">
          <img
            src="@/assets/images/vetor/vetor_animal_crocodile.svg"
            alt="crocodile"
          />
        </div>
        <div class="meerkat">
          <img
            src="@/assets/images/vetor/vetor_animal_meerkat.svg"
            alt="meerkat"
          />
        </div>
        <div class="conversation">
          <img
            src="@/assets/images/home/home_vote_conversation.svg"
            alt="conversation"
          />
          <span class="conversation_text pcInnerText">選我!選我!</span>
        </div>
      </div>
    </div>

    <div class="home_comment">
      <!-- @click="closeWriteComm" -->
      <div class="commlb" v-if="showWriteComm" @click.self="closeWriteComm">
        <writecomm @close-writecomm="closeWriteComm" />
      </div>
      <div class="commlb" v-if="showReportComm" @click.self="closeWriteComm">
        <reportcomm @close-reportcomm="closeReportComm" />
      </div>
      <div class="home_comment_decotop">
        <div class="alpaca">
          <img
            src="@/assets/images/vetor/vetor_animal_alpaca.svg"
            alt="alpaca"
          />
        </div>
        <div class="tree_4">
          <img src="@/assets/images/vetor/nature_tree_4.svg" alt="tree_4" />
        </div>
        <div class="grasses_1">
          <img
            src="@/assets/images/vetor/nature_grasses_1.svg"
            alt="grasses_1"
          />
        </div>
        <div class="grasses_5">
          <img
            src="@/assets/images/vetor/nature_grasses_5.svg"
            alt="grasses_5"
          />
        </div>
        <div class="chimpanzee">
          <img
            src="@/assets/images/vetor/vetor_animal_chimpanzees.svg"
            alt="chimpanzees"
          />
        </div>
        <div class="tree_6">
          <img src="@/assets/images/vetor/nature_tree_6.svg" alt="tree_6" />
        </div>
        <div class="tree_7">
          <img src="@/assets/images/vetor/nature_tree_7.svg" alt="tree_7" />
        </div>
      </div>

      <div class="home_comment_decobottom">
        <div class="tree_1">
          <img src="@/assets/images/vetor/nature_tree_1.svg" alt="tree_1" />
        </div>
        <div class="grasses_2">
          <img
            src="@/assets/images/vetor/nature_grasses_2.svg"
            alt="grasses_2"
          />
        </div>
        <div class="duck">
          <img src="@/assets/images/vetor/vetor_animal_duck.svg" alt="duck" />
        </div>
        <div class="tree_2">
          <img src="@/assets/images/vetor/nature_tree_2.svg" alt="tree_2" />
        </div>
      </div>

      <h2 class="home_comment_title pcBigTitle">動物園探險家</h2>
      <h3 class="pcSmTitle">探索奇妙，與大自然共享驚喜！</h3>

      <div class="home_comment_section">
        <div class="comment_group">
          <div
            class="comment"
            v-for="comment in comment_list"
            :class="comment.class"
          >
            <div class="comment_report">
              <div class="before">
                <img
                  src="@/assets/images/home/home_icon_report1.svg"
                  alt="report"
                />
              </div>
              <div class="hover" @click="openReportComm">
                <img
                  src="@/assets/images/home/home_icon_report2.svg"
                  alt="report"
                  class="hover_report"
                />
                <div class="hover_conversation">
                  <img
                    src="@/assets/images/home/home_comm_conversation.svg"
                    alt="conversation"
                    class="hover_conversation_img"
                  />
                  <span class="hover_conversation_text pcMarkText"
                    >檢舉不當言論</span
                  >
                </div>
              </div>
            </div>
            <img
              class="comment_img"
              :src="getCommUrl(comment.img)"
              alt="comment"
            />
            <p class="comment_content pcMarkText">{{ comment.content }}</p>
          </div>
        </div>
      </div>

      <button class="iconBtn pcInnerText" @click="openWriteComm">
        <p class="iconText">
          <img
            src="@/assets/images/home/home_icon_comment.svg"
            alt=""
            class="buttonIcon"
          />
          我要留言
        </p>
        <img
          src="@/assets/images/login/icon/btnArrow.svg"
          alt=""
          class="arrowIcon"
        />
      </button>
    </div>
  </section>
</template>

<script>
import { RouterLink } from "vue-router";
import parkmap from "@/components/park/ParkMap.vue";
import writecomm from "@/components/home/WriteComm.vue";
import reportcomm from "@/components/home/ReportComm.vue";
import moreweather from "@/components/home/MoreWeather.vue";

import Image01 from "/images/home/home_banner_1.jpg"
import Image02 from "/images/home/home_banner_2.jpg"
import Image03 from "/images/home/home_banner_3.jpg"
import Image04 from "/images/home/home_banner_4.jpg"

export default {
  components: {
    RouterLink,
    parkmap,
    writecomm,
    reportcomm,
    moreweather,
  },
  data() {
    return {
      //banner
      images: [
      Image01,
      Image02,
      Image03,
      Image04,
        // Add more image URLs as needed
      ],
      currentIndex: 0,
      intervalId: null,
      autoPlay: true, // Set to false if you want to disable auto play
      intervalDuration: 4000, // Set the interval duration in milliseconds (3 seconds in this example)

      //快速選單
      currentContent: "home_qkpage_time", // 初始值可以是空字串或其他適合的值

      //快速選單 交通
      currentSection: "traffic_page_train",

      //快速選單 門票
      tickets: [
        {
          title: "成人票",
          price: "100",
          rule: "18~64歲",
          class: "adult",
        },
        {
          title: "學生票",
          price: "80",
          rule: "12歲以上(含)持學生證者",
          class: "student",
        },
        {
          title: "兒童票",
          price: "40",
          rule: "4~11歲",
          class: "kid",
        },
        {
          title: "愛心票",
          price: "40",
          rule: "65歲以上(含)",
          class: "heart",
        },
        {
          title: "團體票",
          price: "60",
          rule: "15人以上適用",
          class: "group",
        },
      ],

      //天氣
      // 新增：用於存放天氣圖片的路徑
      weatherIcon: null,
      // api_key: 'CWA-6404EFA0-8D5B-4848-89E4-F7F963901914',
      // base_url: 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWA-6404EFA0-8D5B-4848-89E4-F7F963901914/',

      //最新消息
      news_info: [
        {
          date: "2024.01.02",
          tag: "最新活動",
          img: "orangeFrame",
          title: "動物明星新一輪投票即將啟動！",
        },
        {
          date: "2024.01.04",
          tag: "園區動態",
          img: "greenFrame",
          title: "動物園為家人共度佳節與動物提供寧靜休息環境，宣布農曆新年休假",
        },
        {
          date: "2023.12.29",
          tag: "最新活動",
          img: "orangeFrame",
          title: "兒童攝影大賽：小攝影師們快來動物園捕捉最美瞬間，贏得豐富獎品",
        },
        {
          date: "2023.12.28",
          tag: "動物知識",
          img: "blueFrame",
          title: "貓頭鷹的生活習性和獵食技巧，揭開夜間狩獵的神秘面紗",
        },
        {
          date: "2023.12.22",
          tag: "園區動態",
          img: "greenFrame",
          title: "新生兒象寶寶在動物園誕生，展現可愛模樣",
        },
        {
          date: "2023.12.21",
          tag: "動物知識",
          img: "blueFrame",
          title: "北極熊的生態適應，面對氣候變遷的挑戰",
        },
        {
          date: "2023.12.18",
          tag: "動物知識",
          img: "blueFrame",
          title: "大象的家庭結構和保護幼象的感人故事",
        },
        {
          date: "2023.12.15",
          tag: "最新活動",
          img: "orangeFrame",
          title: "動物園歡樂跨年 共度美好時光",
        },
      ],

      //人氣投票
      podium_list: [
        {
          name: "琳達",
          // medal: "第二名獎牌",
          score: 197,
          animal_img: "giraffe",
          NO: "2",
          class: "podium2",
        },
        {
          name: "艾迪",
          // medal: "第一名獎牌",
          animal_img: "elephant",
          score: 205,
          NO: "1",
          class: "podium1",
        },
        {
          name: "阿斯蘭",
          // medal: "第三名獎牌",
          animal_img: "lion",
          score: 146,
          NO: "3",
          class: "podium3",
        },
      ],

      //留言板
      comment_list: [
        {
          class: "comm1",
          img: "comm_1",
          content:
            "這是我第三次造訪這個動物園，每次都有不同的驚喜！孩子們特別喜歡互動區，能近距離觀察動物真是太棒了！",
        },
        {
          class: "comm2",
          img: "comm_2",
          content:
            "這個動物園的設施很棒，動物品種豐富多樣，但有些地方需要更多資訊牌，讓遊客更了解動物的生態習性。",
        },
        {
          class: "comm3",
          img: "comm_3",
          content:
            "我喜歡這個動物園的環境，很寧靜舒適。工作人員非常熱心，他們對動物的照顧真的很投入。強烈推薦！",
        },
        {
          class: "comm4",
          img: "comm_4",
          content:
            "看到這麼多種類的動物很值得。我特別喜歡他們的猩猩區，能夠近距離觀察猩猩的行為真是太有趣了！",
        },
        {
          class: "comm1",
          img: "comm_5",
          content:
            "這個動物園真的很適合家庭遊玩，有許多互動體驗讓孩子們玩得很開心。但是建議增加一些休息區域，讓遊客可以休息片刻再繼續探索。",
        },
        {
          class: "comm2",
          img: "comm_6",
          content:
            "動物園的環境很美，但是有些動物的展示區可能需要擴建。不過整體來說，是個不錯的地方，特別是他們的教育活動非常有意義。",
        },
        {
          class: "comm3",
          img: "comm_7",
          content:
            "這是我第一次來這個動物園，我完全愛上了！工作人員很親切，動物看起來都很幸福，這裡的氛圍令人感到愉悅。",
        },
        {
          class: "comm4",
          img: "comm_8",
          content:
            "動物園的設施和種類都很豐富，但是人流量有些大，特別是在假日。建議增加一些導覽團或者提供更多資訊，幫助遊客更好地欣賞動物。",
        },
        {
          class: "comm1",
          img: "comm_9",
          content:
            "這裡的設施非常乾淨整潔，動物看起來都很健康。但希望能增加一些飲料站或者小吃亭，方便遊客在觀賞動物時能夠休息補充能量。",
        },
        {
          class: "comm2",
          img: "comm_10",
          content:
            "我是動物愛好者，這個動物園真的讓我感到驚艷！看到這麼多種類的動物，學到了很多新知識。下次還會再來！",
        },
      ],
      showWriteComm: false,
      showReportComm: false,
      showMoreWeather: false,
    };
  },

  computed: {
    //banner
    currentImage() {
      return this.images[this.currentIndex];
    },
  },

  mounted() {
    //banner
    if (this.autoPlay) {
      this.startAutoPlay();
    }

    //天氣
    // 呼叫 getWeather 方法
    this.getWeather();
  },

  beforeDestroy() {
    //banner
    this.stopAutoPlay();
  },

  created() {
    //天氣
    // this.fetchWeather();
  },

  methods: {
    //banner
    prev() {
      this.currentIndex =
        (this.currentIndex - 1 + this.images.length) % this.images.length;
    },
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    startAutoPlay() {
      this.intervalId = setInterval(() => {
        this.next();
      }, this.intervalDuration);
    },
    stopAutoPlay() {
      clearInterval(this.intervalId);
    },

    //快速選單
    showContent(Content) {
      this.currentContent = Content;
    },
    // setHoverState(content){
    //   this.currentContent = content;
    // },

    //快速選單 門票
    getTicketUrl(paths) {
      return new URL(
        `../assets/images/home/home_ticket_${paths}.svg`,
        import.meta.url
      ).href;
    },

    //快速選單 交通
    showSection(content) {
      this.currentSection = content;
    },

    //天氣
    async getWeather() {
      try {
        // 將 API 密鑰放到標頭中
        let result = await fetch(
          "https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWA-6404EFA0-8D5B-4848-89E4-F7F963901914"
        );
        let data = await result.json();
        console.log(data);

        // 使用 ref 屬性取得 DOM 元素
        const locationWeather = data.records.Station[35].WeatherElement.Weather;
        const location = data.records.Station[35].GeoInfo.CountyName;

        //將 airTemperature 取整數
        const airTemperature = Math.round(
          data.records.Station[35].WeatherElement.AirTemperature
        );

        // 選擇天氣圖片
        this.chooseWeatherIcon(locationWeather);

        //確保 $refs 元素存在
        if (this.$refs.weather) {
          this.$refs.weather.innerHTML = locationWeather;
        }
        if (this.$refs.location) {
          this.$refs.location.innerHTML = location;
        }

        if (this.$refs.airTemperature) {
          this.$refs.airTemperature.innerHTML = airTemperature + "°C";
        }
      } catch (e) {
        console.log(e);
      }
    },
    chooseWeatherIcon(weatherCondition) {
      const weatherConditions = {
        晴: "sunny",
        晴天: "sunny",

        晴時多雲: "mostly_clear",
        多雲時晴: "mostly_clear",
        晴有霧: "mostly_clear",
        晴晨霧: "mostly_clear",

        多雲有靄: "cloudy",
        多雲: "cloudy",
        有霧: "cloudy",
        陰有靄: "cloudy",
        多雲時陰: "cloudy",
        陰時多雲: "cloudy",
        晴時多雲有霧: "cloudy",
        晴時多雲晨霧: "cloudy",
        多雲時晴有霧: "cloudy",
        多雲時晴晨霧: "cloudy",
        多雲有霧: "cloudy",
        多雲晨霧: "cloudy",
        有霧: "cloudy",
        晨霧: "cloudy",

        多雲陣雨: "cloudrain",
        多雲短暫雨: "cloudrain",
        多雲短暫陣雨: "cloudrain",
        午後短暫陣雨: "cloudrain",
        短暫陣雨: "cloudrain",
        多雲時晴短暫陣雨: "cloudrain",
        多雲時晴短暫雨: "cloudrain",
        晴時多雲短暫陣雨: "cloudrain",
        晴短暫陣雨: "cloudrain",
        短暫雨: "cloudrain",
        多雲時陰短暫雨: "cloudrain",
        多雲時陰短暫陣雨: "cloudrain",
        陰時多雲短暫雨: "cloudrain",
        陰時多雲短暫陣雨: "cloudrain",
        多雲時陰有雨: "cloudrain",
        多雲時陰陣雨: "cloudrain",
        晴時多雲陣雨: "cloudrain",
        多雲時晴陣雨: "cloudrain",
        多雲局部雨: "cloudrain",
        多雲局部陣雨: "cloudrain",
        多雲局部短暫雨: "cloudrain",
        多雲局部短暫陣雨: "cloudrain",
        多雲有霧有局部雨: "cloudrain",
        多雲有霧有局部陣雨: "cloudrain",
        多雲有霧有局部短暫雨: "cloudrain",
        多雲有霧有局部短暫陣雨: "cloudrain",
        多雲有霧有陣雨: "cloudrain",
        多雲有霧有短暫雨: "cloudrain",
        多雲有霧有短暫陣雨: "cloudrain",
        多雲局部雨有霧: "cloudrain",
        多雲局部雨晨霧: "cloudrain",
        多雲局部陣雨有霧: "cloudrain",
        多雲局部陣雨晨霧: "cloudrain",
        多雲局部短暫雨有霧: "cloudrain",
        多雲局部短暫雨晨霧: "cloudrain",
        多雲局部短暫陣雨有霧: "cloudrain",
        多雲局部短暫陣雨晨霧: "cloudrain",
        多雲陣雨有霧: "cloudrain",
        多雲短暫雨有霧: "cloudrain",
        多雲短暫雨晨霧: "cloudrain",
        多雲短暫陣雨有霧: "cloudrain",
        多雲短暫陣雨晨霧: "cloudrain",
        有霧有短暫雨: "cloudrain",
        有霧有短暫陣雨: "cloudrain",
        短暫陣雨有霧: "cloudrain",
        短暫陣雨晨霧: "cloudrain",
        短暫雨有霧: "cloudrain",
        短暫雨晨霧: "cloudrain",

        陰: "dark_clouds",
        陰天: "dark_clouds",
        陰有霧: "dark_clouds",
        陰晨霧: "dark_clouds",
        多雲時陰有霧: "dark_clouds",
        多雲時陰晨霧: "dark_clouds",
        陰時多雲有霧: "dark_clouds",
        陰時多雲晨霧: "dark_clouds",

        陰有雨: "rain",
        雨天: "rain",
        晴午後陰短暫雨: "rain",
        晴午後陰短暫陣雨: "rain",
        陰短暫雨: "rain",
        陰短暫陣雨: "rain",
        陰午後短暫陣雨: "rain",
        陰時多雲有雨: "rain",
        陰時多雲有陣雨: "rain",
        陰時多雲陣雨: "rain",
        陰有雨: "rain",
        陰有陣雨: "rain",
        陰雨: "rain",
        陰陣雨: "rain",
        陣雨: "rain",
        午後陣雨: "rain",
        有雨: "rain",
        多雲時陰局部雨: "rain",
        多雲時陰局部陣雨: "rain",
        多雲時陰局部短暫雨: "rain",
        多雲時陰局部短暫陣雨: "rain",
        晴午後陰局部雨: "rain",
        晴午後陰局部陣雨: "rain",
        晴午後陰局部短暫雨: "rain",
        晴午後陰局部短暫陣雨: "rain",
        陰局部雨: "rain",
        陰局部陣雨: "rain",
        陰局部短暫雨: "rain",
        陰局部短暫陣雨: "rain",
        陰時多雲局部雨: "rain",
        陰時多雲局部陣雨: "rain",
        陰時多雲局部短暫雨: "rain",
        陰時多雲局部短暫陣雨: "rain",
        多雲時陰有霧有局部雨: "rain",
        多雲時陰有霧有局部陣雨: "rain",
        多雲時陰有霧有局部短暫雨: "rain",
        多雲時陰有霧有局部短暫陣雨: "rain",
        多雲時陰有霧有陣雨: "rain",
        多雲時陰有霧有短暫雨: "rain",
        多雲時陰有霧有短暫陣雨: "rain",
        多雲時陰局部雨有霧: "rain",
        多雲時陰局部陣雨有霧: "rain",
        多雲時陰局部短暫雨有霧: "rain",
        多雲時陰局部短暫陣雨有霧: "rain",
        多雲時陰陣雨有霧: "rain",
        多雲時陰短暫雨有霧: "rain",
        多雲時陰短暫雨晨霧: "rain",
        多雲時陰短暫陣雨有霧: "rain",
        多雲時陰短暫陣雨晨霧: "rain",
        陰有霧有陣雨: "rain",
        陰局部雨有霧: "rain",
        陰局部陣雨有霧: "rain",
        陰局部短暫陣雨有霧: "rain",
        陰時多雲有霧有局部雨: "rain",
        陰時多雲有霧有局部陣雨: "rain",
        陰時多雲有霧有局部短暫雨: "rain",
        陰時多雲有霧有局部短暫陣雨: "rain",
        陰時多雲有霧有陣雨: "rain",
        陰時多雲有霧有短暫雨: "rain",
        陰時多雲有霧有短暫陣雨: "rain",
        陰時多雲局部雨有霧: "rain",
        陰時多雲局部陣雨有霧: "rain",
        陰時多雲局部短暫雨有霧: "rain",
        陰時多雲局部短暫陣雨有霧: "rain",
        陰時多雲陣雨有霧: "rain",
        陰時多雲短暫雨有霧: "rain",
        陰時多雲短暫雨晨霧: "rain",
        陰時多雲短暫陣雨有霧: "rain",
        陰時多雲短暫陣雨晨霧: "rain",
        陰陣雨有霧: "rain",
        陰短暫雨有霧: "rain",
        陰短暫雨晨霧: "rain",
        陰短暫陣雨有霧: "rain",
        陰短暫陣雨晨霧: "rain",
        有雨有霧: "rain",
        陣雨有霧: "rain",
        短暫陣雨或雷雨有霧: "rain",
        陣雨或雷雨有霧: "rain",

        多雲局部陣雨或雷雨: "cloudstorm",
        "多雲有陣雨或雷雨有霧	": "cloudstorm",
        "多雲有雷陣雨有霧	": "cloudstorm",
        "多雲有霧有陣雨或雷雨	": "cloudstorm",
        多雲有霧有雷陣雨: "cloudstorm",
        多雲局部陣雨或雷雨有霧: "cloudstorm",
        "多雲局部短暫陣雨或雷雨有霧	": "cloudstorm",
        多雲局部短暫雷陣雨有霧: "cloudstorm",
        多雲局部雷陣雨有霧: "cloudstorm",
        多雲陣雨或雷雨有霧: "cloudstorm",
        多雲短暫陣雨或雷雨有霧: "cloudstorm",
        多雲短暫雷陣雨有霧: "cloudstorm",
        多雲雷陣雨有霧: "cloudstorm",
        多雲時晴短暫陣雨或雷雨有霧: "cloudstorm",

        多雲陣雨或雷雨: "storm",
        多雲短暫陣雨或雷雨: "storm",
        多雲短暫雷陣雨: "storm",
        多雲雷陣雨: "storm",
        短暫陣雨或雷雨後多雲: "storm",
        短暫雷陣雨後多雲: "storm",
        短暫陣雨或雷雨: "storm",
        晴時多雲短暫陣雨或雷雨: "storm",
        晴短暫陣雨或雷雨: "storm",
        多雲時晴短暫陣雨或雷雨: "storm",
        午後短暫雷陣雨: "storm",
        多雲時陰陣雨或雷雨: "storm",
        多雲時陰短暫陣雨或雷雨: "storm",
        多雲時陰短暫雷陣雨: "storm",
        多雲時陰雷陣雨: "storm",
        晴陣雨或雷雨: "storm",
        晴時多雲陣雨或雷雨: "storm",
        多雲時晴陣雨或雷雨: "storm",
        陰時多雲有雷陣雨: "storm",
        陰時多雲陣雨或雷雨: "storm",
        陰時多雲短暫陣雨或雷雨: "storm",
        陰時多雲短暫雷陣雨: "storm",
        陰時多雲雷陣雨: "storm",
        陰有陣雨或雷雨: "storm",
        陰有雷陣雨: "storm",
        陰陣雨或雷雨: "storm",
        陰雷陣雨: "storm",
        晴午後陰短暫陣雨或雷雨: "storm",
        晴午後陰短暫雷陣雨: "storm",
        陰短暫陣雨或雷雨: "storm",
        陰短暫雷陣雨: "storm",
        雷雨: "storm",
        陣雨或雷雨後多雲: "storm",
        陰陣雨或雷雨後多雲: "storm",
        陰短暫陣雨或雷雨後多雲: "storm",
        陰短暫雷陣雨後多雲: "storm",
        陰雷陣雨後多雲: "storm",
        雷陣雨後多雲: "storm",
        陣雨或雷雨: "storm",
        雷陣雨: "storm",
        午後雷陣雨: "storm",

        多雲時陰局部陣雨或雷雨: "storm",
        多雲時陰局部短暫陣雨或雷雨: "storm",
        多雲時陰局部短暫雷陣雨: "storm",
        多雲時陰局部雷陣雨: "storm",
        晴午後陰局部陣雨或雷雨: "storm",
        晴午後陰局部短暫陣雨或雷雨: "storm",
        "晴午後陰局部短暫雷陣雨	": "storm",
        "晴午後陰局部雷陣雨	": "storm",
        "陰局部陣雨或雷雨	": "storm",
        "陰局部短暫陣雨或雷雨	": "storm",
        "陰局部短暫雷陣雨	": "storm",
        "陰局部雷陣雨	": "storm",
        "陰時多雲局部陣雨或雷雨	": "storm",
        "陰時多雲局部短暫陣雨或雷雨	": "storm",
        陰時多雲局部短暫雷陣雨: "storm",
        "陰時多雲局部雷陣雨	": "storm",
        "多雲時陰有陣雨或雷雨有霧	": "storm",
        多雲時陰有雷陣雨有霧: "storm",
        "多雲時陰有霧有陣雨或雷雨	": "storm",
        "多雲時陰有霧有雷陣雨	": "storm",
        "多雲時陰局部陣雨或雷雨有霧	": "storm",
        "多雲時陰局部短暫陣雨或雷雨有霧	": "storm",
        "多雲時陰局部短暫雷陣雨有霧	": "storm",
        "多雲時陰局部雷陣雨有霧	": "storm",
        "多雲時陰陣雨或雷雨有霧	": "storm",
        "多雲時陰短暫陣雨或雷雨有霧	": "storm",
        "多雲時陰短暫雷陣雨有霧	": "storm",
        "多雲時陰雷陣雨有霧	": "storm",
        "陰局部陣雨或雷雨有霧	": "storm",
        "陰局部短暫陣雨或雷雨有霧	": "storm",
        "陰局部短暫雷陣雨有霧	": "storm",
        "陰局部雷陣雨有霧	": "storm",
        "陰時多雲有陣雨或雷雨有霧	": "storm",
        "陰時多雲有雷陣雨有霧	": "storm",
        "陰時多雲有霧有陣雨或雷雨	": "storm",
        "陰時多雲有霧有雷陣雨	": "storm",
        "陰時多雲局部陣雨或雷雨有霧	": "storm",
        "陰時多雲局部短暫陣雨或雷雨有霧	": "storm",
        "陰時多雲局部短暫雷陣雨有霧	": "storm",
        "陰時多雲局部雷陣雨有霧	": "storm",
        "陰時多雲陣雨或雷雨有霧	": "storm",
        "陰時多雲短暫陣雨或雷雨有霧	": "storm",
        "陰時多雲短暫雷陣雨有霧	": "storm",
        "陰時多雲雷陣雨有霧	": "storm",
        "陰短暫陣雨或雷雨有霧	": "storm",
        "陰短暫雷陣雨有霧	": "storm",
        "雷陣雨有霧	": "storm",
      };

      // 修改：使用小寫比對
      const condition = weatherCondition.toLowerCase();
      const weatherImg = new URL(
        `/src/assets/images/home/home_weather_${weatherConditions[condition]}.svg`,
        import.meta.url
      ).href;
      // 修改：檢查是否有對應的天氣圖片
      this.weatherIcon = weatherConditions[condition] ? weatherImg : null;
    },

    openMoreWeather() {
      this.showMoreWeather = true;
      document.body.style.overflow = "hidden";
    },
    closeMoreWeather() {
      this.showMoreWeather = false;
      document.body.style.overflow = "auto";
    },

    //最新消息
    toNewsDetail() {
      console.log("page");
      this.$router.push({
        path: "./NewsDetail",
      });
    },
    getNewsUrl(paths) {
      return new URL(
        `../assets/images/news/newsFrame/${paths}.svg`,
        import.meta.url
      ).href;
    }, //改網址

    //人氣投票
    getVoteUrl(img) {
      return new URL(
        `../assets/images/animal/small_pic/small_pic_${img}.png`,
        import.meta.url
      ).href;
    },
    getNoUrl(NO) {
      return new URL(`../assets/images/vote/NO${NO}.svg`, import.meta.url).href;
    },

    //留言板
    getCommUrl(paths) {
      return new URL(`../assets/images/home/comm/${paths}.jpg`, import.meta.url)
        .href;
    }, //改網址
    openWriteComm() {
      this.showWriteComm = true;
      document.body.style.overflow = "hidden";
    },
    closeWriteComm() {
      this.showWriteComm = false;
      document.body.style.overflow = "auto";
    },
    openReportComm() {
      this.showReportComm = true;
      document.body.style.overflow = "hidden";
    },
    closeReportComm() {
      this.showReportComm = false;
      document.body.style.overflow = "auto";
    },
  },
};
</script>
