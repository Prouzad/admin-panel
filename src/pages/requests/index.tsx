import { Badge } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useSession } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import { useMemo, useState } from 'react'
import { useQuery } from 'react-query'

import { requestsCrumb } from '@/components/templates/BreadCumb/BREADCRUMB_DATA'
import TempBreadCumb from '@/components/templates/BreadCumb/tempBreadCumb'
import TableWrapper from '@/components/templates/tables/HeadTable'
import RequestTable, { checkColor } from '@/components/templates/tables/MyTable'
import ContentWrapper from '@/components/templates/wrapper/contentWrapper'
import { DataType } from '@/MOCK_DATA'

import { getRequests } from '../api/services'

const UserRequestList = () => {
  const { data } = useSession()
  const [filter, setFilter] = useState([])
  const result = useQuery(
    ['Requests', filter],
    () => getRequests(data?.user?.accessToken, filter),
    { enabled: !!data?.user?.accessToken }
  )

  const { t, lang } = useTranslation('requests')

  const handleFilter = (params: any) => {
    setFilter(params)
  }

  const columnsHead: ColumnsType<DataType> = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'number',
      width: 50,
    },
    {
      title: t('company-name'),
      dataIndex: 'agency',
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
      dataIndex: 'created_at',
      key: 'upload_time',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.upload_time - b.upload_time,
    },

    {
      title: t('type-of-ads'),
      dataIndex: 'format',
      key: 'type_of_ads',
    },
  ]
  const columns = useMemo(() => columnsHead, [lang])

  return (
    <ContentWrapper>
      <TempBreadCumb data={requestsCrumb} />
      <TableWrapper
        style="w-[65%]"
        fnFilter={handleFilter}
        count={result?.data?.count}
      >
        <RequestTable columns={columns} data={result?.data?.results} />
      </TableWrapper>
    </ContentWrapper>
  )
}

export default UserRequestList
