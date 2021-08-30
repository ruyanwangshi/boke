// 额外配置项
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: false, // 关闭eslint
  publicPath: '.', // 静态资源输出目录
  // 配置路径别名
  chainWebpack: (webpackConfig) => {
    webpackConfig.resolve.extensions
      .merge(['.ts'])
      .end()
      .alias.set('@', resolve('./src'))
      .set('components', resolve('./src/components'))
      .set('views', resolve('src/common'))
      .set('assets', resolve('src/assets'))
      .set('hooks', resolve('src/hooks'))
      .set('request', resolve('src/request'))

    webpackConfig.module
      .rule('md')
      .test(/\.md$/)
      .use('md-loader')
      .loader(require.resolve('./src/loaders/md-loader'))
      .end()
  },
  // devServer: {
  //     overlay: {
  //         warnings: false,
  //         errors: false
  //     },
  //     lintOnSave: false
  // }
}
