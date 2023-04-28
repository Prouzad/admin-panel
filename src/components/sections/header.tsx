import {
  BellOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Avatar, Badge, Button, Dropdown, MenuProps, Space } from 'antd'
import { signOut, useSession } from 'next-auth/react'
import setLanguage from 'next-translate/setLanguage'

import { IconLogo, IconTranslate } from '../UI/icons/icons'

interface IAlerts {
  id: number
  avatar: string
  user: string
  date: string
  description: string
}

const Alerts: IAlerts[] = [
  {
    id: 1,
    avatar: '',
    user: 'System',
    date: '2 hour ago',
    description:
      'Hurmatli mijoz , sizning #12321312 raqamli e’loningiz 	muddati tugashiga 1 kun vaqt qoldi.	Sizga shuni ma’lum qilamanki agar sizda e’lon bo’yicha takliflar bo’lsa biz bilan bo’glaning !',
  },
  {
    id: 2,
    avatar: '',
    user: 'User_name',
    date: '1 day ago',
    description:
      'Alibek siz moderatsiyadan o’tqazmagan bir nechta e’lonlaringiz bor , shunga e’tibor berishingizni so’rab qolar edim.',
  },
  {
    id: 2,
    avatar: '',
    user: 'User_name',
    date: '1 day ago',
    description:
      'Alibek siz moderatsiyadan o’tqazmagan bir nechta e’lonlaringiz bor , shunga e’tibor berishingizni so’rab qolar edim.',
  },
  {
    id: 2,
    avatar: '',
    user: 'User_name',
    date: '1 day ago',
    description:
      'Alibek siz moderatsiyadan o’tqazmagan bir nechta e’lonlaringiz bor , shunga e’tibor berishingizni so’rab qolar edim.',
  },
]

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

const signOutItem = () => {
  return (
    <div className="py-2 bg-white flex justify-center items-center user-drop-menu rounded-md">
      <Space
        className="py-2 w-full cursor-pointer hover:bg-slate-100 flex items-center justify-center"
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        SignOut
      </Space>
    </div>
  )
}

const showAlerts = () => {
  return (
    <div className="px-2 py-4 flex flex-col user-drop-menu  w-[437px] h-[282px] bg-white rounded-md overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded">
      {Alerts.map((alert, idx) => {
        return (
          <Space
            key={alert.id}
            className={`flex items-start px-2 py-4 cursor-pointer hover:text-blue-900 hover:underline ${
              Alerts.length - 1 !== idx && 'border-b-[1px]'
            }`}
          >
            <div className=" mr-2">
              {' '}
              <Avatar src={alert.avatar} icon={<UserOutlined />} />
            </div>
            <div className="">
              <div className=" mb-2 flex text-xs text-[#7B8794]">
                <div className="mr-2">{alert.user}</div>
                <div className="">{alert.date}</div>
              </div>
              <div className=" text-sm">{alert.description}</div>
            </div>
          </Space>
        )
      })}
    </div>
  )
}

const UserHeader = () => {
  const { data } = useSession()

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
            <Dropdown dropdownRender={showAlerts} trigger={['click']}>
              <Badge count={Alerts.length} offset={[7, -2]}>
                <BellOutlined />
              </Badge>
            </Dropdown>
          </div>
          <Dropdown dropdownRender={signOutItem} trigger={['click']}>
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
          </Dropdown>
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
