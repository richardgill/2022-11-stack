import express from 'express'
import { configureWeb } from '~/server/web'
import { configureTrpc } from './trpc'

const startServer = async (): Promise<void> => {
  let app = express()

  app = configureTrpc(app)
  app = await configureWeb(app)

  const port = process.env.PORT ?? 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}

startServer().catch(console.error)
