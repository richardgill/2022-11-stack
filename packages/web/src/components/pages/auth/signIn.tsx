import { SignIn as ClerkSignIn } from '@clerk/clerk-react'
import { clerkApperance } from '~/utils/auth'
import { getQueryParameterString } from '~/utils/routing'
import { AuthLayout } from './authLayout'

export const SignIn = () => (
  <AuthLayout>
    <ClerkSignIn
      signUpUrl="/sign-up"
      redirectUrl={getQueryParameterString('redirectUrl')}
      appearance={clerkApperance}
    />
  </AuthLayout>
)
