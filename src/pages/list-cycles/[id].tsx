import {
  CheckCircleFilled,
  CloseCircleFilled,
  MinusCircleOutlined,
} from '@ant-design/icons'
import { Button, Descriptions, message, Modal } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import { useQuery } from 'react-query'

import img from '@/components/assets/images/image.jpg'
import { advertCyclesDescriptionCrumb } from '@/components/templates/BreadCumb/BREADCRUMB_DATA'
import TempBreadCumb from '@/components/templates/BreadCumb/tempBreadCumb'
import ContentWrapper from '@/components/templates/wrapper/contentWrapper'
import { IAdvCycleRes } from '@/types'

import { getAdvCyclesDetails, setOffAdvCycle } from '../api/services'

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
  const { data: session } = useSession()
  const [messageApi, contextHolder] = message.useMessage()
  const { t } = useTranslation('common')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpenStop, setIsOpenStop] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const id = router.query.id as string
  const res = useQuery(
    'Requests',
    () => getAdvCyclesDetails(id, session?.user.accessToken),
    { enabled: !!session?.user?.accessToken }
  )

  const result = res.data as IAdvCycleRes

  const success = (type: any, text: string) => {
    messageApi.open({
      type: type,
      content: text,
      duration: 10,
    })
  }

  const handleStop = async () => {
    setIsLoading(true)

    await setOffAdvCycle(
      id,
      { agency: result.agency },
      session?.user.accessToken
    )
      .then(() => {
        success('success', 'Success')
      })
      .catch(() => {
        success('error', 'Error')
      })
      .finally(() => {
        setIsLoading(false)
        setIsOpenStop(false)
      })
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
    const { t } = useTranslation('common')

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
            {t('stop-advertisement')}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <ContentWrapper>
      {contextHolder}
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
            <Descriptions.Item label={t('ads-id')}>
              {result?.id}
            </Descriptions.Item>
            <Descriptions.Item label={t('file')}>
              https://lb.api.cdn.uzcl...
            </Descriptions.Item>
            <Descriptions.Item label={t('company-name')}>
              {result?.agency}
            </Descriptions.Item>
            <Descriptions.Item label={t('type-of-ads')}>
              {result?.format}
            </Descriptions.Item>
            <Descriptions.Item label={t('duration')}>
              1 Week / 3 days
            </Descriptions.Item>
            <Descriptions.Item label={t('views')}>12 232 421</Descriptions.Item>
            <Descriptions.Item label={t('is-finished')}>
              {result?.is_finished ? (
                <CheckCircleFilled className="text-green-600 text-xl" />
              ) : (
                <CloseCircleFilled className="text-red-600 text-xl" />
              )}
            </Descriptions.Item>
            <Descriptions.Item label={t('moderator')}>
              Mr Arabboy
            </Descriptions.Item>
            <Descriptions.Item label={t('type-of-ads')}>
              Stories
            </Descriptions.Item>
            <Descriptions.Item label={t('phone-number')}>
              {result?.phone_number}
            </Descriptions.Item>
            <Descriptions.Item label={t('payment')} span={2}>
              32 000 000 UZS
            </Descriptions.Item>
            <Descriptions.Item label={t('target-ads')} span={3}>
              Target
            </Descriptions.Item>

            <Descriptions.Item label={t('uploaded-content')}>
              {choseTypeOfContent(
                result?.format,
                'https://www.youtube.com/watch?v=7r3dQbkdYGY'
              )}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>

      <Modal
        open={isOpenStop}
        maskStyle={{ backdropFilter: 'blur(5px)' }}
        title={t('confirm')}
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
            {t('cancel')}
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={isLoading}
            className="bg-[#1677ff] text-white"
            onClick={handleStop}
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
