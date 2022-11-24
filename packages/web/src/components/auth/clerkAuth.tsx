import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { navigate } from 'vite-plugin-ssr/client/router'
import { PageContext } from '~/renderer/types'
import { doesRequireAuth } from '~/utils/auth'

const RedirectToSignUp = () => {
  useEffect(() => {
    navigate(`/sign-up?redirectUrl=${window.location.href}`).catch(
      console.error
    )
  }, [])
  return null
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
      {doesRequireAuth(pageContext) ? (
        <>
          <SignedIn>{children}</SignedIn>
          <SignedOut>
            <RedirectToSignUp />
          </SignedOut>
        </>
      ) : (
        <>{children}</>
      )}
    </ClerkProvider>
  )
}
