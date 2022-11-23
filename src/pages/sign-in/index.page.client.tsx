import { SignIn } from '~/components/pages/auth/signIn'

export const Page = () => <SignIn />

export const requiresAuth = false
export const documentProps = { title: 'Sign in' }
