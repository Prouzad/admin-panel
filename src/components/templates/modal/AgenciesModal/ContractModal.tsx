import { DeleteOutlined, UploadOutlined } from '@ant-design/icons'
import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  Space,
  Typography,
  Upload,
} from 'antd'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

import { IconFile } from '@/components/UI/icons/icons'

const ContractModal = ({ itemID }: { itemID?: string }) => {
  const { t } = useTranslation('common')
  const [isDate, setIsDate] = useState()
  const [isDisable, setIsDisable] = useState(true)
  const props: any = {
    beforeUpload: () => {
      return false
    },
    listType: 'picture',
    className: 'flex rounded-sm',
  }

  function disabledDate(current: any) {
    return current && current.isBefore(isDate, 'day')
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
            <Form.Item name={'contract_number'} rules={[{ required: true }]}>
              <InputNumber
                controls={false}
                onChange={() => 'fsdf'}
                value={itemID || null}
                placeholder="111-111-111"
                style={{ width: 266, borderRadius: 2 }}
              />
            </Form.Item>
          </div>
          <div className="flex flex-col mx-4">
            <p className="mb-2">{t('upload-contract-file')}</p>
            <div className="flex   ">
              <Form.Item name={'contract_file'} rules={[{ required: true }]}>
                <Upload
                  {...props}
                  accept="application/pdf"
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
        <div className=" mt-4">
          <Space direction="vertical">
            <p>{t('contract-date')}</p>
            <Form.Item name={'contract_date'} rules={[{ required: true }]}>
              <DatePicker
                onChange={(date: any) => {
                  if (date) {
                    setIsDate(date)
                    setIsDisable(false)
                    return
                  }
                  setIsDisable(true)
                }}
                className="w-[266px]"
              />
            </Form.Item>
          </Space>
          <Space direction="vertical" className="mx-4">
            <p>{t('finished-date')}</p>
            <Form.Item name={'contract_finished_date'}>
              <DatePicker
                disabled={isDisable}
                className="w-[266px]"
                disabledDate={disabledDate}
              />
            </Form.Item>
          </Space>
        </div>
      </div>
    </>
  )
}

export default ContractModal
