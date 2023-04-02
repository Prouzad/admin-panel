import { InputHTMLAttributes, forwardRef } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

const UserInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const { type, style, ...other } = props
  return (
    <div className="mb-6 w-full">
      <div className="">
        <input
          type={type}
          {...other}
          ref={ref}
          className={`border-2 border-slate-400 text-gray-900 text-lg rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-4 ${style}`}
        />
      </div>
    </div>
  )
})
export default UserInput
