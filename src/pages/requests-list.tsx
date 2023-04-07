import Table from '@/components/templates/tables/table'
import ContentWrapper from '@/components/templates/wrapper/contentWrapper'
import { useEffect, useMemo } from 'react'
import fakeData from '@/MOCK_DATA.json'
import AdvReqFn, {
  IData,
} from '@/components/templates/tables/fnTables/advReqFn'

const TableHead = [
  {
    Header: 'ID',
    accessor: 'id',
  },
  {
    Header: 'First Name',
    accessor: 'first_name',
  },
  {
    Header: 'Last Name',
    accessor: 'last_name',
  },
  {
    Header: 'Email',
    accessor: 'email',
  },
  {
    Header: 'Status',
    accessor: 'status',
  },
  {
    Header: 'University',
    accessor: 'university',
  },
  {
    Header: '',
    accessor: 'extend',
  },
]

const status: any = {
  new: 1,
  accepted: 3,
  rejected: 3,
}

const UserRequestList = () => {
  const arr = fakeData.sort((a, b) => {
    if (status[a.status] > status[b.status]) {
      return 1
    }
    if (status[a.status] < status[b.status]) {
      return -1
    }
    return 0
  })
  const data = useMemo(() => AdvReqFn(arr), [])
  const columns = useMemo(() => TableHead, [])
  return (
    <ContentWrapper>
      <div className="pl-[304px] py-[120px] w-[calc(100%-10px)] h-[calc(100vh-146px)] bg-background">
        <div className="h-[calc(100vh-146px)] p-5 overflow-x-auto bg-white rounded-lg">
          <Table columns={columns} data={data} />
        </div>
      </div>
    </ContentWrapper>
  )
}

export default UserRequestList
