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

                <!--预览效果图-->
                <div class="show-preview">
                    <div :style="previews.div" class="preview">
                        <img :src="previews.url" :style="previews.img">
                    </div>
                </div>

                <!--底部操作工具按钮-->
                <div class="footer-btn">
                    <div class="scope-btn">
                        <!-- <label class="btn" for="uploads">选择图片</label> -->
                        <input id="uploads" type="file" style="position:absolute; clip:rect(0 0 0 0);" 
                                accept="image/png, image/jpeg, image/gif, image/jpg" @change="selectImg($event)">
                        <button @click="changeScale(1)">放大</button>
                        <button @click="changeScale(-1)">縮小</button>
                        <button @click="rotateLeft">↺ 左旋轉</button>
                        <button @click="rotateRight">↻ 右旋轉</button>
                    </div>
                </div>
            </div>
        </div>
        

        <!-- <button v-if="formData.com_pic" @click="getCroppedImage">裁剪图片</button> -->
        <!-- <div>
        <h1>留言板</h1>
        <textarea v-model="message" placeholder="请输入留言"></textarea>
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
    name: 'CropperImage',
    components: {
        writetqp,
        VueCropper
    },
    props: {
        addSwitch: false,

        //vue-cropper
        autoCropWidth: { // 默认生成截图框宽度
            type: Number,
            default: 410
        },
        autoCropHeight: { // 默认生成截图框高度
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
                info: true, // 图片大小信息 (true) (true,false)
                canScale: true, // 图片是否允许滚轮缩放 (true) (true,false)
                autoCrop: true, // 是否要有截圖框 (false) (true,false)
                autoCropWidth: 250, // 截圖框寬 (容器的80%) (0 ~ 最大)
                autoCropHeight: 187, //截圖框高 (容器的80%) (0 ~ 最大)
                fixed: true, // 是否开启截图框宽高固定比例 (false) (true,false)
                fixedNumber: [4, 3], // 截图框的宽高比例 ([1, 1]) ([ 宽度 ,  高度 ])
                full: false, // false按原比例裁切图片，不失真 (false) (true, false)
                fixedBox: false, // 固定截图框大小， (不允许改变) (false)
                canMove: true, // 上传图片是否可以移动 (true) (true, false)
                canMoveBox: true, // 截图框能否拖动 (true) (true, false)
                original: false, // 上传图片按照原始比例渲染 (false) (true, false)
                centerBox: false, // 截图框是否被限制在图片里面 (false) (true, false)
                height: true, // 是否按照设备的dpr 输出等比例图片 (true) (true, false)
                infoTrue: false, // true为展示真实输出图片宽高，false展示看到的截图框宽高 (false) (true, false)
                maxImgSize: 3000, // 限制图片最大宽度和高度 (2000) (0 ~ max)
                enlarge: 1, // 图片根据截图框输出比例倍数 (1) (0 ~ max(建议不要太大不然会卡死)
                mode: 'contain', // 图片默认渲染方式 (contain) (contain , cover, 100px, 100% auto)
                // limitMinSize: '10', // 裁剪框限制最小区域 (10) (Number, Array, String)
                fillColor: '#ffffff' // 导出时背景颜色填充 (空) (#ffffff, white)
                
            },
            randomFileName: '',
            fileNameFinal: '',
            crap: false,
            downImg: '#',
            imgFile:'',
            uploadImgRelaPath:'', //上传后的图片的地址（不带服务器域名）
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
                            message: '上传成功'
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
        // 初始化函数
        imgLoad(msg) {
            console.log('工具初始化函数=====' + msg)
        },
        // 图片缩放
        changeScale(num) {
            num = num || 1
            this.$refs.cropper.changeScale(num)
        },
        // 向左旋转
        rotateLeft() {
            this.$refs.cropper.rotateLeft()
        },
        // 向右旋转
        rotateRight() {
            this.$refs.cropper.rotateRight()
        },
        // 实时预览函数
        // realTime(data) {
        //     this.previews = data
        // },
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

        // 选择图片
        selectImg(event) {
            this.fileNameFinal = event.target.files[0];
            console.log('handleFileChange',this.fileNameFinal);
            // const file = e.target.files[0]
            if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(event.target.value)) {
                this.$message({
                message: '图片类型要求：jpeg、jpg、png',
                type: 'error'
                })
                return false
            }
            this.fileName = this.fileNameFinal.name;

            // 转化为blob
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
            // 转化为base64
            reader.readAsDataURL(this.fileNameFinal)
        },
        imgLoad (msg) { 
            console.log('imgLoad')
            console.log(msg) 
        },

        // 上传图片
        // uploadImg(type) {
        //     console.log('finish');
        //     let _this = this;
        //     let formData = new FormData();
        //     if (type === 'blob') {
        //         // 获取截图的blob数据
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
        
        //         // 给blob对象的filename属性赋值文件名
        //         formData.append('rpc', data, _this.randomFileName)
        //         // 给参数赋值文件名
        //         formData.append('fileName', _this.randomFileName)
        //         formData.append('busType', _this.busType)
        
        //         /* this.fileName = data.file.name
        //         formData.append('fileName', this.fileName)*/
        //         // 调用axios上传
        //         /* const { data: res } = await _this.$http.post('/api/file/imgUpload', formData)*/
        
        //         uploadFile(formData).then(res => {
        //             /* this.handleSuccess(res)*/
        //             if (res.code === 200) {
        //             _this.$message({
        //                 message: '图片上传成功',
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
        
        //             // 添加随机生成的文件名
        //             res.fileName = _this.randomFileName
        
        //             _this.$emit('uploadImgSuccess', res)
        //             } else {
        //             _this.$message({
        //                 message: '文件服务异常，请联系管理员！',
        //                 type: 'error'
        //             })
        //             }
        //         }).finally(() => {
        //             _this.loading = false
        //         })
        //         })
        
        //         /*  if (flag) {
        //             this.$message.warning('请选择图片')
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
        //     // 输出 
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
        //                     message: '上传成功'
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