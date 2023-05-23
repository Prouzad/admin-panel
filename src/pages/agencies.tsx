import {
  CheckCircleFilled,
  CloseCircleFilled,
  EllipsisOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Dropdown, Form, message, Space } from 'antd'
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { useSession } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useMemo, useRef, useState } from 'react'
import React from 'react'
import { useQuery } from 'react-query'

import { agenciesCrumb } from '@/components/templates/BreadCumb/BREADCRUMB_DATA'
import TempBreadCumb from '@/components/templates/BreadCumb/tempBreadCumb'
import AgencyModal from '@/components/templates/modal/AgenciesModal/AgencyModal'
import AgentEditModal from '@/components/templates/modal/AgenciesModal/AgentEditModal'
import AgentModal from '@/components/templates/modal/AgenciesModal/AgentModal'
import CollapseWrapper from '@/components/templates/modal/AgenciesModal/CollapseWrapper'
import ContractEditModal, {
  getDateContractObj,
} from '@/components/templates/modal/AgenciesModal/ContractEditModal'
import ContractModal from '@/components/templates/modal/AgenciesModal/ContractModal'
import AgencyModalWrapper from '@/components/templates/modal/AgenciesModal/Modal'
import TableWrapper from '@/components/templates/tables/HeadTable'
import ContentWrapper from '@/components/templates/wrapper/contentWrapper'

import {
  createAgency,
  createAgent,
  createContract,
  getAgency,
  getAgencyDetails,
  updateAgencyInfo,
} from './api/services'

interface IColumnAgency {
  id: string
  agency_name: string
  adress: string
  agent_number: string
  contract_count: string
  able_disable: string
  action: string
}

export interface IForm {
  name: string
  phone_number: string
  address: string
  logo?: any
  agent_phone_number: string
  agent_role?: string
  contract_number: string
  contract_file: any
  contract_date: string
  contract_finished_date: string
}

export const filterFileEmpty = async (obj: any) => {
  if (obj && obj?.fileList !== undefined && obj.fileList.length !== 0) {
    const res = await new Promise((resolve, reject) => {
      const fileReader = new FileReader()

      fileReader.readAsDataURL(obj?.file)

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })
    return res
  }
  return undefined
}

export const filterEmptyValues = (obj: IForm) => {
  if (obj !== undefined && obj !== null) {
    const filteredEntries = Object.entries(obj).filter(([_, value]) => {
      return value !== '' && value !== null && value !== undefined
    })
    return Object.fromEntries(filteredEntries)
  }
  return null
}

const Agencies = () => {
  const { data: session } = useSession()
  const formRef = useRef(null) as any
  const formRef2 = useRef(null) as any
  const formRefContract = useRef(null) as any

  const [form] = Form.useForm<IForm>()
  const [form2] = Form.useForm<IForm>()
  const [formContract] = Form.useForm<IForm>()

  const [messageApi, contextHolder] = message.useMessage()
  const { t, lang } = useTranslation('agencies')

  const [filter, setFilter] = useState()
  const [fields, setFields] = useState<IForm>()

  const [isOpen, setIsOpen] = useState(false)
  const [isAgencyModal, setIsAgencyModal] = useState(false)
  const [isAgentModal, setIsAgentModal] = useState(false)
  const [isContractModal, setIsContractModal] = useState(false)
  const [isEdithItem, setIsEdithItem] = useState('')
  const [editingKey, setEditingKey] = useState('')
  const [editingKeyContractContract, setEditingKeyContract] = useState('')
  const [addAgent, setAddAgent] = useState(false)
  const [addContract, setAddContract] = useState(false)
  const [isSuccess, setIsuccess] = useState(false)
  const [isSuccessAgent, setIsuccessAgent] = useState<any>()
  const [isSuccessContract, setIsuccessContract] = useState<any>()

  const res = useQuery(
    ['Requests', [filter, isSuccess]],
    () => getAgency(session?.user?.accessToken, filter),
    { enabled: !!session?.user?.accessToken }
  )

  const result = res.data

  useEffect(() => {
    setEditingKey('')
    setAddAgent(false)
  }, [isAgentModal])

  useEffect(() => {
    setEditingKeyContract('')
    setAddContract(false)
  }, [isContractModal])

  const success = (type: any, text: string) => {
    messageApi.open({
      type: type,
      content: text,
      duration: 10,
    })
  }

  const handleFilter = (params: any) => {
    setFilter(params)
  }

  const getDetailsInfo = async (id: string, token: string) => {
    const res = await getAgencyDetails(id, token)
    setFields(res.data)
  }

  const items: MenuProps['items'] = [
    {
      label: (
        <Space onClick={() => setIsAgencyModal(true)} className="w-full">
          {t('agency')}
        </Space>
      ),
      key: '0',
    },
    {
      label: (
        <Space onClick={() => setIsAgentModal(true)} className="w-full">
          {t('agent')}
        </Space>
      ),
      key: '1',
    },
    {
      label: (
        <Space onClick={() => setIsContractModal(true)} className="w-full">
          {t('contract')}
        </Space>
      ),
      key: '2',
    },
    {
      label: <Space className="w-full">{t('disabled')}</Space>,
      key: '3',
    },
  ]
  const columnsHead: ColumnsType<IColumnAgency> = [
    {
      title: '№',
      dataIndex: 'id',
      key: 'id',
      width: 50,
      defaultSortOrder: 'ascend',
      sorter: (a, b) => +a.id - +b.id,
    },
    {
      title: t('agency-name'),
      dataIndex: 'name',
      key: 'agency_name',
    },
    {
      title: t('phone_number'),
      key: 'phone_number',
      dataIndex: 'phone_number',
    },
    {
      title: t('adress'),
      key: 'address',
      dataIndex: 'address',
    },
    {
      title: t('agent-number'),
      dataIndex: 'agents_count',
      key: 'agent_number',
    },

    {
      title: t('contract-count'),
      dataIndex: 'contracts_count',
      key: 'contracts_count',
    },

    {
      title: t('able-disable'),
      dataIndex: 'is_active',
      key: 'is_active',
      align: 'center',
      render: (_: any, { is_active }: any) => {
        if (is_active) {
          return <CheckCircleFilled className="text-green-600" />
        } else {
          return <CloseCircleFilled className="text-red-600" />
        }
      },
    },
    {
      title: t('action'),
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (_, action) => {
        return (
          <>
            <Dropdown
              menu={{ items }}
              trigger={['click']}
              placement={'bottomLeft'}
              overlayStyle={{ borderRadius: 0, width: 150, padding: 0 }}
            >
              <a>
                <Button
                  className="border-0"
                  onClick={() => {
                    setIsEdithItem(action.id)
                    setIsuccess(false)
                  }}
                >
                  <EllipsisOutlined className="font-black text-xl " />
                </Button>
              </a>
            </Dropdown>
          </>
        )
      },
    },
  ]

  const setFieldsObj = (er: Partial<IForm>) => {
    let keys!: keyof IForm
    const arr = []
    for (keys in er) {
      let inputValue
      if (keys === 'phone_number') {
        inputValue = er[keys]?.replace(/\+/g, '')
      } else {
        inputValue = er[keys]
      }
      arr.push({
        name: keys,
        value: inputValue,
      })
    }
    return arr
  }

  const getDateObj = async (values: IForm) => {
    const data = {
      ...values,
    }
    data.agent_phone_number = `+${values.agent_phone_number}`
    data.phone_number = `+${values.phone_number}`
    data.contract_date = `${dayjs(values.contract_date).format('YYYY-MM-DD')}`
    data.contract_finished_date = `${dayjs(
      values.contract_finished_date
    ).format('YYYY-MM-DD')}`

    if (values.logo) {
      data.logo = await filterFileEmpty(values?.logo)
    }

    if (values.contract_file) {
      data.contract_file = await filterFileEmpty(values?.contract_file)
    }

    return filterEmptyValues(data)
  }

  const columns = useMemo(() => columnsHead, [lang])
  const rowClassName = () => 'cursor-pointer'
  return (
    <ContentWrapper>
      <TempBreadCumb data={agenciesCrumb} setIsCreateModal={setIsOpen} />
      {contextHolder}
      <TableWrapper
        style="w-[75%]"
        pageTitle={'agency'}
        fnFilter={handleFilter}
        count={result?.count}
      >
        <Table
          pagination={false}
          columns={columns}
          dataSource={result?.results}
          rowClassName={rowClassName}
        />
      </TableWrapper>

      <Form
        validateMessages={{ required: t('please-fill-in-this-field') }}
        ref={formRef}
        preserve={false}
        onFinish={async (values) => {
          const result = await getDateObj(values)

          await createAgency(result, session?.user?.accessToken)
            .then(() => {
              success('success', t('the-agency-has-successfully-created'))
              setIsOpen(false)
              formRef.current.resetFields()
            })
            .catch((err) => {
              success(
                'error',
                t(
                  'an-error-occurred-while-creating-the-agency-please-fix-and-try-again'
                )
              )
              const setErrorObj = (er: Partial<IForm>) => {
                let keys!: keyof IForm
                const arr = []
                for (keys in er) {
                  arr.push({
                    name: keys,
                    errors: [er[keys]],
                  })
                }
                return arr
              }
              formRef.current.setFields(setErrorObj(err.response.data))
            })
        }}
        onFinishFailed={({ values, errorFields, outOfDate }) => {
          // eslint-disable-next-line no-console
          console.log('FINISH', values, '@@#', errorFields, 'RES', outOfDate)
        }}
        form={form}
      >
        <AgencyModalWrapper
          title={'Create Agency'}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        >
          <AgencyModal />
          <CollapseWrapper title="Create agent">
            <AgentModal />
          </CollapseWrapper>
          <CollapseWrapper title="Create contract">
            <ContractModal />
          </CollapseWrapper>
        </AgencyModalWrapper>
      </Form>
      <Form
        fields={setFieldsObj(fields!)}
        onFinish={async (values) => {
          const data = {
            ...values,
            phone_number: `+${values.phone_number}`,
          }
          await updateAgencyInfo(isEdithItem, data, session?.user.accessToken)
            .then(() => {
              setIsAgencyModal(false)
              success('success', 'SUCCESS')
              setIsuccess(true)
            })
            .catch((err) => {
              setIsAgencyModal(false)
              success('error', err)
            })
        }}
      >
        <AgencyModalWrapper
          title={'Edit Agency'}
          setIsOpen={setIsAgencyModal}
          isOpen={isAgencyModal}
        >
          <AgencyModal itemID={isEdithItem} getDetailsInfo={getDetailsInfo} />
        </AgencyModalWrapper>
      </Form>
      <Form
        form={form2}
        ref={formRef2}
        onFinish={async (values) => {
          const body = {
            role: values.agent_role,
            phone_number: `+${values.agent_phone_number}`,
            agency: isEdithItem,
          }
          await createAgent(body, session?.user.accessToken)
            .then((res) => {
              success('success', 'Агент успешно создано!')
              setIsuccessAgent(res)
              formRef2.current.resetFields()
            })
            .catch((err) => {
              success('error', 'При создание агента произошла ошибка!')
              const setErrorObj = (er: Partial<IForm>) => {
                let keys!: keyof IForm
                const arr = []
                for (keys in er) {
                  if (keys !== 'phone_number') {
                    arr.push({
                      name: keys,
                      errors: [er[keys]],
                    })
                  } else {
                    arr.push({
                      name: 'agent_phone_number',
                      errors: [er[keys]],
                    })
                  }
                }
                return arr
              }
              formRef2.current.setFields(setErrorObj(err.response.data))
            })
        }}
      >
        <AgencyModalWrapper
          title={'Edit Agent'}
          setIsOpen={setIsAgentModal}
          isOpen={isAgentModal}
          setAddAgent={setAddAgent}
          addAgent={addAgent}
        >
          <AgentEditModal
            id={isEdithItem}
            setEditingKey={setEditingKey}
            editingKey={editingKey}
            addAgent={addAgent}
            setAddAgent={setAddAgent}
            isSuccess={isSuccessAgent}
            setIsuccess={setIsuccessAgent}
          />
        </AgencyModalWrapper>
      </Form>
      <Form
        form={formContract}
        ref={formRefContract}
        onFinish={async (values) => {
          const data = {
            ...values,
            agency: isEdithItem,
            finished_at: values.contract_finished_date,
          }
          const body = (await getDateContractObj(data)) as any

          await createContract(body, session?.user.accessToken)
            .then((res) => {
              success('success', 'Контракт успешно создано!')
              setIsuccessContract(res)
              formRefContract.current.resetFields()
            })
            .catch((err) => {
              success('error', 'При создание контрактa произошла ошибка!')
              const setErrorObj = (er: Partial<IForm>) => {
                let keys!: keyof IForm
                const arr = []
                for (keys in er) {
                  if (keys !== 'phone_number') {
                    arr.push({
                      name: keys,
                      errors: [er[keys]],
                    })
                  } else {
                    arr.push({
                      name: 'agent_phone_number',
                      errors: [er[keys]],
                    })
                  }
                }
                return arr
              }
              formRefContract.current.setFields(setErrorObj(err.response.data))
            })
        }}
      >
        <AgencyModalWrapper
          title={'Edit Contract'}
          setIsOpen={setIsContractModal}
          isOpen={isContractModal}
          setAddAgent={setAddContract}
          addAgent={addContract}
        >
          <ContractEditModal
            id={isEdithItem}
            setEditingKey={setEditingKeyContract}
            editingKey={editingKeyContractContract}
            addContract={addContract}
            isSuccess={isSuccessContract}
            setIsuccess={setIsuccessContract}
          />
        </AgencyModalWrapper>
      </Form>
    </ContentWrapper>
  )
}

export default Agencies
