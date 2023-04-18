import { CloseOutlined } from '@ant-design/icons'
import { ReactNode } from 'react'

interface IModal {
  children: ReactNode
  setIsOpen: any
  isOpen: boolean
  title: string
}

const TempModal = ({ children, setIsOpen, isOpen, title }: IModal) => {
  return (
    <div
      className={`w-full h-screen flex justify-center items-center z-10 absolute top-0 left-0 bg-[rgba(30,30,30,0.5)] backdrop-blur-[5px] ${
        !isOpen && 'hidden'
      }`}
    >
      <div className="p-5 bg-white rounded">
        <div className="flex w-full justify-between items-center">
          <div className="text-base">{title}</div>
          <CloseOutlined onClick={setIsOpen} />
        </div>
        {children}
      </div>
    </div>
  )
}

export default TempModal
