import { Badge } from 'antd'
import { ColumnsType } from 'antd/es/table'
import useTranslation from 'next-translate/useTranslation'
import { useMemo } from 'react'

import TempBreadCumb from '@/components/templates/BreadCumb/tempBreadCumb'
import RequestTable, {
  checkColor,
} from '@/components/templates/tables/RequestTable'
import ContentWrapper from '@/components/templates/wrapper/contentWrapper'
import fakeData, { DataType } from '@/MOCK_DATA'

const AdvCycle = () => {
  const { t } = useTranslation('requests')

  const columnsHead: ColumnsType<DataType> = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'number',
      width: 50,
    },
    {
      title: t('company-name'),
      dataIndex: 'company_name',
      key: 'company_name',
    },
    {
      title: t('phone-number'),
      dataIndex: 'phone_number',
      key: 'phone_number',
    },
    {
      title: t('status'),
      key: 'status',
      dataIndex: 'status',
      render: (_, { status }) => (
        <Badge status={checkColor(status)} text={status} />
      ),
    },
    {
      title: t('upload-time'),
      dataIndex: 'upload_time',
      key: 'upload_time',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.upload_time - b.upload_time,
    },

    {
      title: t('type-of-ads'),
      dataIndex: 'type_of_ads',
      key: 'type_of_ads',
      render: (items) => {
        return (
          <div className="flex">
            {items.map((item: string, idx: number) => {
              return (
                <div className={`${idx === 0 && 'border-r'}`} key={idx}>
                  <p>{item}</p>
                </div>
              )
            })}
          </div>
        )
      },
    },
  ]

  const data = useMemo(() => fakeData, [])
  const columns = useMemo(() => columnsHead, [])

  return (
    <ContentWrapper>
      <TempBreadCumb
        description={
          'For you to have detailed information about a given advertising offer'
        }
      />
      <RequestTable columns={columns} data={data} />
    </ContentWrapper>
  )
}

export default AdvCycle