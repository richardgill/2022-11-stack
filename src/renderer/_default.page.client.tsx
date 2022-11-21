import { createRoot, hydrateRoot, Root } from 'react-dom/client'
import { RootShell } from '~/components/shells/rootShell'
import { getPageTitle } from '../utils/pageTitle'
import { pageIdToRoute } from '~/utils/routing'
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

// https://vite-plugin-ssr.com/clientRouting
export const clientRouting = true
export { render }
