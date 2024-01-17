import "./assets/scss/style.scss";
import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// 創建一個vue應用程式(主要配置在app.vue裡)
const vueApp = createApp(App);

vueApp.use(createPinia());
vueApp.use(router);

// 渲染在index.html裡面的div#app
vueApp.mount("#app");
