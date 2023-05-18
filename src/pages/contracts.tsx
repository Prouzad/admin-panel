import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import useTranslation from 'next-translate/useTranslation'
import { useMemo } from 'react'

import { contractsCrumb } from '@/components/templates/BreadCumb/BREADCRUMB_DATA'
import TempBreadCumb from '@/components/templates/BreadCumb/tempBreadCumb'
// import TableWrapper from '@/components/templates/tables/HeadTable'
import ContentWrapper from '@/components/templates/wrapper/contentWrapper'
import fakeData from '@/MOCK_DATA'

const Contracts = () => {
  const { t, lang } = useTranslation('contracts')
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
      dataIndex: 'company_name',
      key: 'name',
    },
    {
      title: t('contract-number'),
      key: 'content',
      dataIndex: 'content',
    },
    {
      title: t('contract-date'),
      dataIndex: 'ads_format',
      key: 'ads_format',
      defaultSortOrder: 'descend',
    },

    {
      title: t('contract-finished'),
      dataIndex: 'duration',
      key: 'duration',
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

  const data = useMemo(() => fakeData, [])
  const columns = useMemo(() => columnsHead, [lang])

  return (
    <ContentWrapper>
      <TempBreadCumb data={contractsCrumb} />
      {/* <TableWrapper style="w-[75%]" page={'contracts'}> */}
      <Table columns={columns} dataSource={data} rowClassName={rowClassName} />
      {/* </TableWrapper> */}
    </ContentWrapper>
  )
}

export default Contracts
