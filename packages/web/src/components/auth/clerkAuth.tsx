import { ClerkProvider, useAuth, useSession } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { navigate } from 'vite-plugin-ssr/client/router'
import { PageContext } from '~/renderer/types'
import { doesRequireAdmin, doesRequireAuth } from '~/utils/auth'

const Redirect: React.FC<{ to: string }> = ({ to }) => {
  useEffect(() => {
    navigate(to).catch(console.error)
  }, [])
  return null
}

const RedirectToSignUp = () => (
  <Redirect to={`/sign-up?redirectUrl=${window.location.href}`} />
)

const RedirectIfNoAuth: React.FC<{
  children: React.ReactNode
  pageContext: PageContext
}> = ({ children, pageContext }) => {
  const auth = useAuth()
  const session = useSession()
  if (!auth.isLoaded && !session.isLoaded) {
    return null
  }
  const isAdmin = Boolean(session?.session?.lastActiveToken?.jwt.claims.isAdmin)
  if (doesRequireAuth(pageContext) && !auth.isSignedIn) {
    return <RedirectToSignUp />
  } else if (doesRequireAdmin(pageContext) && !isAdmin) {
    return <Redirect to="/" />
  }
  return <>{children}</>
}

export const ClerkAuth: React.FC<{
  children: React.ReactNode
  pageContext: PageContext
}> = ({ children, pageContext }) => {
  return (
    <ClerkProvider
      frontendApi={import.meta.env.VITE_CLERK_FRONTEND_API}
      localization={{}}
      navigate={(toUrl) => navigate(toUrl)}
    >
      <RedirectIfNoAuth pageContext={pageContext}>{children}</RedirectIfNoAuth>
    </ClerkProvider>
  )
}
