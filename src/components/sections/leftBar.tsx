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
    <div className="h-[calc(100vh-130px)] flex flex-col justify-between w-[280px] px-[20px] top-[104px] pt-4 left-0  fixed space-y-1">
      <div className="w-[240px]  bg-white rounded-xl py-4 pl-4 flex flex-col ">
        {navBar.map((item, idx) => (
          <Link href={item.link} key={idx}>
            <div
              className={`w-[calc(100%-15px)]  transition-all ease-in-out flex pl-5 cursor-pointer space-x-4 py-[15px] my-[2px] rounded  group text-base items-center ${
                router.pathname == item.link
                  ? 'text-white bg-sky-800'
                  : 'text-[#7B8794] group-hover:text-white hover:bg-sky-800'
              }`}
            >
              <item.Icon
                className={`transition-all ease-in-outtext-lg ${
                  router.pathname == item.link
                    ? 'text-white'
                    : 'text-[#7B8794] group-hover:text-white'
                }`}
              />
              <p
                className={` transition-all ease-in-out font-semibold ${
                  router.pathname == item.link
                    ? 'text-white'
                    : 'text-[#7B8794] group-hover:text-white'
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
