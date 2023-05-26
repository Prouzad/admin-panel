import {
  CheckCircleFilled,
  CloseCircleFilled,
  MinusCircleOutlined,
} from '@ant-design/icons'
import { Badge, Button, Descriptions, Image, List, message, Modal } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'
import { useQuery } from 'react-query'

import { advertCyclesDescriptionCrumb } from '@/components/templates/BreadCumb/BREADCRUMB_DATA'
import TempBreadCumb from '@/components/templates/BreadCumb/tempBreadCumb'
import ContentWrapper from '@/components/templates/wrapper/contentWrapper'
import { IAdvCycleRes } from '@/types'

import { getAdvCyclesDetails, setOffAdvCycle } from '../../components/services'

const RequestDescription = () => {
  const { data: session } = useSession()
  const [messageApi, contextHolder] = message.useMessage()
  const { t } = useTranslation('common')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpenStop, setIsOpenStop] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isModal, setIsModal] = useState(false)
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
      { agency: result?.agency },
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

  const choseTypeOfContent = (contentType: string) => {
    if (contentType === 'banner') {
      return <Image src={result.content} alt={result.format} width={110} />
    }
    if (contentType === 'survey') {
      return (
        <>
          <h1 className="text-lg font-bold mb-2">{result?.survey?.title}</h1>
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
      return result.media_type === 'video' ? (
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
      ) : (
        <Image src={result.content} alt={result.format} width={110} />
      )
    }
  }

  const DescTitle = () => {
    const { t } = useTranslation('common')

    return (
      <div className="flex justify-between flex-wrap">
        <p>{t('description-ads')}</p>
        {!result?.is_finished && (
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
        )}
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
              <div className="truncate w-[180px]">
                {result?.format === 'survey' ? (
                  '-'
                ) : (
                  <Link href={result?.content} className="w-full">
                    {result?.content}
                  </Link>
                )}
              </div>
            </Descriptions.Item>
            <Descriptions.Item label={t('company-name')}>
              {result?.agency}
            </Descriptions.Item>
            <Descriptions.Item label={t('type-of-ads')}>
              {result?.format}
            </Descriptions.Item>
            <Descriptions.Item label={t('duration')}>
              {result?.show}
            </Descriptions.Item>
            <Descriptions.Item label={t('views')}>
              {result?.view_count}
            </Descriptions.Item>
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
              {new Intl.NumberFormat('ru').format(result?.total_price)} UZS
            </Descriptions.Item>
            <Descriptions.Item label={t('target-ads')} span={3}>
              {result.site.length ? (
                <div className="flex items-center">
                  <div className="truncate max-w-[700px] flex">
                    {result?.site.map((item) => {
                      return (
                        <div key={item?.id} className="flex">
                          <p>{item?.display_name}</p>
                          <p>{`(${item?.region?.name}),`}</p>
                          &nbsp;
                        </div>
                      )
                    })}
                  </div>
                  <Button
                    onClick={() => setIsModal(true)}
                    type="ghost"
                    className="w-5 ml-4 relative"
                  >
                    <Badge
                      count={result?.site.length}
                      className="absolute left-0 top-1"
                      color="#2173DF"
                    />
                  </Button>
                </div>
              ) : (
                '-'
              )}
            </Descriptions.Item>

            <Descriptions.Item label={t('uploaded-content')}>
              {choseTypeOfContent(result?.format)}
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
      <Modal
        title="Included sites"
        open={isModal}
        footer={null}
        onCancel={() => {
          setIsModal(false)
        }}
      >
        <div className="max-h-[350px] overflow-auto">
          <List
            footer={<div>Footer</div>}
            dataSource={result?.site}
            renderItem={(item) => (
              <List.Item>{`${item?.display_name}(${item?.region.name})`}</List.Item>
            )}
          />
        </div>
      </Modal>
    </ContentWrapper>
  )
}

export default RequestDescription
