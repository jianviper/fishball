import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import iterations from '@/iteration/Iterations'
import iteration from '@/iteration/Iteration'
import member from '@/member/Member'
import manage from '@/manage/manage'
import baidu from '@/baiduzhishu/baiduzhishu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
      name, baidu,
      component: baidu,
    }
  ]
})
