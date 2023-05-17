import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useRouter } from 'next/router'

export const checkColor = (status: string) => {
  switch (status) {
    case 'approved':
      return 'success'
    case 'rejected':
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
    <>
      <Table
        columns={columns}
        dataSource={data}
        rowClassName={rowClassName}
        pagination={false}
        onRow={(record) => {
          return {
            onClick: () => {
              const url = router.pathname + `/${record.id}`
              router.push(url)
            },
          }
        }}
      />
    </>
  )
}

export default MyTable
