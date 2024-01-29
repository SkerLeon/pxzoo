<template>
    <div class="reportcomm">
        <img
            src="@/assets/images/member/memicon/green_close.svg"
            alt="close"
            class="close"
            id="close"
            @click="hideReportComm"
        />
        <h2 class="comm_title pcBigTitle">檢舉留言</h2>
        <p class="comm_mark pcInnerText">如果此人有立即的人身安全疑慮，請馬上尋求協助，再向PXZoO檢舉，把握救援時間。</p>
        <div class="comm_select" id="comm_text">
            <label class="pcInnerText" for="report-select">
                檢舉類別
                <select name="report" id="report-select">
                    <option value="">請選擇檢舉類別</option>
                    <option value="暴力">暴力｜宣揚或促使暴力行為的內容。</option>
                    <option value="裸露">裸露｜裸露、色情內容或性暗示的內容。</option>
                    <option value="販售違禁品">販售違禁品｜販售違禁品或非法商品的行為。</option>
                    <option value="涉及兒童">涉及兒童｜任何涉及兒童的不當內容或性剝削。</option>
                    <option value="恐怖主義">恐怖主義｜宣揚或支持恐怖主義的內容。</option>
                    <option value="仇恨言論">仇恨言論｜歧視、仇恨或種族歧視言論。</option>
                    <option value="不實資訊">不實資訊｜虛假、誤導性資訊。</option>
                    <option value="自殺或自殘">自殺或自殘｜宣揚、鼓勵自殺或自殘的內容。。</option>
                    <option value="騷擾">騷擾｜騷擾、霸凌或侵犯他人隱私的行為。</option>
                    <option value="其他">其他｜其他違反法律、侵犯使用者權益或危害社會穩定的行為。</option>
                </select>
            </label>
        </div>
        <div class="comm_text" id="comm_text">
            <label class="pcInnerText">
                檢舉原因<span class="numLimit">{{ num }}/100</span>
                <textarea rows=7 maxlength="100" @input="monitorInput" v-model="textareaContent" placeholder=請填寫您的想法></textarea>
            </label>
        </div>

        <div class="tqplb" v-if="showReportTqp">
            <reporttqp @close-reporttqp="closeReportTqp" />
        </div>

        <button class="submitbtn defaultBtn pcInnerText" @click="openReportTqp">
            確認送出
            <img src="@/assets/images/login/icon/btnArrow.svg" alt="" />
        </button>
        
        <div class="reportcomm_deco">
            <div class="tree_3"><img src="@/assets/images/vetor/nature_tree_3.svg" alt="tree_3"></div>
            <div class="rabbit"><img src="@/assets/images/vetor/vetor_animal_rabbit.svg" alt="rabbit"></div>
            <div class="koala"><img src="@/assets/images/vetor/vetor_animal_koala.svg" alt="koala"></div>
        </div>
    
    </div>
</template>
<script>
import reporttqp from "@/components/home/ReportTqp.vue";
export default {
    el: '#comm_text',
    
    components: {
        reporttqp,
    },
    data() {
        return {
            show: true,
            textareaContent:'',
            num: 100,
            fileName: '',
            showReportTqp: false,
        };
    },
    methods: {
        hideReportComm() {
            this.$emit("close-reportcomm");
        },
        monitorInput(){
            var txtVal = this.textareaContent.length;
            this.num = 100 - txtVal;
        },
        handleFileChange(e) {
            const fileData = e.target.files[0];
            this.fileName = fileData.name;
            // this.fileType = fileData.type;
            // this.fileSize = Math.floor(fileData.size * 0.001) + 'kb';
            // this.fileTime = fileData.lastModifiedDate;
            // this.fileThumbnail = URL.createObjectURL(fileData);
        },
        closeReportTqp() {
        this.showReportTqp = false;
        document.body.style.overflow = "auto";
        },
        openReportTqp() {
        this.showReportTqp = true;
        document.body.style.overflow = "hidden";
        },
    },
};
</script>
