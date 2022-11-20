import { AuthLayout } from './authLayout'
import { SignUp as ClerkSignUp } from '@clerk/clerk-react'
import { clerkApperance } from '~/utils/auth'
import { getQueryParameterString } from '~/utils/routing'

export const SignUp = () => (
  <AuthLayout>
    <ClerkSignUp
      signInUrl="/sign-in"
      redirectUrl={getQueryParameterString('redirectUrl')}
      appearance={clerkApperance}
    />
  </AuthLayout>
)
