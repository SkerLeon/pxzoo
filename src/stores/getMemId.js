export const getMemId = {
  data() {
    return {
      mem_id: null,
      memData: null,
    };
  },
  watch:{
    memData:{
      handler(value){
        console.log(value);
        if(value && 'mem_id' in value){
          // newValue 為 null 或 undefined時，即為 false
          this.mem_id = value.mem_id;
        }else{
          this.mem_id = null;
        }
        console.log('now', this.mem_id);
      },
      deep: true,
    }
  },
  created(){
    this.memData = JSON.parse(localStorage.getItem('userData')) || {};
  },
};