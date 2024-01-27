<script>
alterQty() {
// 禁止輸入+-.
function strToNum (str) {
    let t = str.charAt(0);
    let res = str.replace(/[^\d]/g, '');
    if (t === '-') {
        return '-' + res;
    }
    return res;
}

let s = strToNum('-1abckd56');
console.log(s) // -156

// 第一個值如果是0，轉成空字串

// 數值上限999

}
  </script>
  
  <style>
  /* 根據需要添加樣式 */
  </style>
  