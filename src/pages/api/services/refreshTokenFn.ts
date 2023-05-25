import { JWT } from 'next-auth/jwt'

import { refreshUserToken } from '.'

const refreshToken = async (token: JWT) => {
  try {
    const refresh = token.refreshToken
    const res = await refreshUserToken({ refresh })

    return {
      ...token,
      ...res,
    }
  } catch (err) {
    return {
      ...token,
      error: 'refresh_token_expired',
      user: null,
    }
  }
}

export default refreshToken
