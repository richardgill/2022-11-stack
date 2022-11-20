export const Page = () => {
  return (
    <>
      <h1>Welcome</h1>
      This page is prerendered
      <ul>
        <li>Rendered to HTML.</li>
      </ul>
    </>
  )
}

export const documentProps = { title: 'Pre rendered' }
export const requiresAuth = false
export const doNotPrerender = false
