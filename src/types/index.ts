import { ReactNode } from 'react'

export interface ITarget {
  display_name: string
  id: number
  region_name: string
}

export interface ISurvey {
  id: number
  questions: ISurveyQuestions[]
  title: string
}

export interface ISurveyQuestions {
  id: number
  options: {
    id: number
    title: string
  }
  title: string
  is_multiple: boolean
}

export interface IAdvCycleRes {
  id: number
  agency: string
  content: string
  format: string
  show: number
  view_count: number
  is_finished: boolean
  is_default: boolean
  is_infinite: boolean
  created_at: string
  phone_number: string
  total_price: number
  is_targeted: boolean
  media_type: string
  site: ITarget[]
  target: {
    regions: any
    categories: any
  }
  start_at: string
  end_at?: any
  survey: ISurvey
}

export interface IColumnADV {
  id: string
  name: string
  content: string
  ads_format: string
  duration: string
  view_count: string
  is_finished: string
  upload_time: string
}

export interface IContractUpdateBody {
  contract_number: string
  contract_file?: string
  contract_date?: string
}

export interface IResult {
  count: number
  moderation_count: number
  next: string | null
  previous: string | null
  results: {
    agency: string
    created_at: string
    format: string
    id: number
    initial_show: number
    media_type: string | null
    phone_number: string
    status: string
  }[]
}

export interface ICard {
  Icon?: any
  title: string
  link: string
}

export interface IModal {
  children: ReactNode
  setIsOpen: any
  isOpen: boolean
  title: string
}

export interface Item {
  id: string
  name: string
  age: number
  address: string
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  inputType: 'number' | 'text'
  record: Item
  index: number
  children: React.ReactNode
}

export interface IBreadCumb {
  title: string
  pageRoute: {
    link: string
    title: string
  }[]
}

export interface IFile {
  name: string
  uid: string
  percent?: number
  status?: string
}

export interface IitemEdit {
  id: string
  name: string
  age: number
  address: string
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  inputType: 'number' | 'text'
  record: IitemEdit
  index: number
  children: React.ReactNode
}

export interface IRoutState {
  search?: string
  to?: string
  from?: string
}

export interface IColumnAgency {
  id: string
  agency_name: string
  adress: string
  agent_number: string
  contract_count: string
  is_active: boolean
  action: string
}

export interface IForm {
  name: string
  phone_number: string
  address: string
  logo?: any
  agent_phone_number: string
  agent_role?: string
  contract_number: string
  contract_file: any
  contract_date: string
  contract_finished_date: string
}

export interface DataType {
  id: string
  company_name: string
  phone_number: string
  status: string
  upload_time: any
  type_of_ads: string[]
}
