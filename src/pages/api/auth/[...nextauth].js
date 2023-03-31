import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials
        if (username === 'Abdull' && password === '1234') {
          return { Name: 'Abdulla' }
        }
        // Return null if user data could not be retrieved
        return null
      },
    }),
  ],
}
export default NextAuth(authOptions)
