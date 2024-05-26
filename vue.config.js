const { defineConfig } = require('@vue/cli-service')

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
