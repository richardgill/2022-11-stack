import ReactDOMServer from 'react-dom/server'
import { dangerouslySkipEscape, escapeInject } from 'vite-plugin-ssr'
import { RootShell } from '~/components/shells/rootShell'
import { doesRequireAuth } from '~/utils/auth'
import { getPageTitle } from '~/utils/pageTitle'
import logoUrl from './logo.svg'
import type { PageContextServer } from './types'

// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = [
  'pageProps',
  'urlPathname',
  'documentProps',
  'requiresAuth',
]

async function render(pageContext: PageContextServer) {
  const { Page, pageProps } = pageContext
  const isSSR = Boolean(Page)
  const pageHtml = isSSR
    ? ReactDOMServer.renderToString(
        <RootShell pageContext={pageContext}>
          <Page {...pageProps} />
        </RootShell>
      )
    : ''

  // See https://vite-plugin-ssr.com/head
  const { documentProps } = pageContext.exports
  const title = getPageTitle(pageContext)

  const desc = documentProps?.description ?? 'App using Vite + vite-plugin-ssr'

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="${logoUrl}" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
      </head>
      <body>
        <div id="page-view">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`

  const requiresAuth = doesRequireAuth(pageContext) && isSSR // client only pages pass through this code without the `requiresAuth` export :shrug:
  return {
    documentHtml,
    pageContext: {
      redirectTo:
        requiresAuth && !pageContext.auth?.sessionId
          ? `/sign-up?redirectUrl=${process.env.BASE_URL}${pageContext.urlPathname}`
          : undefined,
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    },
  }
}

export const doNotPrerender = false
export { render }
