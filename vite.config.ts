import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/promodoro/',
    resolve: {
        alias: [{ find: '@', replacement: '/src' }],
    },
    plugins: [react()],
})
