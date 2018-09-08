module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'eleme',
    meta: [
      {charset: 'utf-8'},
      {hid: 'description', name: 'description', content: 'Nuxt.js project'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.png'}
    ]
  },
  router: {
    linkActiveClass: 'active'
  },
  /*
  ** Customize the progress bar color
  * loading: false 可取消loading组件
  */
  loading: {color: '#10B3F5'},
  /**
   * 引入全局css样式
   */
  css: [
    "~common/scss/index.scss"
  ],
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios'], // 在页面中使用axios，配置vendor使其只打包一次
    loaders: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.scss$/,
        loader: "vue-style-loader!css-loader!sass-loader"
      }
    ],
    postcss: [
      require('postcss-px2rem')({
        remUnit: 75
      })
    ],
  },
  plugins: ['~plugins/vue-lazyload', {src: '~plugins/lib-flexible', ssr: false}]
}

