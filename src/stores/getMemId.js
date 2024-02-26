export const getMemId = {
  data() {
    return {
      mem_id: null,
      userData: null,
    };
  },
  watch:{
    userData(newValue, oldValue){
      if(newValue && 'mem_id' in newValue){
        // newValue 為 null 或 undefined時，即為 false
        this.mem_id = newValue.mem_id;
      }else{
        this.mem_id = null;
      }
    }
  },
  created() {
    // 從 local storage 取得 userData 字串
    const userDataString = localStorage.getItem('userData');
    // 將 userData 字串轉換為 JavaScript 物件
    this.userData = JSON.parse(userDataString);
  },
};