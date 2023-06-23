<template>
  <div class="idiom-translation">
    <el-row justify="center">
      <el-col :span="24">
        <el-form :model="idiomsForm" label-width="80px" class="input-form">
          <el-form-item label="输入文本" class="language-item">
            <el-input v-model="idiomsForm.inputText" type="textarea" :rows="5" resize="none" placeholder="请输入文本内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="translate">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>


    <div v-if="idioms.length > 0">
      <el-card v-for="idiom in idioms" :key="idiom.idiom">
        <div>
          <span class="label">成语：</span>
          <span class="idiom">{{ idiom.idiom }}</span>
        </div>
        <div>
          <span class="label">拼音：</span>
          <span>{{ idiom.pinyin }}</span>
        </div>
        <div>
          <span class="label">翻译：</span>
          <span>{{ idiom.translation }}</span>
        </div>
        <div>
          <span class="label">出处：</span>
          <span>{{ idiom.source }}</span>
        </div>
      </el-card>
    </div>
    <div v-else>
      <p>没有找到匹配的成语。</p>
    </div>

  </div>
</template>

<script>
export default {
  name: "IdiomTranslation",
  data() {
    return {
      idiomsForm: {
        inputText: "",
      },
      idioms: [],
    };
  },
  methods: {
    translate() {
      this.idioms = [];
      this.highlightedText = "";
      if (this.idiomsForm.inputText === "") {
        this.$message.warning("请输入文本内容");
        return;
      }

      this.$axios.post("http://localhost:8000/idioms", this.idiomsForm ).then((resp) => {
        const data = resp.data;
        if (data.code === 200) {
          this.idioms = data.data;
          if(this.idioms.length === 0){
            this.$message.warning("没有查询到成语");
          }else {
            this.$message.success("获取成功");
          }
        } else {
          this.$message.error("获取失败");
        }
      })
    },

  },
};
</script>

<style scoped>
.label {
  font-weight: bold;
}

.idiom {
  color: #FF0000; /* 设置成语的颜色，这里示例为红色 */
}
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
