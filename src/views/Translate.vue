<template>
  <div class="translator">
    <h3></h3>
    <el-form :model="translateForm" label-width="80px" class="translate-form">
      <div class="language-row">
        <el-form-item label="源语言" class="language-item">
          <el-select v-model="translateForm.sourceLang" placeholder="请选择源语言" @change="handleLanguageChange">
            <el-option v-for="lang in languages" :key="lang.value" :label="lang.label" :value="lang.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目标语言" class="language-item">
          <el-select v-model="translateForm.targetLang" placeholder="请选择目标语言" @change="handleLanguageChange">
            <el-option v-for="lang in languages" :key="lang.value" :label="lang.label" :value="lang.value"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-form-item label="原文" class="language-item">
        <el-input v-model="translateForm.sourceText" type="textarea" :rows="5" resize="none" placeholder="请输入要翻译的内容"></el-input>
      </el-form-item>
      <el-form-item label="纠错结果">
        <el-input v-model="correction" type="textarea" :rows="5" resize="none" placeholder="纠错结果" readonly></el-input>
      </el-form-item>
      <el-form-item label="翻译结果">
        <el-input v-model="translationResult" type="textarea" :rows="5" resize="none" placeholder="翻译结果" readonly></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="translate" :loading="loading">翻译</el-button>
      </el-form-item>
      <el-form-item label="翻译历史">
        <el-card v-for="(history, index) in translationHistory" :key="index" class="translation-history">
          <p>{{ history.sourceText }} ———————> {{ history.translationText }}</p>
        </el-card>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Translate",
  data() {
    return {
      correction:'',
      loading:false,
      //翻译内容表单
      translateForm: {
        sourceText: '',
        sourceLang: 'auto', // 默认选择自动识别
        targetLang: '',
      },
      //语种选项
      languages: [
        { value: 'auto', label: '自动识别' },
        { value: 'zh', label: '中文' },
        { value: 'en', label: '英文' },
      ],
      //翻译结果
      translationResult: null,
      // 历史翻译记录
      translationHistory: [],
    };
  },
  created() {
    this.getTranslationHistory();
  },

  mounted() {
    this.getTranslationHistory();
  },
  watch: {
    'translateForm.sourceLang'(newVal) {
      if (newVal === this.translateForm.targetLang) {
        this.translateForm.sourceLang = ''
        this.$message.warning('源语言和目标语言不能相同');
      }
    },
    'translateForm.targetLang'(newVal) {
      if (newVal === this.translateForm.sourceLang) {
        this.translateForm.targetLang = ''
        this.$message.warning('源语言和目标语言不能相同');
      }
    }
  },
  methods: {
    // 获取历史翻译记录
    getTranslationHistory() {
      this.$axios.get('http://localhost:8000/translationHistory').then((resp) => {
        const data = resp.data; // 后端返回的历史翻译数据
        // 将后端返回的数据转换为前端所需的对象数组格式
        this.translationHistory = data.map((item) => {
          return {
            sourceLang: item[0],
            targetLang: item[1],
            sourceText: item[2],
            translationText: item[3],
          };
        }).slice(0, 5); // 限制为最近的5条翻译记录
      }).catch((error) => {
        console.error('历史翻译获取失败', error);
      });
    },

    translate() {
      this.translationResult = null;
      this.correction = null;

      if (this.translateForm.sourceLang === null || this.translateForm.sourceLang === '') {
        this.$message.warning("请选择源语言");
        return;
      }
      if (this.translateForm.targetLang === null || this.translateForm.targetLang === '') {
        this.$message.warning("请选择目标语言");
        return;
      }
      if (this.translateForm.sourceText === null || this.translateForm.sourceText === '') {
        this.$message.warning("请输入翻译句子");
        return;
      }
      this.loading=true;
      this.$axios.post('http://localhost:8000/translate', this.translateForm).then((resp) => {
        if (resp.data.code === 200) {
          this.translationResult = resp.data.data[0];
          this.correction = resp.data.data[1];
          this.$message.success("翻译成功");
          this.loading=false;
          // 添加到历史翻译记录
          const translationRecord = {
            sourceLang: this.translateForm.sourceLang,
            targetLang: this.translateForm.targetLang,
            sourceText: this.translateForm.sourceText,
            translationText: this.translationResult,
          };
          this.translationHistory.unshift(translationRecord);
          if (this.translationHistory.length > 5) {
            this.translationHistory.pop();
          }
        } else {
          this.translationResult = null;
          this.$message.error("翻译失败");
        }
    });
    },
    handleLanguageChange() {
      if (this.translateForm.sourceLang === this.translateForm.targetLang) {
        this.$message.warning('源语言和目标语言不能相同');
      }
    },
  },
};
</script>

<style scoped>
.translator {
  margin-top: 50px;
  text-align: center;
}


.translate-form {
  margin-bottom: 20px;
}

.translation-result {
  margin-top: 20px;
}

.language-row {
  display: flex;
  align-items: center;
}

.language-item {
  flex: 1;
  margin-right: 10px;
}
</style>