import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table'
import { advertCyclesCrumb } from 'BREADCRUMB_DATA'
import useTranslation from 'next-translate/useTranslation'
import { useMemo } from 'react'

import TempBreadCumb from '@/components/templates/BreadCumb/tempBreadCumb'
import MyTable from '@/components/templates/tables/MyTable'
import ContentWrapper from '@/components/templates/wrapper/contentWrapper'
import fakeData from '@/MOCK_DATA'

interface IColumnADV {
  id: string
  name: string
  content: string
  ads_format: string
  duration: string
  view_count: string
  is_finished: string
  upload_time: string
}

const AdvCycle = () => {
  const { lang } = useTranslation('requests')

  const columnsHead: ColumnsType<IColumnADV> = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: 'NAME',
      dataIndex: 'company_name',
      key: 'name',
    },
    {
      title: 'CONTENT',
      key: 'content',
      dataIndex: 'content',
    },
    {
      title: 'ADS FORMAT',
      dataIndex: 'ads_format',
      key: 'ads_format',
      defaultSortOrder: 'descend',
    },

    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'VIEW COUNT',
      dataIndex: 'view_count',
      key: 'view_count',
    },
    {
      title: 'IS FINISHED',
      dataIndex: 'is_finished',
      key: 'is_finished',
      align: 'center',
      render: (_: any, { is_finished }) => {
        if (is_finished) {
          return <CheckCircleFilled className="text-green-600" />
        } else {
          return <CloseCircleFilled className="text-red-600" />
        }
      },
    },
    {
      title: 'UPLOAD TIME',
      dataIndex: 'upload_time',
      key: 'upload_time',
    },
  ]

  const data = useMemo(() => fakeData, [])
  const columns = useMemo(() => columnsHead, [lang])

  return (
    <ContentWrapper>
      <TempBreadCumb data={advertCyclesCrumb} />
      <MyTable columns={columns} data={data} style="w-[75%]" />
    </ContentWrapper>
  )
}

export default AdvCycle
