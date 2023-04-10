import { InputHTMLAttributes, forwardRef } from 'react'
import { Input } from 'antd'
import { IconPhone } from '../../icons/icons'
type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

const UserInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { type, style, ...other } = props
  return (
    <div className="mb-6 w-full">
      <div className="">
        <Input
          type={type}
          size="large"
          prefix={<IconPhone className={`mr-3`} />}
          className={`border box-border border-[#EBEBEB] bg-white text-gray-900 rounded-lg focus:border-gray-400 w-full py-4 px-4 ${style}`}
        />
      </div>
    </div>
  )
})
export default UserInput
