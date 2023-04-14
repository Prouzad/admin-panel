import { signOut, useSession } from 'next-auth/react'
import { IconLogOut, IconLogo, IconTranslate } from '../UI/icons/icons'
import { redirect } from 'next/dist/server/api-utils'
import {
  BellOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { Badge } from 'antd'

const UserHeader = () => {
  const { data } = useSession()
  return (
    <div className="h-20 w-full bg-white flex items-center rounded-b-2xl fixed ">
      <div className="w-[235px] ml-6">
        <IconLogo />
      </div>
      <div className="w-full flex justify-end px-5">
        <div className="flex ">
          <div className="flex w-12 h-12 items-center">
            <QuestionCircleOutlined />
          </div>
          <div className="flex w-12 h-12 items-center">
            <Badge count={11}>
              <BellOutlined />
            </Badge>
          </div>
          <div className="flex items-center">
            <div className="flex items-center w-6 h-6 rounded-xl bg-slate-400 justify-center ">
              {data?.user && <UserOutlined />}
            </div>
            <div className="flex items-center mx-2 text-sm">
              {data?.user?.name}
            </div>
          </div>
          <div className="flex items-center w-12 h-12 justify-center">
            <IconTranslate />
          </div>
        </div>
      </div>
    </div>
  )
}
export default UserHeader
