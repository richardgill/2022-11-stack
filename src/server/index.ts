import express from 'express'
import { configureWeb } from '~/server/web'

const startServer = async (): Promise<void> => {
  const app = express()

  await configureWeb(app)

  const port = process.env.PORT ?? 3000
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}

startServer().catch(console.error)
