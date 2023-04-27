import { ReloadOutlined } from '@ant-design/icons'
import { Badge, Button, Descriptions, Modal } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

import img from '@/components/assets/images/image.jpg'
import { requesetDescriptionCrumb } from '@/components/templates/BreadCumb/BREADCRUMB_DATA'
import TempBreadCumb from '@/components/templates/BreadCumb/tempBreadCumb'
import { checkColor } from '@/components/templates/tables/MyTable'
import ContentWrapper from '@/components/templates/wrapper/contentWrapper'
import { IconDone } from '@/components/UI/icons/icons'
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
  const { t } = useTranslation('common')
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
            {t('reject')}
          </Button>
          <Button
            type="ghost"
            className="bg-green-600 hover:bg-green-500 text-white border-none rounded-sm flex items-center ml-5"
            onClick={() => {
              setIsOpenConfirm(true)
            }}
          >
            <IconDone className="text-[10px]" />
            {t('confirm')}
          </Button>
        </div>
      </div>
    )
  }

  const RejectModalTitle = () => {
    return (
      <>
        <h2 className="mb-4">{t('enter-the-reason-for-rejecting-the-ad')}</h2>
      </>
    )
  }

  return (
    <ContentWrapper>
      <TempBreadCumb data={requesetDescriptionCrumb} />
      <div className="col-start-3 col-end-10 w-[65%]">
        <div className="p-5 overflow-x-auto bg-white rounded-lg">
          {' '}
          <Descriptions title={<DescTitle />} layout="vertical" bordered>
            <Descriptions.Item label={t('ads-id')}>{res?.id}</Descriptions.Item>
            <Descriptions.Item label={t('phone-number')} span={2}>
              {res?.phone_number}
            </Descriptions.Item>
            <Descriptions.Item label={t('description-ads')}>
              {res?.upload_time}
            </Descriptions.Item>
            <Descriptions.Item label={t('company-name')} span={2}>
              {res?.company_name}
            </Descriptions.Item>
            <Descriptions.Item label={t('status')}>
              <Badge status={checkColor(res!.status)} text={t(res!.status)} />
            </Descriptions.Item>
            <Descriptions.Item label={t('moderator')} span={2}>
              Mr Arabboy
            </Descriptions.Item>
            <Descriptions.Item label={t('type-of-ads')} span={3}>
              {res?.type_of_ads[0]}
            </Descriptions.Item>
            <Descriptions.Item label={t('uploaded-content')}>
              {choseTypeOfContent(
                res!.type_of_ads[0],
                'https://www.youtube.com/watch?v=7r3dQbkdYGY'
              )}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
      <Modal
        open={isOpenReject}
        maskStyle={{ backdropFilter: 'blur(5px)' }}
        title={<RejectModalTitle />}
        closable={!isLoading}
        maskClosable={!isLoading}
        onCancel={() => {
          setIsOpenReject(false)
        }}
        centered
        bodyStyle={{ padding: 0 }}
        footer={null}
      >
        <div className="w-full flex item-center justify-center border-t-2 ">
          <Button
            className="w-[524px] h-8 flex items-center justify-center rounded-sm bg-red-100 text-red-500 font-medium cursor-pointer border-0 mt-6 mb-2"
            danger
            loading={isLoading}
            onClick={handleReject}
          >
            <p>{t('content-does-not-comply-with-domestic-law')}</p>
          </Button>
        </div>
      </Modal>
      <Modal
        open={isOpenConfirm}
        maskStyle={{ backdropFilter: 'blur(5px)' }}
        title={t('confirm')}
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
            {t('cancel')}
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            className="bg-[#1677ff] text-white"
            onClick={handleSubmit}
          >
            {t('submit')}
          </Button>,
        ]}
      >
        {t('do-you-really-want-to-confirm-this')}
      </Modal>
    </ContentWrapper>
  )
}

export default RequestDescription
