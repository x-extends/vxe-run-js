const { defineConfig } = require('@vue/cli-service')
const XEUtils = require('xe-utils')

process.env.VUE_APP_PAGE_TITLE = 'Vxe UI'
process.env.VUE_APP_DATE_NOW = Date.now()
process.env.VUE_APP_DATE_DATE = XEUtils.toDateString(process.env.VUE_APP_DATE_NOW, 'yyyy-MM-dd HH:mm:ss')

module.exports = defineConfig({
  publicPath: '/run/',
  assetsDir: 'static',
  transpileDependencies: true,
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Vxe Run'
    }
  }
})
