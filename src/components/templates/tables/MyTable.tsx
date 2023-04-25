import { QuestionCircleOutlined } from '@ant-design/icons'
import { Select } from 'antd'
import { Table } from 'antd'
import { DatePicker, Input } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useRouter } from 'next/router'

const { Search } = Input
const { RangePicker } = DatePicker

export const checkColor = (status: string) => {
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

const MyTable = ({
  columns,
  data,
  style,
}: {
  columns: ColumnsType<any>
  data: any[]
  style: string
}) => {
  const router = useRouter()

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
              style={{
                width: 232,
              }}
              // onSearch={(value: string) => {}}
            />
          </div>
          <div className="mr-6">
            <RangePicker
              onChange={(value) => {
                return value
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
          onRow={(record) => {
            return {
              onClick: () => {
                const url = router.asPath + `/${record.id}`
                router.push(url)
              },
            }
          }}
        />
      </div>
    </div>
  )
}

export default MyTable
