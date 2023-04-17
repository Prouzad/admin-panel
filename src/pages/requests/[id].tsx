import { IconDone } from '@/components/UI/icons/icons'
import TempBreadCumb from '@/components/templates/BreadCumb/tempBreadCumb'
import ContentWrapper from '@/components/templates/wrapper/contentWrapper'
import { ReloadOutlined } from '@ant-design/icons'
import { Badge, Button, Descriptions, Modal } from 'antd'
import Image from 'next/image'
import img from '@/components/assets/images/image.jpg'
import { useEffect, useState } from 'react'
import TempModal from '@/components/templates/modal/modal'

const requestDescription = () => {
  const [isOpen, setIsOpen] = useState(false)

  const DescTitle = () => {
    return (
      <div className="flex justify-between flex-wrap">
        <p>Description ADS</p>
        <div className="flex">
          <Button
            type="primary"
            danger
            className="flex items-center rounded-sm"
            onClick={() => {
              setIsOpen(true)
              console.log(isOpen)
            }}
          >
            <ReloadOutlined className="text-[10px]" />
            Reject
          </Button>
          <Button
            type="ghost"
            className="bg-green-500 hover:bg-green-400 text-white border-none rounded-sm flex items-center ml-5"
          >
            <IconDone className="text-[10px]" />
            Confrim
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
            <Descriptions.Item label="Ads id">5423412</Descriptions.Item>
            <Descriptions.Item label="Phone number" span={2}>
              +998 93 234 65 63
            </Descriptions.Item>
            <Descriptions.Item label="Upload time">
              01.03.2023 / 18:12{' '}
            </Descriptions.Item>
            <Descriptions.Item label="Company name" span={2}>
              “Katta korxona “
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              {' '}
              <Badge status="default" text="To moderation" />
            </Descriptions.Item>
            <Descriptions.Item label="Moderator" span={2}>
              Mr Arabboy
            </Descriptions.Item>
            <Descriptions.Item label="Type of ADs" span={3}>
              Stories
            </Descriptions.Item>
            <Descriptions.Item label="Uploaded content">
              <Image src={img} alt="sas" width={110} height={80} />
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
      <Modal
        open={isOpen}
        title="Enter the reason for rejecting the ad !"
        centered
        onOk={() => {}}
        onCancel={() => {}}
        footer={[]}
      ></Modal>

      {/* // <TempModal
      //   isOpen={isOpen}
      //   setIsOpen={() => {
      //     setIsOpen(false)
      //   }}
      //   title="Enter the reason for rejecting the ad !"
      // >
      //   <Button>Cancel</Button>
      // </TempModal> */}
    </ContentWrapper>
  )
}

export default requestDescription
