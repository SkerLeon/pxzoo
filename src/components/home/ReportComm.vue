<template>
    <div class="reportcomm">
        <img src="@/assets/images/member/memicon/green_close.svg" alt="close" class="close" id="close"
            @click="hideReportComm" />
        <h2 class="comm_title pcBigTitle">檢舉留言</h2>
        <p class="comm_mark pcInnerText">如果此人有立即的人身安全疑慮，請馬上尋求協助，再向PXZoO檢舉，把握救援時間。</p>
        <div class="comm_select" id="comm_text">
            <label class="pcInnerText" for="report-select">
                檢舉類別
                <select name="report" id="report-select" v-model="formData.report_type">
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
                <textarea rows=7 maxlength="100" @input="monitorInput" v-model="formData.report_text"
                    placeholder=請填寫您的想法></textarea>
            </label>
        </div>

        <div class="tqplb" v-if="showReportTqp" @click.self="closeReportTqp">
            <reporttqp @close-reporttqp="closeReportTqp" />
        </div>

        <button class="submitbtn defaultBtn pcInnerText" @click="saveReport">
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
import axios from 'axios'; // 引入 axios 库
import reporttqp from "@/components/home/ReportTqp.vue";
export default {
    // 在檢舉留言燈箱組件中接收路由參數中的留言編號com_id
    props: ['comId'],
    components: {
        reporttqp,
    },
    data() {
        return {
            show: true,
            num: 100,
            showReportTqp: false,

            formData: {
                report_type: '',
                report_text: '',
                com_id: '',
                mem_id: '',
            },
        };
    },
    methods: {
        hideReportComm() {
            this.$emit("close-reportcomm");
        },

        //字數
        monitorInput() {
            var txtVal = this.formData.report_text.length;
            this.num = 100 - txtVal;
        },

        closeReportTqp() {
            this.hideReportComm();
            this.showReportTqp = false;
            document.body.style.overflow = "auto";
        },

        // 更新開關狀態
        updateaddSwitch() {
            this.$emit('update-switch', !this.addSwitch);
            // window.location.reload();
        },

        saveReport() {
            // let formData = new FormData();

            // for (let key in this.formData) {
            //     formData.append(key, this.formData[key]);
            // }
            const formData = {
                // com_id: this.$route.params.id,
                com_id: this.comId,
                mem_id: JSON.parse(localStorage.getItem('userData')).mem_id,
                report_type: this.formData.report_type,
                report_text: this.formData.report_text,
            }

            axios.post(`${import.meta.env.VITE_API_URL}/reportFrontAdd.php`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // 指定文件上傳格式
                },
            })
                .then(response => {
                    console.log('新增資料成功');
                    console.log("Selected com_id:", this.comId);
                    console.log(response.data);
                    // 提交成功後的處理
                    this.updateaddSwitch(); // 觸發關閉表單的方法
                    // window.location.reload();
                    // 打開reportTqp組件
                    console.log('Opening reportTqp component');
                    this.showReportTqp = true;
                    document.body.style.overflow = "hidden";
                })
                .catch(error => {
                    console.error('Error:', error);
                    // 提交失敗時的處理
                });
        },
        
    },
};
</script>
