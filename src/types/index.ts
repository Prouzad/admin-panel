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
  target: {
    regions: any
    categories: any
  }
  start_at: string
  end_at?: any
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
