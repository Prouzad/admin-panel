import { CheckOutlined } from '@ant-design/icons'
import { Button, Modal } from 'antd'
import useTranslation from 'next-translate/useTranslation'
import { ReactNode } from 'react'

const AgencyModalWrapper = ({
  children,
  isOpen,
  setIsOpen,
  handleSave,
  title,
}: {
  children: ReactNode
  isOpen: boolean
  setIsOpen: (arg: boolean) => void
  handleSave: () => void
  title: string
}) => {
  const { t } = useTranslation('common')
  const titleT = t(title)
  return (
    <Modal
      title={titleT}
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
            {t('save')}
          </Button>
        </div>,
      ]}
    >
      {children}
    </Modal>
  )
}

export default AgencyModalWrapper
