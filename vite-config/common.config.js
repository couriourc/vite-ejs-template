import ViteEjsPlugin from "../vite-plugin/ejs-compiler";
import path from "path";
import {aliasConfig} from "./alias.config";
import glob from "glob";

export function excludePrivate(item) {
    return !path.basename(item).startsWith('_')
}

export function getRootDir(excludeFn = () => true) {
    return glob.sync("src/**/*.html").filter(excludeFn).map((item, index) => {
        return {
            [index]: item
        };
    }).reduce((memo, cur) => {
        return {
            ...memo,
            ...cur
        };
    }, {});
}

export const commonConfig = {
    root: path.resolve(__dirname, '../src'),
    publicPath: path.join(__dirname, 'public'),
    resolve: {
        alias: aliasConfig
    },
    plugins: [
        ViteEjsPlugin({
            extension: '.html',
            layout: path.resolve(__dirname, '../src/__index.html'),
            excludeFn: excludePrivate,
            data: {
                title: 'asdhj'
            },
            ejs: {
                minify: true,
            },
        }),
    ],
    build: {
        outDir: path.join(__dirname, '../dist'),
        minify: true,
        rollupOptions: {
            input: getRootDir(excludePrivate),
            output: {
                chunkFileNames: 'static/js/[name]-[hash].js',
                entryFileNames: 'static/js/[name]-[hash].js',
                assetFileNames: 'static/ext/[name]-[hash].[ext]',
            }
        },
    },
}