import { Breadcrumb } from 'antd'
import { IBreadCumb } from 'BREADCRUMB_DATA'

const TempBreadCumb = ({ data }: { data: IBreadCumb }) => {
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
    <div className="px-6 py-4 bg-white mb-3 rounded col-start-3 col-end-19 row-start-2 row-end-4 max-w-[65%]">
      <Breadcrumb
        items={[
          {
            title: 'Home',
          },
          ...arr,
        ]}
      />
      <h2 className="text-xl font-medium mt-2 title-page">{title}</h2>
      <p className="text-[13px] mt-3">{description}</p>
    </div>
  )
}

export default TempBreadCumb
