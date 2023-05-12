import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

import { loginUser } from '../services'

export const authOptions: NextAuthOptions = {
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
    async jwt({ token, user }) {
      return {
        ...token,
        ...user,
      }
    },

    async session({ session, token }) {
      session.user = token
      return session
    },
  },
}
export default NextAuth(authOptions)
