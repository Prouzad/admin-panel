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
    <div className="bg-white rounded-b-2xl col-start-1 col-end-23 row-start-1 row-end-2 grid items-center">
      <div className="w-[235px] ml-6">
        <IconLogo />
      </div>
      <div className="col-start-18 col-end-19">
        <div className="flex w-[283px]  justify-between">
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
            <IconTranslate />
          </div>
        </div>
      </div>
    </div>
  )
}
export default UserHeader
