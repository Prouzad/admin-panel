import { Spin, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useRouter } from 'next/router'
import { useState } from 'react'

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
  const [loading, setLoading] = useState(false)
  const rowClassName = () => 'cursor-pointer'

  return (
    <>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={data}
          rowClassName={rowClassName}
          pagination={false}
          onRow={(record) => {
            return {
              onClick: () => {
                setLoading(true)
                const url = router.pathname + `/${record.id}`
                router.push(url)
              },
            }
          }}
        />
      </Spin>
    </>
  )
}

export default MyTable
