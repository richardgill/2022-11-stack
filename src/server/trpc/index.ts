import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import { Express } from 'express'
import superjson from 'superjson'
import { z } from 'zod'
import { stripe } from '~/server/utils/stripe'
import { Auth, verifyToken } from './jwt'
import { prisma } from '~/server/utils/prisma'
import { clerkClient } from '@clerk/clerk-sdk-node'
import { baseUrl } from '~/utils/environmentVariables'
// created for each request
const createContext = ({ req }: trpcExpress.CreateExpressContextOptions) => {
  return {
    auth: verifyToken(req.headers.authorization),
  }
}

type Context = inferAsyncReturnType<typeof createContext>

const t = initTRPC.context<Context>().create({ transformer: superjson })

export interface User {
  id: string
  name: string
}

const userList: User[] = [
  {
    id: '1',
    name: 'KATT',
  },
]

const isAuthed = t.middleware(({ next, ctx }) => {
  if (ctx.auth?.status !== 'authenticated') {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      auth: ctx.auth as Auth,
    },
  })
})
export const authedProcedure = t.procedure.use(isAuthed)
const appRouter = t.router({
  users: t.router({
    getById: t.procedure.input(z.string()).query((req) => {
      const input = req.input
      const user = userList.find((it) => it.id === input)
      return user
    }),
    getAll: t.procedure.query(() => {
      return userList
    }),
    create: t.procedure
      .input(z.object({ name: z.string() }))
      .mutation((req) => {
        const id = `${Math.random()}`
        const user: User = {
          id,
          name: req.input.name,
        }
        userList.push(user)
        return user
      }),
  }),
  dogs: t.router({
    getAll: authedProcedure.query(async ({ ctx }) => {
      const dogs = await prisma.dogs.findMany()
      return dogs.map((dog) => ({
        id: dog.id,
        name: dog.name,
        createdAt: dog.created_at,
      }))
    }),
    create: authedProcedure
      .input(z.object({ name: z.string() }))
      .mutation(async (request) => {
        const newDog = request.input
        const dog = await prisma.dogs.create({ data: newDog })
        return dog
      }),
  }),
  payments: t.router({
    createCheckoutSession: authedProcedure.mutation(async ({ ctx }) => {
      const userId = ctx.auth.userId
      const user = await clerkClient.users.getUser(userId)

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: process.env.STRIPE_PRICE_ID,
            quantity: 1,
          },
        ],
        customer_email: user.emailAddresses[0].emailAddress ?? undefined,
        subscription_data: {
          metadata: { userId: user.id },
        },
        mode: 'subscription',
        success_url: baseUrl,
        cancel_url: baseUrl,
      })
      return session.url
    }),
  }),
})

export const configureTrpc = (app: Express) => {
  app.use(
    '/api/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
      onError: ({ error, type, path, input, ctx, req }) => {
        console.error('TRPC Error:', error)
      },
    })
  )
  return app
}

// only export *type signature* of router!
// to avoid accidentally importing your API
// into client-side code
export type AppRouter = typeof appRouter
