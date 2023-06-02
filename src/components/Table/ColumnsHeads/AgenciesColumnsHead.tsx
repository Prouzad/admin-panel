import {
  CheckCircleFilled,
  CloseCircleFilled,
  EllipsisOutlined,
} from '@ant-design/icons'
import { Button, Dropdown, Space } from 'antd'
import { ColumnsType } from 'antd/es/table'

import { disableAgency, enableAgency } from '@/components/services'
import { IColumnAgency } from '@/types'

const getAgenciesColumnsHead = (
  t: any,
  session: any,
  setIsAgencyModal: any,
  setIsAgentModal: any,
  setIsContractModal: any,
  queryClient: any,
  filter: any,
  isSuccess: boolean,
  setIsuccess: any,
  setIsEdithItem: any
): ColumnsType<IColumnAgency> => {
  return [
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
              menu={{
                items: [
                  {
                    label: (
                      <Space
                        onClick={() => setIsAgencyModal(true)}
                        className="w-full"
                      >
                        {t('agency')}
                      </Space>
                    ),
                    key: '0',
                  },
                  {
                    label: (
                      <Space
                        onClick={() => setIsAgentModal(true)}
                        className="w-full"
                      >
                        {t('agent')}
                      </Space>
                    ),
                    key: '1',
                  },
                  {
                    label: (
                      <Space
                        onClick={() => setIsContractModal(true)}
                        className="w-full"
                      >
                        {t('contract')}
                      </Space>
                    ),
                    key: '2',
                  },
                  {
                    label: (
                      <Space
                        className="w-full"
                        onClick={async () => {
                          if (action.is_active) {
                            await disableAgency(
                              action.id,
                              session?.user?.accessToken
                            )
                          } else {
                            await enableAgency(
                              action.id,
                              session?.user.accessToken
                            )
                          }
                          queryClient.invalidateQueries([
                            'getAgency',
                            filter,
                            isSuccess,
                          ])
                        }}
                      >
                        {action.is_active ? t('disabled') : t('enable')}
                      </Space>
                    ),
                    key: '3',
                  },
                ],
              }}
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
}

export default getAgenciesColumnsHead
