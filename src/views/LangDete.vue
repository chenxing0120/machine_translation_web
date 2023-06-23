<template>
  <div class="word-detectation">
    <el-form :model="detectForm" label-width="80px" class="detect-form">
      <el-form-item label="原文" class="language-item">
        <el-input :value="detectForm.inputText" @input="detectForm.inputText = $event" type="textarea" :rows="5" resize="none" placeholder="请输入要识别的内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="detectLangdete">提交</el-button>
      </el-form-item>
      <el-form-item label="识别结果">
        <template v-for="(word, index) in detectResult">
          <el-tag :key="index" class="word-tag">{{ word }}</el-tag>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "LangDete",
  data() {
    return {
      detectForm: {
        inputText: '',
      },
      detectResult: [],
      detectHistory: [],
    };
  },
  created() {
    this.getdetectHistory();
  },
  methods: {
    detectLangdete() {
      this.detectResult = [];
      if (this.detectForm.inputText === null || this.detectForm.inputText === '') {
        this.$message.warning("请输入识别句子");
        return;
      }
      this.$axios.post('http://localhost:8000/langdete', this.detectForm).then((resp) => {
        if (resp.data.code === 200) {
          this.detectResult = resp.data.data.split(" ");
          this.$message.success("识别成功");

          const detectRecord = {
            inputText: this.detectForm.inputText,
            detectedlangdete: this.detectResult,
          };
          this.detectHistory.unshift(detectRecord);
          if (this.detectHistory.length > 5) {
            this.detectHistory.pop();
          }
        }else{
          this.detectResult = null
          this.$message.error("识别失败");
        }
      });
    },
    getdetectHistory() {
      this.$axios.get('http://localhost:8000/langdeteHistory').then((resp) => {
        if (resp.data.code === 200) {
          this.detectHistory = resp.data.data;
        }
      }).catch((error) => {
        console.error('获取识别历史失败', error);
      });
    },
    handleInput(value) {
      this.detectForm.inputText = value;
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

.detect-history-container {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
  margin-right: 10px;
}

.detect-history {
  margin-bottom: 10px;
}

.detected-langdete {
  white-space: nowrap;
}

.language-item {
  flex: 1;
  margin-right: 10px;
}
</style>