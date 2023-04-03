import UserButton from '@/components/UI/form/button/userButton'
import UserInput from '@/components/UI/form/input/userInput'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const UserLogin = () => {
  const Router = useRouter()
  const [isError, setIsError] = useState('')
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  useEffect(() => {})
  const onSubmit = async (data: any) => {
    const { username, password } = data
    try {
      const res = await signIn('credentials', {
        username,
        password,
        redirect: false,
      }).then((authenticated) => {
        authenticated?.ok
          ? Router.push('/main')
          : setIsError('Incorrect credentials')
        setTimeout(() => {
          setIsError('')
        }, 3000)
      })
    } catch (err) {
      console.log('err', err)
    }
  }
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-[550px] p-10 py-20 rounded-xl bg-white border-2 border-blue-200 flex items-center justify-center">
        <form
          className="w-[70%] flex flex-col items-center "
          onSubmit={handleSubmit(onSubmit)}
        >
          <UserInput
            type={'text'}
            placeholder="Login"
            {...register('username')}
          />
          <UserInput
            type={'password'}
            placeholder="Password"
            {...register('password')}
          />
          {isError.length !== 0 && (
            <div className="text-red-500 text-lg pb-4">{isError}</div>
          )}
          <UserButton
            text={'Login'}
            style={`w-[100%] text-white ${isError.length === 0 && 'mt-4'}`}
          />
        </form>
      </div>
    </div>
  )
}

export default UserLogin
