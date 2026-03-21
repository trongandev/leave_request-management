import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import Sitemap from "vite-plugin-sitemap"
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        Sitemap({
            hostname: "https://lrm.io.vn", // Thay bằng domain của bạn
            dynamicRoutes: ["/auth/login"], // Các route tĩnh
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
})
