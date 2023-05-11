import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useRouter } from 'next/router'

export const checkColor = (status: string) => {
  switch (status) {
    case 'Approved':
      return 'success'
    case 'Online':
      return 'success'
    case 'Rejected':
      return 'error'
    default:
      return 'default'
  }
}

const MyTable = ({
  columns,
  data,
}: {
  columns: ColumnsType<any>
  data: any[]
}) => {
  const router = useRouter()
  const rowClassName = () => 'cursor-pointer'
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowClassName={rowClassName}
      onRow={(record) => {
        return {
          onClick: () => {
            const url = router.pathname + `/${record.id}`
            router.push(url)
          },
        }
      }}
    />
  )
}

export default MyTable
