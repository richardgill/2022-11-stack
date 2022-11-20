import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  useAuth as useAuthClerk,
} from '@clerk/clerk-react'
import { pick } from 'lodash-es'
import { useEffect } from 'react'
import { navigate } from 'vite-plugin-ssr/client/router'
import { PageContext } from '~/renderer/types'
import { usePageContext } from '~/renderer/usePageContext'
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

// Hacked copyied version of useAuth from Clerk
export const useAuth = () => {
  const pageContext = usePageContext()
  // @ts-expect-error this is how to check we are client side render (needs to be === false to avoid undefined)
  if (pageContext.isHydration === false) {
    const auth = useAuthClerk()
    return pick(
      auth,
      'isLoaded',
      'isSignedIn',
      'sessionId',
      'userId',
      'actor',
      'signOut'
    )
  }
  const { sessionId, userId, actor } = pageContext.auth
  if (sessionId === undefined && userId === undefined) {
    return {
      isLoaded: false,
      isSignedIn: undefined,
      sessionId,
      userId,
      actor: null,
      signOut: () => null,
    }
  }
  if (sessionId === null && userId === null) {
    return {
      isLoaded: true,
      isSignedIn: false,
      sessionId,
      userId,
      actor: null,
      signOut: () => null,
    }
  }
  if (!!sessionId && !!userId) {
    return {
      isLoaded: true,
      isSignedIn: true,
      sessionId,
      userId,
      actor,
      signOut: () => null,
    }
  }
  throw new Error('invalid clerk auth state')
}
