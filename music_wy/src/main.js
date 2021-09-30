import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入elementUi文件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 导入样式
import './assets/css/globle.css'
// 导入字体图标
import './assets/font/iconfont.css'

// 导入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/'
Vue.prototype.$http = axios
Vue.config.productionTip = false

// 时间过滤器
Vue.filter('dataFormate', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  return `${y}-${m}-${d}`
})

Vue.filter('dataFormate1', function (originVal) {
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}年${m}月${d}日 ${hh}${mm}:${ss}`
})

Vue.filter('dataFormate2', function (originVal) {
  const dt = new Date(originVal)
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${mm}:${ss}`
})
// 人数单位过滤器
Vue.filter('changeValue', function (num) {
  let res = 0;
  if (num >= 100000000) {
    res = num / 10000;
    res = res.toFixed(2) + "亿";
  } else if (num > 10000) {
    res = num / 10000;
    res = res.toFixed(2) + "万";
  } else {
    return num;
  }
  return res;

})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
