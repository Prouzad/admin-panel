import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table'
import useTranslation from 'next-translate/useTranslation'
import { useMemo } from 'react'

import { advertCyclesCrumb } from '@/components/templates/BreadCumb/BREADCRUMB_DATA'
import TempBreadCumb from '@/components/templates/BreadCumb/tempBreadCumb'
import TableWrapper from '@/components/templates/tables/HeadTable'
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
  const { t, lang } = useTranslation('list-cycles')

  const columnsHead: ColumnsType<IColumnADV> = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: t('company-name'),
      dataIndex: 'company_name',
      key: 'name',
    },
    {
      title: t('content'),
      key: 'content',
      dataIndex: 'content',
    },
    {
      title: t('ads-format'),
      dataIndex: 'ads_format',
      key: 'ads_format',
      defaultSortOrder: 'descend',
    },

    {
      title: t('duration'),
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: t('view-count'),
      dataIndex: 'view_count',
      key: 'view_count',
    },
    {
      title: t('is-finished'),
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
      title: t('upload-time'),
      dataIndex: 'upload_time',
      key: 'upload_time',
    },
  ]

  const data = useMemo(() => fakeData, [])
  const columns = useMemo(() => columnsHead, [lang])

  return (
    <ContentWrapper>
      <TempBreadCumb data={advertCyclesCrumb} />
      <TableWrapper style="w-[75%]">
        <MyTable columns={columns} data={data} />
      </TableWrapper>
    </ContentWrapper>
  )
}

export default AdvCycle
