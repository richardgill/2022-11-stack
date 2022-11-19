import { SignUp } from '@clerk/clerk-react'
import { clerkApperance } from '~/utils/auth'
import { getQueryParameterString } from '~/utils/routing'

export const Page = () => {
  return (
    <SignUp
      signInUrl="/sign-in"
      redirectUrl={getQueryParameterString('redirectUrl')}
      appearance={clerkApperance}
    />
  )
}

export const requiresAuth = false
export const documentProps = { title: 'Sign up' }
