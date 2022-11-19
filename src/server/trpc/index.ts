import { PrismaClient } from '@prisma/client'
import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import { Express } from 'express'
import superjson from 'superjson'
import { z } from 'zod'
import { verifyToken } from './jwt'
const prisma = new PrismaClient()

// created for each request
const createContext = async ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => {
  const getUserFromHeader = async () => {
    if (req.headers.authorization) {
      const accessToken = req.headers.authorization
      return verifyToken(accessToken)
    }
    return null
  }
  const auth = await getUserFromHeader()
  return {
    auth,
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
      auth: ctx.auth,
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
      const userId = ctx.auth.userId
      console.log('userId', userId)
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
})

export const configureTrpc = (app: Express) => {
  app.use(
    '/trpc-api/',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  )
  return app
}

// only export *type signature* of router!
// to avoid accidentally importing your API
// into client-side code
export type AppRouter = typeof appRouter
