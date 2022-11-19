import './code.css'

export const Page = () => {
  return (
    <>
      <h1>About</h1>
      <p>
        Demo using <code>vite-plugin-ssr</code>.
      </p>
    </>
  )
}

export const documentProps = { title: 'About 123', description: 'About' }
export const requiresAuth = false
