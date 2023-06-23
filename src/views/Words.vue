<template>
  <div class="word-segmentation">
    <el-form :model="segmentForm" label-width="80px" class="segment-form">
      <el-form-item label="原文" class="language-item">
        <el-input :value="segmentForm.inputText" @input="segmentForm.inputText = $event" type="textarea" :rows="5" resize="none" placeholder="请输入要翻译的内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="segmentWords">提交</el-button>
      </el-form-item>
      <el-form-item label="分词结果">
        <template v-for="(word, index) in segmentResult">
          <el-tag :key="index" class="word-tag">{{ word }}</el-tag>
        </template>
      </el-form-item>
      <el-form-item label="分词历史" class="segment-history-container">
        <div v-for="(history, index) in segmentHistory" :key="index" class="segment-history">
          <p>{{ history.inputText }}</p>
          <p class="segmented-words">{{ history.segmentedWords ? history.segmentedWords.join(' ') : '' }}</p>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Word",
  data() {
    return {
      segmentForm: {
        inputText: '',
      },
      segmentResult: [],
      segmentHistory: [],
    };
  },
  created() {
    this.getSegmentationHistory();
  },
  methods: {
    segmentWords() {
      this.segmentResult = [];
      if (this.segmentForm.inputText === null || this.segmentForm.inputText === '') {
        this.$message.warning("请输入分词句子");
        return;
      }
      this.$axios.post('http://localhost:8000/words', this.segmentForm).then((resp) => {
        if (resp.data.code === 200) {
          this.segmentResult = resp.data.data.split(" ");
          this.$message.success("分词成功");

          const segmentRecord = {
            inputText: this.segmentForm.inputText,
            segmentedWords: this.segmentResult,
          };
          this.segmentHistory.unshift(segmentRecord);
          if (this.segmentHistory.length > 5) {
            this.segmentHistory.pop();
          }
        }else{
          this.segmentResult = null
          this.$message.error("分词失败");
        }
      });
    },
    getSegmentationHistory() {
      this.$axios.get('http://localhost:8000/wordsHistory').then((resp) => {
        if (resp.data.code === 200) {
          this.segmentHistory = resp.data.data;
        }
      }).catch((error) => {
        console.error('获取分词历史失败', error);
      });
    },
    handleInput(value) {
      this.segmentForm.inputText = value;
    },
  },
};
</script>

<style scoped>
.word-segmentation {
  margin-top: 50px;
  text-align: center;
}

.segment-form {
  margin-bottom: 20px;
}

.word-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}

.segment-history-container {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
  margin-right: 10px;
}

.segment-history {
  margin-bottom: 10px;
}

.segmented-words {
  white-space: nowrap;
}

.language-item {
  flex: 1;
  margin-right: 10px;
}
</style>