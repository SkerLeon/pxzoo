// https://pinia.vuejs.org/core-concepts/state.html
import { defineStore } from "pinia";

export default defineStore("userStore", {
  // 定義名稱為 "userStore" 的存儲庫。
  state: () => ({
    token: localStorage.getItem("token") || "", //
    name: "Jenny",
    wallet: "300",
    //預留userData:{}之後串接PHP
  }),

  // 對應 computed (物件形式)
  // 對應到計算屬性 (getters，以物件形式)
  getters: {
    getUserName: (state) => `歡迎 ${state.name}`,
    // 定義一個名為 getUserName 的計算屬性，返回包含使用者名稱的歡迎訊息。
  },

  // 對應 methods (物件形式)
  actions: {
    checkLogin() {
      const storageToken = localStorage.getItem("token");
      if (this.token) {
        return this.token; // 如果存儲庫中已經設定了 token，則返回它。
      } else if (storageToken) {
        return storageToken; // 如果 localStorage 中存儲有 token，則返回它。
      } else {
        return ""; // 如果找不到 token，則返回空字串。
      }
    },
    updateToken(payload) {
      console.log(payload);
      // 定義一個名為 updateToken 的方法，接受一個 payload 作為參數。
      if (payload) {
        this.token = payload; // 將存儲庫中的 token 設定為提供的 payload。
        localStorage.setItem("token", payload); // 將 token 存儲到 localStorage 中。
      } else {
        this.token = ""; // 如果未提供 payload，則清除存儲庫中的 token。
        localStorage.removeItem("token"); // 從 localStorage 中刪除 token。
      }
    },
    updateName(payload) {
      // 定義一個名為 updateName 的方法，接受一個 payload 作為參數。
      this.name = payload; // 使用提供的 payload 更新存儲庫中的名稱。
    },
    updateUserData(val) {
      console.log(val);
      // 不把全部資訊紀錄
      this.userData = {
        name: val.mem_name,
        id: val.mem_id,
        title: val.mem_title,
        email: val.mem_email,
        phone: val.mem_phone,
        birthday: val.mem_birthday,
        validation: val.mem_validation,
        pic: val.mem_pic,
        // 封鎖狀況1|0
        state: val.mem_status,
        // 如果有權限可以把權限角色記載資料庫
        role: "editor",
      };
      localStorage.setItem("userData", JSON.stringify(this.userData));
    },
    checkUserData() {
      const storageUserData = localStorage.getItem("userData");
      console.log(Object.keys(this.userData).length);
      if (Object.keys(this.userData).length > 0) {
        return this.userData;
      } else if (storageUserData) {
        this.userData = JSON.parse(storageUserData);
        return storageUserData;
      } else {
        return "";
      }
    },
  },
});
