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
  'auth',
]

async function render(pageContext: PageContextServer) {
  console.log('server pageContext', pageContext.auth)
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
        <link rel="icon" href="${logoUrl}" />
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

  const requiresAuth = doesRequireAuth(pageContext) && isSSR // client only pages pass through this code without the `requiresAuth` export :shrug:
  return {
    documentHtml,
    pageContext: {
      auth: pageContext.auth,
      redirectTo:
        requiresAuth && !pageContext.auth?.sessionId
          ? `/sign-up?redirectUrl=${process.env.BASE_URL}${pageContext.urlPathname}`
          : undefined,
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    },
  }
}

// from: https://vite-plugin-ssr.com/clientRouting
// The `onBeforeRender()` hook is called for the first page as well as upon page navigation.
// (Whereas `render()` is called only for the first page.)
// export const onBeforeRender = async () => {
//   console.log('onBeforeRender', onBeforeRender)
//   return {}
// }

export const doNotPrerender = false
export { render }
