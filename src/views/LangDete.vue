<template>
  <div class="word-detectation">
    <el-form :model="detectForm" label-width="80px" class="detect-form">
      <el-form-item label="原文" class="language-item">
        <el-input
            :value="detectForm.inputText"
            @input="detectForm.inputText = $event"
            type="textarea"
            :rows="5"
            resize="none"
            placeholder="请输入要识别的内容"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="detectLangdete">提交</el-button>
      </el-form-item>
      <el-form-item label="识别结果">
        <template v-if="detectResult">
          <el-dialog
              title="识别结果"
              :visible.sync="dialogVisible"
              width="30%"
          >
            <span>{{ `您输入的句子是 ${detectResult}` }}</span>
          </el-dialog>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "LangDete",
  data() {
    return {
      detectForm: {
        inputText: "",
      },
      detectResult: "",
      dialogVisible: false,
      languages: [
        { value: "zh", label: "中文" },
        { value: "en", label: "英文" },
        { value: "ko", label: "韩文" },
        { value: "ja", label: "日文" },
      ],
    };
  },
  methods: {
    detectLangdete() {
      this.detectResult = "";
      if (this.detectForm.inputText === null || this.detectForm.inputText === "") {
        this.$message.warning("请输入识别句子");
        return;
      }
      this.$axios.post("http://localhost:8000/langdete", this.detectForm).then((resp) => {
        if (resp.data.code === 200) {
          const detectedLanguage = resp.data.data;
          const languageLabel = this.languages.find((language) => language.value === detectedLanguage)?.label;
          if (languageLabel) {
            this.detectResult = languageLabel;
            this.dialogVisible = true;
          } else {
            this.$message.error("无法识别语言");
          }
        } else {
          this.$message.error("识别失败");
        }
      });
    },
  },
};
</script>

<style scoped>
.word-detectation {
  margin-top: 50px;
  text-align: center;
}

.detect-form {
  margin-bottom: 20px;
}

.word-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}

.language-item {
  flex: 1;
  margin-right: 10px;
}

.dialog-custom-class {
  /* 可以在这里设置其他自定义样式 */
  max-width: 300px; /* 设置为所需的宽度值 */
}
</style>
