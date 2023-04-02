import UserHeader from '@/components/sections/header'
import LeftBar from '@/components/sections/leftBar'
import { ReactNode } from 'react'

const ContentWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <UserHeader />
      <LeftBar />
      {children}
    </>
  )
}

export default ContentWrapper
