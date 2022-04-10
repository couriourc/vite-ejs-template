
export const devServer = {
    server: {
        host: '::',
        port: 8080,
        strictPort: false,
        proxy: {
            //    如果需要配置代理，可以在此处配置
            //    '/api': {
            //      target: 'http://localhost:3000',
            //      changeOrigin: true,
            //      rewrite: path => path.replace(/^\/api/, '')
            //    },
        },
        // 开发服务器配置 cors
        cors: {},
    },
}

export const devConfig = {
    // 开发服务器配置
}