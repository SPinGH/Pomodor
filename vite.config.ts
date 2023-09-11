import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
    },
});
