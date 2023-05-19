import {
  CheckCircleFilled,
  CloseCircleFilled,
  EllipsisOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Dropdown, Form, Space } from 'antd'
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { useSession } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import { useMemo, useState } from 'react'
import React from 'react'
import { useQuery } from 'react-query'

import { agenciesCrumb } from '@/components/templates/BreadCumb/BREADCRUMB_DATA'
import TempBreadCumb from '@/components/templates/BreadCumb/tempBreadCumb'
import AgencyModal from '@/components/templates/modal/AgenciesModal/AgencyModal'
import AgentModal from '@/components/templates/modal/AgenciesModal/AgentModal'
import CollapseWrapper from '@/components/templates/modal/AgenciesModal/CollapseWrapper'
import ContractModal from '@/components/templates/modal/AgenciesModal/ContractModal'
import AgencyModalWrapper from '@/components/templates/modal/AgenciesModal/Modal'
import TableWrapper from '@/components/templates/tables/HeadTable'
import ContentWrapper from '@/components/templates/wrapper/contentWrapper'

import { createAgency, getAgency } from './api/services'

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
  logo?: string
  agent_phone_number: string
  agent_role?: string
  contract_number: string
  contract_file?: string
  contract_date: string
  contract_finished_date?: string
}

const Agencies = () => {
  const { data: session } = useSession()
  const [form] = Form.useForm<IForm>()
  const [filter, setFilter] = useState([])
  const { t, lang } = useTranslation('agencies')
  const [isOpen, setIsOpen] = useState(false)
  const [isAgencyModal, setIsAgencyModal] = useState(false)
  const [isAgentModal, setIsAgentModal] = useState(false)
  const [isContractModal, setIsContractModal] = useState(false)
  const [isEdithItem, setIsEdithItem] = useState('')
  const res = useQuery(
    ['Requests', filter],
    () => getAgency(session?.user?.accessToken, filter),
    { enabled: !!session?.user?.accessToken }
  )

  const result = res.data

  const handleFilter = (params: any) => {
    setFilter(params)
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
      dataIndex: 'adress',
    },
    {
      title: t('agent-number'),
      dataIndex: 'agents_count',
      key: 'agent_number',
    },

    {
      title: t('contract-count'),
      dataIndex: 'id',
      key: 'contracts_count',
    },

    {
      title: t('able-disable'),
      dataIndex: 'is_active',
      key: 'is_active',
      align: 'center',
      render: (_: any, { able_disable }) => {
        if (able_disable) {
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

  const handleSave = () => {
    setIsOpen(false)
  }

  const filterEmptyValues = (obj: IForm) => {
    if (obj !== undefined && obj !== null) {
      const filteredEntries = Object.entries(obj).filter(([_, value]) => {
        return value !== '' && value !== null && value !== undefined
      })
      return Object.fromEntries(filteredEntries)
    }
    return null
  }

  const filterFileEmpty = async (obj: string) => {
    if (obj && obj?.fileList.length !== 0) {
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

  const columns = useMemo(() => columnsHead, [lang])
  const rowClassName = () => 'cursor-pointer'
  return (
    <ContentWrapper>
      <TempBreadCumb data={agenciesCrumb} setIsCreateModal={setIsOpen} />
      <TableWrapper
        style="w-[75%]"
        pageTitle={'agency'}
        fnFilter={handleFilter}
        count={result?.count}
      >
        <Table
          columns={columns}
          dataSource={result?.results}
          rowClassName={rowClassName}
        />
      </TableWrapper>

      <Form
        onFinish={async (values) => {
          const result = filterEmptyValues(values)
          const body = {}

          if (values.logo) {
            body.logo = await filterFileEmpty(values?.logo)
          }

          if(values.)
          // eslint-disable-next-line no-console

          // if (
          //   result &&
          //   Object.keys(result).includes('contract_file') &&
          //   result?.contract_file?.fileList.length !== 0
          // ) {
          //   new Promise((resolve, reject) => {
          //     const fileReader = new FileReader()

          //     fileReader.readAsDataURL(result?.contract_file?.file)

          //     fileReader.onload = () => {
          //       resolve(fileReader.result)
          //     }

          //     fileReader.onerror = (error) => {
          //       reject(error)
          //     }
          //   })
          //     .then((res) => (result.contract_file = res))
          //     // eslint-disable-next-line no-console
          //     .catch((err) => console.log(err))
          // } else if (
          //   result?.contract_file &&
          //   result?.contract_file?.fileList.length === 0
          // ) {
          //   delete result.contract_file
          // }
          // const res = await createAgency(result, session?.user?.accessToken)

          console.log('CREATE', body)
        }}
        onFinishFailed={() => {
          // eslint-disable-next-line no-console
          console.log('FINISH')
        }}
        // onValuesChange={(values) => {
        //   console.log('ONFINISH', values)
        // }}
        form={form}
      >
        <AgencyModalWrapper
          title={'Create Agency'}
          handleSave={handleSave}
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
      <AgencyModalWrapper
        title={'Edit Agency'}
        handleSave={handleSave}
        setIsOpen={setIsAgencyModal}
        isOpen={isAgencyModal}
      >
        <AgencyModal itemID={isEdithItem} />
      </AgencyModalWrapper>
      <AgencyModalWrapper
        title={'Edit Agent'}
        handleSave={handleSave}
        setIsOpen={setIsAgentModal}
        isOpen={isAgentModal}
      >
        <AgentModal itemID={isEdithItem} />
      </AgencyModalWrapper>
      <AgencyModalWrapper
        title={'Edit Contract'}
        handleSave={handleSave}
        setIsOpen={setIsContractModal}
        isOpen={isContractModal}
      >
        <ContractModal itemID={isEdithItem} />
      </AgencyModalWrapper>
    </ContentWrapper>
  )
}

export default Agencies
