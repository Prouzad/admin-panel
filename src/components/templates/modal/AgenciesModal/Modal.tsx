import { CheckOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Form, Modal } from 'antd'
import useTranslation from 'next-translate/useTranslation'
import { ReactNode } from 'react'

const AgencyModalWrapper = ({
  children,
  isOpen,
  setIsOpen,
  title,
  setAddAgent,
  addAgent,
  resetFields,
}: {
  children: ReactNode
  isOpen: boolean
  setIsOpen: (arg: boolean) => void
  title: string
  setAddAgent?: (arg: boolean) => void
  addAgent?: boolean
  resetFields?: () => void
}) => {
  const form = Form.useFormInstance()
  const { t } = useTranslation('common')
  const titleT = t(title)

  return (
    <Modal
      title={titleT}
      afterOpenChange={resetFields}
      centered
      open={isOpen}
      style={{ marginTop: 25, marginBottom: 25 }}
      maskStyle={{ backdropFilter: 'blur(5px)' }}
      onCancel={() => setIsOpen(false)}
      width={900}
      footer={[
        <div
          key="save"
          className={`w-full flex items-end  ${
            title === 'Edit Agent' || title === 'Edit Contract'
              ? 'justify-between'
              : 'justify-end'
          }`}
        >
          {setAddAgent ? (
            <>
              <Button
                key="save"
                onClick={() => setAddAgent(true)}
                type="ghost"
                className={`${
                  !addAgent ? 'bg-[#2173DF]' : 'bg-slate-300'
                } text-white text-sm h-[34px] px-4 rounded-sm flex  items-center `}
                icon={<PlusOutlined />}
              >
                {title === 'Edit Agent' ? 'Add agent' : 'Add contract'}
              </Button>
              {addAgent ? (
                <Button
                  key="save"
                  onClick={() => form.submit()}
                  type="ghost"
                  htmlType="submit"
                  className={`bg-[#2173DF] text-white text-sm h-[34px] px-4 rounded-sm flex  items-center`}
                  icon={<CheckOutlined />}
                >
                  {t('save')}
                </Button>
              ) : (
                <Button
                  key="save"
                  onClick={() => setIsOpen(false)}
                  type="ghost"
                  className={`bg-[#2173DF] text-white text-sm h-[34px] px-4 rounded-sm flex  items-center`}
                  icon={<CheckOutlined />}
                >
                  close
                </Button>
              )}
            </>
          ) : (
            <Button
              key="save"
              onClick={() => form.submit()}
              type="ghost"
              htmlType="submit"
              className={`bg-[#2173DF] text-white text-sm h-[34px] px-4 rounded-sm flex  items-center`}
              icon={<CheckOutlined />}
            >
              {t('save')}
            </Button>
          )}
        </div>,
      ]}
    >
      {children}
    </Modal>
  )
}

export default AgencyModalWrapper
