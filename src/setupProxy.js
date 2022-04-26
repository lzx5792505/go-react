const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target:'http://loaclhost:5000',
            changeOrigin:true
        })
    )
}