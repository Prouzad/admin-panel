import fakeData, { DataType } from '@/MOCK_DATA'
import { Badge, Select, Skeleton } from 'antd'
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useMemo, useState } from 'react'
import { DatePicker, Input } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

const { Search } = Input
const { RangePicker } = DatePicker

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
    width: 50,
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

const RequestTable = () => {
  const data = useMemo(() => fakeData, [])
  const columns = useMemo(() => columnsHead, [])
  return (
    <div className="pb-5">
      <div className="px-5 pb-0  bg-white rounded-lg ">
        <div className="flex flex-wrap h-20 items-center">
          <div className="flex mx-6">
            <div className="flex items-center mr-2">
              <p className="text-sm"> Rule Name </p>{' '}
              <div className="flex items-center justify-center">
                <QuestionCircleOutlined className=" ml-1" />:
              </div>
            </div>
            <Search
              placeholder="Please enter"
              allowClear
              style={{ width: 232 }}
              // onSearch={(value: string) => {}}
            />
          </div>
          <div className="mr-6">
            <RangePicker
              onChange={(value) => {
                // console.log(value)
              }}
            />
          </div>
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
        <Table
          columns={columns}
          dataSource={data}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                console.log(record)
              },
            }
          }}
        />
      </div>
    </div>
  )
}

export default RequestTable
