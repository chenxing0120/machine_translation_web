<!--<template>-->
<!--  <div>-->
<!--    <textarea v-model="inputText" placeholder="请输入文本"></textarea>-->
<!--    <button @click="searchIdioms">查询</button>-->

<!--    <div class="highlighted-text">-->
<!--      {{ highlightedText }}-->
<!--    </div>-->

<!--    <div class="idiom-card" v-for="idiom in idioms" :key="idiom.idiom">-->
<!--      <div class="idiom-header">{{ idiom.idiom }}</div>-->
<!--      <div class="idiom-info">-->
<!--        <div><strong>拼音：</strong>{{ idiom.pinyin }}</div>-->
<!--        <div><strong>释义：</strong>{{ idiom.translation }}</div>-->
<!--        <div><strong>出处：</strong>{{ idiom.source }}</div>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--// import axios from 'axios';-->

<!--export default {-->
<!--  // eslint-disable-next-line vue/multi-word-component-names-->
<!--  name: "Idioms",-->
<!--  data() {-->
<!--    return {-->
<!--      inputText: '',-->
<!--      highlightedText: '',-->
<!--      idioms: [],-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    async searchIdioms() {-->
<!--      try {-->
<!--        const response = await this.$axios.post('/api/search', { text: this.inputText });-->
<!--        this.idioms = response.data;-->

<!--        // 高亮显示成语-->
<!--        this.highlightIdioms();-->
<!--      } catch (error) {-->
<!--        console.error(error);-->
<!--      }-->
<!--    },-->
<!--    highlightIdioms() {-->
<!--      let highlightedText = this.inputText;-->
<!--      for (const idiom of this.idioms) {-->
<!--        const regex = new RegExp(idiom.idiom, 'g');-->
<!--        highlightedText = highlightedText.replace(regex, `<span class="highlight">${idiom.idiom}</span>`);-->
<!--      }-->
<!--      this.highlightedText = highlightedText;-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--textarea {-->
<!--  width: 100%;-->
<!--  height: 100px;-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.highlighted-text {-->
<!--  margin-bottom: 10px;-->
<!--  padding: 10px;-->
<!--  background-color: #f3f3f3;-->
<!--}-->

<!--.highlight {-->
<!--  background-color: yellow;-->
<!--}-->

<!--.idiom-card {-->
<!--  border: 1px solid #ccc;-->
<!--  border-radius: 4px;-->
<!--  padding: 10px;-->
<!--  margin-bottom: 10px;-->
<!--}-->

<!--.idiom-header {-->
<!--  font-weight: bold;-->
<!--  font-size: 16px;-->
<!--  margin-bottom: 5px;-->
<!--}-->

<!--.idiom-info div {-->
<!--  margin-bottom: 5px;-->
<!--}-->
<!--</style>-->
