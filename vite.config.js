import {defineConfig} from 'vite'
import {devConfig, devServer} from "./vite-config/dev.config";
import {commonConfig} from "./vite-config/common.config";
import {prodConfig} from "./vite-config/prod.config";


let config;
if (process.env.NODE_ENV === 'production') {
    config = {
        ...prodConfig
    }
} else {
    config = {
        ...devServer,
        ...devConfig
    }
}

export default defineConfig({
    ...commonConfig,
    ...config,
})