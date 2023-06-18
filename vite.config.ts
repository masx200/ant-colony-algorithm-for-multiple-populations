import { ConfigEnv, PluginOption, UserConfig, defineConfig } from "vite";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import ElementPlus from "unplugin-element-plus/dist/vite.js";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { PluginItem } from "@babel/core";
import { VitePWA } from "vite-plugin-pwa";
import { babel } from "@rollup/plugin-babel";
import checker from "vite-plugin-checker";
import { createHtmlPlugin } from "vite-plugin-html";
import path from "path";
import { resolve } from "path";
import vuePlugin from "@vitejs/plugin-vue";

export default defineConfig(({ mode, command }: ConfigEnv): UserConfig => {
    const isdrop = mode === "production" && command === "build";
    const config: UserConfig = {
        worker: { format: "es",
            plugins: [
                babel({
                    sourceMaps: true,
                    babelHelpers: "bundled",
                    exclude: [/node_modules/],
                    extensions: [".ts", ".js"],
                    plugins: [
                        [
                            "babel-plugin-import",
                            {
                                libraryName: "lodash",
                                libraryDirectory: "",
                                camel2DashComponentName: false,
                            },
                        ],
                        ["@babel/plugin-proposal-async-generator-functions"],
                    ],
                }) as PluginOption,
            ] as PluginOption[],
        },
        esbuild: {
            legalComments: "none",
            drop: isdrop ? ["console", "debugger"] : undefined,
        },
        root:
            mode === "test"
                ? path.resolve(__dirname)
                : path.resolve(__dirname, "src"),
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
            checker({
                typescript: { root: path.resolve(__dirname) },
            }),

            ElementPlus({}),
            vuePlugin(),

            babel({
                babelHelpers: "bundled",
                sourceMaps: mode !== "production",
                exclude: [/node_modules/],
                extensions: [".ts", ".js"],

                plugins: [
                    ["@babel/plugin-proposal-async-generator-functions"],
                    [
                        "babel-plugin-import",
                        {
                            libraryName: "lodash",
                            libraryDirectory: "",
                            camel2DashComponentName: false,
                        },
                    ],
                    isdrop && "babel-plugin-clean-code",
                ].filter(Boolean) as PluginItem[],
            }),
            createHtmlPlugin({
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeAttributeQuotes: false,
                },
            }),
            VitePWA({
                registerType: "autoUpdate",
                workbox: { globPatterns: ["*/*"] },
            }),
        ],
        build: {
            rollupOptions: {
                input: resolve(__dirname, "src", "index.html"),

                plugins: [],
            },
            cssCodeSplit: false,
            minify: "esbuild",
            emptyOutDir: true,
            outDir: path.resolve(__dirname, "dist"),
            target: "es2018",
        },
    };
    return config;
});
