import React from 'react'
import { ClerkAuth } from '~/components/auth/clerkAuth'
import { TrpcProvider } from '~/components/trpcProvider'
import type { PageContext } from '~/renderer/types'
import { PageContextProvider } from '~/renderer/usePageContext'
import './style.css'
import 'focus-visible'

export const RootShell: React.FC<{
  children: React.ReactNode
  pageContext: PageContext
}> = ({ children, pageContext }) => {
  return (
    <React.StrictMode>
      <ClerkAuth pageContext={pageContext}>
        <TrpcProvider>
          <PageContextProvider pageContext={pageContext}>
            {children}
          </PageContextProvider>
        </TrpcProvider>
      </ClerkAuth>
    </React.StrictMode>
  )
}
