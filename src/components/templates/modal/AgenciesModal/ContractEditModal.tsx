import {
  CheckCircleOutlined,
  DeleteOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Popconfirm,
  Space,
  Table,
  Typography,
  Upload,
} from 'antd'
import dayjs from 'dayjs'
import { useSession } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import React, { Dispatch, SetStateAction, useState } from 'react'
import { useQuery } from 'react-query'

import filterFileEmpty from '@/components/FilterFunctions/FilterEmptyFiles'
import {
  deleteContract,
  getContracts,
  updateContractInfo,
} from '@/components/services'
import { IconFile } from '@/components/UI/icons/icons'
import { filterEmptyValues } from '@/pages/agencies'
import { EditableCellProps, IContractUpdateBody, IitemEdit } from '@/types'

import ContractModal from './ContractModal'

export const getDateContractObj = async (values: any) => {
  const data = {
    ...values,
  }

  if (values.finished_at) {
    data.finished_at = `${dayjs(values.finished_at).format('YYYY-MM-DD')}`
  }

  if (values.contract_date) {
    data.contract_date = `${dayjs(values.contract_date).format('YYYY-MM-DD')}`
  }

  if (values.contract_file) {
    data.contract_file = await filterFileEmpty(values?.contract_file)
  }

  return filterEmptyValues(data)
}

const props: any = {
  beforeUpload: () => {
    return false
  },
  listType: 'picture',
  className: 'flex rounded-sm',
}

function disabledDate(current: any) {
  return current && current.isBefore(Date.now(), 'day')
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  children,
  ...restProps
}) => {
  const { t } = useTranslation('common')
  let inputNode
  if (dataIndex === 'contract_number') {
    inputNode = <Input />
  }
  if (dataIndex === 'finished_at') {
    inputNode = (
      <DatePicker disabledDate={disabledDate} placeholder={t('select-date')} />
    )
  }
  if (dataIndex === 'contract_file') {
    inputNode = (
      <Upload
        {...props}
        accept="application/pdf"
        itemRender={(_, file, _2, { remove }) => {
          return (
            <div className="flex item-center">
              <Space className="flex items-center justify-between  ml-4 border rounded-sm w-[200px] h-8">
                <IconFile className="ml-2" />

                <Typography className="max-w-[118px] mr-2 truncate	">
                  {file?.name}
                </Typography>
                <Button
                  type="link"
                  className="w-[10px] flex items-center justify-center mr-1"
                  onClick={remove}
                >
                  <DeleteOutlined className=" text-red-500" />
                </Button>
              </Space>
            </div>
          )
        }}
        maxCount={1}
        multiple={false}
        showUploadList={true}
      >
        <Button icon={<UploadOutlined />}></Button>
      </Upload>
    )
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: dataIndex === 'contract_number',
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

const ContractEditModal = ({
  id,
  setEditingKey,
  editingKey,
  addContract,
  isSuccess,
  setIsuccess,
}: {
  id: string
  setEditingKey: Dispatch<SetStateAction<string>>
  editingKey: string
  addContract: boolean
  isSuccess: any
  setIsuccess: (arg: any) => void
}) => {
  const [messageApi, contextHolder] = message.useMessage()
  const { data: session } = useSession()
  const [form] = Form.useForm()

  const [editId, setEditId] = useState()

  const { t } = useTranslation('common')

  const data = useQuery(
    ['Contracts', id, isSuccess],
    () => getContracts(id, session?.user?.accessToken),
    { enabled: !!session?.user?.accessToken }
  )

  const isEditing = (record: IitemEdit) => record.id === editingKey

  const edit = (record: Partial<IitemEdit> & { id: React.Key }) => {
    form.setFieldsValue({
      contract_number: '',
      contract_file: '',
      ...record,
      finished_at: '',
    })
    setEditingKey(record.id)
  }

  const success = (type: any, text: string) => {
    messageApi.open({
      type: type,
      content: text,
      duration: 10,
    })
  }

  const handleDeleteContract = async (id: string) => {
    await deleteContract(id, session?.user.accessToken)
      .then((res) => {
        success('success', 'Контракт успешно удален!')
        setIsuccess(res)
      })
      .catch(() => {
        success('error', 'При удаление контракта произошла ошибка!')
      })
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      width: '50',
      editable: false,
      align: 'center',
    },
    {
      title: t('contract-number'),
      dataIndex: 'contract_number',
      width: '160',
      align: 'center',
      editable: true,
    },
    {
      title: t('contract-file'),
      dataIndex: 'contract_file',
      width: '150',
      align: 'center',
      editable: true,
      render: (_: any, action: any) => {
        return <a href={action.contract_file}>File</a>
      },
    },
    {
      title: t('created_at'),
      dataIndex: 'contract_date',
      width: '150',
      align: 'center',
    },
    {
      title: t('finished_at'),
      dataIndex: 'finished_at',
      width: '150',
      align: 'center',
      editable: true,
      render: (_: any, date: any) => {
        if (date.finished_at) {
          return date.finished_at
        }
        return '-'
      },
    },
    {
      width: '85',
      align: 'center',
      dataIndex: 'operation',
      render: (_: any, record: IitemEdit) => {
        const editable = isEditing(record)
        return editable ? (
          <>
            <span>
              <CheckCircleOutlined
                onClick={() => {
                  form.submit()
                }}
                className="text-lg"
              />
            </span>
          </>
        ) : (
          <Popconfirm
            title={t('delete-contract')}
            description={t('are-you-sure-to-delete-this-contract')}
            onConfirm={() => handleDeleteContract(record.id)}
            okText={t('yes')}
            cancelText={t('no')}
          >
            <DeleteOutlined />
          </Popconfirm>
        )
      },
    },
  ]

  const mergedColumns: any = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record: IitemEdit) => ({
        record,
        inputType: col.dataIndex === 'contract_number' ? 'number' : 'select',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })

  return (
    <div className="pb-4">
      {contextHolder}
      <Form
        form={form}
        component={false}
        onFinish={async (value) => {
          const body = (await getDateContractObj(value)) as IContractUpdateBody
          try {
            if (editId) {
              await updateContractInfo(editId, body, session?.user.accessToken)
              success('success', t('data-updated-successfully'))
              setIsuccess(value)
              setEditingKey('')
            }
          } catch {
            success('error', t('failed-to-change-data'))
          }
        }}
      >
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          pagination={false}
          dataSource={data.data?.data}
          columns={mergedColumns}
          rowClassName="editable-row"
          onRow={(record) => {
            return {
              onDoubleClick: () => {
                setEditingKey('')
                setEditId(record.id)
                edit(record)
              },
            }
          }}
        />
      </Form>
      {addContract && <ContractModal />}
    </div>
  )
}

export default ContractEditModal
