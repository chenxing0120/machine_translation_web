import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
import axios from 'axios'
import router from "@/router";

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(Element)

new Vue({
  axios,
  router,
  render: h => h(App),
}).$mount('#app')
