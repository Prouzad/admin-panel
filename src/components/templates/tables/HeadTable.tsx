import { QuestionCircleOutlined } from '@ant-design/icons'
import { Select } from 'antd'
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

const TableWrapper = ({
  children,
  style,
  page,
}: {
  children: ReactNode
  style: string
  page?: string
}) => {
  const router = useRouter()
  const [rout, setRout] = useState<IRoutState>({})
  const [searchLetters, setSearchletters] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [rangeDate, setRangeDate] = useState<Dayjs[]>()
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  useEffect(() => {
    setRout({})
  }, [router.pathname])

  useEffect(() => {
    setRout(router.query)
    if (typeof router.query.search === 'string') {
      setSearchValue(router.query.search)
      setSearchletters(router.query.search)
    }
    if (
      typeof router.query.start === 'string' &&
      typeof router.query.end === 'string'
    ) {
      setStart(router.query.start)
      setEnd(router.query.end)
      setRangeDate([dayjs(router.query.start), dayjs(router.query.end)])
    }
  }, [])
  useEffect(() => {
    setRout((prev) => {
      return {
        ...prev,
        start,
        end,
      }
    })
  }, [rangeDate])
  useEffect(() => {
    const filterEmptyValues = (obj: any) => {
      if (obj !== undefined && obj !== null) {
        const filteredEntries = Object.entries(obj).filter(([_, value]) => {
          return value !== '' && value !== null && value !== undefined
        })
        return Object.fromEntries(filteredEntries)
      }
      return null
    }

    const result: any = filterEmptyValues(rout)

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
  }, [searchValue])

  const searchSetQuery = (value: any) => {
    if (value.length === 0) {
      setSearchletters('')
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
    setStart(dateStrings[0])
    setEnd(dateStrings[1])
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
          {!(page === 'agency') && (
            <div className="mr-6">
              <RangePicker
                onChange={handleDateChange}
                value={rangeDate ? [rangeDate[0], rangeDate[1]] : null}
              />
            </div>
          )}
          <div className="">
            <Select
              defaultValue="All"
              listItemHeight={1}
              listHeight={100}
              style={{ width: 148, borderRadius: 0 }}
              // onChange={handleChange}
              // onSelect={handleSelect}
              options={[
                {
                  value: 'All',
                  label: 'All',
                },

                {
                  value: 'approved',
                  label: 'Approved',
                },
                { value: 'To_moderation', label: 'To Moderation' },
                { value: 'rejected', label: 'Rejected' },
              ]}
            />
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

export default TableWrapper
