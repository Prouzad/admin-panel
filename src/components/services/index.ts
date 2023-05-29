import { AxiosError } from 'axios'

import { IForm } from '@/pages/agencies'
import { IContractUpdateBody } from '@/types'

import {
  API_ROUTE_ADVERTISEMENTS,
  API_ROUTE_ADVERTISEMENTS_DETAILS,
  API_ROUTE_AGENCY,
  API_ROUTE_AGENCY_DETAILS,
  API_ROUTE_AGENTS,
  API_ROUTE_CONTRACTS,
  API_ROUTE_CONTRACTS_LIST,
  API_ROUTE_CREATE_AGENCY,
  API_ROUTE_CREATE_AGENT,
  API_ROUTE_CREATE_CONTRACT,
  API_ROUTE_DISABLE_AGENCY,
  API_ROUTE_ENABLE_AGENCY,
  API_ROUTE_LOGIN,
  API_ROUTE_REQUEST_APPROVE,
  API_ROUTE_REQUEST_DETAILS,
  API_ROUTE_REQUEST_REJECT,
  API_ROUTE_REQUEST_SET_OFF,
  API_ROUTE_REQUESTS,
  API_ROUTE_UPDATE_AGENT_INFO,
  API_ROUTE_UPDATE_CONTRACT_INFO,
} from './apiRoutes'
import instance from './Axios'

const generateQuery = (params: any) =>
  params.length
    ? `?${params.map((x: any) => `${x.key}=${x.value}`).join('&')}`
    : ''

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

export const createAgency = async (body: any, token?: string) => {
  try {
    const res = await instance.post(API_ROUTE_CREATE_AGENCY, body, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res
  } catch (err) {
    return Promise.reject(err as AxiosError)
  }
}

export const getAgencyDetails = async (id: string, token?: string) => {
  try {
    const res = await instance.get(API_ROUTE_AGENCY_DETAILS(id), {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res
  } catch (err) {
    return Promise.reject(err as AxiosError)
  }
}

export const updateAgencyInfo = async (
  id: string,
  body: Partial<IForm>,
  token?: string
) => {
  try {
    const res = await instance.patch(API_ROUTE_AGENCY_DETAILS(id), body, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res
  } catch (err) {
    return Promise.reject(err as AxiosError)
  }
}

export const getAgents = async (id: string, token?: string) => {
  try {
    const res = await instance.get(API_ROUTE_AGENTS(id), {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res
  } catch (err) {
    return Promise.reject(err as AxiosError)
  }
}

export const enableAgency = async (id: string, token?: string) => {
  try {
    const res = await instance.post(API_ROUTE_ENABLE_AGENCY(id), undefined, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res
  } catch (err) {
    return Promise.reject(err as AxiosError)
  }
}

export const disableAgency = async (id: string, token?: string) => {
  try {
    const res = await instance.post(API_ROUTE_DISABLE_AGENCY(id), undefined, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res
  } catch (err) {
    return Promise.reject(err as AxiosError)
  }
}

export const updateAgentInfo = async (
  id: string,
  body: Partial<IForm>,
  token?: string
) => {
  try {
    const res = await instance.patch(API_ROUTE_UPDATE_AGENT_INFO(id), body, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res
  } catch (err) {
    return Promise.reject(err as AxiosError)
  }
}

export const createAgent = async (body: Partial<IForm>, token?: string) => {
  try {
    const res = await instance.post(API_ROUTE_CREATE_AGENT, body, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res
  } catch (err) {
    return Promise.reject(err as AxiosError)
  }
}

export const deleteAgent = async (id: string, token?: string) => {
  try {
    const res = await instance.delete(API_ROUTE_UPDATE_AGENT_INFO(id), {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res
  } catch (err) {
    return Promise.reject(err as AxiosError)
  }
}

export const getContracts = async (id: string, token?: string) => {
  try {
    const res = await instance.get(API_ROUTE_CONTRACTS(id), {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res
  } catch (err) {
    return Promise.reject(err as AxiosError)
  }
}

export const createContract = async (body: Partial<IForm>, token?: string) => {
  try {
    const res = await instance.post(API_ROUTE_CREATE_CONTRACT, body, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res
  } catch (err) {
    return Promise.reject(err as AxiosError)
  }
}

export const updateContractInfo = async (
  id: string,
  body: IContractUpdateBody,
  token?: string
) => {
  try {
    const res = await instance.patch(API_ROUTE_UPDATE_CONTRACT_INFO(id), body, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res
  } catch (err) {
    return Promise.reject(err as AxiosError)
  }
}

export const deleteContract = async (id: string, token?: string) => {
  try {
    const res = await instance.delete(API_ROUTE_UPDATE_CONTRACT_INFO(id), {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res
  } catch (err) {
    return Promise.reject(err as AxiosError)
  }
}

export const getContractsList = async (
  token: string | undefined,
  params: any = []
) => {
  try {
    const { data } = await instance.get(
      `${API_ROUTE_CONTRACTS_LIST}${generateQuery(params)}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    return data
  } catch (err) {
    return Promise.reject(err as AxiosError)
  }
}
