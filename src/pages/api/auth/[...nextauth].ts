import jwt_decode from 'jwt-decode'
import { NextAuthOptions } from 'next-auth'
import { Session } from 'next-auth/core/types'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

import { loginUser } from '../../../components/services'
import refreshToken from '../../../components/services/refreshTokenFn'

export const authOptions: NextAuthOptions = {
  secret: process.env.JWT_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string
          password: string
        }

        const res = await loginUser({
          email: email,
          password: password,
        })

        if (res.status !== 200) {
          return null
        }
        return await res.data
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        const { exp } = jwt_decode(user.tokens.access) as any
        const { tokens: _token, ...otherUserData } = user
        return {
          ..._token,
          accessToken: _token.access,
          accessTokenExp: exp,
          refreshToken: _token.refresh,
          email: otherUserData.email,
          role: otherUserData.role,
        }
      }

      if (Date.now() < token.accessTokenExp * 1000) {
        return token
      }

      return await refreshToken(token)
    },

    async session({ session, token }) {
      const session2 = session as Session
      if (session2 && token) {
        session2.user.accessToken = token.accessToken
        session2.user.email = token.email
        session2.user.role = token.role
        session2.user.accessTokenExp = token.accessTokenExp
        session2.user.refreshToken = token.refreshToken
        session2.user.error = token.error
      }
      return session2
    },
  },
  debug: process.env.NODE_ENV === 'development',
}
export default NextAuth(authOptions)
