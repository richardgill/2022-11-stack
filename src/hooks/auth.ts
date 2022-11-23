import { useAuth as useAuthClerk } from '@clerk/clerk-react'
import { pick } from 'lodash-es'
import { usePageContext } from '~/renderer/usePageContext'

// Hacked copyied version of useAuth from Clerk
export const useAuth = () => {
  const pageContext = usePageContext()
  const auth = useAuthClerk()
  // @ts-expect-error this is how to check we are client side render (needs to be === false to avoid undefined)
  if (pageContext.isHydration === false) {
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
  // SSG build fails otherwise
  if (!pageContext.auth) {
    return {
      isLoaded: false,
      isSignedIn: undefined,
      sessionId: undefined,
      userId: undefined,
      actor: null,
      signOut: () => null,
    }
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
