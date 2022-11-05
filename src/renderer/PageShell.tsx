import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import React from 'react'
import superjson from 'superjson'
import { supabase } from '~/renderer/supabase'
import { Link } from './Link'
import logo from './logo.svg'
import './PageShell.css'
import { trpcReact } from './trpc'
import type { PageContext } from './types'
import { PageContextProvider } from './usePageContext'

const queryClient = new QueryClient()
const trpcClient = trpcReact.createClient({
  transformer: superjson,
  links: [
    httpBatchLink({
      url: '/trpc-api',
      headers: async () => {
        const session = await supabase.auth.getSession()
        const accessToken = session.data?.session?.access_token
        return accessToken
          ? { authorization: session.data?.session?.access_token }
          : {}
      },
    }),
  ],
})
function PageShell({
  children,
  pageContext,
}: {
  children: React.ReactNode
  pageContext: PageContext
}) {
  return (
    <React.StrictMode>
      <trpcReact.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <PageContextProvider pageContext={pageContext}>
            <Layout>
              <Sidebar>
                <Logo />
                <Link className="navitem" href="/">
                  Home
                </Link>
                <Link className="navitem" href="/auth">
                  Login
                </Link>
                <Link className="navitem" href="/about">
                  About
                </Link>
                <Link className="navitem" href="/pre-rendered">
                  Pre Rendered
                </Link>
                <Link className="navitem" href="/star-wars-ssr/starships">
                  starships ssr
                </Link>
                <Link
                  className="navitem"
                  href="/star-wars-ssr-react-query/starships"
                >
                  starships ssr react query
                </Link>
                <Link className="navitem" href="/trpc/users">
                  /trpc/users
                </Link>
                <Link className="navitem" href="/trpc/dogs">
                  /trpc/dogs
                </Link>
              </Sidebar>
              <Content>{children}</Content>
            </Layout>
          </PageContextProvider>
        </QueryClientProvider>
      </trpcReact.Provider>
    </React.StrictMode>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        maxWidth: 900,
        margin: 'auto',
      }}
    >
      {children}
    </div>
  )
}

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: 20,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        lineHeight: '1.8em',
      }}
    >
      {children}
    </div>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        padding: 20,
        paddingBottom: 50,
        borderLeft: '2px solid #eee',
        minHeight: '100vh',
      }}
    >
      {children}
    </div>
  )
}

function Logo() {
  return (
    <div
      style={{
        marginTop: 20,
        marginBottom: 10,
      }}
    >
      <a href="/">
        <img src={logo} height={64} width={64} alt="logo" />
      </a>
    </div>
  )
}

export { PageShell }
