import { CheckCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { Form, message, Popconfirm, Select, Table } from 'antd'
import { useSession } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import React, { Dispatch, SetStateAction, useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import { useQuery } from 'react-query'

import {
  deleteAgent,
  getAgents,
  getRoles,
  updateAgentInfo,
} from '@/components/services'
import { EditableCellProps, Item } from '@/types'

import AgentModal from './AgentModal'

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  children,
  ...restProps
}) => {
  const { data: session } = useSession()
  const res = useQuery('Role', () => getRoles(session?.user?.accessToken), {
    enabled: !!session?.user?.accessToken,
  })
  const roles = res.data ? (res.data as string[]) : ['agent', '']

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
        options={roles.map((item) => {
          return { value: item, label: item }
        })}
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
  const { t } = useTranslation('common')
  const [form] = Form.useForm()

  const [editId, setEditId] = useState()

  const data = useQuery(
    ['Agents', id, isSuccess],
    () => getAgents(id, session?.user?.accessToken),
    { enabled: !!session?.user?.accessToken }
  )

  const isEditing = (record: Item) => record.id === editingKey

  const editAgent = (record: Partial<Item> & { id: React.Key }) => {
    form.setFieldsValue({ name: '', age: '', address: '', ...record })
    setEditingKey(record.id)
  }

  const statusAgentResponse = (type: any, text: string) => {
    messageApi.open({
      type: type,
      content: text,
      duration: 10,
    })
  }

  const handleDeleteAgent = async (id: string) => {
    await deleteAgent(id, session?.user.accessToken)
      .then((res) => {
        statusAgentResponse('success', t('agent-removed-successfully'))
        setIsuccess(res)
      })
      .catch(() => {
        statusAgentResponse(
          'error',
          t('an-error-occurred-while-deleting-the-agent')
        )
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
      title: t('phone-number'),
      dataIndex: 'phone_number',
      width: '160',
      align: 'center',
      editable: true,
    },
    {
      title: t('role'),
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
            title={t('delete-the-agent')}
            description={t('are-you-sure-to-delete-this-agent')}
            onConfirm={() => handleDeleteAgent(record.id)}
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
              statusAgentResponse('success', t('agent_editing_success'))
              setIsuccess(value)
              setEditingKey('')
            }
          } catch {
            statusAgentResponse('error', t('failed-to-change-data'))
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
                editAgent(record)
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
