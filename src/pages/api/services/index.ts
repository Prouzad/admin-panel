import axios, { AxiosError } from 'axios'

import {
  API_ROUTE_ADVERTISEMENTS,
  API_ROUTE_ADVERTISEMENTS_DETAILS,
  API_ROUTE_AGENCY,
  API_ROUTE_LOGIN,
  API_ROUTE_REFRESH_TOKEN,
  API_ROUTE_REQUEST_APPROVE,
  API_ROUTE_REQUEST_DETAILS,
  API_ROUTE_REQUEST_REJECT,
  API_ROUTE_REQUEST_SET_OFF,
  API_ROUTE_REQUESTS,
} from './apiRoutes'

const generateQuery = (params: any) =>
  params.length
    ? `?${params.map((x: any) => `${x.key}=${x.value}`).join('&')}`
    : ''

const instance = axios.create({
  baseURL: 'https://wb.idata.uz/api',
})

export const loginUser = async (body: any) => {
  const res = await instance.post(API_ROUTE_LOGIN, body)
  return res
}

export const getRequests = async (
  token: string | undefined,
  params: any = []
) => {
  try {
    const { data } = await instance.get(
      `${API_ROUTE_REQUESTS}${generateQuery(params)}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    return data
  } catch (err) {
    return Promise.reject(err as AxiosError)
  }
}

export const getRequestsDetails = async (id: string, token?: string) => {
  try {
    const { data } = await instance.get(API_ROUTE_REQUEST_DETAILS(id), {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (err) {
    return Promise.reject(err as AxiosError)
  }
}

export const requestApprove = async (
  id: string,
  resData: any,
  token?: string
) => {
  try {
    const res = await instance.post(API_ROUTE_REQUEST_APPROVE(id), resData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res
  } catch (err) {
    return Promise.reject(err as AxiosError)
  }
}

export const requestReject = async (id: string, token?: string) => {
  try {
    const res = await instance.post(
      API_ROUTE_REQUEST_REJECT(id),
      {
        rejection_reason: 'test',
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    return res
  } catch (err) {
    return Promise.reject(err as AxiosError)
  }
}

export const getAdvCycle = async (
  token: string | undefined,
  params: any = []
) => {
  try {
    const { data } = await instance.get(
      `${API_ROUTE_ADVERTISEMENTS}${generateQuery(params)}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    return data
  } catch (err) {
    return Promise.reject(err as AxiosError)
  }
}

export const getAdvCyclesDetails = async (id: string, token?: string) => {
  try {
    const { data } = await instance.get(API_ROUTE_ADVERTISEMENTS_DETAILS(id), {
      headers: { Authorization: `Bearer ${token}` },
    })
    return data
  } catch (err) {
    return Promise.reject(err as AxiosError)
  }
}

export const setOffAdvCycle = async (id: string, body: any, token?: string) => {
  try {
    const res = await instance.post(API_ROUTE_REQUEST_SET_OFF(id), body, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res
  } catch (err) {
    return Promise.reject(err as AxiosError)
  }
}

export const getAgency = async (
  token: string | undefined,
  params: any = []
) => {
  try {
    const { data } = await instance.get(
      `${API_ROUTE_AGENCY}${generateQuery(params)}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    return data
  } catch (err) {
    return Promise.reject(err as AxiosError)
  }
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
