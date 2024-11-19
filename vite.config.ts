import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import type { ViteUserConfig } from 'vitest/config'

interface VitestConfigExport extends ViteUserConfig {
  test: {
    globals: boolean
    environment: string
    setupFiles: string | string[]
    css: boolean
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    deps: {
      optimizer: {
        web: {
          include: ['@testing-library/user-event']
        }
      }
    },
    coverage: {      
      reporter: ['text', 'json', 'html'], // Formatos de relatórios
      exclude: ['node_modules/', 'src/setupTests.ts'], // Arquivos/pastas a serem excluídos
      clean: false, // Impede a limpeza automática da pasta de cobertura
    },
    css: true
  }
} as VitestConfigExport)