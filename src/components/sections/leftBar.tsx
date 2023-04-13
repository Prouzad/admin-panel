import Link from 'next/link'
import {
  IconDashboard,
  IconList,
  IconStatistic,
} from '@/components/UI/icons/icons'
import { useRouter } from 'next/router'

interface ICard {
  Icon?: any
  title: string
  link: string
}

const navBar: ICard[] = [
  { title: 'Главная', link: '/main', Icon: IconDashboard },
  { title: 'Запросы', link: '/requests-list', Icon: IconList },
  { title: 'Статистика', link: '/statistic', Icon: IconStatistic },
]

const LeftBar = () => {
  const router = useRouter()
  return (
    <div className="h-screen flex flex-col justify-between bg-white w-[232px] shadow-[0_2px_0_8px_rgba(0,0,0,0.15] top-[81px] pt-4 left-0 fixed ">
      <div className="w-[232px] flex flex-col ">
        {navBar.map((item, idx) => (
          <Link href={item.link} key={idx}>
            <div
              className={`w-full  transition-all ease-in-out flex pl-5 cursor-pointer space-x-4 py-[9px] mt-4 group text-base items-center ${
                router.pathname == item.link
                  ? 'text-black bg-[#EBEBEB]'
                  : 'text-[#7B8794] group-hover:text-black hover:bg-[#EBEBEB]'
              }`}
            >
              <item.Icon
                className={`transition-all ease-in-outtext-lg ${
                  router.pathname == item.link
                    ? 'text-black'
                    : 'text-[#7B8794] group-hover:text-black'
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
          </Link>
        ))}
      </div>
      <div className="w-[240px] bg-white rounded-xl py-8 flex items-center flex-col font-semibold text-[#7B8794]">{`${new Date().getFullYear()} Uztelecom`}</div>
    </div>
  )
}

export default LeftBar
