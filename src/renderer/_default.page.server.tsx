import ReactDOMServer from 'react-dom/server'
import { dangerouslySkipEscape, escapeInject } from 'vite-plugin-ssr'
import { getPageTitle } from '~/renderer/pageTitle'
import logoUrl from './logo.svg'
import { PageShell } from './PageShell'
import type { PageContextServer } from './types'

// See https://vite-plugin-ssr.com/data-fetching
export const passToClient = ['pageProps', 'urlPathname', 'documentProps']

async function render(pageContext: PageContextServer) {
  const { Page, pageProps } = pageContext
  const isSSR = Boolean(Page)
  const pageHtml = isSSR
    ? ReactDOMServer.renderToString(
        <PageShell pageContext={pageContext}>
          <Page {...pageProps} />
        </PageShell>
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

  return {
    documentHtml,
    pageContext: {
      // We can add some `pageContext` here, which is useful if we want to do page redirection https://vite-plugin-ssr.com/page-redirection
    },
  }
}

export const doNotPrerender = true
export { render }
