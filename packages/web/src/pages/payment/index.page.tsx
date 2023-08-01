import { useEffect } from 'react'
import { trpcReact } from '~/utils/trpc'
export const Page = () => {
  const { mutate: createCheckoutSession } =
    trpcReact.payments.createCheckoutSession.useMutation({
      onSuccess: async (checkoutUrl) => {
        console.log('checkoutUrl', checkoutUrl)
        if (checkoutUrl) {
          window.location.href = checkoutUrl
        }
      },
    })
  useEffect(() => {
    createCheckoutSession()
  }, [])
}

export const requiresAuth = true
export const documentProps = { title: 'Payment' }
