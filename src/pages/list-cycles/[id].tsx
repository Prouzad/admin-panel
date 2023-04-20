import { ReloadOutlined } from '@ant-design/icons'
import { Button, Descriptions, Modal } from 'antd'
import { advertCyclesDescriptionCrumb } from 'BREADCRUMB_DATA'
// import Image from 'next/image'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

// import img from '@/components/assets/images/image.jpg'
import TempBreadCumb from '@/components/templates/BreadCumb/tempBreadCumb'
// import { checkColor } from '@/components/templates/tables/RequestTable'
import ContentWrapper from '@/components/templates/wrapper/contentWrapper'
import { IconDone } from '@/components/UI/icons/icons'
import fakeData from '@/MOCK_DATA'

const RequestDescription = () => {
  const [isOpenReject, setIsOpenReject] = useState(false)
  const [isOpenConfirm, setIsOpenConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const id = (router.query.id as string) || []
  const res = fakeData.find((item) => {
    return item.id === id
  })

  const handleSubmit = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => {
        setIsOpenConfirm(false)
      }, 1000)
    }, 3000)
  }

  const handleReject = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => {
        setIsOpenReject(false)
      }, 1000)
    }, 3000)
  }

  const DescTitle = () => {
    const { t } = useTranslation('requests')
    return (
      <div className="flex justify-between flex-wrap">
        <p>{t('description-ads')}</p>
        <div className="flex">
          <Button
            type="primary"
            danger
            className="flex items-center rounded-sm"
            onClick={() => {
              setIsOpenReject(true)
            }}
          >
            <ReloadOutlined className="text-[10px]" />
            Reject
          </Button>
          <Button
            type="ghost"
            className="bg-green-600 hover:bg-green-500 text-white border-none rounded-sm flex items-center ml-5"
            onClick={() => {
              setIsOpenConfirm(true)
            }}
          >
            <IconDone className="text-[10px]" />
            Confirm
          </Button>
        </div>
      </div>
    )
  }

  return (
    <ContentWrapper>
      <TempBreadCumb data={advertCyclesDescriptionCrumb} />
      <div className="col-start-3 col-end-10">
        <div className="p-5 overflow-x-auto bg-white rounded-lg">
          {' '}
          <Descriptions title={<DescTitle />} layout="vertical" bordered>
            <Descriptions.Item label="Ads id">5423412</Descriptions.Item>
            <Descriptions.Item label="File">
              https://lb.api.cdn.uzcl...
            </Descriptions.Item>
            <Descriptions.Item label="Company name">
              “NAMUNA-DIYOR XIIChK” MCHJ , Uzbekistan
            </Descriptions.Item>
            <Descriptions.Item label="Type of Ads">Stories</Descriptions.Item>
            <Descriptions.Item label="Duration">
              1 Week / 3 days
            </Descriptions.Item>
            <Descriptions.Item label="Views">12 232 421</Descriptions.Item>
            <Descriptions.Item label="Is finished">
              {res?.upload_time}
            </Descriptions.Item>
            <Descriptions.Item label="Moderator">Mr Arabboy</Descriptions.Item>
            <Descriptions.Item label="Type of Ads">Stories</Descriptions.Item>
            <Descriptions.Item label="Phone number">
              +998 93 234 65 63
            </Descriptions.Item>
            <Descriptions.Item label="Payment" span={2}>
              32 000 000 UZS
            </Descriptions.Item>
            <Descriptions.Item label="Target Ads" span={3}>
              {res?.upload_time}
            </Descriptions.Item>
            <Descriptions.Item label="Uploaded content">
              {res?.upload_time}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
      <Modal
        open={isOpenReject}
        maskStyle={{ backdropFilter: 'blur(5px)' }}
        title="Enter the reason for rejecting the ad !"
        closable={!isLoading}
        maskClosable={!isLoading}
        onCancel={() => {
          setIsOpenReject(false)
        }}
        centered
        footer={[]}
      >
        <div className="w-full flex item-center justify-center ">
          <Button
            className="w-[524px] h-8 flex items-center justify-center rounded-sm bg-red-100 text-red-500 font-medium cursor-pointer border-0"
            danger
            loading={isLoading}
            onClick={handleReject}
          >
            <p>Контент не соответствует внутреннему законодательству</p>
          </Button>
        </div>
      </Modal>
      <Modal
        open={isOpenConfirm}
        maskStyle={{ backdropFilter: 'blur(5px)' }}
        title="Confirm"
        centered
        closable={!isLoading}
        maskClosable={!isLoading}
        onCancel={() => {
          setIsOpenConfirm(false)
        }}
        footer={[
          <Button
            key="back"
            disabled={isLoading}
            onClick={() => {
              setIsOpenConfirm(false)
            }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            className="bg-[#1677ff] text-white"
            onClick={handleSubmit}
          >
            Submit
          </Button>,
        ]}
      >
        Do you really want to confirm this?
      </Modal>
    </ContentWrapper>
  )
}

export default RequestDescription
