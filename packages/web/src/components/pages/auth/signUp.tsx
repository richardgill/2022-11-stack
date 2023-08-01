import { SignUp as ClerkSignUp } from '@clerk/clerk-react'
import { clerkApperance } from '~/utils/auth'
import { getQueryParameterString } from '~/utils/routing'
import { AuthLayout } from './authLayout'

export const SignUp = () => (
  <AuthLayout>
    <ClerkSignUp
      signInUrl="/sign-in"
      redirectUrl={getQueryParameterString('redirectUrl')}
      appearance={clerkApperance}
    />
  </AuthLayout>
)
