const path = require('path');
const ENV = process.env.NODE_ENV //引入path模块
function resolve(dir) {
    return path.join(__dirname, dir) //path.join(__dirname)设置绝对路径
}


module.exports = {
    publicPath: ENV === "development" ? "" : "/library-admin/",
    css: {
        loaderOptions: {
            // 开启 less-loader
            less: {
                javascriptEnabled: true
            }
        }
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('./src'))
        config.plugin('html')
            .tap(args => {
                args[0].title = "宁财院图书馆 - NBUFE Library admin";
                return args;
            })
    },
    devServer: {
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            '/uploads': {
                target: 'http://localhost:3000/uploads',
                changeOrigin: true,
                pathRewrite: {
                    '^/uploads': ''
                }
            }
        },
        overlay: {
            warnings: false,
            errors: false
        },

    },
    lintOnSave: false
}