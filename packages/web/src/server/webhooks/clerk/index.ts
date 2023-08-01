import express, { type Express } from 'express'
import { Webhook } from 'svix'
import { handleWebhooks } from './handleWebhooks'

export const configureClerkWebhooks = (app: Express) => {
  if (!process.env.CLERK_WEBHOOK_SECRET) {
    throw new Error('CLERK_WEBHOOK_SECRET not set')
  }
  const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET ?? '')

  app.post(
    '/api/clerk-webhook',
    express.raw({ type: 'application/json' }),
    async (req, res) => {
      console.log('received Clerk webhook')
      const payload = req.body.toString()
      const headers = {
        'svix-id': String(req.headers['svix-id']),
        'svix-signature': String(req.headers['svix-signature']),
        'svix-timestamp': String(req.headers['svix-timestamp']),
      }
      console.log('payload', payload)
      console.log('headers', headers)
      console.log(
        'process.env.CLERK_WEBHOOK_SECRET',
        process.env.CLERK_WEBHOOK_SECRET ?? ''
      )
      let msg
      try {
        msg = webhook.verify(payload, headers)
      } catch (err) {
        console.error(err)
        res.status(400).json({})
        return
      }
      console.log(msg)
      await handleWebhooks(msg)
      // Do something with the message...

      res.json({})
    }
  )
  return app
}
