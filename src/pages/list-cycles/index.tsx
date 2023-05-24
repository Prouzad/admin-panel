import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { useSession } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'

import { advertCyclesCrumb } from '@/components/templates/BreadCumb/BREADCRUMB_DATA'
import TempBreadCumb from '@/components/templates/BreadCumb/tempBreadCumb'
import TableWrapper from '@/components/templates/tables/HeadTable'
import MyTable from '@/components/templates/tables/MyTable'
import ContentWrapper from '@/components/templates/wrapper/contentWrapper'
import { IColumnADV } from '@/types'

import { getAdvCycle } from '../api/services'

const AdvCycle = () => {
  const { data: session } = useSession()
  const [filter, setFilter] = useState([])
  const result = useQuery(
    ['AdvCyle', filter],
    () => getAdvCycle(session?.user.accessToken, filter),
    { enabled: !!session?.user.accessToken }
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
      align: 'center',
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
      align: 'center',
      render: (content) => <a href={content}>content</a>,
    },
    {
      title: t('ads-format'),
      dataIndex: 'format',
      key: 'ads_format',
      defaultSortOrder: 'descend',
      align: 'center',
    },

    {
      title: t('duration'),
      dataIndex: 'show',
      key: 'duration',
      align: 'center',
    },
    {
      title: t('view-count'),
      dataIndex: 'view_count',
      key: 'view_count',
      align: 'center',
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
      render: (_: any, date: any) => {
        return <p>{`${dayjs(date.created_at).format('YYYY-MM-DD')}`}</p>
      },
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
