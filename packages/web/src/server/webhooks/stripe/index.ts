import express, { type Express } from 'express'
import type Stripe from 'stripe'
import { stripe } from '~/server/utils/stripe'
import { handleWebhooks } from './handleWebhooks'

export const configureStripeWebhooks = (app: Express) => {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (webhookSecret) {
    app.post(
      '/api/stripe-webhook',
      express.raw({ type: 'application/json' }),
      async (req, res) => {
        const signature = String(req.headers['stripe-signature'])
        console.log('signature', signature)
        console.log('signature', req.headers['stripe-signature'])
        let event: Stripe.Event

        try {
          event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            webhookSecret
          )
        } catch (err) {
          console.log(`❌ Error message: ${err.message}`)
          res.status(400).send(`Webhook Error: ${err.message}`)
          return
        }
        await handleWebhooks(event)
        res.json({})
      }
    )
  }
  return app
}
