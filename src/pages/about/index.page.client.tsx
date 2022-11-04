import './code.css'

function Page() {
  return (
    <>
      <h1>About</h1>
      <p>
        Demo using <code>vite-plugin-ssr</code>.
      </p>
    </>
  )
}

export { Page }
export const documentProps = { title: 'About 123' }
