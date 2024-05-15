const { defineConfig } = require('@vue/cli-service')

if (process.env.NODE_ENV === 'production') {
  process.env.VUE_APP_CDN_URL = '/umd/'
  process.env.VUE_APP_MAIN_URL = '/'
}

module.exports = defineConfig({
  publicPath: '/run/',
  assetsDir: 'static',
  transpileDependencies: true
})
