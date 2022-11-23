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
    const run = async () => {
      await createCheckoutSession()
    }
    run().catch(console.error)
  }, [])
}

export const requiresAuth = true
