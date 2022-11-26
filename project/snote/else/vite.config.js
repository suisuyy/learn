import { defineConfig } from 'vite';


export default defineConfig({
    outDir: process.env.NODE_ENV,
    server: {
        port: 3000,
        fs: {
            strict: false,
        },
    },
    plugins: [
    ],
    optimizeDeps: {
        esbuildOptions: {
            // Node.js global to browser globalThis
            define: {
                global: '{}'
            },
        },
    },
    resolve: {
        alias: {
            'node-fetch': 'isomorphic-fetch',
        },
    },
});