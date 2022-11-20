import React from 'react'
import { LogoutButton } from '~/components/auth/logoutButton'
import { Link } from '~/components/link'
import logo from './logo.svg'

export const DashboardShell = ({ children }: { children: React.ReactNode }) => {
  return (
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
        <Link className="navitem" href="/star-wars-ssr-react-query/starships">
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
