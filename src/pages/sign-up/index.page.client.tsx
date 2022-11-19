import { SignUp } from '@clerk/clerk-react'
import { getQueryParameterString } from '~/utils/routing'

export const Page = () => {
  return (
    <SignUp
      signInUrl="/sign-in"
      redirectUrl={getQueryParameterString('redirectUrl')}
    />
  )
}

export const requiresAuth = false
export const documentProps = { title: 'Sign up' }
