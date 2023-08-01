import { clerkClient } from '@clerk/clerk-sdk-node'
import { initTRPC, TRPCError, type inferAsyncReturnType } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import { type Express } from 'express'
import superjson from 'superjson'
import { z } from 'zod'
import { prisma } from '~/server/utils/prisma'
import { stripe } from '~/server/utils/stripe'
import { baseUrl } from '~/utils/environmentVariables'
import { verifyToken, type Auth } from './jwt'
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

const isAdmin = t.middleware(({ next, ctx }) => {
  if (!ctx.auth?.isAdmin) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx: {
      auth: ctx.auth as Auth,
    },
  })
})

const isPaidUser = t.middleware(async ({ next, ctx }) => {
  const subscription = await prisma.subscription.findFirst({
    where: { userId: ctx.auth.userId ?? undefined },
  })
  if (!subscription?.isActive) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }
  return next({
    ctx,
  })
})
export const authedProcedure = t.procedure.use(isAuthed)
export const adminProcedure = t.procedure.use(isAuthed).use(isAdmin)
export const paidProcedure = authedProcedure.use(isPaidUser)

const appRouter = t.router({
  waitlist: t.router({
    join: t.procedure.input(z.string().email()).mutation(async (request) => {
      const email = request.input
      await prisma.waitlist.create({ data: { email } })
    }),
  }),
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
    getAll: paidProcedure.query(async ({ ctx }) => {
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
  admin: t.router({
    getAdminStuff: adminProcedure.query(async () => {
      return { adminStuff: 'yes!' }
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
