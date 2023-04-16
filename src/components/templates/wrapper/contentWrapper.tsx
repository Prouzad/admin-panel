import UserHeader from '@/components/sections/header'
import LeftBar from '@/components/sections/leftBar'
import { ReactNode } from 'react'

const ContentWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen w-full grid grid-cols-22 grid-rows-12  gap-1">
      <UserHeader />
      <LeftBar />
      <div className=" col-start-4 col-end-19 row-start-2 row-end-11 ml-3 mt-[30px] ">
        {children}
      </div>
    </div>
  )
}

export default ContentWrapper
