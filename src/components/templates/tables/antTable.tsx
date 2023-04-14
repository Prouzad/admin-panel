import fakeData, { DataType } from '@/MOCK_DATA'
import { Badge, Select, Skeleton } from 'antd'
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
    render: (items) => {
      return (
        <div className="flex">
          {items.map((item: string, idx: number) => {
            return (
              <div className={`${idx === 0 && 'border-r'}`}>
                <p>{item}</p>
              </div>
            )
          })}
        </div>
      )
    },
  },
]

const AntTable = () => {
  const data = useMemo(() => fakeData, [])
  const columns = useMemo(() => columnsHead, [])
  return (
    <div className="-z-10">
      <div className="p-5 pb-0 overflow-x-auto bg-white rounded-lg">
        <div className="">
          <Select
            defaultValue="lucy"
            style={{ width: 148, borderRadius: 0 }}
            // onChange={handleChange}
            options={[
              { value: 'jack', label: 'Jack' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
              { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
          />
        </div>
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
