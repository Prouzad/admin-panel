import {
  BellOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Badge, Button, Dropdown, MenuProps } from 'antd'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import setLanguage from 'next-translate/setLanguage'

import { IconLogo, IconTranslate } from '../UI/icons/icons'

const items: MenuProps['items'] = [
  {
    label: <Button onClick={async () => await setLanguage('ru')}>RU</Button>,
    key: '0',
  },
  {
    label: <Button onClick={async () => await setLanguage('uz')}>UZ</Button>,
    key: '1',
  },
]

const UserHeader = () => {
  const router = useRouter()
  const { data } = useSession()

  const changeLang = (lang: string) => {
    // eslint-disable-next-line no-console
    console.log(lang)
    const url = router.asPath
    const options = {
      locale: lang,
    }
    router.push(url, undefined, options)
  }
  return (
    <div className="w-screen bg-white h-20 flex items-center justify-between fixed z-10 shadow-4xl">
      <div className="w-[235px] ml-6">
        <IconLogo />
      </div>
      <div className="mr-6">
        <div className="flex w-[283px] gap-11">
          <div className="flex items-center cursor-pointer">
            <QuestionCircleOutlined />
          </div>
          <div className="flex items-center cursor-pointer">
            <Badge count={11}>
              <BellOutlined />
            </Badge>
          </div>
          <div className="flex items-center">
            <div className="flex  items-center cursor-pointer">
              <div className="flex items-center w-6 h-6 rounded-xl bg-slate-400 justify-center ">
                {data?.user && <UserOutlined />}
              </div>
            </div>
            <div className="flex items-center ml-4 text-sm cursor-pointer">
              {data?.user?.name}
            </div>
          </div>
          <div className="flex items-center justify-center cursor-pointer">
            <Dropdown menu={{ items }} trigger={['click']}>
              <IconTranslate />
            </Dropdown>
          </div>
        </div>
      </div>
    </div>
  )
}
export default UserHeader
