import { LogoutButton } from '~/components/auth/logoutButton'
import { DashboardShell } from '~/components/layouts/dashboardLayout'
import { Link } from '~/components/link'

export const Home = () => (
  <DashboardShell>
    <Link href="/about">about</Link>
    <LogoutButton />
  </DashboardShell>
)
