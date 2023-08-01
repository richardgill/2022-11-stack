import { createRoot, hydrateRoot, type Root } from 'react-dom/client'
import { RootShell } from '~/components/layouts/rootLayout'
import { pageIdToRoute } from '~/utils/routing'
import { getPageTitle } from '../utils/pageTitle'
import type { PageContextClient } from './types'

let root: Root
async function render(originalPageContext: PageContextClient) {
  const pageContext = {
    ...originalPageContext,
    route:
      originalPageContext.route ??
      // @ts-expect-error
      pageIdToRoute(originalPageContext._pageId),
  }
  const { Page, pageProps } = pageContext
  const page = (
    <RootShell pageContext={pageContext}>
      <Page {...pageProps} />
    </RootShell>
  )

  const container = document.getElementById('page-view')
  if (container == null) {
    throw new Error('Could not find container')
  }
  const isSPA = container.innerHTML === '' || !pageContext.isHydration
  if (isSPA) {
    if (!root) {
      root = createRoot(container)
    }
    root.render(page)
    // SSR
  } else {
    root = hydrateRoot(container, page)
  }
  document.title = getPageTitle(originalPageContext)
}

// Whether your UI framework allows the hydration to be aborted. (Allowing vite-plugin-ssr
// to abort the hydration if the user clicks on a link before the hydration finished.)
// React users should set hydrationCanBeAborted to true. (Other frameworks,
// such as Vue, crash if the hydration is aborted.)
export const hydrationCanBeAborted = true
// https://vite-plugin-ssr.com/clientRouting
export const clientRouting = true
export { render }
