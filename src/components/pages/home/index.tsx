import { LogoutButton } from '~/components/auth/logoutButton'
import { Link } from '~/components/link'

export const Home = () => (
  <div>
    <Link href="/about">about</Link>
    <LogoutButton />
  </div>
)
