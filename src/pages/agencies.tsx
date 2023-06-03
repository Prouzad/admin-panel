import { Form, message } from 'antd'
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { useSession } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import { useMemo, useRef, useState } from 'react'
import React from 'react'
import { useQuery, useQueryClient } from 'react-query'

import filterFileEmpty from '@/components/FilterFunctions/FilterEmptyFiles'
import getAgenciesColumnsHead from '@/components/Table/ColumnsHeads/AgenciesColumnsHead'
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
import { IColumnAgency, IForm } from '@/types'

import {
  createAgency,
  createAgent,
  createContract,
  getAgency,
  getAgencyDetails,
  updateAgencyInfo,
} from '../components/services'

export const filterEmptyValues = (obj: Partial<IForm>) => {
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
  const [isSuccessAgent, setIsuccessAgent] = useState(false)
  const [isSuccessContract, setIsuccessContract] = useState<any>()

  const res = useQuery(
    ['getAgency', filter, isSuccess],
    () => getAgency(session?.user?.accessToken, filter),
    { enabled: !!session?.user?.accessToken }
  )

  const result = res.data

  const handleResetAgent = () => {
    setEditingKey('')
    setAddAgent(false)
    formRef2.current.resetFields()
  }

  const handleResetContract = () => {
    setEditingKeyContract('')
    setAddContract(false)
    formRefContract.current.resetFields()
  }

  const success = (type: any, text: string) => {
    messageApi.open({
      type: type,
      content: text,
      duration: 10,
    })
  }

  const createAgentInModal = async (values) => {
    const body = {
      role: values.agent_role?.trim(),
      phone_number: `+${values.agent_phone_number}`,
      agency: isEdithItem,
    }

    const response = filterEmptyValues(body)
    await createAgent(response, session?.user.accessToken)
      .then((res: any) => {
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
  }

  const queryClient = useQueryClient()

  const getDetailsInfo = async (id: string, token: string) => {
    const res = await getAgencyDetails(id, token)
    setFields(res.data)
  }

  const columnsHead: ColumnsType<IColumnAgency> = getAgenciesColumnsHead(
    t,
    session,
    setIsAgencyModal,
    setIsAgentModal,
    setIsContractModal,
    queryClient,
    filter,
    isSuccess,
    setIsuccess,
    setIsEdithItem
  )

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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns = useMemo(() => columnsHead, [lang, columnsHead])
  const rowClassName = () => 'cursor-pointer'
  return (
    <ContentWrapper>
      <TempBreadCumb data={agenciesCrumb} setIsCreateModal={setIsOpen} />
      {contextHolder}
      <TableWrapper
        style="w-[75%]"
        pageTitle={'agency'}
        fnFilter={(params) => setFilter(params)}
        count={result?.count}
      >
        <Table
          pagination={false}
          columns={columns}
          rowKey="id"
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
      <Form form={form2} ref={formRef2} onFinish={createAgentInModal}>
        <AgencyModalWrapper
          title={'Edit Agent'}
          setIsOpen={setIsAgentModal}
          isOpen={isAgentModal}
          setAddAgent={setAddAgent}
          addAgent={addAgent}
          resetFields={handleResetAgent}
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
              success('success', t('create_contract_message'))
              setIsuccessContract(res)
              formRefContract.current.resetFields()
            })
            .catch((err) => {
              success('error', t('create_contract_filed'))
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
          resetFields={handleResetContract}
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
