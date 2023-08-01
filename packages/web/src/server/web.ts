import { ClerkExpressWithAuth, type LooseAuthProp } from '@clerk/clerk-sdk-node'
import compression from 'compression'
import { type Express, type Request } from 'express'
import { pick } from 'lodash-es'
import path from 'path'
import * as url from 'url'
import { renderPage } from 'vite-plugin-ssr/server'
import { type PageContextInit } from '~/renderer/types'

const isProduction = process.env.NODE_ENV === 'production'
const dirname = url.fileURLToPath(new URL('.', import.meta.url))
const root = path.join(dirname, '..', '..')

interface CustomClaims {
  isAdmin?: boolean | string
}
type WithAuthProp<T> = T & { auth: LooseAuthProp['auth'] & CustomClaims }
export const configureWeb = async (app: Express) => {
  app.use(compression())
  if (isProduction) {
    const sirv = (await import('sirv')).default
    app.use(sirv(`${root}/dist/client`))
  } else {
    const vite = await import('vite')
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
    ClerkExpressWithAuth(),
    // @ts-expect-error
    // todo remove
    async (req: WithAuthProp<Request>, res, next) => {
      const auth = {
        ...pick(req.auth, 'sessionId', 'userId', 'actor', 'claims'),
        isAdmin: Boolean(req.auth?.claims?.isAdmin),
      }
      const pageContextInit: PageContextInit = {
        urlOriginal: req.originalUrl,
        auth,
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
