import { useAuth } from '@clerk/clerk-react'
import { GetToken } from '@clerk/types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client'
import React from 'react'
import superjson from 'superjson'
import { trpcReact } from '../utils/trpc'

const queryClient = new QueryClient()

const trpcClient = (getToken: GetToken) =>
  trpcReact.createClient({
    transformer: superjson,
    links: [
      httpBatchLink({
        url: '/trpc-api',
        headers: async () => {
          const token = await getToken()
          return token ? { authorization: token } : {}
        },
      }),
    ],
  })

export const TrpcProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getToken } = useAuth()
  return (
    <trpcReact.Provider client={trpcClient(getToken)} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpcReact.Provider>
  )
}
