import { Express } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

export const configureAnalyticsProxy = (app: Express) => {
  app.use(
    '/mp',
    createProxyMiddleware({
      target: 'https://api-eu.mixpanel.com/',
      changeOrigin: true,
      pathRewrite: { '^/mp': '/' },
    })
  )
  app.use(
    '/ph',
    createProxyMiddleware({
      target: 'https://app.posthog.com',
      changeOrigin: true,
      pathRewrite: { '^/ph': '/' },
    })
  )
  return app
}
