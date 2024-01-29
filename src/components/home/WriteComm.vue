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
                <textarea rows=7 maxlength="60" @input="monitorInput" v-model="textareaContent" placeholder=請填寫您想與大家分享的事></textarea>
                
            </label>
        </div>

        <div class="comm_img">
            <label class="pcInnerText">
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
                <input type="file" id="comm" name="comm" accept="image/png, image/jpeg" @change="handleFileChange"/>
            </label>
        </div>

        <div class="tqplb" v-if="showWriteTqp">
            <writetqp @close-writetqp="closeWriteTqp" />
        </div>

        <button class="submitbtn defaultBtn pcInnerText" @click="openWriteTqp">
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
import writetqp from "@/components/home/WriteTqp.vue";
export default {
    el: '#comm_text',
    
    components: {
        writetqp,
    },
    data() {
        return {
            show: true,
            textareaContent:'',
            num: 60,
            fileName: '',
            showWriteTqp: false,
        };
    },
    methods: {
        hideWriteComm() {
            this.$emit("close-writecomm");
        },
        monitorInput(){
            var txtVal = this.textareaContent.length;
            this.num = 60 - txtVal;
        },
        handleFileChange(e) {
            const fileData = e.target.files[0];
            this.fileName = fileData.name;
            // this.fileType = fileData.type;
            // this.fileSize = Math.floor(fileData.size * 0.001) + 'kb';
            // this.fileTime = fileData.lastModifiedDate;
            // this.fileThumbnail = URL.createObjectURL(fileData);
        },
        closeWriteTqp() {
            this.showWriteTqp = false;
            document.body.style.overflow = "auto";
        },
        openWriteTqp() {
            // 隱藏原本的燈箱
            // this.hideWriteComm();

            // 打開writeTqp組件
            console.log('Opening writeTqp component');
            this.showWriteTqp = true;
            document.body.style.overflow = "hidden";
        },
    },
};
</script>
