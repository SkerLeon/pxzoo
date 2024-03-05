PxZoO 前台
===

![image](https://hackmd.io/_uploads/HyMALfNpp.png)


- [目錄](#pxzoo-前台)
  - [專案架構](#專案架構)
  - [前台介紹](#前台介紹)
  - [系統說明](#系統說明)
  - [使用技術](#使用技術)
  - [資料夾說明](#資料夾說明)
  - [測試帳號密碼](#測試帳號密碼)
  - [在 Local 端的安裝＆運行步驟](#在-local-端的安裝運行步驟)
  - [聯絡作者](#聯絡作者)
  - [參考資料](#參考資料)

## 專案架構
:star: 本專案為「前後台分離」、「前後端分離」: 

| :file_folder: 資料夾名稱 | :memo: 說明 | :link: GitHub 連結  |
| -------- | -------------- | ----- |
| g4       | 儲存所有專案     | ----  |
| - pxzoo  | 前台內容        | [前台](https://github.com/SkerLeon/pxzoo)  |
| - back   | 後台內容        | [後台](https://github.com/Hsuan1128/PxZoO-admin)  |
| - api    | PHP 內容       | [API](https://github.com/yhkekeke/PxZoO_API)  |
| - img    | 資料庫的圖片內容 | 見 API 的 img 資料夾  |


## 前台介紹
1. `遊客` 即可瀏覽動物園的園區資訊、動物資料、最新消息，以及透過人氣投票支持喜歡的動物。
2. 遊客可註冊成為`會員`，登入後可以留下評論與檢舉評論，可透過知識學堂取得優惠券，並且隨時進行線上購票付款流程，安排探索行程，然後在會員中心修改資料、檢視自己的訂單紀錄、優惠紀錄、評論紀錄。
3. `服務櫃台人員` 能使用網站協助遊客取得所需的訊息，簡化並加速遊客入園流程。

## 系統說明
* 專案運行方式是使用 `Node.js`、`npm`、`Vue vite`。
* **核心相依項目（dependencies）**

| :pushpin: 項目 | :label:  版本 |
| -------- | -------- |
| @chenfengyuan/vue-qrcode | ^2.0.0 |
| aos | ^2.3.4 |
| axios | ^1.6.7 |
| pinia | ^2.1.7 |
| view-ui-plus | ^1.3.15 |
| vue | ^3.3.11 |
| vue-cropper | ^1.1.1 |
| vue-native-websocket | ^2.0.15 |
| vue-qrcode | ^2.2.2 |
| vue-router | ^4.2.5 |
| ws | ^8.16.0 |


* **開發相依項目（devDependencies）**

| :pushpin: 項目 | :label:  版本 |
| -------- | -------- |
| @vitejs/plugin-vue | ^4.5.2 |
| sass | ^1.70.0 |
| vite | ^5.0.10 |


## 使用技術
| :pushpin: 類別 | :wrench: 技術 |
| ------------- | ------------ |
| 前端工具       | CSS、HTML、JS、AJAX、Vue.js、View Design、pinia、chart.js  |
| 後端工具 | PHP、MySQL |
| 程式環境與工具 | Sass、VSCode、MySQL Workbench、Wampserver、Vue Vite |
| 版控工具 | git、GitHub、Sourcetree |
| 設計與專案管理工具 | Figma、TimeTree |

## 資料夾說明
| :file_folder: 資料夾名稱 | :memo: 說明 |
| -------- | ------------- |
| css     | scss 轉檔後 css 檔案放置處 |
| page     | 圖片放置處    |
| public     | 圖片放置處(檔名不會隨打包改變) |
| src     | 資源放置處     |
| - components | vue 組件放置處 |
| - router | index.js 放置處   |
| - stores | pinia 檔案放置處   |
| - views | 畫面放置處     |
| - assets   | 靜態資源放置處    |
| ---- images | 圖片放置處      |
| ---- js     | 共用 .js 放置處 |
| ---- scss   | scss 檔案放置處 |

## 測試帳號密碼
* [專案正式上線網址](https://tibamef2e.com/chd104/g4/)
```sh
帳號： PxZoOexample
密碼： PxZoOexample
```

* 前台需要登入才能使用的功能有: 
  * 會員中心
  * 首頁 | 評論、檢舉
  * 立即購票
  * 知識學堂 | 領取優惠券

## 在 Local 端的安裝＆運行步驟
1. 取得前台專案
```sh
git clone https://github.com/SkerLeon/pxzoo.git
```

2. 進入專案目錄
```sh
cd pxzoo
```

3. 前台安裝套件
```sh
npm install
```
4. 運行前台專案
```sh
npm run dev
```

## 聯絡作者
本專案開發者及主責頁面/功能:  

<a href="https://github.com/SkerLeon/pxzoo/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=SkerLeon/pxzoo" />
</a>  

1. [SkerLeon](https://github.com/SkerLeon): 園區介紹、知識學堂/優惠券產出、會員中心/購票紀錄的 QRCODE 產出
2. [yhkekeke](https://github.com/yhkekeke): 立即購票
3. [huang607](https://github.com/huang607) : 首頁、Header、Footer、Fixed
4. [Hsuan1128](https://github.com/Hsuan1128): 登入、註冊、會員中心(包含會員資訊、購票紀錄、優惠票券、會員留言)
5. [Ying-Jung189](https://github.com/Ying-Jung189) : 動物資訊、動物內頁、最新消息、消息內頁
6. [wenchieh0119](https://github.com/wenchieh0119) : 人氣投票、知識學堂

## 參考資料
* [專案簡報](https://docs.google.com/spreadsheets/d/1d7xajKl-_hGmBGOUZ3mqe0n8COaip61Ku1Xc3MEIni4/edit#gid=1055140317&range=E5)
* [專案 Demo 影片](https://www.youtube.com/watch?v=wMNHY-WFYpA&ab_channel=%E7%B7%AF%E8%82%B2TibaMe%E5%B0%B1%E6%A5%AD%E9%A4%8A%E6%88%90%E7%8F%AD)
* [專案技術文件](https://drive.google.com/drive/folders/1dhqDJZqMZtEm1SKmbbDQ95awtH3yeofr)
* [專案 UI/UX 設計稿](https://www.figma.com/file/YCfP69MYr9OBUSBmMqePIr/%E7%B7%AF%E8%82%B2-%7C-%E5%9C%98%E9%AB%94%E5%B0%88%E9%A1%8C-6-PxZoO?type=design&node-id=515%3A9347&mode=design&t=DTzDguwhyjsUlTiD-1)
