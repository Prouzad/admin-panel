import { DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import {
  Button,
  DatePicker,
  InputNumber,
  message,
  Progress,
  Space,
  Switch,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

import { IconFile } from '@/components/UI/icons/icons'

import { IFile } from './AgencyModal'

const ContractModal = ({ itemID }: { itemID?: string }) => {
  const { t } = useTranslation('common')
  const [isContractFile, setIsContractFile] = useState<IFile | undefined>()

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

      if (info.file.status !== 'uploading') {
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

  const removeContractUpload = () => {
    setIsContractFile(() => {
      return undefined
    })
  }

  return (
    <>
      <div
        style={{
          borderBottom: '1px solid #e8e8e8',
        }}
      ></div>
      <div className="">
        <div style={{ padding: '16px 0' }} className="flex items-end">
          <div className="">
            <p className="mb-2">{t('contract-number')}</p>
            <InputNumber
              controls={false}
              onChange={() => 'fsdf'}
              value={itemID || null}
              placeholder="111-111-111"
              style={{ width: 266, borderRadius: 2 }}
            />
          </div>
          <div className="flex flex-col mx-4">
            <p className="mb-2">{t('logo-upload')}</p>
            <div className="flex   ">
              {' '}
              <Upload
                {...propsContract}
                maxCount={1}
                listType="picture"
                className="flex rounded-sm"
                showUploadList={false}
              >
                <Button icon={<UploadOutlined />}>{t('upload-file')}</Button>
              </Upload>
              <div className="flex item-center">
                {isContractFile && (
                  <Space className="flex items-center justify-between  ml-4 border rounded-sm w-[200px]">
                    {isContractFile.status !== 'done' ? (
                      <Progress
                        type="circle"
                        percent={Math.ceil(isContractFile!.percent! * 100)}
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
            <p className="mr-2">{t('is-canceled')}</p>
            <Switch defaultChecked onChange={() => 'rewe'} />
          </div>
        </div>
        <div className=" mt-4">
          <Space direction="vertical">
            <p>{t('contract-date')}</p>
            <DatePicker onChange={() => 'ttest'} className="w-[266px]" />
          </Space>
          <Space direction="vertical" className="mx-4">
            <p>{t('finished-date')}</p>
            <DatePicker onChange={() => 'ttest'} className="w-[266px]" />
          </Space>
          <Space direction="vertical">
            <p>{t('canceled-date')}</p>
            <DatePicker onChange={() => 'ttest'} className="w-[266px]" />
          </Space>
        </div>
      </div>
    </>
  )
}

export default ContractModal
