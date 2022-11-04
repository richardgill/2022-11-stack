import react from '@vitejs/plugin-react'
import ssr from 'vite-plugin-ssr/plugin'
import path from 'path'
import { UserConfig } from 'vite'

const config: UserConfig = {
  plugins: [react(), ssr({ prerender: true })],
  resolve: {
    alias: {
      '~': path.join(__dirname, 'src'),
    },
  },
}

export default config
