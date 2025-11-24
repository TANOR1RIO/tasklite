import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Имя репозитория
const repoName = 'tasklite'

export default defineConfig({
plugins: [react()],
base: `/${repoName}/`,
})