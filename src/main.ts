import { createApp } from 'vue'
import 'nprogress/nprogress.css'
import NProgress from 'nprogress'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '@/router/index'
import '@/style/global.scss'
import '@/style/reset.scss'

const app = createApp(App)
app.use(router).use(createPinia()).mount('#app')

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})
router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    // 每次切换页面时，调用进度条
    NProgress.start()
    next()
  }
)
router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done()
})
