import { CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { Form, message, Popconfirm, Select, Table } from 'antd'
import { useSession } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import React, { Dispatch, SetStateAction, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import { useQuery } from 'react-query'

import { deleteAgent, getAgents, updateAgentInfo } from '@/pages/api/services'

import AgentModal from './AgentModal'

interface Item {
  id: string
  name: string
  age: number
  address: string
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean
  dataIndex: string
  title: any
  inputType: 'number' | 'text'
  record: Item
  index: number
  children: React.ReactNode
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  ...restProps
}) => {
  const inputNode =
    inputType === 'number' ? (
      <PhoneInput
        specialLabel=""
        prefix={'+'}
        country="uz"
        alwaysDefaultMask
        inputProps={{
          placeholder: '+998 --  ---  --  --',
          required: true,
        }}
        defaultMask=".. ... - .. - .."
        inputClass={`w-[173px] border p-1 px-4 rounded-sm hover:border-blue-400 focus:outline-none focus:blue focus:blue-400 `}
      />
    ) : (
      <Select
        defaultValue="disabled"
        style={{ width: 120, borderRadius: 2 }}
        onChange={() => 'asds'}
        options={[
          { value: 'owner', label: 'Owner' },
          { value: 'agent', label: 'Agent' },
        ]}
      />
    )

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
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

const AgentEditModal = ({
  id,
  setEditingKey,
  editingKey,
  addAgent,
  isSuccess,
  setIsuccess,
}: {
  id: string
  setEditingKey: Dispatch<SetStateAction<string>>
  editingKey: string
  addAgent: boolean
  setAddAgent?: (arg: boolean) => void
  isSuccess: any
  setIsuccess: (arg: any) => void
}) => {
  const [messageApi, contextHolder] = message.useMessage()
  const { data: session } = useSession()
  const { t } = useTranslation('agencies')
  const [form] = Form.useForm()

  const [editId, setEditId] = useState()

  const data = useQuery(
    ['Requests', id, isSuccess],
    () => getAgents(id, session?.user?.accessToken),
    { enabled: !!session?.user?.accessToken }
  )

  const isEditing = (record: Item) => record.id === editingKey

  const edit = (record: Partial<Item> & { id: React.Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record })
    setEditingKey(record.id)
  }

  const success = (type: any, text: string) => {
    messageApi.open({
      type: type,
      content: text,
      duration: 10,
    })
  }

  const handleDeleteAgent = async (id: string) => {
    await deleteAgent(id, session?.user.accessToken)
      .then((res) => {
        success('success', 'Агент успешно удален!')
        setIsuccess(res)
      })
      .catch(() => {
        success('error', 'При удаление агента произошла ошибка!')
      })
  }

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: '50',
      editable: false,
      align: 'center',
    },
    {
      title: 'phone number',
      dataIndex: 'phone_number',
      width: '160',
      align: 'center',
      editable: true,
    },
    {
      title: 'role',
      dataIndex: 'role',
      width: '150',
      align: 'center',
      editable: true,
    },
    {
      width: '85',
      align: 'center',
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
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
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => handleDeleteAgent(record.id)}
            okText="Yes"
            cancelText="No"
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
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === 'phone_number' ? 'number' : 'select',
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
          const number = value.phone_number.replace(/\+/g, '')
          try {
            if (editId) {
              const body = {
                ...value,
                phone_number: `+${number}`,
              }
              await updateAgentInfo(editId, body, session?.user.accessToken)
              success('success', t('agent_editing_success'))
              setIsuccess(value)
              setEditingKey('')
            }
          } catch {
            success('error', 'Не получилось изменить данные!')
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
      {addAgent && <AgentModal />}
    </div>
  )
}

export default AgentEditModal
