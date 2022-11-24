# Setup

- Use `fnm` to manage node versions
- Install `pnpm` as package manager
- Run `fnm use && pnpm install` to get setup
- Then run one of:
  - `pnpm exec nx run webserver:dev`
  - `pnpm exec nx run desktop:dev`

# Stack

Inspiration from: [create-t3-app](https://github.com/t3-oss/create-t3-app)

- Vite
- vite-plugin-ssr (next.js features) https://vite-plugin-ssr.com/
- Tailwindcss (with tailwind-ui)
- TRPC (a bit like graphql-like)
  - Superjson to serialize things
- Prisma, typescript bindings to talk to postgres
- Database - Supabase (or any postgres db)
- Clerk.dev for auth (sign up and sign in)
- Posthog / Mixpanel analytics (routed via a backend proxy)
- Posthog screen recording user tracking

### Notes:

- Production server side code run by ts-node, this is apparently ok in production
- To test Clerk webhooks: `brew install svix && svix listen http://localhost:3000/api/clerk-webhook`
- To test Stripe webhooks: `brew install stripe-cli && stripe listen --forward-to localhost:3000/api/stripe-webhook`
