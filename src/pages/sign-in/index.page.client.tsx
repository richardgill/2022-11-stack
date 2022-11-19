import { SignIn } from '@clerk/clerk-react'
import { clerkApperance } from '~/utils/auth'
import { getQueryParameterString } from '~/utils/routing'

export const Page = () => {
  return (
    <SignIn
      signUpUrl="/sign-up"
      redirectUrl={getQueryParameterString('redirectUrl')}
      appearance={clerkApperance}
    />
  )
}

export const requiresAuth = false
export const documentProps = { title: 'Sign In' }
