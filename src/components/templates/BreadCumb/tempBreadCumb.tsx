import { Breadcrumb } from 'antd'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const TempBreadCumb = ({ description }: { description: string }) => {
  const [isRout, setIsRout] = useState<string[]>()
  const router = useRouter()

  useEffect(() => {
    setIsRout(router.route.split('/'))
  }, [])

  const arr = isRout
    ? isRout?.filter(Boolean)?.map((item) => {
        return {
          title: (
            <a href={`/${item}`} className="text-black">
              {item !== 'list-cycles'
                ? item.charAt(0).toUpperCase() + item.slice(1)
                : 'Advert cycles'}
            </a>
          ),
        }
      })
    : []
  return (
    <div className="px-6 py-4 bg-white mb-3 rounded col-start-3 col-end-19 row-start-2 row-end-4">
      <Breadcrumb
        items={[
          {
            title: 'Home',
          },
          ...arr,
        ]}
      />
      <h2 className="text-xl font-medium mt-2 title-page">
        {isRout?.length && isRout[isRout.length - 1] !== 'list-cycles'
          ? isRout[isRout.length - 1].charAt(0).toUpperCase() +
            isRout[isRout.length - 1].slice(1)
          : 'Advert cycles'}
      </h2>
      <p className="text-[13px] mt-3">{description}</p>
    </div>
  )
}

export default TempBreadCumb
