import { useUser } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { useAuth } from '~/hooks/auth'
import { useMixpanel } from '~/hooks/mixpanel'
import { usePosthog } from '~/hooks/posthog'
import { usePageContext } from '~/renderer/usePageContext'

export const Analytics: React.FC = () => {
  const auth = useAuth()
  const user = useUser()
  const mixpanel = useMixpanel()
  const posthog = usePosthog()
  const { route, routeParams } = usePageContext()
  useEffect(() => {
    if (!auth.isLoaded || !user.isLoaded) return
    if (auth.isSignedIn && auth.userId && user.user) {
      mixpanel.identify(auth.userId)
      posthog.identify(auth.userId)
      const person = {
        id: user.user?.id,
        email: user.user?.primaryEmailAddress?.emailAddress,
        fullname: user.user?.fullName,
      }
      mixpanel.people.set(person)
      posthog.people.set(person)
    }
  }, [auth, user])

  useEffect(() => {
    if (route) {
      mixpanel.trackPageView()
      posthog.capturePageView()
    }
  }, [route, routeParams])

  return null
}
