import { UserOutlined } from '@ant-design/icons'
import { Button, Dropdown, MenuProps, Space } from 'antd'
import { signOut, useSession } from 'next-auth/react'
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

const signOutItem = () => {
  return (
    <div className="py-2 bg-white flex justify-center items-center user-drop-menu rounded-md">
      <Space
        className="py-2 px-3 w-full cursor-pointer hover:bg-slate-100 flex items-center justify-center"
        onClick={() => signOut({ callbackUrl: '/' })}
      >
        SignOut
      </Space>
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
      <div className="mr-6 ">
        <div className="flex gap-11">
          <Dropdown dropdownRender={signOutItem} trigger={['click']}>
            <div className="flex items-center">
              <div className="flex  items-center cursor-pointer">
                <div className="flex items-center w-6 h-6 rounded-xl bg-slate-400 justify-center ">
                  {data?.user && <UserOutlined />}
                </div>
              </div>
              <div className="flex items-center ml-4 text-sm cursor-pointer">
                {data?.user.email}
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
