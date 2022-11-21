import 'dotenv/config'
import express from 'express'
import { configureWeb } from '~/server/web'
import { configureAnalytics } from './analytics'
import { configureTrpc } from './trpc'
import { configureWebhooks } from './webhooks'

const startServer = async (): Promise<void> => {
  let app = express()

  app = configureAnalytics(app)
  app = configureWebhooks(app)
  app = configureTrpc(app)
  app = await configureWeb(app)

  const port = process.env.PORT ?? 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
console.log('running')
startServer().catch(console.error)

// Needed for ts-node-dev
if (process.env.SERVER_HOT_RELOAD === 'true') {
  process.on('SIGTERM', () => {
    console.log('SIGTERM received, exiting')
    process.exit(0)
  })
}
