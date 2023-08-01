import type Stripe from 'stripe'
import { prisma } from '~/server/utils/prisma'

const subscriptionToDb = (subscription: Stripe.Subscription) => {
  const userId = subscription.metadata.userId
  if (!userId.startsWith('user_')) {
    throw new Error(`userId: ${userId} is invalid`)
  }
  const customerId = subscription.customer
  if (typeof customerId !== 'string') {
    throw new Error()
  }
  return {
    id: subscription.id,
    createdAt: new Date(subscription.created * 1000),
    isActive: ['active', 'trialing'].includes(subscription.status),
    userId,
    customerId,
  }
}

export const handleWebhooks = async (event: Stripe.Event) => {
  console.log('handleWebhooks', event)
  if (
    [
      'customer.subscription.deleted',
      'customer.subscription.updated',
      'customer.subscription.created',
    ].includes(event.type)
  ) {
    const subscription = event.data.object as Stripe.Subscription
    const subscriptionDb = subscriptionToDb(subscription)
    await prisma.subscription.upsert({
      where: {
        id: subscription.id,
      },
      create: subscriptionDb,
      update: subscriptionDb,
    })
  }
}
