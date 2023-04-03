import Table from '@/components/templates/tables/table'
import ContentWrapper from '@/components/templates/wrapper/contentWrapper'
import { useEffect, useMemo } from 'react'
import fakeData from '@/MOCK_DATA.json'

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
    Header: 'Gender',
    accessor: 'gender',
  },
  {
    Header: 'University',
    accessor: 'university',
  },
]

const UserRequestList = () => {
  const data = useMemo(() => fakeData, [])
  const columns = useMemo(() => TableHead, [])
  useEffect(() => {}, [])
  return (
    <ContentWrapper>
      <div className="pl-[304px] py-[120px] w-[calc(100%-10px)] min-h-screen bg-background">
        <div className="h-screen p-5 overflow-x-auto bg-white rounded-lg">
          <Table columns={columns} data={data} />
        </div>
      </div>
    </ContentWrapper>
  )
}

export default UserRequestList
