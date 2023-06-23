<template>
  <el-row>
    <el-col :span="5"><div class="grid-content bg-purple"></div></el-col>
    <el-col :span="14"><div class="grid-content bg-purple-light">
      <h5 class="title">自动翻译系统</h5>
      <el-tabs style="margin-left: 2%" v-model="activeName" @tab-click="handleClick" >
        <el-tab-pane label="自动翻译" name="first" >
          <Translate></Translate>
        </el-tab-pane>
        <el-tab-pane label="句子分词" name="second">
          <Words></Words>
        </el-tab-pane>
        <el-tab-pane label="成语翻译" name="third">
          <Idioms></Idioms>
        </el-tab-pane>
        <el-tab-pane label="提取关键词" name="forth">
          <KeyWord></KeyWord>
        </el-tab-pane>
        <el-tab-pane label="语种识别" name="fifth">
          <LangDete></LangDete>
        </el-tab-pane>
      </el-tabs>
    </div></el-col>
    <el-col :span="5"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
</template>

<script>

import Translate from "@/views/Translate";
import Words from "@/views/Words";
import Idioms from "@/views/Idioms";
import KeyWord from "@/views/KeyWord";
import LangDete from "@/views/LangDete";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  // eslint-disable-next-line vue/no-unused-components
  components: {LangDete, Words, Translate, Idioms, KeyWord},
  computed: {

  },
  data() {
    return {
      activeName: 'first'
    }
  },

  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style scoped>

.title {
  margin-left: 10% ;
}

.bg-purple {
  background: #edeef3;
}
.bg-purple-light {
  background: #ffffff;
}
.grid-content {
  border-radius: 4px;
  min-height: 2000px;
}


</style>