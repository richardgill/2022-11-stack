import { SignUp } from '~/components/pages/auth/signUp'

export const Page = () => <SignUp />

export const requiresAuth = false
export const documentProps = { title: 'Sign up' }
