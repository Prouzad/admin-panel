import { QuestionCircleOutlined } from '@ant-design/icons'
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined'
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined'
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined'
import { Badge } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import { useEffect, useState } from 'react'

interface ICard {
  Icon?: any
  title: string
  link: string
}

const LeftBar = () => {
  const { t } = useTranslation('common')
  const [isRout, setIsRout] = useState<string[]>()
  const router = useRouter()

  const navBar: ICard[] = [
    {
      title: t('requests'),
      link: '/requests',
      Icon: <QuestionCircleOutlined />,
    },
    {
      title: t('advert-cycles'),
      link: '/list-cycles',
      Icon: <EqualizerOutlinedIcon />,
    },
    {
      title: t('agencies'),
      link: '/agencies',
      Icon: <MovieOutlinedIcon />,
    },
    {
      title: t('contracts'),
      link: '/contracts',
      Icon: <ContentPasteOutlinedIcon />,
    },
  ]

  useEffect(() => {
    setIsRout(router.route.split('/'))
  }, [])
  return (
    <div className="h-screen w-[232px] flex flex-col justify-between bg-white shadow-3xl pt-4 fixed mt-[81px]">
      <div className=" flex flex-col ">
        {navBar.map((item, idx) => {
          return (
            <Link href={item.link} key={idx}>
              <div
                key={idx}
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
                {item.link === '/requests' && <Badge count={11} />}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default LeftBar
