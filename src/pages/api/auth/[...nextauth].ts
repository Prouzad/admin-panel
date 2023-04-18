import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},
      authorize(credentials) {
        const { username, password } = credentials as {
          username: string
          password: string
        }
        if (username !== 'prouzad' || password !== '1234') {
          return null
        }
        return { id: '1', name: 'Abdulla' }
      },
    }),
  ],
}
export default NextAuth(authOptions)
