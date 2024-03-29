import jwt from 'jsonwebtoken'

// https://clerk.dev/docs/request-authentication/validate-session-tokens#using-the-jwt-verification-key
const getJwtToken = () => {
  if (!process.env.CLERK_JWT_KEY) {
    throw new Error('CLERK_JWT_KEY not set')
  }
  const splitPem = process.env.CLERK_JWT_KEY.match(/.{1,64}/g)
  if (!splitPem) {
    throw new Error('splitPem was null')
  }
  return (
    '-----BEGIN PUBLIC KEY-----\n' +
    splitPem.join('\n') +
    '\n-----END PUBLIC KEY-----'
  )
}

const jwtToken = getJwtToken()
interface ClerkAuth {
  azp: string // url
  exp: number
  iat: number
  iss: string
  nbf: number
  sid: string
  sub: string
  org_id?: string
  org_role?: 'admin' | 'member'
  org_slug: string | null
  // custom
  isAdmin?: boolean
}

export interface Auth {
  url: string
  expiry: number
  sessionId: string
  userId: string
  orgId?: string
  orgRole?: 'admin' | 'member'
  orgSlug: string | null
  status: 'authenticated'
  isAdmin: boolean
}

export const verifyToken = (accessToken?: string) => {
  try {
    const auth = jwt.verify(accessToken ?? '', jwtToken) as ClerkAuth
    return {
      url: auth.azp,
      expiry: auth.exp,
      sessionId: auth.sid,
      userId: auth.sub,
      orgId: auth.org_id,
      orgRole: auth.org_role,
      orgSlug: auth.org_slug,
      isAdmin: Boolean(auth.isAdmin),
      status: 'authenticated',
    }
  } catch (error) {
    return {
      url: null,
      expiry: null,
      sessionId: null,
      userId: null,
      orgId: null,
      orgRole: null,
      orgSlug: null,
      isAdmin: null,
      status: 'unauthenticated',
    }
  }
}
