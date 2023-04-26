import { PlusOutlined } from '@ant-design/icons'
import { Breadcrumb, Button } from 'antd'
import { IBreadCumb } from 'BREADCRUMB_DATA'

const TempBreadCumb = ({
  data,
  setIsCreateModal,
}: {
  data: IBreadCumb
  setIsCreateModal?: (arg: boolean) => void
}) => {
  const { description, title, pageRoute } = data
  const arr = pageRoute
    ? pageRoute?.map((item) => {
        return {
          title: (
            <a href={`/${item.link}`} className="text-black">
              {item.title}
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
              title: 'Home',
            },
            ...arr,
          ]}
        />
        <div className="">
          {' '}
          <h2 className="text-xl font-medium mt-2 title-page">{title}</h2>
          <p className="text-[13px] mt-3">{description}</p>
        </div>
      </div>
      {data.title == 'Agencies' ? (
        <div>
          <Button
            type="ghost"
            className="bg-[#2173DF] text-white"
            icon={<PlusOutlined />}
            onClick={() => setIsCreateModal!(true)}
          >
            Create agency
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export default TempBreadCumb
