<template>
    <div class="writecomm">
        <img src="@/assets/images/member/memicon/green_close.svg" alt="close" class="close" id="close"
            @click="hideWriteComm" />
        <h2 class="comm_title pcBigTitle">填寫留言</h2>
        <div class="comm_text" id="comm_text">
            <label class="pcInnerText">
                想說的話<span class="numLimit">{{ num }}/60</span>
                <textarea rows=4 maxlength="60" @input="monitorInput" v-model="formData.com_text"
                    placeholder=請填寫您想與大家分享的事></textarea>
            </label>
        </div>

        <div class="comm_img">
            <div class="comm_img_front">
                <label class="comm_img_text pcInnerText">
                    上傳圖片
                    <span v-if="fileName">{{ fileName }}</span>
                    <span v-else>請選擇檔案</span>
                </label>
                <label class="pcInnerText" for="uploads">
                    <div class="iconBtn pcInnerText">
                        <p class="iconText">
                            <img src="@/assets/images/home/home_icon_image.svg" alt="" class="buttonIcon" />
                            選擇檔案
                        </p>
                        <img src="@/assets/images/login/icon/btnArrow.svg" alt="" class="arrowIcon" />
                    </div>
                    <!-- <input type="file" name="comm" accept="image/png, image/jpeg"
                        @change="handleFileChange('com_pic', $event)" /> -->
                </label>
            </div>
            <!-- v-loading="loading"  -->
            <div class="cropper-content">
                <div class="cropper">
                    <vue-cropper
                    ref="cropper"
                    :img="option.img"
                    :output-size="option.outputSize"
                    :outputType="option.outputType"
                    :info="option.info"
                    :canScale="option.canScale"
                    :autoCrop="option.autoCrop"
                    :autoCropWidth="option.autoCropWidth"
                    :autoCropHeight="option.autoCropHeight"
                    :fixed="option.fixed"
                    :fixed-number="option.fixedNumber"
                    :full="option.full"
                    :fixed-box="option.fixedBox"
                    :can-move="option.canMove"
                    :can-move-box="option.canMoveBox"
                    :original="option.original"
                    :center-box="option.centerBox"
                    :height="option.height"
                    :info-true="option.infoTrue"
                    :max-img-size="option.maxImgSize"
                    :enlarge="option.enlarge"
                    :mode="option.mode"
                    :fillColor="option.fillColor"
                    @realTime="realTime"
                    @imgLoad="imgLoad"
                    />
                    <!-- <vue-cropper
                    ref="cropper"
                    :img="option.img"
                    :outputType="option.outputType"
                    :autoCrop="option.autoCrop"
                    :autoCropWidth="option.autoCropWidth"
                    :autoCropHeight="option.autoCropHeight"
                    @realTime="realTime"
                    /> -->
                </div>

                <!--預覽效果圖-->
                <div class="show-preview">
                    <div :style="previews.div" class="preview">
                        <img :src="previews.url" :style="previews.img">
                    </div>
                </div>

                <!--底部操作工具按钮-->
                <div class="footer-btn">
                    <div class="scope-btn">
                        <!-- <label class="btn" for="uploads">選擇圖片</label> -->
                        <input id="uploads" type="file" style="position:absolute; clip:rect(0 0 0 0);" 
                                accept="image/png, image/jpeg, image/gif, image/jpg" @change="selectImg($event)">

                        <div class="iconBtn pcInnerText" @click="changeScale(1)">
                            <p class="iconText">
                                <img src="@/assets/images/home/home_icon_add.svg" alt="" class="buttonIcon" />
                                
                            </p>
                            <img src="@/assets/images/login/icon/btnArrow.svg" alt="" class="arrowIcon" />
                        </div>

                        <div class="iconBtn pcInnerText" @click="changeScale(-1)">
                            <p class="iconText">
                                <img src="@/assets/images/home/home_icon_minus.svg" alt="" class="buttonIcon" />
                                
                            </p>
                            <img src="@/assets/images/login/icon/btnArrow.svg" alt="" class="arrowIcon" />
                        </div>

                        <div class="iconBtn pcInnerText" @click="rotateLeft">
                            <p class="iconText">
                                <img src="@/assets/images/home/home_icon_left.svg" alt="" class="buttonIcon" />
                                
                            </p>
                            <img src="@/assets/images/login/icon/btnArrow.svg" alt="" class="arrowIcon" />
                        </div>

                        <div class="iconBtn pcInnerText" @click="rotateRight">
                            <p class="iconText">
                                <img src="@/assets/images/home/home_icon_right.svg" alt="" class="buttonIcon" />
                                
                            </p>
                            <img src="@/assets/images/login/icon/btnArrow.svg" alt="" class="arrowIcon" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        

        <!-- <button v-if="formData.com_pic" @click="getCroppedImage">裁剪圖片</button> -->
        <!-- <div>
        <h1>留言板</h1>
        <textarea v-model="message" placeholder="請輸入留言"></textarea>
        <button @click="addMessage()">提交</button>
        <div v-for="(msg, index) in messages" :key="index">
        <p>{{ msg }}</p>
        </div>
        </div> -->

        <div class="tqplb" v-if="showWriteTqp" @click.self="closeWriteTqp">
            <writetqp @close-writetqp="closeWriteTqp" />
        </div>

        <button class="submitbtn defaultBtn pcInnerText" @click="saveComm('com_pic','blob')">
            確認送出
            <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
        </button>

        <div class="writecomm_deco">
            <div class="panda"><img src="@/assets/images/vetor/vetor_animal_panda.svg" alt="panda"></div>
            <div class="tree_1"><img src="@/assets/images/vetor/nature_tree_1.svg" alt="tree_1"></div>
        </div>

    </div>
</template>
<script>
import axios from 'axios'; // 引入 axios 库
import writetqp from "@/components/home/WriteTqp.vue";
import 'vue-cropper/dist/index.css';
import { VueCropper } from 'vue-cropper';
// import { uploadFile } from '../../../../api/commentFrontAdd.php';
// import { regularFileName } from '@/utils';

export default {
    // props: ['memId'],
    name: 'CropperImage',
    components: {
        writetqp,
        VueCropper
    },
    props: {
        addSwitch: false,

        //vue-cropper
        autoCropWidth: { // 默認生成截圖框寬度
            type: Number,
            default: 410
        },
        autoCropHeight: { // 默認生成截圖框高度
            type: Number,
            default: 150
        },
        busType: {
            type: String,
            default: 'advertPic'
        }
    },
    data() {
        return {
            show: true,
            num: 60,
            fileName: '',
            showWriteTqp: false,

            formData: {
                com_text: '',
                com_pic: '',
                mem_id: '',
            },

            // message:'',
            // messages:[],

            //vue-cropper
            loading: false,
            name: this.Name,
            previews: {},
            modelSrc: "",
            option: {
                img: '', // 裁剪圖片的地址,圖片來源 (空) (url 地址, base64, blob)
                outputSize: 1, // 裁剪生成影像的品質 (1) (0.1～1)
                outputType: 'jpeg', // 產生圖片的格式 (jpg (jpg 需要確定 jpeg)) (jpeg, png,webp)
                info: true, // 圖片大小信息 (true) (true,false)
                canScale: true, // 圖片是否允許滚輪缩放 (true) (true,false)
                autoCrop: true, // 是否要有截圖框 (false) (true,false)
                autoCropWidth: 250, // 截圖框寬 (容器的80%) (0 ~ 最大)
                autoCropHeight: 187, //截圖框高 (容器的80%) (0 ~ 最大)
                fixed: true, // 是否開啟截圖框寬高固定比例 (false) (true,false)
                fixedNumber: [4, 3], // 截圖框的寬高比例 ([1, 1]) ([ 寬度 ,  高度 ])
                full: false, // false按原比例裁切圖片，不失真 (false) (true, false)
                fixedBox: false, // 固定截圖框大小， (不允許改變) (false)
                canMove: true, // 上傳圖片是否可以移動 (true) (true, false)
                canMoveBox: true, // 截圖框能否拖動 (true) (true, false)
                original: false, // 上傳圖片按照原始比例渲染 (false) (true, false)
                centerBox: false, // 截圖框是否被限制在圖片里面 (false) (true, false)
                height: true, // 是否按照設備的dpr 輸出等比例圖片 (true) (true, false)
                infoTrue: false, // true为展示真实輸出圖片寬高，false展示看到的截圖框寬高 (false) (true, false)
                maxImgSize: 3000, // 限制圖片最大寬度和高度 (2000) (0 ~ max)
                enlarge: 1, // 圖片根據截圖框輸出比例倍數 (1) (0 ~ max(建議不要太大不然會卡死)
                mode: 'contain', // 圖片默认渲染方式 (contain) (contain , cover, 100px, 100% auto)
                // limitMinSize: '10', // 裁剪框限制最小區域 (10) (Number, Array, String)
                fillColor: '#ffffff' // 導出時背景顏色填充 (空) (#ffffff, white)
                
            },
            randomFileName: '',
            fileNameFinal: '',
            crap: false,
            downImg: '#',
            imgFile:'',
            uploadImgRelaPath:'', //上傳後的圖片的地址（不帶服務器域名）
        };
    },
    methods: {
        hideWriteComm() {
            this.$emit("close-writecomm");
        },

        //字數
        monitorInput() {
            var txtVal = this.formData.com_text.length;
            this.num = 60 - txtVal;
        },

        // 更新開關狀態
        updateaddSwitch() {
            this.$emit('update-switch', !this.addSwitch);
            // window.location.reload();
        },

        //上傳檔名
        // handleFileChange(field, event) {
        //     // 當選擇文件時，將文件對象存儲到 formData 中的指定字段
        //     this.formData[field] = event.target.files[0];
        //     console.log('handleFileChange',this.com_pic);
        //     // this.fileType = fileData.type;
        //     // this.fileSize = Math.floor(fileData.size * 0.001) + 'kb';
        //     // this.fileTime = fileData.lastModifiedDate;
        //     // this.fileThumbnail = URL.createObjectURL(fileData);
        // },

        closeWriteTqp() {
            this.hideWriteComm();
            this.showWriteTqp = false;
            document.body.style.overflow = "auto";
        },

        saveComm(field, type) {
            console.log('finish')
            
            let _this = this;
            // 使用 FormData 來處理文件上傳
            let formData = new FormData();
            for (let key in this.formData) {
                formData.append(key, this.formData[key]);
            }

            if (type === 'blob') { 
                this.$refs.cropper.getCropBlob((data) => { 
                    let img = window.URL.createObjectURL(data) 
                    this.model = true; 
                    this.modelSrc = img; 
                    let newFileName = this.regularFileName() + '.jpg';
                    for (let key in this.formData) {
                        formData.append(key, this.formData[key]);
                    }

                    console.log("Selected mem_id:", JSON.parse(localStorage.getItem('userData')).mem_id);
                    
                    formData.append('mem_id', JSON.parse(localStorage.getItem('userData')).mem_id);
                    formData.append(field, data, newFileName);

                    axios.post(`${import.meta.env.VITE_API_URL}/commentFrontAdd.php`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data', // 指定文件上傳格式
                        },
                    })
                    .then((response)=>{
                        console.log('新增資料成功');
                        console.log(response.data);
                        // 提交成功後的處理
                        this.updateaddSwitch(); // 觸發關閉表單的方法
                        // window.location.reload();
                        // 打開writeTqp組件
                        console.log('Opening writeTqp component');
                        this.showWriteTqp = true;
                        document.body.style.overflow = "hidden";

                        var res = response.data;
                        if(res.success == 1){
                        $('#btn1').val('');
                        _this.imgFile = '';
                        _this.headImg = res.realPathList[0];  //完整路径
                        _this.uploadImgRelaPath = res.relaPathList[0];  //非完整路径
                        _this.$message({　　//element-ui的消息Message消息提示组件
                            type: 'success',
                            message: '上傳成功'
                        });
                        }
                    })
                }) 
            } else { 
                this.$refs.cropper.getCropData((data) => { 
                    this.model = true; 
                    this.modelSrc = data; 
                    formData.append(field, data, this.com_pic);
                }) 
            } 

            // axios.post(`${import.meta.env.VITE_API_URL}/commentFrontAdd.php`, formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data', // 指定文件上傳格式
            //     },
            // })
            //     .then(response => {
            //         console.log('新增資料成功');
            //         console.log(response.data);
            //         // 提交成功後的處理
            //         this.updateaddSwitch(); // 觸發關閉表單的方法
            //         // window.location.reload();
            //         // 打開writeTqp組件
            //         console.log('Opening writeTqp component');
            //         this.showWriteTqp = true;
            //         document.body.style.overflow = "hidden";
            //     })
            //     .catch(error => {
            //         console.error('Error:', error);
            //         // 提交失敗時的處理
            //     });
        },

        //vue-cropper
        // 初始化函數
        imgLoad(msg) {
            console.log('工具初始化函數=====' + msg)
        },
        // 圖片缩放
        changeScale(num) {
            num = num || 1
            this.$refs.cropper.changeScale(num)
        },
        // 向左旋轉
        rotateLeft() {
            this.$refs.cropper.rotateLeft()
        },
        // 向右旋轉
        rotateRight() {
            this.$refs.cropper.rotateRight()
        },
        // *********預覽目前截圖結果************
        preview() {
        this.$refs.cropper.getCropData((data) => {
            // console.log(data);
            this.modelSrc = data;
        });
        },
        // *********即時預覽函數************
        realTime(data) {
            this.previews = data;
            // console.log(data);
        },
        // *********得到截圖的 base64 數據************
        demo() {
            this.$refs.cropper.getCropData((data) => {
            console.log(data);
        });
        },

        // 選擇圖片
        selectImg(event) {
            this.fileNameFinal = event.target.files[0];
            console.log('handleFileChange',this.fileNameFinal);
            // const file = e.target.files[0]
            if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(event.target.value)) {
                this.$message({
                message: '圖片類型要求：jpeg、jpg、png',
                type: 'error'
                })
                return false
            }
            this.fileName = this.fileNameFinal.name;

            // 轉化为blob
            const reader = new FileReader()
            reader.onload = (event) => {
                let data
                if (typeof event.target.result === 'object') {
                data = window.URL.createObjectURL(new Blob([event.target.result]))
                } else {
                    data = event.target.result
                }
                this.option.img = data
            }
            
            console.log(`file.name => ${this.fileNameFinal.name}`)
            // 轉化为base64
            reader.readAsDataURL(this.fileNameFinal)
        },
        imgLoad (msg) { 
            console.log('imgLoad')
            console.log(msg) 
        },

        // 上傳圖片
        // uploadImg(type) {
        //     console.log('finish');
        //     let _this = this;
        //     let formData = new FormData();
        //     if (type === 'blob') {
        //         // 獲取截圖的blob數據
        //         this.$refs.cropper.getCropBlob(async(data) => {
        //             let img = window.URL.createObjectURL(data) 
        //         _this.loading = true
        //         const formData = new FormData()
        //         // formData.append('file', data, this.createNewFileName())
        //         // if (this.autoCropWidth === 100) {
        //         //   formData.append('subDir', 'exchange')
        //         // } else if (this.autoCropHeight === 80) {
        //         //   formData.append('subDir', 'task')
        //         // } else {
        //         //   formData.append('subDir', 'rotate')
        //         // }
        
        //         _this.randomFileName = this.createNewFileName()
        
        //         // 给blob對象的filename屬性賦值文件名
        //         formData.append('rpc', data, _this.randomFileName)
        //         // 给参數賦值文件名
        //         formData.append('fileName', _this.randomFileName)
        //         formData.append('busType', _this.busType)
        
        //         /* this.fileName = data.file.name
        //         formData.append('fileName', this.fileName)*/
        //         // 調用axios上傳
        //         /* const { data: res } = await _this.$http.post('/api/file/imgUpload', formData)*/
        
        //         uploadFile(formData).then(res => {
        //             /* this.handleSuccess(res)*/
        //             if (res.code === 200) {
        //             _this.$message({
        //                 message: '圖片上傳成功',
        //                 type: 'success'
        //             })
        //             // const data = res.data.replace('[', '').replace(']', '').split(',')
        
        //             // const imgInfo = {
        //             //   name: 'DX.jpg',
        //             //   url: res.data.agentUrl,
        //             //   storeUrl: res.data.storeUrl,
        //             //   uploadResult: res.data.uploadResult
        //             // }
        //             // _this.$emit('uploadImgSuccess', imgInfo)
        
        //             // 添加随機生成的文件名
        //             res.fileName = _this.randomFileName
        
        //             _this.$emit('uploadImgSuccess', res)
        //             } else {
        //             _this.$message({
        //                 message: '文件服务異常，請聯系管理員！',
        //                 type: 'error'
        //             })
        //             }
        //         }).finally(() => {
        //             _this.loading = false
        //         })
        //         })
        
        //         /*  if (flag) {
        //             this.$message.warning('請選擇圖片')
        //         }*/
        //     }
        // },
        // createNewFileName() {
        //     // const now = Date.now()
        //     // const fileName = now + '-' + Math.ceil(Math.random() * 100)
        //     // return fileName + '.jpg'
        //     const fileName = regularFileName()
        //     return fileName + '.jpg'
        // },
        regularFileName() {
            const now = new Date();
            // const year = now.getFullYear();
            // const month = (now.getMonth() + 1).toString().padStart(2, '0');
            // const day = now.getDate().toString().padStart(2, '0');
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
            // const randomString = Math.random().toString(36).substring(2, 15);
            return `${hours}${minutes}${seconds}${milliseconds}`;
        },

        // finish(field, type) { 
        //     console.log('finish')
        //     let _this = this;
        //     // this.formData[field] = event.target.files[0];
        //     // console.log('handleFileChange',this.com_pic);
        //     let formData = new FormData();
        //     // 輸出 
        //     if (type === 'blob') { 
        //         this.$refs.cropper.getCropBlob((data) => { 
        //             let img = window.URL.createObjectURL(data) 
        //             this.model = true; 
        //             this.modelSrc = img; 
        //             for (let key in this.formData) {
        //                 formData.append(key, this.formData[key]);
        //             }
        //             formData.append(field, data, this.com_pic);

        //             axios.post(`${import.meta.env.VITE_API_URL}/commentFrontAdd.php`, formData, {
        //                 headers: {
        //                     'Content-Type': 'multipart/form-data', // 指定文件上傳格式
        //                 },
        //             })
        //             // this.$http.post(Api.uploadSysHeadImg.url, formData, 
        //             // {contentType: false, processData: false, 
        //             //     headers:{
        //             //         'Content-Type': 'application/x-www-form-urlencoded'
        //             //     }
        //             // })
        //             .then((response)=>{
        //                 var res = response.data;
        //                 if(res.success == 1){
        //                 $('#btn1').val('');
        //                 _this.imgFile = '';
        //                 _this.headImg = res.realPathList[0];  //完整路径
        //                 _this.uploadImgRelaPath = res.relaPathList[0];  //非完整路径
        //                 _this.$message({　　//element-ui的消息Message消息提示组件
        //                     type: 'success',
        //                     message: '上傳成功'
        //                 });
        //                 }
        //             })
        //         }) 
        //     } else { 
        //         this.$refs.cropper.getCropData((data) => { 
        //             this.model = true; 
        //             this.modelSrc = data; 
        //             formData.append(field, data, this.com_pic);
        //         }) 
        //     } 
        // }, 



        // addMessage(){
        //     if(this.message.trim() !== ''){
        //         this.messages.push(this.message);
        //         this.message='';
        //     }
        // }
    },
};
</script>