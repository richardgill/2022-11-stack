import react from '@vitejs/plugin-react'
import path from 'path'
import { type UserConfig } from 'vite'
import ssr from 'vite-plugin-ssr/plugin'

const config: UserConfig = {
  plugins: [react(), ssr({ prerender: true })],
  resolve: {
    alias: {
      '~': path.join(__dirname, 'src'),
    },
  },
}

export default config
