import { DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import {
  Button,
  Input,
  message,
  Progress,
  Space,
  Typography,
  Upload,
  UploadFile,
  UploadProps,
} from 'antd'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import PhoneInput from 'react-phone-input-2'

import { IconFile } from '@/components/UI/icons/icons'

export interface IFile {
  name: string
  uid: string
  percent?: number
  status?: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AgencyModal = ({ itemID }: { itemID?: string }) => {
  const { t } = useTranslation('common')
  const [isFile, setIsFile] = useState<IFile | undefined>()

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

  const removeUpload = () => {
    setIsFile(() => {
      return undefined
    })
  }

  return (
    <div className="">
      <div className="flex justify-between mb-5 flex-wrap">
        <div className="">
          <p className="mb-2">{t('agency-name')}</p>
          <Input placeholder="Agency name" className="w-[273px] rounded-sm " />
        </div>
        <div className="focus-within:border-blue-400">
          <p className="mb-2">{t('phone-number')}</p>
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
          <p className="mb-2">{t('address')}</p>
          <Input
            placeholder="Location  company"
            className="w-[273px] rounded-sm  "
          />
        </div>
      </div>
      <div className=" border-b-[1px] pb-4 ">
        <p className="mb-2">{t('logo-upload')}</p>
        <div className="flex">
          <Upload
            {...props}
            maxCount={1}
            listType="picture"
            className="flex rounded-sm"
            showUploadList={false}
          >
            <Button icon={<UploadOutlined />}>{t('upload-file')}</Button>
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
                    status={isFile.status === 'error' ? 'exception' : 'normal'}
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
    </div>
  )
}

export default AgencyModal
