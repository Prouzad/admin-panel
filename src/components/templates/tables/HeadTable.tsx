import { QuestionCircleOutlined } from '@ant-design/icons'
import { Select } from 'antd'
import { DatePicker, Input } from 'antd'
// import dayjs, { Dayjs } from 'dayjs'
// import customParseFormat from 'dayjs/plugin/customParseFormat'
// import { useRouter } from 'next/router'
import { ReactNode } from 'react'

// dayjs.extend(customParseFormat)s

// interface IRoutState {
//   search?: string
//   to?: string
//   from?: string
// }

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
  // const router = useRouter()
  // const [rout, setRout] = useState<IRoutState>({})
  // const [searchValue, setSearchValue] = useState('')
  // const [toDate, setToDate] = useState<Dayjs>()
  // const [fromDate, setFromDate] = useState<Dayjs>()

  // useEffect(() => {
  //   setRout({})
  // }, [router.pathname])

  // useEffect(() => {
  //   setRout(router.query)
  //   if (typeof router.query.search === 'string') {
  //     setSearchValue(router.query.search)
  //   }
  //   if (
  //     typeof router.query.to === 'string' &&
  //     typeof router.query.from === 'string'
  //   ) {
  //     // eslint-disable-next-line no-console
  //     console.log(rout)
  //     setToDate(dayjs(router.query.to))
  //     setFromDate(dayjs(router.query.from))
  //   }
  // }, [])

  // useEffect(() => {
  //   const Nrout = rout as any
  //   router.push({
  //     query: Nrout,
  //   })
  // }, [rout])
  // const searchSetQuery = () => {
  //   const search = searchValue
  //   if (search.length === 0) {
  //     return setRout((prev: any) => {
  //       if (typeof prev.search === 'string') {
  //         // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //         const { search, ...rest } = prev
  //         return rest
  //       }
  //     })
  //   }
  //   setRout((prev: any) => {
  //     return {
  //       ...prev,
  //       search,
  //     }
  //   })
  // }
  // const TimeSetQuery = (time: any, timeString: [string, string]) => {
  //   if (time === null) {
  //     return setRout((prev) => {
  //       // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //       const { from, to, ...rest } = prev
  //       return rest
  //     })
  //   }
  //   setToDate(dayjs(timeString[0]))
  //   setFromDate(dayjs(timeString[1]))

  //   const from = fromDate
  //   const to = toDate

  //   setRout((prev: any) => {
  //     return {
  //       ...prev,
  //       from,
  //       to,
  //     }
  //   })
  // }
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
              // value={searchValue}
              // onChange={(e) => setSearchValue(e.target.value)}
              // onPressEnter={searchSetQuery}
              style={{
                width: 232,
              }}
            />
          </div>
          {!(page === 'agency') && (
            <div className="mr-6">
              <RangePicker
              // onChange={TimeSetQuery}
              // defaultValue={[dayjs(fromDate), dayjs(toDate)]}
              />
            </div>
          )}
          <div className="">
            <Select
              defaultValue="status filter"
              listItemHeight={1}
              listHeight={100}
              style={{ width: 148, borderRadius: 0 }}
              // onChange={handleChange}
              // onSelect={handleSelect}
              options={[
                {
                  value: 'status filter',
                  label: 'Status filter',
                  disabled: true,
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
