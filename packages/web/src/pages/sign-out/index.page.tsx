import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { navigate } from 'vite-plugin-ssr/client/router'

export const Page = () => {
  const { signOut } = useAuth()
  useEffect(() => {
    ;(async () => {
      await signOut()
      await navigate('/')
    })().catch(console.error)
  }, [])
  return <div>Logging out</div>
}
