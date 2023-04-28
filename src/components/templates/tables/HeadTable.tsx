import { QuestionCircleOutlined } from '@ant-design/icons'
import { Select } from 'antd'
import { DatePicker, Input } from 'antd'
import { ReactNode } from 'react'

const { Search } = Input
const { RangePicker } = DatePicker

const TableWrapper = ({
  children,
  style,
}: {
  children: ReactNode
  style: string
}) => {
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
        {children}
      </div>
    </div>
  )
}

export default TableWrapper
