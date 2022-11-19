import 'dotenv/config'
import express from 'express'
import { configureWeb } from '~/server/web'
import { configureTrpc } from './trpc'

console.log('process.env', process.env)
const startServer = async (): Promise<void> => {
  let app = express()

  app = configureTrpc(app)
  app = await configureWeb(app)

  const port = process.env.PORT ?? 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
console.log('running')
startServer().catch(console.error)

// Needed for ts-node-dev
process.on('SIGTERM', () => {
  console.log('SIGTERM received, exiting')
  process.exit(0)
})
