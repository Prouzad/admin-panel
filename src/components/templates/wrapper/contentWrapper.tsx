import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { ReactNode } from 'react'

import UserHeader from '@/components/sections/header'
import LeftBar from '@/components/sections/leftBar'
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />
const ContentWrapper = ({ children }: { children: ReactNode }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: session, status } = useSession()
  // eslint-disable-next-line no-console
  if (status === 'unauthenticated') {
    return (
      <div className="flex justify-center items-center bg-red-400 font-bold text-white w-screen h-screen text-4xl select-none">
        <h2>
          <Link href="/" legacyBehavior>
            <a
              className="underline hover:text-cyan-300
						"
            >
              Зарегистрируйтесь
            </a>
          </Link>{' '}
          или{' '}
          <Link href="/" legacyBehavior>
            <a className="underline hover:text-cyan-300">авторизуйтесь</a>
          </Link>
        </h2>
      </div>
    )
  }
  if (status == 'loading') {
    return (
      <div className='flex justify-center items-center font-bold text-white w-screen h-screen text-4xl select-none"'>
        <Spin indicator={antIcon} />
      </div>
    )
  }
  return (
    <div className="overflow-x-hidden">
      <div className="">
        <UserHeader />
        <LeftBar />
      </div>
      <div className="h-screen pt-[112px]">
        <div className="ml-[250px] w-full ">{children}</div>
      </div>
    </div>
  )
}

export default ContentWrapper
