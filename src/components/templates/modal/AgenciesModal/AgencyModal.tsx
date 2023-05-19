import { DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import {
  Button,
  Form,
  Input,
  Space,
  Typography,
  Upload,
  UploadProps,
} from 'antd'
import useTranslation from 'next-translate/useTranslation'
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
  const props: UploadProps = {
    name: 'logo',
   
    beforeUpload: () => {
      return false
    },
    listType: 'picture',
    className: 'flex rounded-sm',
  }

  return (
    <div className="">
      <div className="flex justify-between mb-5 flex-wrap">
        <div className="">
          <p className="mb-2">{t('agency-name')}</p>
          <Form.Item name="name" rules={[{ required: true }]}>
            <Input
              placeholder={t('agency-name')}
              className="w-[273px] rounded-sm "
              required
            />
          </Form.Item>
        </div>
        <div className="focus-within:border-blue-400">
          <p className="mb-2">{t('phone-number')}</p>
          <Form.Item
            name={'phone_number'}
            rules={[{ required: true, len: 12 }]}
          >
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
          </Form.Item>
        </div>
        <div className="">
          <p className="mb-2">{t('address')}</p>
          <Form.Item name={'address'} rules={[{ required: true }]}>
            <Input
              placeholder={t('address')}
              className="w-[273px] rounded-sm  "
            />
          </Form.Item>
        </div>
      </div>
      <div className=" border-b-[1px] pb-4 ">
        <p className="mb-2">{t('logo-upload')}</p>
        <div className="flex">
          <Form.Item name={'logo'}>
            <Upload
              {...props}
              itemRender={(_, file, _2, { remove }) => {
                return (
                  <div className="flex item-center">
                    <Space className="flex items-center justify-between  ml-4 border rounded-sm w-[200px] h-8">
                      <IconFile className="ml-2" />

                      <Typography className="max-w-[118px] mr-2 truncate	">
                        {file?.name}
                      </Typography>
                      <Button
                        type="link"
                        className="w-[10px] flex items-center justify-center mr-1"
                        onClick={remove}
                      >
                        <DeleteOutlined className=" text-red-500" />
                      </Button>
                    </Space>
                  </div>
                )
              }}
              maxCount={1}
              multiple={false}
              showUploadList={true}
            >
              <Button icon={<UploadOutlined />}>{t('upload-file')}</Button>
            </Upload>
          </Form.Item>
        </div>
      </div>
    </div>
  )
}

export default AgencyModal
