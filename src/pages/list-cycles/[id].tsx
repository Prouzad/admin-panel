import { ReloadOutlined } from '@ant-design/icons'
import { Badge, Button, Descriptions, Modal } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

import img from '@/components/assets/images/image.jpg'
import TempBreadCumb from '@/components/templates/BreadCumb/tempBreadCumb'
import { checkColor } from '@/components/templates/tables/RequestTable'
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
      <TempBreadCumb description="dasd" />
      <div className="col-start-3 col-end-10">
        <div className="p-5 overflow-x-auto bg-white rounded-lg">
          {' '}
          <Descriptions title={<DescTitle />} layout="vertical" bordered>
            <Descriptions.Item label="Ads id">{res?.id}</Descriptions.Item>
            <Descriptions.Item label="Phone number" span={2}>
              {res?.phone_number}
            </Descriptions.Item>
            <Descriptions.Item label="Upload time">
              {res?.upload_time}
            </Descriptions.Item>
            <Descriptions.Item label="Company name" span={2}>
              {res?.company_name}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Badge status={checkColor(res!.status)} text={res?.status} />
            </Descriptions.Item>
            <Descriptions.Item label="Moderator" span={2}>
              Mr Arabboy
            </Descriptions.Item>
            <Descriptions.Item label="Type of ADs" span={3}>
              {res?.type_of_ads[0]}
            </Descriptions.Item>
            <Descriptions.Item label="Uploaded content">
              <Image src={img} alt="sas" width={110} height={80} />
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
