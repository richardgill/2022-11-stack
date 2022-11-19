// import * as bodyParser from 'body-parser'
import express, { Express } from 'express'
import { Webhook } from 'svix'

export const configureWebhooks = (app: Express) => {
  if (!process.env.CLERK_WEBHOOK_SECRET) {
    throw new Error('CLERK_WEBHOOK_SECRET not set')
  }
  app.post(
    '/clerk-webhook-api',
    express.json({
      limit: '5mb',
      verify: (req, res, buf) => {
        // @ts-expect-error
        req.rawBody = buf.toString()
      },
    }),
    (req, res) => {
      console.log('received webhook')
      const payload = req.body
      const headers = req.headers
      console.log('payload', payload)
      console.log('headers', headers)
      console.log(
        'process.env.CLERK_WEBHOOK_SECRET',
        process.env.CLERK_WEBHOOK_SECRET ?? ''
      )
      const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET ?? '', {})
      let msg
      try {
        // @ts-expect-error
        msg = wh.verify(payload, headers)
      } catch (err) {
        console.error(err)
        res.status(400).json({})
        return
      }
      console.log(msg)
      // Do something with the message...

      res.json({})
    }
  )
  return app
}
