import { useClerk } from '@clerk/clerk-react'

export const LogoutButton = () => {
  const { signOut } = useClerk()
  return <button onClick={() => signOut()}>Logout</button>
}
