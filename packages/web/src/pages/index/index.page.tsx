import { MarketingLanding } from '~/components/pages/marketingLanding'
import { Home } from '~/components/pages/home'
import { useAuth } from '~/hooks/auth'

export const Page = () => {
  const auth = useAuth()
  if (!auth.isLoaded) {
    console.log('auth not loaded')
    return <div>Loading...</div>
  }
  return auth.isSignedIn ? <Home /> : <MarketingLanding />
}

export const documentProps = { title: 'Taxpal' }
export const requiresAuth = false
export const doNotPrerender = true
