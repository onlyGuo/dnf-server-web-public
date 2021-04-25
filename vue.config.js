module.exports = {
    devServer: {
        compress: true,
        inline: true,
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:9001',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            },
        }
    }
}