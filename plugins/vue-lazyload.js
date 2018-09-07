import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  // error: 'dist/error.png', // 这个是请求失败后显示的图片
  loading: '/favicon.png', // 这个是加载的loading过渡效果
})
