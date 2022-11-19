import { SignIn } from '@clerk/clerk-react'
import { getQueryParameterString } from '~/utils/routing'

export const Page = () => {
  return (
    <SignIn
      signUpUrl="/sign-up"
      redirectUrl={getQueryParameterString('redirectUrl')}
    />
  )
}

export const requiresAuth = false
export const documentProps = { title: 'Sign In' }
