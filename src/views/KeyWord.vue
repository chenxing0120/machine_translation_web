<template>
  <div class="word-extract">
    <el-form :model="extractForm" label-width="80px" class="extract-form">
      <el-form-item label="原文" class="language-item">
        <el-input :value="extractForm.inputText" @input="extractForm.inputText = $event" type="textarea" :rows="5" resize="none" placeholder="请输入要提取的内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="extractWords" :loading="loading">提交</el-button>
      </el-form-item>
      <el-form-item label="提取结果">
        <template v-for="(word, index) in extractResult">
          <el-tag :key="index" class="word-tag">{{ word }}</el-tag>
        </template>
      </el-form-item>
      <el-form-item label="提取历史" class="extract-history-container">
        <div v-for="(history, index) in extractHistory" :key="index" class="extract-history">
          <p>{{ history.inputText }}</p>
          <p class="extracted-words">{{ history.extractedWords ? history.extractedWords.join(' ') : '' }}</p>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "KeyWord",
  data() {
    return {
      loading:false,
      extractForm: {
        inputText: '',
      },
      extractResult: [],
      extractHistory: [],
    };
  },
  created() {
    this.getExtractHistory();
  },
  methods: {
    extractWords() {
      this.extractResult = [];
      if (this.extractForm.inputText === null || this.extractForm.inputText === '') {
        this.$message.warning("请输入提取句子");
        return;
      }
      this.loading=true;
      this.$axios.post('http://localhost:8000/keywords', this.extractForm).then((resp) => {
        if (resp.data.code === 200) {
          this.extractResult = resp.data.data.split(" ");
          this.$message.success("提取成功");
          this.loading=false;
          const extractRecord = {
            inputText: this.extractForm.inputText,
            extractedWords: this.extractResult,
          };
          this.extractHistory.unshift(extractRecord);
          if (this.extractHistory.length > 5) {
            this.extractHistory.pop();
          }
        }else{
          this.extractResult = null
          this.$message.error("提取失败");
        }
      });
    },
    getExtractHistory() {
      this.$axios.get('http://localhost:8000/wordsHistory').then((resp) => {
        if (resp.data.code === 200) {
          this.extractHistory = resp.data.data;
        }
      }).catch((error) => {
        console.error('获取提取历史失败', error);
      });
    },
    handleInput(value) {
      this.extractForm.inputText = value;
    },
  },
};
</script>

<style scoped>
.word-extract {
  margin-top: 50px;
  text-align: center;
}

.extract-form {
  margin-bottom: 20px;
}

.word-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}

.extract-history-container {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
  margin-right: 10px;
}

.extract-history {
  margin-bottom: 10px;
}

.extracted-words {
  white-space: nowrap;
}

.language-item {
  flex: 1;
  margin-right: 10px;
}
</style>