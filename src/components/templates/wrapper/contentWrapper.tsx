import { ReactNode } from 'react'

import UserHeader from '@/components/sections/header'
import LeftBar from '@/components/sections/leftBar'

const ContentWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <div className="">
        <UserHeader />
        <LeftBar />
      </div>
      <div className="h-screen pt-[112px]">
        <div className="ml-[250px] max-w-[65%]">{children}</div>
      </div>
    </div>
  )
}

export default ContentWrapper
