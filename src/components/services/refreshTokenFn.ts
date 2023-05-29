import { AxiosError } from 'axios'
import jwt_decode from 'jwt-decode'
import { JWT } from 'next-auth/jwt'

import { API_ROUTE_REFRESH_TOKEN } from './apiRoutes'
import instance from './Axios'

interface Response {
  access: string
}

export const refreshUserToken = async (body: { refresh: string }) => {
  try {
    const { data } = await instance.post<Response>(
      API_ROUTE_REFRESH_TOKEN,
      body
    )

    return data
  } catch (err) {
    return Promise.reject(err as AxiosError)
  }
}

const refreshToken = async (token: JWT) => {
  try {
    const refresh = token.refreshToken
    const res = (await refreshUserToken({ refresh })) as any
    const { exp } = jwt_decode(res.access) as any

    return {
      ...token,
      accessToken: res.access,
      accessTokenExp: exp,
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
