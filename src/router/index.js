import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import iterations from '@/iteration/Iterations'
import iteration from '@/iteration/Iteration'
import member from '@/member/Member'
import manage from '@/manage/manage'
import baidu from '@/baiduzhishu/baiduzhishu'
import myEchart from "@/components/myEcharts"
import login_dialog from "../login/login_dialog";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'myechart',
      component: myEchart
    },
    {
      path: '/iterations',
      name: iterations,
      component: iterations
    },
    {
      path: '/iteration/:id',
      name: iteration,
      component: iteration
    },
    {
      path: '/member',
      name: member,
      component: member
    },
    {
      path: '/manage',
      name: manage,
      component: manage
    },
    {
      path: '/baiduzhishu',
      name: baidu,
      component: baidu,
    },
    {
      path: '/login',
      name: login_dialog,
      component: login_dialog
    }
  ],
})
