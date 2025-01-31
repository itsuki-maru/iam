import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from "fs"

const configJson = JSON.parse(fs.readFileSync("./config.json", "utf-8"));

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "./",
  envDir: "./",
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    __APP_CONFIG__: JSON.stringify(configJson)
  }
})