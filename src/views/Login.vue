<template>

  <el-row type="flex" class="row-bg" justify="center">
    <el-col :span="6">
      <h2>欢迎来到自动翻译系统</h2>
      <el-image :src="require('@/assets/bg.png')" style="height: 280px; width: 280px"></el-image>
      <p>中文分词</p>
      <p>自动纠错 中英互译</p>
    </el-col>
    <el-col :span="1">
      <el-divider direction="vertical"></el-divider>
    </el-col>
    <el-col :span="6">
      <el-form :model="loginFrom" :rules="rules" ref="loginFrom" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username" style="width: 380px">
          <el-input v-model="loginFrom.username"></el-input>
        </el-form-item>
        <el-form-item label="密  码" prop="password" style="width: 380px">
          <el-input v-model="loginFrom.password"></el-input>
        </el-form-item>
        <el-form-item style="width: 380px">
          <el-button type="primary" @click="submitForm(loginFrom)">登录</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>

// import router from "@/router";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Login",
  data() {
    return {
      loginFrom: {
        username: null,
        password: null,

      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
      },
      captchaImg: null
    };
  },
  methods: {
    submitForm(loginFrom) {
      this.loginFrom = loginFrom
      if(loginFrom.username === null || loginFrom.password === null){
        this.$message.warning("用户名或者密码不能为空");
        return
      }

      this.$axios.post('http://localhost:8000/login', this.loginFrom).then( (resp) =>{
        if(resp.data.code === 200 ){
          this.$router.push("/Home")
          this.$message.success("系统登录成功");
          return
        }
        if(resp.data.code === 203){
          this.$message.error("用户名密码错误，请重新输入");
          return
        }
        this.$message.error("系统异常，请重试");
      });

    },
    resetForm() {
      this.loginFrom.username = null;
      this.loginFrom.password = null;
      this.loginFrom.code = null;

    },
    welcome(){
      this.$message.success("欢迎来到自动翻译系统");
    }
  },
  created() {
    this.welcome()
    this.resetForm()
  }
}
</script>

<style scoped>

  .el-row{
    background-color: #fafafa;
    height: 100vh;
    display: flex;
    align-items: center;
    text-align: center;
  }
  .el-divider{
    height: 300px;
  }

  .captchaImg{
    float: left;
    margin-left: 8px;
    border-radius: 4px;
  }

</style>