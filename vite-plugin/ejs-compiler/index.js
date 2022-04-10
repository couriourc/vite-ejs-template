import ejs from "ejs";
import fs from "fs";

export default function ViteEjsPlugin(options) {
    let config;

    return {
        name: "vite-plugin-ejs",

        // Get Resolved config
        configResolved(resolvedConfig) {
            config = resolvedConfig;
        },

        transformIndexHtml: {
            enforce: "pre",
            transform(src, id) {
                const {filename} = id;
                if (!filename.endsWith(options.extension)) return;
                if (!options.excludeFn?.(filename)) return;
                console.log(options.data)
                try {
                    src = ejs.render(
                        src,
                        {
                            ...options?.data,
                        },
                        {
                            filename,
                            ...options?.ejs
                        }
                    );

                    if (options.layout) return transformWithLayout(src, filename, {...options})
                    return transformWithoutLayout(src, filename);
                } catch (e) {
                    return e.message;
                }

            }
        }
    };
}

function transformWithLayout(src, filename, {layout: layoutFile, pagesInjectTags, ...options}) {
    const hasFile = fs.existsSync(layoutFile)
    if (!hasFile) {
        throw new Error(`layout file ${layoutFile} not found`)
    }
    const layout = fs.readFileSync(layoutFile).toLocaleString()
    return ejs.render(layout, {
            title: src,
        },
        {
            filename,
            ...options?.ejs
        }
    );
}

function transformWithoutLayout(src, filename) {
    console.log(src)
    return src;
}