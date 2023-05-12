import axios, { AxiosError } from 'axios'
import { getSession } from 'next-auth/react'

const instance = axios.create({
  baseURL: 'http://185.74.6.18:8181/api',
})

export const loginUser = async (body: any) => {
  const res = await instance.post('/account/login/', body)
  return res
}

export const getRequests = async () => {
  const session = await getSession()

  try {
    const { data } = await instance.get('/administration/advertisement', {
      headers: { Authorization: `Bearer ${session?.user.tokens?.access}` },
    })
    return data
  } catch (err) {
    return Promise.reject(err as AxiosError)
  }
}

export const getRequestsDetails = async (id: string) => {
  const session = await getSession()

  try {
    const { data } = await instance.get(
      `/administration/advertisement/${id}/`,
      {
        headers: { Authorization: `Bearer ${session?.user.tokens?.access}` },
      }
    )
    return data
  } catch (err) {
    return Promise.reject(err as AxiosError)
  }
}

export const requestApprove = async (id: string) => {
  const session = await getSession()

  try {
    const { data } = await instance.get(
      `/administration/advertisement/${id}/approve`,
      {
        headers: { Authorization: `Bearer ${session?.user.tokens?.access}` },
      }
    )
    return data
  } catch (err) {
    return Promise.reject(err as AxiosError)
  }
}

export const getAdvCycle = async () => {
  const session = await getSession()

  try {
    const { data } = await instance.get('/administration/advertisement_cycle', {
      headers: { Authorization: `Bearer ${session?.user.tokens?.access}` },
    })
    return data
  } catch (err) {
    return Promise.reject(err as AxiosError)
  }
}
