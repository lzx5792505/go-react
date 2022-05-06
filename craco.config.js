const path = require('path')

module.exports = {
    // webpack 配置
    webpack: {
        // 设置别名
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        plugins:[
            new this.webpack.ProvidePlugin({
                $:'jquery',
                jQuery:'jquery',
                "window.jQuery":'jquery'
            })
        ]
    }
}