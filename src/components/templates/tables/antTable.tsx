import fakeData, { DataType } from '@/MOCK_DATA'
import { Badge, Skeleton } from 'antd'
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useMemo } from 'react'

const checkColor = (status: string) => {
  switch (status) {
    case 'Approved':
      return 'success'
    case 'Online':
      return 'success'
    case 'Rejected':
      return 'error'
    default:
      return 'default'
  }
}

const columnsHead: ColumnsType<DataType> = [
  {
    title: '№',
    dataIndex: 'number',
    key: 'number',
  },
  {
    title: 'COMPANY NAME',
    dataIndex: 'company_name',
    key: 'company_name',
  },
  {
    title: 'PHONE NUMBER',
    dataIndex: 'phone_number',
    key: 'phone_number',
  },
  {
    title: 'STATUS',
    key: 'status',
    dataIndex: 'status',
    render: (_, { status }) => (
      <Badge status={checkColor(status)} text={status} />
    ),
  },
  {
    title: 'UPLOAD TIME',
    dataIndex: 'upload_time',
    key: 'upload_time',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.upload_time - b.upload_time,
  },

  {
    title: 'TYPE OF ADS',
    dataIndex: 'type_of_ads',
    key: 'type_of_ads',
  },
]

const AntTable = () => {
  const data = useMemo(() => fakeData, [])
  const columns = useMemo(() => columnsHead, [])
  return (
    <div className="">
      <div className="p-5 pb-0 overflow-x-auto bg-white rounded-lg">
        {data.length !== 0 ? (
          <Table columns={columns} dataSource={data} />
        ) : (
          <Skeleton active />
        )}
      </div>
    </div>
  )
}

export default AntTable
