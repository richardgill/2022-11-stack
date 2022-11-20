import { DashboardShell } from '~/components/shells/dashboardShell'
import './code.css'

export const Page = () => {
  return (
    <DashboardShell>
      <h1>About</h1>
      <p>
        Demo using <code>vite-plugin-ssr</code>.
      </p>
      <button
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Button text
      </button>
    </DashboardShell>
  )
}

export const documentProps = { title: 'About 123', description: 'About' }
export const requiresAuth = false
