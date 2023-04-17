import Link from 'next/link'
import {
  IconAgencies,
  IconAdvert,
  IconContracts,
  IconRequests,
} from '@/components/UI/icons/icons'
import { useRouter } from 'next/router'
import { Badge } from 'antd'
import {
  BellOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useEffect, useState } from 'react'

interface ICard {
  Icon?: any
  title: string
  link: string
}

const navBar: ICard[] = [
  {
    title: 'Requests',
    link: '/requests',
    Icon: <QuestionCircleOutlined />,
  },
  { title: 'Advert cycles', link: '/list-cycles', Icon: <IconAdvert /> },
  { title: 'Agencies', link: '/agencies', Icon: <IconAgencies /> },
  { title: 'Contracts', link: '/contracts', Icon: <IconContracts /> },
]

const LeftBar = () => {
  const [isRout, setIsRout] = useState<string[]>()
  const router = useRouter()

  useEffect(() => {
    setIsRout(router.route.split('/'))
  }, [])
  return (
    <div className="col-start-1 col-end-4 row-start-2 row-end-13 h-[100%] min-w-[232px] flex flex-col justify-between bg-white shadow-3xl pt-4 ">
      <div className=" flex flex-col ">
        {navBar.map((item, idx) => {
          return (
            <Link href={item.link} key={idx}>
              <div
                className={`w-full  transition-all ease-in-out flex px-5 cursor-pointer space-x-4 py-[9px] mt-4 group text-base items-center justify-between ${
                  isRout?.includes(item.link.slice(1))
                    ? 'text-black bg-[#F3F7FF]'
                    : 'text-[#7B8794] group-hover:text-black hover:bg-[#EBEBEB]'
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`flex text-xl items-center mr-3 ${
                      isRout?.includes(item.link.slice(1))
                        ? 'text-black'
                        : 'text-[#7B8794] group-hover:text-black'
                    }`}
                  >
                    {item.Icon}
                  </div>
                  <p
                    className={`flex items-center transition-all ease-in-out font-medium ${
                      isRout?.includes(item.link.slice(1))
                        ? 'text-black'
                        : 'text-[#7B8794] group-hover:text-black'
                    }`}
                  >
                    {item.title}
                  </p>
                </div>
                {item.title === 'Requests' && <Badge count={11} />}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default LeftBar
