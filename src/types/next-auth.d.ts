// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth'

declare module 'react-datepocker'
declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      accessToken: string
      accessTokenExp: number
      refreshToken: string
      email: string
      role: string | null
      tokens?: {
        access?: string
        refresh?: string
      }
      error?: string
    }
  }
  interface User {
    email: string
    role: string
    tokens: {
      access: string
      refresh: string
    }
    error?: string
  }
}

declare module 'next-auth/jwt' {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    accessToken: string
    accessTokenExp: number
    refreshToken: string
    email: string
    role: string | null
    error?: string
  }
}
