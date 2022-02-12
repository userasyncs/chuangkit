const path = require('path');

function resolve(dir) {
    return path.join(__dirname, dir)
}


module.exports = {
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('./src'))
            .set('components', resolve('./src/components'))
            .set('views', resolve('./src/views'))
            .set('assets', resolve('./src/assets'))
    },
    publicPath: "/",
    devServer: {
        proxy: {
            "^/v2":{
                target:'https://api-v2.chuangkit.com/',
                changeOrigin:true,
                pathRewrite:{
                    "^/v2":""
                }
            },
            "^/v1":{
                target:"https://api.chuangkit.com/",
                changeOrigin:true,
                pathRewrite:{
                    "^/v1":""
                }
            },
            "^/pub":{
                target:" https://pub-cdn-oss.chuangkit.com/",
                changeOrigin:true,
                pathRewrite:{
                    "^/pub":""
                }
            }
        }
    }
}