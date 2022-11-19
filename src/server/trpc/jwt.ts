import jwt from 'jsonwebtoken'

// https://clerk.dev/docs/request-authentication/validate-session-tokens#using-the-jwt-verification-key
const getJwtToken = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error(' JWT_SECRET not set')
  }
  const splitPem = process.env.JWT_SECRET.match(/.{1,64}/g)
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
}

export const verifyToken = (accessToken?: string) => {
  try {
    const auth = jwt.verify(accessToken ?? '', jwtToken) as ClerkAuth
    return {
      url: auth.azp,
      expiry: auth.exp,
      sessionId: auth.sid,
      userId: auth.sub,
      status: 'authenticated',
    }
  } catch (error) {
    return {
      url: null,
      expiry: null,
      sessionId: null,
      userId: null,
      status: 'unauthenticated',
    }
  }
}
