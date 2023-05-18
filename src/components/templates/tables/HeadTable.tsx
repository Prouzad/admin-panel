import { QuestionCircleOutlined } from '@ant-design/icons'
import { Pagination, PaginationProps, Select } from 'antd'
import { DatePicker, Input } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'

dayjs.extend(customParseFormat)

interface IRoutState {
  search?: string
  to?: string
  from?: string
}

const { Search } = Input
const { RangePicker } = DatePicker

const requestSelect = [
  {
    value: 'All',
    label: 'All',
  },

  {
    value: 'approved',
    label: 'Approved',
  },
  { value: 'moderation', label: 'Moderation' },
  { value: 'rejected', label: 'Rejected' },
]

const advCycleSelect = [
  {
    value: 'All',
    label: 'All',
  },

  {
    value: true,
    label: 'Finished',
  },
  { value: false, label: 'Unfinished' },
]

const TableWrapper = ({
  children,
  style,
  pageTitle,
  fnFilter,
  count,
}: {
  children: ReactNode
  style: string
  pageTitle?: string
  fnFilter: (arg: any) => void
  count: number
}) => {
  const router = useRouter()
  const [rout, setRout] = useState<IRoutState>({})
  const [searchLetters, setSearchletters] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [rangeDate, setRangeDate] = useState<Dayjs[]>()
  const [created_at_after, setCreated_at_after] = useState('')
  const [created_at_before, setCreated_at_before] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [page_size, setPage_size] = useState(10)
  const [countPage, setCountPage] = useState(50)

  const filterEmptyValues = (obj: any) => {
    if (obj !== undefined && obj !== null) {
      const filteredEntries = Object.entries(obj).filter(([_, value]) => {
        return value !== '' && value !== null && value !== undefined
      })
      return Object.fromEntries(filteredEntries)
    }
    return null
  }

  const getObjectQuery = (keys: string[], values: string[]) => {
    return keys.map((item, idx) => {
      return { key: item, value: values[idx] }
    })
  }

  useEffect(() => {
    setRout({})
  }, [router.pathname])

  useEffect(() => {
    setRout(router.query)
    if (typeof router.query.search === 'string') {
      setSearchValue(router.query.search)
      setSearchletters(router.query.search)
    }
    if (typeof router.query.status === 'string') {
      setStatus(router.query.status)
    }
    if (
      typeof router.query.created_at === 'string' &&
      typeof router.query.end_at === 'string'
    ) {
      setCreated_at_after(router.query.created_at)
      setCreated_at_before(router.query.end_at)
      setRangeDate([dayjs(router.query.created_at), dayjs(router.query.end_at)])
    }
    if (
      typeof router.query.page === 'string' &&
      typeof router.query.page_size === 'string'
    ) {
      setPage(+router.query.page)
      setPage_size(+router.query.page_size)
    }
    setCountPage(count)
  }, [])

  useEffect(() => {
    setCountPage(count)
  }, [count])

  useEffect(() => {
    const result: any = filterEmptyValues(rout)
    fnFilter(getObjectQuery(Object.keys(result), Object.values(result)))
    router.push({
      query: result,
    })
  }, [rout])

  useEffect(() => {
    const search = searchValue
    setRout((prev: any) => {
      return {
        ...prev,
        search,
      }
    })
    setRout((prev) => {
      return {
        ...prev,
        created_at_after,
        created_at_before,
      }
    })
    setRout((prev) => {
      return {
        ...prev,
        status,
      }
    })
    setRout((prev) => {
      return {
        ...prev,
        page,
        page_size,
      }
    })
  }, [searchValue, rangeDate, status, page, page_size])

  const searchSetQuery = (value: any) => {
    if (value.length === 0) {
      setSearchletters('')
      setSearchValue('')
      return setRout((prev: any) => {
        if (prev !== undefined && typeof prev.search === 'string') {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { search, ...rest } = prev
          return rest
        }
      })
    }
    setSearchValue(searchLetters)
  }

  const handleDateChange = (dates: any, dateStrings: [string, string]) => {
    setRangeDate(dates)
    setCreated_at_after(dateStrings[0])
    setCreated_at_before(dateStrings[1])
  }

  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (
    current,
    pageSize
  ) => {
    setPage(current)
    setPage_size(pageSize)
  }

  return (
    <div className={`pb-5 ${style}`}>
      <div className="px-5 pb-0  bg-white rounded-lg ">
        <div className="flex flex-wrap h-20 items-center">
          <div className="flex mx-6">
            <div className="flex items-center mr-2">
              <p className="text-sm"> Rule Name </p>{' '}
              <div className="flex items-center justify-center">
                <QuestionCircleOutlined className=" ml-1" />
                <p className="ml-1">:</p>
              </div>
            </div>
            <Search
              placeholder="Please enter"
              allowClear
              value={searchLetters}
              onChange={(e) => setSearchletters(e.target.value)}
              onSearch={searchSetQuery}
              style={{
                width: 232,
              }}
            />
          </div>
          {!(pageTitle === 'agency') && (
            <div className="mr-6">
              <RangePicker
                onChange={handleDateChange}
                value={rangeDate ? [rangeDate[0], rangeDate[1]] : null}
              />
            </div>
          )}
          <div className="">
            <Select
              defaultValue={'All'}
              value={status.length === 0 ? 'All' : status}
              listItemHeight={1}
              listHeight={100}
              style={{ width: 148, borderRadius: 0 }}
              onSelect={(value: string) => {
                if (value === 'All') {
                  return setStatus('')
                }
                setStatus(value)
              }}
              options={
                pageTitle === 'adv-cycle' ? advCycleSelect : requestSelect
              }
            />
          </div>
        </div>
        {children}
        <Pagination
          showSizeChanger
          className="flex justify-end py-4"
          onChange={onShowSizeChange}
          current={page}
          total={countPage}
          pageSize={page_size}
          showTotal={(total, range) =>
            `${range[0]}-${range[1]} of ${total} items`
          }
        />
      </div>
    </div>
  )
}

export default TableWrapper
