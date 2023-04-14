import UserHeader from '@/components/sections/header'
import LeftBar from '@/components/sections/leftBar'
import { ReactNode } from 'react'

const ContentWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <UserHeader />
      <LeftBar />
      <div className="pl-[250px] py-[100px] w-[calc(100%-20px)] ">
        {children}
      </div>
    </>
  )
}

export default ContentWrapper
