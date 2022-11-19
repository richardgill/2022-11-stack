import {} from '@clerk/clerk-react'
import React from 'react'
import { ClerkAuth } from '~/components/auth/clerkAuth'
import { LogoutButton } from '~/components/auth/logoutButton'
import { Link } from './Link'
import logo from './logo.svg'
import './PageShell.css'
import { TrpcProvider } from './trpcProvider'
import type { PageContext } from './types'
import { PageContextProvider } from './usePageContext'

function PageShell({
  children,
  pageContext,
}: {
  children: React.ReactNode
  pageContext: PageContext
}) {
  return (
    <React.StrictMode>
      <ClerkAuth pageContext={pageContext}>
        <TrpcProvider>
          <PageContextProvider pageContext={pageContext}>
            <Layout>
              <Sidebar>
                <Logo />
                <Link className="navitem" href="/">
                  Home
                </Link>
                <Link className="navitem" href="/sign-up">
                  Sign up
                </Link>
                <Link className="navitem" href="/sign-in">
                  Sign in
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
                <LogoutButton />
              </Sidebar>
              <Content>{children}</Content>
            </Layout>
          </PageContextProvider>
        </TrpcProvider>
      </ClerkAuth>
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
