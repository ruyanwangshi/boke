// 额外配置项
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: false, // 关闭eslint
    // 配置路径别名
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('./src'))
            .set('components', resolve('./src/components'))
            .set('views', resolve('src/common'))
            .set('assets', resolve('src/assets'))
    },
    // devServer: {
    //     overlay: {
    //         warnings: false,
    //         errors: false
    //     },
    //     lintOnSave: false
    // }
}