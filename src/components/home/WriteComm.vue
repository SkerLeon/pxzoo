<template>
    <div class="writecomm">
        <img
            src="@/assets/images/member/memicon/green_close.svg"
            alt="close"
            class="close"
            id="close"
            @click="hideWriteComm"
        />
        <h2 class="comm_title pcBigTitle">填寫留言</h2>
        <div class="comm_text" id="comm_text">
            <label class="pcInnerText">
                想說的話<span class="numLimit">{{ num }}/60</span>
                <textarea rows=7 maxlength="60" @input="monitorInput" v-model="formData.com_text" placeholder=請填寫您想與大家分享的事></textarea>
            </label>
        </div>

        <div class="comm_img">
            <label class="comm_img_text pcInnerText">
                上傳圖片
                <span v-if="fileName">{{ fileName }}</span>
                <span v-else>請選擇檔案</span>      
            </label>
            <label class="pcInnerText">
                <div class="iconBtn pcInnerText">
                    <p class="iconText">
                        <img
                        src="@/assets/images/home/home_icon_image.svg"
                        alt=""
                        class="buttonIcon"
                        />
                        選擇檔案
                    </p>
                    <img
                        src="@/assets/images/login/icon/btnArrow.svg"
                        alt=""
                        class="arrowIcon"
                    />
                </div>
                <input type="file" id="comm" name="comm" accept="image/png, image/jpeg" @change="handleFileChange('com_pic', $event)"/>
            </label>
        </div>

        <!-- <div>
        <h1>留言板</h1>
        <textarea v-model="message" placeholder="请输入留言"></textarea>
        <button @click="addMessage()">提交</button>
        <div v-for="(msg, index) in messages" :key="index">
        <p>{{ msg }}</p>
        </div>
        </div> -->

        <div class="tqplb" v-if="showWriteTqp"  @click.self="closeWriteTqp">
            <writetqp @close-writetqp="closeWriteTqp" />
        </div>

        <button class="submitbtn defaultBtn pcInnerText" @click="saveComm">
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
// import 'vue-cropper/dist/index.css'
// import { VueCropper }  from "vue-cropper";
export default {
    components: {
        writetqp,
    },
    props:{
        addSwitch:false,
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
        };
    },
    methods: {
        hideWriteComm() {
            this.$emit("close-writecomm");
        },

        //字數
        monitorInput(){
            var txtVal = this.formData.com_text.length;
            this.num = 60 - txtVal;
        },

        // 更新開關狀態
        updateaddSwitch() {
            this.$emit('update-switch', !this.addSwitch);
            // window.location.reload();
        },

        //上傳檔名
        handleFileChange(field, event) {
            // 當選擇文件時，將文件對象存儲到 formData 中的指定字段
            this.formData[field] = event.target.files[0];
            this.fileName = this.formData[field].name;
            console.log(this.fileName);
            // this.fileType = fileData.type;
            // this.fileSize = Math.floor(fileData.size * 0.001) + 'kb';
            // this.fileTime = fileData.lastModifiedDate;
            // this.fileThumbnail = URL.createObjectURL(fileData);
        },

        closeWriteTqp() {
            this.hideWriteComm();
            this.showWriteTqp = false;
            document.body.style.overflow = "auto";
        },

        saveComm() {
            // 隱藏原本的燈箱
            // this.hideWriteComm();

            // 打開writeTqp組件
            // console.log('Opening writeTqp component');
            // this.showWriteTqp = true;
            // document.body.style.overflow = "hidden";

            // 使用 FormData 來處理文件上傳
            let formData = new FormData();
            for (let key in this.formData) {
                formData.append(key, this.formData[key]);
            }
            axios.post(`${import.meta.env.VITE_API_URL}/commentFrontAdd.php`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data', // 指定文件上傳格式
                },
            })
            .then(response => {
                console.log('新增資料成功');
                console.log(response.data);
                // 提交成功後的處理
                this.updateaddSwitch(); // 觸發關閉表單的方法
                // window.location.reload();
                // 打開writeTqp組件
                console.log('Opening writeTqp component');
                this.showWriteTqp = true;
                document.body.style.overflow = "hidden";
            })
            .catch(error => {
                console.error('Error:', error);
                // 提交失敗時的處理
            });
        },

        




        // addMessage(){
        //     if(this.message.trim() !== ''){
        //         this.messages.push(this.message);
        //         this.message='';
        //     }
        // }
    },
};
</script>
