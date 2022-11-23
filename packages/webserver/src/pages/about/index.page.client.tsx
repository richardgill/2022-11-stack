import { LogoutButton } from '~/components/auth/logoutButton'
import { Link } from '~/components/link'
import './code.css'

export const Page = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>About</h1>
      <p>
        Demo using <code>vite-plugin-ssr</code>.
      </p>
      <Link href="/">Home</Link>
      <Link href="/sign-up">Sign up</Link>
      <Link href="/sign-in">Sign in</Link>
      <Link href="/about">About</Link>
      <Link href="/pre-rendered">Pre Rendered</Link>
      <Link href="/star-wars-ssr/starships">starships ssr</Link>
      <Link href="/star-wars-ssr-react-query/starships">
        starships ssr react query
      </Link>
      <Link href="/trpc/users">/trpc/users</Link>
      <Link href="/trpc/dogs">/trpc/dogs</Link>
      <LogoutButton />
      <button
        type="button"
        className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Button text
      </button>
    </div>
  )
}

export const documentProps = { title: 'About 123', description: 'About' }
export const requiresAuth = false
