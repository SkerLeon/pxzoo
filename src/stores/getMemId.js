export const getMemId = {
  data() {
    return {
      mem_id: null,
    };
  },
  created() {
    // 從 local storage 取得 userData 字串
    const userDataString = localStorage.getItem('userData');
    // 將 userData 字串轉換為 JavaScript 物件
    const userData = JSON.parse(userDataString);
    // 判斷 userData 是有資料，還是空框架
    let logInState = userData && typeof(userData.id)=='number';
    // 從 JavaScript 物件中獲取 id 屬性
    this.mem_id = logInState? userData.id : null;
  },
};