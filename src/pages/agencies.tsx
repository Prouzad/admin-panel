import {
  CheckCircleFilled,
  CloseCircleFilled,
  EllipsisOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Button, Dropdown, Space } from 'antd'
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import useTranslation from 'next-translate/useTranslation'
import { useMemo, useState } from 'react'
import React from 'react'

import { agenciesCrumb } from '@/components/templates/BreadCumb/BREADCRUMB_DATA'
import TempBreadCumb from '@/components/templates/BreadCumb/tempBreadCumb'
import AgencyModal from '@/components/templates/modal/AgenciesModal/AgencyModal'
import AgentModal from '@/components/templates/modal/AgenciesModal/AgentModal'
import CollapseWrapper from '@/components/templates/modal/AgenciesModal/CollapseWrapper'
import ContractModal from '@/components/templates/modal/AgenciesModal/ContractModal'
import AgencyModalWrapper from '@/components/templates/modal/AgenciesModal/Modal'
import TableWrapper from '@/components/templates/tables/HeadTable'
import ContentWrapper from '@/components/templates/wrapper/contentWrapper'
import fakeData from '@/MOCK_DATA'

interface IColumnAgency {
  id: string
  agency_name: string
  adress: string
  agent_number: string
  contract_count: string
  able_disable: string
  action: string
}

const Agencies = () => {
  const { t, lang } = useTranslation('agencies')
  const [isOpen, setIsOpen] = useState(false)
  const [isAgencyModal, setIsAgencyModal] = useState(false)
  const [isAgentModal, setIsAgentModal] = useState(false)
  const [isContractModal, setIsContractModal] = useState(false)
  const [isEdithItem, setIsEdithItem] = useState('')

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
      dataIndex: 'company_name',
      key: 'agency_name',
    },
    {
      title: t('adress'),
      key: 'adress',
      dataIndex: 'adress',
    },
    {
      title: t('agent-number'),
      dataIndex: 'id',
      key: 'agent_number',
    },

    {
      title: t('contract-count'),
      dataIndex: 'id',
      key: 'contract_count',
    },

    {
      title: t('able-disable'),
      dataIndex: 'able_disable',
      key: 'able_disable',
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

  const data = useMemo(() => fakeData, []) as any
  const columns = useMemo(() => columnsHead, [lang])

  return (
    <ContentWrapper>
      <TempBreadCumb data={agenciesCrumb} setIsCreateModal={setIsOpen} />
      <TableWrapper style="w-[75%]">
        <Table columns={columns} dataSource={data} />
      </TableWrapper>

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
