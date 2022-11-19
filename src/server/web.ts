import { ClerkExpressWithAuth, WithAuthProp } from '@clerk/clerk-sdk-node'
import compression from 'compression'
import { Express, Request } from 'express'
import path from 'path'
import { renderPage } from 'vite-plugin-ssr'
import { PageContextInit } from '~/renderer/types'
const isProduction = process.env.NODE_ENV === 'production'
const root = path.join(__dirname, '..', '..')

// type ViteRequest = Request<ParamsDictionary, any, any, QueryString.ParsedQs, Record<string, any>>

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

  app.get(
    '*',
    // @ts-expect-error
    ClerkExpressWithAuth(),
    async (req: WithAuthProp<Request>, res, next) => {
      const pageContextInit: PageContextInit = {
        urlOriginal: req.originalUrl,
        auth: req.auth,
        redirectTo: undefined,
      }
      const pageContext = await renderPage(pageContextInit)
      const { httpResponse } = pageContext
      if (pageContext.redirectTo) {
        res.redirect(307, pageContext.redirectTo)
      } else if (httpResponse == null) {
        return next()
      } else {
        const { body, statusCode, contentType } = httpResponse
        res.status(statusCode).type(contentType).send(body)
      }
    }
  )
  return app
}
