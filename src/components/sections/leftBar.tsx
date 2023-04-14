import Link from 'next/link'
import {
  IconAgencies,
  IconAdvert,
  IconContracts,
  IconRequests,
} from '@/components/UI/icons/icons'
import { useRouter } from 'next/router'
import { Badge } from 'antd'

interface ICard {
  Icon?: any
  title: string
  link: string
}

const navBar: ICard[] = [
  { title: 'Requests', link: '/requests-list', Icon: IconRequests },
  { title: 'Advert cycles', link: '/list-cycles', Icon: IconAdvert },
  { title: 'Agencies', link: '/agencies', Icon: IconAgencies },
  { title: 'Contracts', link: '/contracts', Icon: IconContracts },
]

const LeftBar = () => {
  const router = useRouter()
  return (
    <div className="h-screen flex flex-col justify-between bg-white w-[232px] shadow-[0_2px_0_8px_rgba(0,0,0,0.15] top-[81px] pt-4 left-0 fixed ">
      <div className="w-[232px] flex flex-col ">
        {navBar.map((item, idx) => (
          <Link href={item.link} key={idx}>
            <div
              className={`w-full  transition-all ease-in-out flex px-5 cursor-pointer space-x-4 py-[9px] mt-4 group text-base items-center justify-between ${
                router.pathname == item.link
                  ? 'text-black bg-[#F3F7FF]'
                  : 'text-[#7B8794] group-hover:text-black hover:bg-[#EBEBEB]'
              }`}
            >
              <div className="flex ">
                <item.Icon
                  className={`transition-all ease-in-outtext-lg mr-2 ${
                    router.pathname == item.link
                      ? 'text-black'
                      : 'text-[#7B8794]'
                  }`}
                />
                <p
                  className={` transition-all ease-in-out font-semibold ${
                    router.pathname == item.link
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
        ))}
      </div>
      <div className="w-[240px] bg-white rounded-xl py-8 flex items-center flex-col font-semibold text-[#7B8794]">{`${new Date().getFullYear()} Uztelecom`}</div>
    </div>
  )
}

export default LeftBar
