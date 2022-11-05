// @filename: server.ts
import { inferAsyncReturnType, initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import { Express } from 'express'
import { z } from 'zod'

// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}) // no context

type Context = inferAsyncReturnType<typeof createContext>

const t = initTRPC.context<Context>().create()

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
const appRouter = t.router({
  userById: t.procedure
    .input((val: unknown) => {
      if (typeof val === 'string') return val
      throw new Error(`Invalid input: ${typeof val}`)
    })
    .query((req) => {
      const input = req.input
      const user = userList.find((it) => it.id === input)
      return user
    }),
  userList: t.procedure.query(() => {
    return userList
  }),
  userCreate: t.procedure
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
