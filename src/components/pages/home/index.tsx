import { LogoutButton } from '~/components/auth/logoutButton'
import { Link } from '~/components/link'
import { DashboardShell } from '~/components/shells/dashboardShell'

export const Home = () => (
  <DashboardShell>
    <Link href="/about">about</Link>
    <LogoutButton />
  </DashboardShell>
)
