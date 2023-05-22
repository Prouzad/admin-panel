import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Select,
  Table,
  Typography,
} from 'antd'
import { useSession } from 'next-auth/react'
import React, { useState } from 'react'
import PhoneInput from 'react-phone-input-2'
import { useQuery } from 'react-query'

import { getAgents } from '@/pages/api/services'

interface Item {
  key: string
  name: string
  age: number
  address: string
}

const originData: Item[] = []
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    name: `Edward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  })
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
  record,
  index,
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
        inputClass={`w-[273px] border p-1 px-2 rounded-sm hover:border-blue-400 focus:outline-none focus:blue focus:blue-400 `}
      />
    ) : (
      <Select
        defaultValue="disabled"
        style={{ width: 120, borderRadius: 2 }}
        onChange={() => 'asds'}
        options={[
          { value: 'disabled', label: 'All', disabled: true },
          { value: 'owner', label: 'owner' },
          { value: 'agent ', label: 'Agent' },
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

const AgentEditModal = ({ id }: { id: string }) => {
  const { data: session } = useSession()
  const [form] = Form.useForm()
  const data = useQuery(
    ['Requests', id],
    () => getAgents(id, session?.user?.accessToken),
    { enabled: !!session?.user?.accessToken }
  )
  const [editingKey, setEditingKey] = useState('')

  const isEditing = (record: Item) => record.key === editingKey

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    console.log('RECORD', record)
    form.setFieldsValue({ name: '', age: '', address: '', ...record })
    setEditingKey(record.key)
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item

      const newData = [...data]
      const index = newData.findIndex((item) => key === item.key)
      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, {
          ...item,
          ...row,
        })
        setEditingKey('')
      } else {
        newData.push(row)
        setEditingKey('')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      width: '25%',
      editable: false,
    },
    {
      title: 'phone number',
      dataIndex: 'phone_number',
      width: '15%',
      editable: true,
    },
    {
      title: 'role',
      dataIndex: 'role',
      width: '40%',
      editable: true,
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: Item) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ''}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        )
      },
    },
  ]

  const mergedColumns = columns.map((col) => {
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
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data.data?.data}
        columns={mergedColumns}
        rowClassName="editable-row"
        onRow={(record) => {
          return {
            onDoubleClick: () => {
              console.log(record)
              edit(record)
            },
          }
        }}
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  )
}

export default AgentEditModal

// import { DeleteOutlined } from '@ant-design/icons'
// import { Button, Form, Input, Table } from 'antd'
// import { ColumnsType } from 'antd/es/table'
// import { useSession } from 'next-auth/react'
// import { useState } from 'react'
// import PhoneInput from 'react-phone-input-2'
// import { useQuery } from 'react-query'

// import { getAgents } from '@/pages/api/services'

// interface Item {
//   id: string
//   phone_number: string
//   role: string
// }

// interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
//   dataIndex: string
//   title: any
//   inputType: 'number' | 'text'
//   record: Item
//   index: number
//   children: React.ReactNode
// }

// const EditableCell: React.FC<EditableCellProps> = ({
//   dataIndex,
//   title,
//   inputType,
//   record,
//   index,
//   children,
//   ...restProps
// }) => {
//   const inputNode =
//     inputType === 'number' ? (
//       <PhoneInput
//         specialLabel=""
//         prefix={'+'}
//         country="uz"
//         alwaysDefaultMask
//         inputProps={{
//           placeholder: '+998 --  ---  --  --',
//           required: true,
//         }}
//         defaultMask=".. ... - .. - .."
//         inputClass={`w-[273px] border p-1 px-2 rounded-sm hover:border-blue-400 focus:outline-none focus:blue focus:blue-400 `}
//       />
//     ) : (
//       <Input />
//     )

//   return (
//     <td {...restProps}>
//       <Form.Item
//         name={dataIndex}
//         style={{ margin: 0 }}
//         rules={[
//           {
//             required: true,
//             message: `Please Input ${title}!`,
//           },
//         ]}
//       >
//         {inputNode}
//       </Form.Item>
//     </td>
//   )
// }

// const AgentEditModal = ({ id }: { id: string }) => {
//   const { data: session } = useSession()
//   const [editingKey, setEditingKey] = useState('')
//   const [form] = Form.useForm()

//   const res = useQuery(
//     ['Requests', id],
//     () => getAgents(id, session?.user?.accessToken),
//     { enabled: !!session?.user?.accessToken }
//   )

//   const isEditing = (record: Item) => record.id === editingKey

//   const edit = (record: Partial<Item> & { id: React.Key }) => {
//     form.setFieldsValue({ phone_number: '', role: '', ...record })
//     if (record.id) {
//       setEditingKey(record.id)
//     }
//   }

//   const cancel = () => {
//     setEditingKey('')
//   }

//   const save = async (key: React.Key) => {}

//   const columns: ColumnsType<any> = [
//     {
//       title: '№',
//       dataIndex: 'id',
//       key: 'id',
//       width: 50,
//       defaultSortOrder: 'ascend',
//       sorter: (a, b) => +a.id - +b.id,
//     },
//     {
//       title: 'Phone_number',
//       dataIndex: 'phone_number',
//       width: 200,
//       key: 'phone_number',
//     },
//     {
//       title: 'Role',
//       dataIndex: 'role',
//       width: 150,
//       key: 'role',
//     },
//     {
//       dataIndex: 'role',
//       width: 50,
//       key: 'role',
//       render: (_, action) => {
//         return (
//           <>
//             <Button
//               className="border-0"
//               onClick={() => {
//                 // setIsEdithItem(action.id)
//                 // setIsuccess(false)
//               }}
//             >
//               <DeleteOutlined className="font-black text-sm " />
//             </Button>
//           </>
//         )
//       },
//     },
//   ]

//   const mergedColumns = columns.map((col: any) => {
//     return {
//       ...col,
//       onCell: (record: Item) => ({
//         record,
//         inputType: col.dataIndex === 'phone_number' ? 'number' : 'text',
//         dataIndex: col.dataIndex,
//         title: col.title,
//         editing: isEditing(record),
//       }),
//     }
//   })

//   return (
//     <div>
//       <Form form={form} component={false}>
//         <Table
//           dataSource={res.data?.data}
//           columns={mergedColumns}
//           pagination={{
//             onChange: cancel,
//           }}
//           components={{
//             body: {
//               cell: EditableCell,
//             },
//           }}
//           onRow={(item) => {
//             return {
//               onDoubleClick: () => {
//                 isEditing(item)

//                 edit(item)
//               },
//             }
//           }}
//         />
//       </Form>
//     </div>
//   )
// }

// export default AgentEditModal
