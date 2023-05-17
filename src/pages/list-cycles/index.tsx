import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table'
import { useSession } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'

import { advertCyclesCrumb } from '@/components/templates/BreadCumb/BREADCRUMB_DATA'
import TempBreadCumb from '@/components/templates/BreadCumb/tempBreadCumb'
import TableWrapper from '@/components/templates/tables/HeadTable'
import MyTable from '@/components/templates/tables/MyTable'
import ContentWrapper from '@/components/templates/wrapper/contentWrapper'

import { getAdvCycle } from '../api/services'

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
  const { data } = useSession()
  const [filter, setFilter] = useState([])
  const result = useQuery(
    ['AdvCyle', filter],
    () => getAdvCycle(data?.user.accessToken, filter),
    { enabled: !!data?.user.accessToken }
  )
  const { t, lang } = useTranslation('list-cycles')
  const handleFilter = (params: any) => {
    setFilter(params)
  }
  const columnsHead: ColumnsType<IColumnADV> = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
      width: 50,
    },
    {
      title: t('company-name'),
      dataIndex: 'agency',
      key: 'name',
    },
    {
      title: t('content'),
      key: 'content',
      dataIndex: 'content',
      render: (content) => <a href={content}>content</a>,
    },
    {
      title: t('ads-format'),
      dataIndex: 'format',
      key: 'ads_format',
      defaultSortOrder: 'descend',
    },

    {
      title: t('duration'),
      dataIndex: 'show',
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
      dataIndex: 'created_at',
      key: 'upload_time',
    },
  ]

  const columns = useMemo(() => columnsHead, [lang])

  return (
    <ContentWrapper>
      <TempBreadCumb data={advertCyclesCrumb} />
      <TableWrapper
        style="w-[75%]"
        pageTitle={'adv-cycle'}
        fnFilter={handleFilter}
        count={result?.data?.count}
      >
        <MyTable columns={columns} data={result?.data?.results} />
      </TableWrapper>
    </ContentWrapper>
  )
}

export default AdvCycle
