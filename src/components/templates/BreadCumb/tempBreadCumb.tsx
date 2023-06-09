import { PlusOutlined } from '@ant-design/icons'
import { Breadcrumb, Button } from 'antd'
import useTranslation from 'next-translate/useTranslation'

import { IBreadCumb } from '@/types'

const TempBreadCumb = ({
  data,
  setIsCreateModal,
}: {
  data: IBreadCumb
  setIsCreateModal?: (arg: boolean) => void
}) => {
  const { t } = useTranslation('common')
  const { title, pageRoute } = data
  const arr = pageRoute
    ? pageRoute?.map((item, idx) => {
        return {
          title: (
            <a href={`/${item.link}`} className="text-black" key={idx}>
              {t(item.title)}
            </a>
          ),
        }
      })
    : []
  return (
    <div className="px-6 py-4 bg-white mb-3 rounded flex justify-between items-center max-w-[65%]">
      <div className="">
        {' '}
        <Breadcrumb
          items={[
            {
              title: t('home'),
            },
            ...arr,
          ]}
        />
        <div className="">
          {' '}
          <h2 className="text-xl font-medium mt-2 title-page">{t(title)}</h2>
        </div>
      </div>
      {data.title == 'Agencies' ? (
        <div>
          <Button
            type="ghost"
            className="bg-[#2173DF] text-white"
            icon={<PlusOutlined />}
            onClick={() => {
              if (setIsCreateModal) {
                setIsCreateModal(true)
              }
            }}
          >
            {t('create-agency')}
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export default TempBreadCumb
