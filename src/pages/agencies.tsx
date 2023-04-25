import {
  CheckCircleFilled,
  CloseCircleFilled,
  EllipsisOutlined,
} from '@ant-design/icons'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { Select } from 'antd'
import { Table } from 'antd'
import { DatePicker, Input } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { agenciesCrumb } from 'BREADCRUMB_DATA'
import { useMemo } from 'react'

const { Search } = Input
const { RangePicker } = DatePicker

import TempBreadCumb from '@/components/templates/BreadCumb/tempBreadCumb'
import ContentWrapper from '@/components/templates/wrapper/contentWrapper'
import fakeData from '@/MOCK_DATA'

interface IColumnAgency {
  id: string
  agency_name: string
  adress: string
  agent_number: string
  contract_count: string
  able_disable: string
  action: string
}

const Agencies = () => {
  const columnsHead: ColumnsType<IColumnAgency> = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: 'AGENCY NAME',
      dataIndex: 'company_name',
      key: 'agency_name',
    },
    {
      title: 'ADRESS',
      key: 'adress',
      dataIndex: 'adress',
    },
    {
      title: 'AGENT NUMBER',
      dataIndex: 'id',
      key: 'agent_number',
    },

    {
      title: 'CONTRACT COUNT',
      dataIndex: 'id',
      key: 'contract_count',
    },

    {
      title: 'ABLE / DISABLE',
      dataIndex: 'able_disable',
      key: 'able_disable',
      align: 'center',
      render: (_: any, { able_disable }) => {
        if (able_disable) {
          return <CheckCircleFilled className="text-green-600" />
        } else {
          return <CloseCircleFilled className="text-red-600" />
        }
      },
    },
    {
      title: 'ACTION',
      dataIndex: 'action',
      key: 'action',
      render: () => <EllipsisOutlined />,
    },
  ]

  const data = useMemo(() => fakeData, []) as any
  const columns = useMemo(() => columnsHead, [])

  return (
    <ContentWrapper>
      <TempBreadCumb data={agenciesCrumb} />
      <div className={`pb-5 w-[75%]`}>
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
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
    </ContentWrapper>
  )
}

export default Agencies
