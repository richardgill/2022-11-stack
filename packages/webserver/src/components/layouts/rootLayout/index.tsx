import React from 'react'
import { ClerkAuth } from '~/components/auth/clerkAuth'
import { TrpcProvider } from '~/components/trpcProvider'
import type { PageContext } from '~/renderer/types'
import { PageContextProvider } from '~/renderer/usePageContext'
import './style.css'
import 'focus-visible'
import { Analytics } from '~/components/analytics'

export const RootShell: React.FC<{
  children: React.ReactNode
  pageContext: PageContext
}> = ({ children, pageContext }) => {
  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        <ClerkAuth pageContext={pageContext}>
          <TrpcProvider>
            {children}
            <Analytics />
          </TrpcProvider>
        </ClerkAuth>
      </PageContextProvider>
    </React.StrictMode>
  )
}
