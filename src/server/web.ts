import compression from 'compression'
import { Express } from 'express'
import path from 'path'
import { renderPage } from 'vite-plugin-ssr'
const isProduction = process.env.NODE_ENV === 'production'
const root = path.join(__dirname, '..', '..')

export const configureWeb = async (app: Express) => {
  app.use(compression())
  if (isProduction) {
    const sirv = require('sirv')
    app.use(sirv(`${root}/dist/client`))
  } else {
    const vite = require('vite')
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: true },
      })
    ).middlewares
    app.use(viteDevMiddleware)
  }

  app.get('*', async (req, res, next) => {
    console.log('req', req)
    const pageContextInit = {
      urlOriginal: req.originalUrl,
    }
    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext
    if (httpResponse == null) {
      return next()
    }
    const { body, statusCode, contentType } = httpResponse
    res.status(statusCode).type(contentType).send(body)
  })
  return app
}
