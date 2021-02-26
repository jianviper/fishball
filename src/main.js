// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUi from 'element-ui'
import axios from 'axios'
import http from './utils/http'
import 'element-ui/lib/theme-chalk/index.css'
// import Echarts from 'echarts/lib/echarts'
import Echarts from 'vue-echarts'

// import 'echarts/lib/chart/bar' //柱状图
// import 'echarts/lib/chart/line' //线图
// import 'echarts/lib/chart/pie' //线图
// import 'echarts/lib/component/tooltip' //提示框
// import 'echarts/lib/component/legend' //图例
// import 'echarts/lib/component/title' //图例
import 'echarts'

Vue.config.productionTip = false;
Vue.prototype.$axios = http;
Vue.component('v-chart', Echarts);

Vue.use(ElementUi);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
// 全局路由构造函数，判断是否登录和要跳转到页面
/*
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    console.log(to, from, next);
    let token = localStorage.getItem('token');
    if (token === null || token === '') {
      console.log('token:', token);
      next({path: '/login'});
    } else {
      next();
    }
  }
})
 */
