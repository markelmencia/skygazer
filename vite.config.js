// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';
import cesium from 'vite-plugin-cesium';

export default defineConfig({
    plugins: [cesium()],
    resolve: {
        alias: {
            cesium: resolve(__dirname, 'node_modules/cesium')
        }
    },
    define: {
        CESIUM_BASE_URL: JSON.stringify('/cesium')
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    cesium: ['cesium']
                }
            }
        }
    }
});