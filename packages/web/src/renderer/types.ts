import { LooseAuthProp } from '@clerk/clerk-sdk-node'
import type {
  PageContextBuiltIn,
  PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient,
} from 'vite-plugin-ssr/types'
type Page = (pageProps: PageProps) => React.ReactElement
interface PageProps {}

type Auth = Pick<
  LooseAuthProp['auth'],
  'sessionId' | 'userId' | 'actor' | 'claims'
> & { isAdmin: boolean }

export interface PageContextCustom {
  Page: Page
  pageProps?: PageProps
  urlPathname: string
  auth: Auth
  route: string
  redirectTo: string
  exports: {
    requiresAuth?: boolean
    requiresAdmin?: boolean
    documentProps?: {
      title?: string
      description?: string
    }
  }
}

export interface PageContextInit {
  /** The URL of the HTTP request */
  urlOriginal?: string
  auth?: Auth
  redirectTo?: string
}

type PageContextServer = PageContextBuiltIn<Page> & PageContextCustom
type PageContextClient = PageContextBuiltInClient<Page> & PageContextCustom

type PageContext = PageContextClient | PageContextServer

export type { PageContextServer }
export type { PageContextClient }
export type { PageContext }
export type { PageProps } // When using Server Routing
