import { useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { usePageContext } from '~/renderer/usePageContext'
import { useMixpanel } from '~/utils/mixpanel'
import { useAuth } from './auth/clerkAuth'

export const Analytics: React.FC = () => {
  const auth = useAuth()
  const user = useUser()
  const mixpanel = useMixpanel()
  const { route, routeParams } = usePageContext()
  useEffect(() => {
    if (!auth.isLoaded || !user.isLoaded) return
    if (auth.isSignedIn && auth.userId && user.user) {
      mixpanel.identify(auth.userId)

      mixpanel.people.set({
        id: user.user?.id,
        email: user.user?.primaryEmailAddress?.emailAddress,
        fullname: user.user?.fullName,
      })
    }
  }, [auth, user])

  useEffect(() => {
    if (route) {
      console.log('mixpanel track?', route, routeParams)
      mixpanel.trackPageView()
    }
  }, [route, routeParams])

  return null
}
