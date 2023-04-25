import {
  CheckCircleFilled,
  CloseCircleFilled,
  MinusCircleOutlined,
} from '@ant-design/icons'
import { Button, Descriptions, Modal } from 'antd'
import { advertCyclesDescriptionCrumb } from 'BREADCRUMB_DATA'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

import img from '@/components/assets/images/image.jpg'
import TempBreadCumb from '@/components/templates/BreadCumb/tempBreadCumb'
import ContentWrapper from '@/components/templates/wrapper/contentWrapper'
import fakeData from '@/MOCK_DATA'

const surveyList = [
  {
    number: '1',
    title:
      'Uploading is the process of publishing information (web pages, text, pictures, video, etc.) to a remote server via a web page or upload tool. ?',
    options: [
      'Shu uzun inglizcha yozilgan so’zlar aslida savol emas , bu uning boshlangich javobi',
      'O’shu uzun inglizcha yozilgan so’zlar aslida savol emas , bu uning 2 - javobi',
      'Bu xato javob , bu savolning yakuniy javobi , aslida xato javob yo’q so’rovnomada',
    ],
  },
  {
    number: '2',
    title:
      'Uploading is the process of publishing information (web pages, text, pictures, video, etc.) to a remote server via a web page or upload tool. ?',
    options: [
      'Shu uzun inglizcha yozilgan so’zlar aslida savol emas , bu uning boshlangich javobi',
      'O’shu uzun inglizcha yozilgan so’zlar aslida savol emas , bu uning 2 - javobi',
      'Bu xato javob , bu savolning yakuniy javobi , aslida xato javob yo’q so’rovnomada',
    ],
  },
]

const RequestDescription = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isFinished, setIsFinished] = useState(true)
  const [isOpenStop, setIsOpenStop] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const id = (router.query.id as string) || []
  const res = fakeData.find((item) => {
    return item.id === id
  })

  const handleStop = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setTimeout(() => {
        setIsOpenStop(false)
      }, 1000)
    }, 3000)
  }

  const choseTypeOfContent = (contentType: string, content: any) => {
    if (contentType === 'banner') {
      return <Image src={img} alt="sas" width={110} height={80} />
    }
    if (contentType === 'Survey') {
      return (
        <>
          {surveyList.map((item, idx) => {
            return (
              <div
                className="w-[700px] p-3 flex bg-[#F1F4F9] rounded mb-5"
                key={idx}
              >
                <div className="w-6 text-sm font-normal text-[#174880] mr-1">
                  #{item.number}
                </div>
                <div className="">
                  <h2 className=" text-sm font-semibold">{item.title}</h2>
                  <ul style={{ listStyleType: 'disc' }}>
                    {item.options.map((option, idx) => (
                      <li key={idx}>{option}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </>
      )
    }
    if (contentType === 'video') {
      return (
        <>
          <video autoPlay loop src={content} width={320} height={240} controls>
            <track kind="captions" />
          </video>
        </>
      )
    }
  }

  const DescTitle = () => {
    const { t } = useTranslation('requests')

    return (
      <div className="flex justify-between flex-wrap">
        <p>{t('description-ads')}</p>
        <div className="flex">
          <Button
            type="ghost"
            className="flex items-center rounded-sm bg-[#1677ff] text-white"
            onClick={() => {
              setIsOpenStop(true)
            }}
          >
            <MinusCircleOutlined className="text-[10px]" />
            Stop advertisement
          </Button>
        </div>
      </div>
    )
  }

  return (
    <ContentWrapper>
      <TempBreadCumb data={advertCyclesDescriptionCrumb} />
      <div className="col-start-3 col-end-10 w-[65%]">
        <div className="p-5 overflow-x-auto bg-white rounded-lg">
          {' '}
          <Descriptions
            title={<DescTitle />}
            layout="vertical"
            bordered
            labelStyle={{ fontWeight: 'bold' }}
          >
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
              {isFinished ? (
                <CheckCircleFilled className="text-green-600 text-xl" />
              ) : (
                <CloseCircleFilled className="text-red-600 text-xl" />
              )}
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
              Target
            </Descriptions.Item>

            <Descriptions.Item label="Uploaded content">
              {choseTypeOfContent(
                res!.type_of_ads[0],
                'https://www.youtube.com/watch?v=7r3dQbkdYGY'
              )}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>

      <Modal
        open={isOpenStop}
        maskStyle={{ backdropFilter: 'blur(5px)' }}
        title="Confirm"
        centered
        closable={!isLoading}
        maskClosable={!isLoading}
        onCancel={() => {
          setIsOpenStop(false)
        }}
        footer={[
          <Button
            key="back"
            disabled={isLoading}
            onClick={() => {
              setIsOpenStop(false)
            }}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            className="bg-[#1677ff] text-white"
            onClick={handleStop}
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
