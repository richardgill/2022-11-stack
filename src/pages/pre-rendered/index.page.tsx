import { DashboardShell } from '~/components/shells/dashboardShell'

export const Page = () => {
  return (
    <DashboardShell>
      <h1>Welcome</h1>
      This page is prerendered
      <ul>
        <li>Rendered to HTML.</li>
      </ul>
    </DashboardShell>
  )
}

export const documentProps = { title: 'Pre rendered' }
export const requiresAuth = false
export const doNotPrerender = false
