import 'dotenv/config'
import express from 'express'
import { configureWeb } from '~/server/web'
import { configureAnalyticsProxy } from './analytics'
import { configureTrpc } from './trpc'
import { configureClerkWebhooks } from './webhooks/clerk'
import { configureStripeWebhooks } from './webhooks/stripe'

const startServer = async (): Promise<void> => {
  let app = express()

  app = configureAnalyticsProxy(app)
  app = configureClerkWebhooks(app)
  app = configureStripeWebhooks(app)
  app = configureTrpc(app)
  app = await configureWeb(app)

  const port = process.env.PORT ?? 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
console.log('Starting')
startServer().catch(console.error)

// Needed for ts-node-dev
if (process.env.SERVER_HOT_RELOAD === 'true') {
  process.on('SIGTERM', () => {
    console.log('SIGTERM received, exiting')
    process.exit(0)
  })
}
