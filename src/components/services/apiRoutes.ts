export const API_ROUTE_REQUEST_DETAILS = (id: string | number) =>
  `/administration/advertisement/${id}/`

export const API_ROUTE_REQUEST_APPROVE = (id: string | number) =>
  `/administration/advertisement/${id}/approve/`

export const API_ROUTE_REQUEST_REJECT = (id: string | number) =>
  `/administration/advertisement/${id}/reject/`

export const API_ROUTE_ADVERTISEMENTS_DETAILS = (id: string | number) =>
  `/administration/advertisement_cycle/${id}/`

export const API_ROUTE_REQUEST_SET_OFF = (id: string | number) =>
  `/administration/advertisement_cycle/${id}/set_off/`

export const API_ROUTE_AGENCY_DETAILS = (id: string | number) =>
  `/administration/agency/${id}/`

export const API_ROUTE_UPDATE_AGENT_INFO = (id: string | number) =>
  `/administration/agent/${id}/`

export const API_ROUTE_AGENTS = (id: string | number) =>
  `/administration/agency/${id}/agent/`

export const API_ROUTE_CONTRACTS = (id: string | number) =>
  `/administration/agency/${id}/contract/`

export const API_ROUTE_UPDATE_CONTRACT_INFO = (id: string | number) =>
  `/administration/contract/${id}/`

export const API_ROUTE_ENABLE_AGENCY = (id: string | number) =>
  `/administration/agency/${id}/enable/`

export const API_ROUTE_DISABLE_AGENCY = (id: string | number) =>
  `/administration/agency/${id}/disable/`

export const API_ROUTE_CREATE_AGENCY = `/administration/agency/`

export const API_ROUTE_CREATE_AGENT = `/administration/agent/`

export const API_ROUTE_CREATE_CONTRACT = `/administration/contract/`

export const API_ROUTE_LOGIN = '/account/login/'

export const API_ROUTE_REQUESTS = '/administration/advertisement'

export const API_ROUTE_ADVERTISEMENTS = '/administration/advertisement_cycle'

export const API_ROUTE_AGENCY = '/administration/agency/'

export const API_ROUTE_CONTRACTS_LIST = '/administration/contract/'

export const API_ROUTE_REFRESH_TOKEN = 'account/token/refresh/'
