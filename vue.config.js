const path = require('path'); //引入path模块
function resolve(dir) {
    return path.join(__dirname, dir) //path.join(__dirname)设置绝对路径
}


module.exports = {
    css: {
        loaderOptions: {
            // 向 CSS 相关的 loader 传递选项
            less: {
                javascriptEnabled: true
            }
        }
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('./src'))
            //set第一个参数：设置的别名，第二个参数：设置的路径
    }

}