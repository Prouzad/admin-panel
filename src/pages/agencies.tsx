import {
  CheckCircleFilled,
  CheckOutlined,
  CloseCircleFilled,
  DeleteOutlined,
  EllipsisOutlined,
  MinusOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import { QuestionCircleOutlined } from '@ant-design/icons'
import { UploadOutlined } from '@ant-design/icons'
import type { MenuProps, UploadFile } from 'antd'
import type { UploadProps } from 'antd'
import {
  Button,
  Collapse,
  Dropdown,
  InputNumber,
  Modal,
  Progress,
  Space,
  Switch,
  Typography,
  Upload,
} from 'antd'
import { Select } from 'antd'
import { Table } from 'antd'
import { DatePicker, Input } from 'antd'
import { message } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { agenciesCrumb } from 'BREADCRUMB_DATA'
import { useMemo, useState } from 'react'
import React from 'react'
import PhoneInput from 'react-phone-input-2'

const { Search } = Input
const { RangePicker } = DatePicker
const { Panel } = Collapse

import TempBreadCumb from '@/components/templates/BreadCumb/tempBreadCumb'
import ContentWrapper from '@/components/templates/wrapper/contentWrapper'
import { IconFile } from '@/components/UI/icons/icons'
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

interface IFile {
  name: string
  uid: string
  percent?: number
  status?: string
}

const Agencies = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isFile, setIsFile] = useState<IFile | undefined>()
  const [isContractFile, setIsContractFile] = useState<IFile | undefined>()

  const props: UploadProps = {
    name: 'file',

    onChange(info) {
      const getFileObject = (file: UploadFile<any>) => {
        setIsFile({
          name: file.name,
          uid: file.uid,
          percent: file.percent,
          status: file.status,
        })
      }
      // eslint-disable-next-line no-console
      console.log('INFO', info)

      if (info.file.status !== 'uploading') {
        // eslint-disable-next-line no-console
        getFileObject(info.file)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
        getFileObject(info.file)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file don't uploaded`)
        getFileObject(info.file)
      }
    },
  }
  const propsContract: UploadProps = {
    name: 'file',

    onChange(info) {
      const getFileObject = (file: UploadFile<any>) => {
        setIsContractFile({
          name: file.name,
          uid: file.uid,
          percent: file.percent,
          status: file.status,
        })
      }
      // eslint-disable-next-line no-console
      console.log('INFO', info)

      if (info.file.status !== 'uploading') {
        // eslint-disable-next-line no-console
        getFileObject(info.file)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
        getFileObject(info.file)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file don't uploaded`)
        getFileObject(info.file)
      }
    },
  }

  const removeUpload = () => {
    setIsFile(() => {
      return undefined
    })
  }
  const removeContractUpload = () => {
    setIsContractFile(() => {
      return undefined
    })
  }

  const items: MenuProps['items'] = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: '0',
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: '1',
    },

    {
      label: '3rd menu item',
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
      title: 'AGENCY NAME',
      dataIndex: 'company_name',
      key: 'agency_name',
    },
    {
      title: 'ADRESS',
      key: 'adress',
      dataIndex: 'adress',
    },
    {
      title: 'AGENT NUMBER',
      dataIndex: 'id',
      key: 'agent_number',
    },

    {
      title: 'CONTRACT COUNT',
      dataIndex: 'id',
      key: 'contract_count',
    },

    {
      title: 'ABLE / DISABLE',
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
      title: 'ACTION',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: () => {
        return (
          <>
            <Dropdown
              menu={{ items }}
              trigger={['click']}
              placement={'bottomLeft'}
              overlayStyle={{ borderRadius: 0, width: 150 }}
            >
              <a>
                <Button className="border-0">
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
  const columns = useMemo(() => columnsHead, [])

  const CollapseHeader = ({ title }: { title: string }) => {
    return (
      <>
        <p className="font-semibold p-0 text-base">{title}</p>
      </>
    )
  }

  const CollapseButton = (props: any) => {
    // eslint-disable-next-line prettier/prettier, no-console
		console.log("PROPS@@@@", props)
    return (
      <>
        <Button
          type="ghost"
          className="bg-[#2173DF] text-white h-[34px] px-2 rounded-sm flex items-center"
          icon={props.props.isActive ? <MinusOutlined /> : <PlusOutlined />}
        >
          <p className="ml-2">{props.title}</p>
        </Button>
      </>
    )
  }
  return (
    <ContentWrapper>
      <TempBreadCumb data={agenciesCrumb} setIsCreateModal={setIsOpen} />
      <div className={`pb-5 w-[75%]`}>
        <div className="px-5 pb-0  bg-white rounded-lg  ">
          <div className="flex flex-wrap h-20 items-center">
            <div className="flex mx-6">
              <div className="flex items-center mr-2">
                <p className="text-sm"> Rule Name </p>{' '}
                <div className="flex items-center justify-center">
                  <QuestionCircleOutlined className=" ml-1" />
                  <p className="ml-1">:</p>
                </div>
              </div>
              <Search
                placeholder="Please enter"
                allowClear
                style={{
                  width: 232,
                }}
                // onSearch={(value: string) => {}}
              />
            </div>
            <div className="mr-6">
              <RangePicker
                onChange={(value) => {
                  return value
                }}
              />
            </div>
            <div className="">
              <Select
                defaultValue="status filter"
                listItemHeight={1}
                listHeight={100}
                style={{ width: 148, borderRadius: 0 }}
                // onChange={handleChange}
                // onSelect={handleSelect}
                options={[
                  {
                    value: 'status filter',
                    label: 'Status filter',
                    disabled: true,
                  },
                  {
                    value: 'approved',
                    label: 'Approved',
                  },
                  { value: 'To_moderation', label: 'To Moderation' },
                  { value: 'rejected', label: 'Rejected' },
                ]}
              />
            </div>
          </div>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
      <Modal
        title="Create Agency"
        centered
        open={isOpen}
        style={{ marginTop: 25, marginBottom: 25 }}
        maskStyle={{ backdropFilter: 'blur(5px)' }}
        onCancel={() => setIsOpen(false)}
        width={900}
        footer={[
          <div key="save" className="w-full flex items-end justify-end">
            <Button
              key="save"
              onClick={handleSave}
              type="ghost"
              className="bg-[#2173DF] text-white text-sm h-[34px] px-4 rounded-sm flex  items-center "
              icon={<CheckOutlined />}
            >
              Save
            </Button>
          </div>,
        ]}
      >
        <div className="flex justify-between mb-5 flex-wrap">
          <div className="">
            <p className="mb-2">Agency name</p>
            <Input
              placeholder="Agency name"
              className="w-[273px] rounded-sm "
            />
          </div>
          <div className="focus-within:border-blue-400">
            <p className="mb-2">Phone number</p>
            <PhoneInput
              specialLabel=""
              country="uz"
              alwaysDefaultMask
              inputProps={{
                placeholder: '+998 --  ---  --  --',
                required: true,
              }}
              defaultMask=".. ... - .. - .."
              inputClass={`w-[273px] border p-1 px-2 rounded-sm hover:border-blue-400 focus:outline-none focus:blue focus:blue-400 `}
            />
          </div>
          <div className="">
            <p className="mb-2">Address</p>
            <Input
              placeholder="Location  company"
              className="w-[273px] rounded-sm  "
            />
          </div>
        </div>
        <div className=" border-b-[1px] pb-4 ">
          <p className="mb-2">Logo upload</p>
          <div className="flex">
            <Upload
              {...props}
              maxCount={1}
              listType="picture"
              className="flex rounded-sm"
              showUploadList={false}
            >
              <Button icon={<UploadOutlined />}>Upload file</Button>
            </Upload>
            <div className="flex flex-wrap gap-2">
              {isFile && (
                <Space className="flex items-center justify-between  ml-4 border rounded-sm w-[200px]">
                  {isFile.status !== 'done' ? (
                    <Progress
                      type="circle"
                      percent={Math.ceil(isFile!.percent! * 100)}
                      size={26}
                      className="ml-2"
                      status={
                        isFile.status === 'error' ? 'exception' : 'normal'
                      }
                    />
                  ) : (
                    <IconFile className="ml-2" />
                  )}

                  <Typography className="max-w-[118px] mr-4">
                    {isFile.name}
                  </Typography>
                  <Button
                    type="link"
                    className="w-[10px] flex items-center justify-center"
                    onClick={removeUpload}
                  >
                    <DeleteOutlined className=" text-red-500" />
                  </Button>
                </Space>
              )}
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className=""></div>
          <Collapse
            expandIconPosition={'end'}
            expandIcon={(props) => {
              // eslint-disable-next-line no-console
              console.log('PROPS', props)
              return <CollapseButton props={props} title={'Create agent'} />
            }}
            ghost
            style={{
              margin: 0,
              padding: 0,
            }}
            onChange={() => {
              return 'as'
            }}
          >
            <Panel
              style={{
                border: 'none',
                borderBottom: '1px solid #e8e8e8',
                marginBottom: 16,
                padding: '16px 0',
              }}
              header={<CollapseHeader title={'Create agent'} />}
              key="1"
            >
              <div
                style={{
                  borderBottom: '1px solid #e8e8e8',
                }}
              ></div>
              <div style={{ padding: '16px 0' }} className="flex items-end">
                <div className="">
                  <p className="mb-2">Phone number</p>
                  <PhoneInput
                    specialLabel=""
                    country="uz"
                    alwaysDefaultMask
                    inputProps={{
                      placeholder: '+998 --  ---  --  --',
                      required: true,
                    }}
                    defaultMask=".. ... - .. - .."
                    inputClass={`w-[273px] border p-1 px-2 rounded-sm hover:border-blue-400 focus:outline-none focus:blue focus:blue-400 `}
                  />
                </div>
                <div className=" mx-4">
                  <p className="mb-2">Role</p>
                  <Select
                    defaultValue="disabled"
                    style={{ width: 120, borderRadius: 2 }}
                    onChange={() => 'asds'}
                    options={[
                      { value: 'disabled', label: 'Choose', disabled: true },
                      { value: 'owner', label: 'Owner' },
                      { value: 'lucy', label: 'Lucy' },
                      { value: 'Yiminghe', label: 'yiminghe' },
                    ]}
                  />
                </div>
                <div className="flex h-8 items-center">
                  <p className="mr-2">Is verified</p>
                  <Switch defaultChecked onChange={() => 'rewe'} />
                </div>
              </div>
            </Panel>
          </Collapse>
          <div className="w-full">
            <Collapse
              expandIconPosition={'end'}
              expandIcon={(props) => {
                // eslint-disable-next-line no-console
                console.log('PROPS', props)
                return (
                  <CollapseButton props={props} title={'Create contract'} />
                )
              }}
              ghost
              style={{
                margin: 0,
                padding: 0,
              }}
              onChange={() => {
                return 'as'
              }}
            >
              <Panel
                style={{
                  border: 'none',
                  borderBottom: '1px solid #e8e8e8',
                  marginBottom: 16,
                  padding: '16px 0',
                }}
                header={<CollapseHeader title={'Create Contract'} />}
                key="1"
              >
                <div
                  style={{
                    borderBottom: '1px solid #e8e8e8',
                  }}
                ></div>
                <div className="">
                  <div style={{ padding: '16px 0' }} className="flex items-end">
                    <div className="">
                      <p className="mb-2">Contract number</p>
                      <InputNumber
                        controls={false}
                        onChange={() => 'fsdf'}
                        placeholder="111-111-111"
                        style={{ width: 266, borderRadius: 2 }}
                      />
                    </div>
                    <div className="flex flex-col mx-4">
                      <p className="mb-2">Logo upload</p>
                      <div className="flex   ">
                        {' '}
                        <Upload
                          {...propsContract}
                          maxCount={1}
                          listType="picture"
                          className="flex rounded-sm"
                          showUploadList={false}
                        >
                          <Button icon={<UploadOutlined />}>Upload file</Button>
                        </Upload>
                        <div className="flex item-center">
                          {isContractFile && (
                            <Space className="flex items-center justify-between  ml-4 border rounded-sm w-[200px]">
                              {isContractFile.status !== 'done' ? (
                                <Progress
                                  type="circle"
                                  percent={Math.ceil(
                                    isContractFile!.percent! * 100
                                  )}
                                  size={26}
                                  className="ml-2"
                                  status={
                                    isContractFile.status === 'error'
                                      ? 'exception'
                                      : 'normal'
                                  }
                                />
                              ) : (
                                <IconFile className="ml-2" />
                              )}

                              <Typography className="max-w-[118px] mr-4">
                                {isContractFile.name}
                              </Typography>
                              <Button
                                type="link"
                                className="w-[10px] flex items-center justify-center"
                                onClick={removeContractUpload}
                              >
                                <DeleteOutlined className=" text-red-500" />
                              </Button>
                            </Space>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex h-8 items-center">
                      <p className="mr-2">Is verified</p>
                      <Switch defaultChecked onChange={() => 'rewe'} />
                    </div>
                  </div>
                  <div className=" mt-4">
                    <Space direction="vertical">
                      <p>Contact date</p>
                      <DatePicker
                        onChange={() => 'ttest'}
                        picker="month"
                        className="w-[266px]"
                      />
                    </Space>
                    <Space direction="vertical" className="mx-4">
                      <p>Finished date</p>
                      <DatePicker
                        onChange={() => 'ttest'}
                        picker="month"
                        className="w-[266px]"
                      />
                    </Space>
                    <Space direction="vertical">
                      <p>Canceled date</p>
                      <DatePicker
                        onChange={() => 'ttest'}
                        picker="month"
                        className="w-[266px]"
                      />
                    </Space>
                  </div>
                </div>
              </Panel>
            </Collapse>
          </div>
        </div>
      </Modal>
    </ContentWrapper>
  )
}

export default Agencies
