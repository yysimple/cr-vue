'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
const name = '电脑维修订单管理系统' // page title
const port = 9426 // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  publicPath: './',
  outputDir: process.env.VUE_APP_Dir,
  assetsDir: 'static',
  // 关闭Eslint
  lintOnSave: false,
  // productionSourceMap: false,
  devServer: {
    port: port,
    // 自动打开浏览器
    open: false,
    overlay: {
      warnings: false,
      errors: false
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: `http://0.0.0.0:${port}`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  configureWebpack: {
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  },
  chainWebpack(config) {
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()
  }
}
