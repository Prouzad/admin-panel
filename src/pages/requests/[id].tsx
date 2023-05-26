import { ReloadOutlined } from '@ant-design/icons'
import { Badge, Button, Descriptions, Image, message, Modal } from 'antd'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import { useQuery } from 'react-query'

import { requesetDescriptionCrumb } from '@/components/templates/BreadCumb/BREADCRUMB_DATA'
import TempBreadCumb from '@/components/templates/BreadCumb/tempBreadCumb'
import { checkColor } from '@/components/templates/tables/MyTable'
import ContentWrapper from '@/components/templates/wrapper/contentWrapper'
import { IconDone } from '@/components/UI/icons/icons'

import {
  getRequestsDetails,
  requestApprove,
  requestReject,
} from '../api/services'

const RequestDescription = () => {
  const { data } = useSession()
  const { t } = useTranslation('common')
  const [messageApi, contextHolder] = message.useMessage()
  const [isOpenReject, setIsOpenReject] = useState(false)
  const [isOpenConfirm, setIsOpenConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [change, setChange] = useState(false)
  const router = useRouter()
  const id = router.query.id as string
  const res = useQuery(
    ['request details', change],
    () => getRequestsDetails(id, data?.user.accessToken),
    { enabled: !!data?.user?.accessToken }
  )
  const result = res.data
  const success = (type: any, text: string) => {
    messageApi.open({
      type: type,
      content: text,
      duration: 10,
    })
  }

  const handleSubmit = async () => {
    const requestData = {
      agency: result?.agency,
      phone_number: result.phone_number,
      status: result.status,
      format: result.format,
    }
    setIsLoading(true)
    await requestApprove(id, requestData, data?.user?.accessToken)
      .then(() => {
        setIsLoading(false)
        success('success', t('this-request-has-been-successfully-approved'))
        setChange(true)
      })
      .catch(() => {
        success('error', t('an-error-occurred-while-approving-the-request'))
      })
      .finally(() => {
        setIsLoading(false)
        setIsOpenConfirm(false)
      })
  }

  const handleReject = async () => {
    setIsLoading(true)
    await requestReject(id, data?.user.accessToken)
      .then(() => {
        success('success', t('this-request-was-successfully-denied'))
        setChange(true)
      })
      .catch(() => {
        success('error', t('an-error-occurred-while-denying-the-request'))
      })
      .finally(() => {
        setIsLoading(false)

        setIsOpenReject(false)
      })
  }

  const choseTypeOfContent = (contentType: string) => {
    if (contentType === 'banner') {
      return <Image src={result.content} alt={result.format} width={110} />
    }
    if (contentType === 'survey') {
      return (
        <>
          {result?.survey?.questions.map((item: any, idx: any) => {
            return (
              <div
                className="w-[700px] p-3 flex bg-[#F1F4F9] rounded mb-5"
                key={item.id}
              >
                <div className="w-8 h-full text-sm font-normal text-[#174880]">
                  #{idx + 1}
                </div>
                <div className="ml-2">
                  <h2 className=" text-sm font-semibold">{item.title}</h2>
                  <ul style={{ listStyleType: 'disc' }} className="ml-4">
                    {item.options?.map((option: any) => (
                      <li key={option.id}>{option.title}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </>
      )
    }
    if (contentType === 'stories') {
      return (
        <>
          <video
            autoPlay
            controls={true}
            loop
            className="w-[300px] rounded-md"
            poster={result?.content}
          >
            <source src={result?.content} className="h-full rounded-md" />
            <track
              src="captions_en.vtt"
              kind="captions"
              srcLang="en"
              label="english_captions"
            ></track>
          </video>
        </>
      )
    }
  }

  const DescTitle = () => {
    return (
      <div className="flex justify-between flex-wrap">
        <p>{t('description-ads')}</p>
        {result?.status === 'moderation' && (
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
        )}
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
      {contextHolder}
      <div className="col-start-3 col-end-10 w-[65%]">
        <div className="p-5 overflow-x-auto bg-white rounded-lg">
          {}
          <Descriptions title={<DescTitle />} layout="vertical" bordered>
            <Descriptions.Item label={t('ads-id')}>
              {result?.id}
            </Descriptions.Item>
            <Descriptions.Item label={t('phone-number')} span={2}>
              {result?.phone_number}
            </Descriptions.Item>
            <Descriptions.Item label={t('description-ads')}>
              {result?.created_at}
            </Descriptions.Item>
            <Descriptions.Item label={t('company-name')} span={2}>
              {result?.agency}
            </Descriptions.Item>
            <Descriptions.Item label={t('status')}>
              <Badge
                status={checkColor(result?.status)}
                text={t(result?.status)}
              />
            </Descriptions.Item>
            <Descriptions.Item label={t('moderator')} span={2}>
              {data?.user.email}
            </Descriptions.Item>
            <Descriptions.Item label={t('type-of-ads')} span={3}>
              {result?.format}
            </Descriptions.Item>
            <Descriptions.Item label={t('uploaded-content')}>
              {choseTypeOfContent(result?.format)}
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
