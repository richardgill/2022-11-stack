import { LooseAuthProp } from '@clerk/clerk-sdk-node'
import type { PageContextBuiltIn } from 'vite-plugin-ssr'
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client'

type Page = (pageProps: PageProps) => React.ReactElement
interface PageProps {}

export interface PageContextCustom {
  Page: Page
  pageProps?: PageProps
  urlPathname: string
  auth: LooseAuthProp['auth']
  redirectTo: string
  exports: {
    requiresAuth?: boolean
    documentProps?: {
      title?: string
      description?: string
    }
  }
}

export interface PageContextInit {
  /** The URL of the HTTP request */
  urlOriginal?: string
  auth?: LooseAuthProp['auth']
  redirectTo?: string
}

type PageContextServer = PageContextBuiltIn<Page> & PageContextCustom
type PageContextClient = PageContextBuiltInClient<Page> & PageContextCustom

type PageContext = PageContextClient | PageContextServer

export type { PageContextServer }
export type { PageContextClient }
export type { PageContext }
export type { PageProps } // When using Server Routing
