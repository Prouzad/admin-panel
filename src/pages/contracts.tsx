import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useSession } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'

import { contractsCrumb } from '@/components/templates/BreadCumb/BREADCRUMB_DATA'
import TempBreadCumb from '@/components/templates/BreadCumb/tempBreadCumb'
import TableWrapper from '@/components/templates/tables/HeadTable'
import ContentWrapper from '@/components/templates/wrapper/contentWrapper'

import { getContractsList } from './api/services'

const Contracts = () => {
  const { data: session } = useSession()
  const { t, lang } = useTranslation('contracts')
  const [filter, setFilter] = useState()
  const res = useQuery(
    ['ContractsList', [filter]],
    () => getContractsList(session?.user?.accessToken, filter),
    { enabled: !!session?.user?.accessToken }
  )

  const handleFilter = (params: any) => {
    setFilter(params)
  }

  const result = res.data

  const rowClassName = () => 'cursor-pointer'
  const columnsHead: ColumnsType<any> = [
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
      title: t('contract-number'),
      key: 'contract_number',
      dataIndex: 'contract_number',
      align: 'center',
    },
    {
      title: t('contract-date'),
      dataIndex: 'contract_date',
      key: 'contract_date',
      align: 'center',
    },

    {
      title: t('contract-finished'),
      dataIndex: 'finished_at',
      key: 'finished_at',
      align: 'center',
      render: (_: any, date: any) => {
        if (date.finished_at) {
          return date.finished_at
        }
        return '-'
      },
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
  ]

  const columns = useMemo(() => columnsHead, [lang])

  return (
    <ContentWrapper>
      <TempBreadCumb data={contractsCrumb} />
      <TableWrapper
        style="w-[75%]"
        pageTitle={'contracts'}
        fnFilter={handleFilter}
        count={result?.count}
      >
        <Table
          columns={columns}
          rowKey="id"
          dataSource={result?.results}
          rowClassName={rowClassName}
        />
      </TableWrapper>
    </ContentWrapper>
  )
}

export default Contracts
