import { createRoot, hydrateRoot, Root } from 'react-dom/client'
import { PageShell } from './PageShell'
import { getPageTitle } from './pageTitle'
import type { PageContextClient } from './types'

let root: Root
async function render(pageContext: PageContextClient) {
  const { Page, pageProps } = pageContext
  const page = (
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>
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
  document.title = getPageTitle(pageContext)
}

// https://vite-plugin-ssr.com/clientRouting
export const clientRouting = true
export { render }
