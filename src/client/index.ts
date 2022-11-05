import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'
import type { AppRouter } from '~/server/trpc'

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
})
