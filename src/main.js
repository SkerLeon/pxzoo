import { createApp } from "vue";
import { createPinia } from "pinia";

import { 
    Calendar, Badge, dateRender, disabledDate,
} from 'view-ui-plus';
import 'view-ui-plus/dist/styles/viewuiplus.css';

import "./assets/scss/style.scss";

import App from "./App.vue";
import router from "./router";
import AOS from 'aos';
import 'aos/dist/aos.css'; //導入AOS CSS 樣式
// import VueNativeSock from 'vue-native-websocket';


AOS.init();//初始化AOS


// 創建一個vue應用程式(主要配置在app.vue裡)
const vueApp = createApp(App);

vueApp.use(createPinia());
vueApp.use(router);
// 配置WebSocket連接
// vueApp.use(VueNativeSock, 'ws://localhost:3000', {
//     format: 'json',
//     reconnection: true, //自動重新連接
//     reconnectionAttempts: 5, //重新連接嘗試次數
//     reconnectionDelay: 3000, //重新連接時間間隔
//     passToStoreHandler: function (eventName, event) {
//       if (!eventName.startsWith('SOCKET_')) {
//         return true;
//       }
//       return false;
//     },
//   });

vueApp.component('Calendar', Calendar)
vueApp.component('Badge', Badge)
vueApp.component('date-render', dateRender)
vueApp.component('disabled-date', disabledDate)

// 渲染在index.html裡面的div#app
vueApp.mount("#app");
