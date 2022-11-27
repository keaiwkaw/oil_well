import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
            },
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 8888,
        proxy: {
            "/api": {
                target: "http://101.34.38.102:8186/",
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/api/, '')
            },
            "/old": {
                target: "http://101.34.38.102:8000/",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/old/, ""),
            },
            "/sb": {
                target: "http://101.34.38.102:8186/",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/sb/, ""),
            },
        },
    },
});
