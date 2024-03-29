import ReactDOMServer from 'react-dom/server'
import { dangerouslySkipEscape, escapeInject } from 'vite-plugin-ssr/server'
import { RootShell } from '~/components/layouts/rootLayout'
import { doesRequireAdmin, doesRequireAuth } from '~/utils/auth'
import { baseUrl } from '~/utils/environmentVariables'
import { getPageTitle } from '~/utils/pageTitle'
import { pageIdToRoute } from '~/utils/routing'
import type { PageContext, PageContextServer } from './types'

// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = [
  'pageProps',
  'documentProps',
  'requiresAuth',
  'auth',
  'routeParams',
  'route',
]

const getRedirect = (
  pageContext: PageContext,
  isSSR: boolean
): string | undefined => {
  const requiresAuth = doesRequireAuth(pageContext) && isSSR // client only pages pass through this code without the `requiresAuth` export :shrug:
  const requiresAdmin = doesRequireAdmin(pageContext) && isSSR // client only pages pass through this code without the `requiresAuth` export :shrug:
  if (requiresAuth && !pageContext.auth?.sessionId) {
    return `/sign-up?redirectUrl=${baseUrl}${pageContext.urlPathname}`
  } else if (requiresAdmin && !pageContext.auth?.isAdmin) {
    return '/'
  }
  return undefined
}

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
    <html class="h-full scroll-smooth bg-white antialiased [font-feature-settings:'ss01']"
 lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="${desc}" />
        <title>${title}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Lexend:wght@400;500&display=swap"
        />
      </head>
      <body class="flex h-full flex-col">
        <div id="page-view" style="min-height: 100%;">${dangerouslySkipEscape(
          pageHtml
        )}</div>
      </body>
    </html>`

  return {
    documentHtml,
    pageContext: {
      auth: pageContext.auth,
      // @ts-expect-error
      route: pageIdToRoute(pageContext._pageId),
      routeParams: pageContext.routeParams,
      redirectTo: getRedirect(pageContext, isSSR),
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    },
  }
}

export const doNotPrerender = false
export { render }
