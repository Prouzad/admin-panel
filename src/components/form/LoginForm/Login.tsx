import UserButton from '@/components/UI/form/button/userButton'
import UserInput from '@/components/UI/form/input/userInput'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Checkbox, Form, Input } from 'antd'
import { IconPhone } from '@/components/UI/icons/icons'

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}

const UserLogin = () => {
  const [form] = Form.useForm()
  const Router = useRouter()
  const [isError, setIsError] = useState('')

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

  const onFinish = (values: any) => {
    onSubmit(values)
    console.log('Success:', values)
  }
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-[503px] h-[417px] shadow-[0px_1px_12px_rgba(0,0,0,0.12)] p-10 rounded-2xl bg-white flex items-center justify-center">
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={form}
          style={{ width: '100%' }}
          layout={'horizontal'}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            label="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input size="large" prefix={<IconPhone className={`mr-3`} />} />
          </Form.Item>

          <Form.Item
            name="password"
            label="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input
              type="password"
              size="large"
              prefix={<IconPhone className={`mr-3`} />}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
            <UserButton text="Авторизация" style="text-white w-full" />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default UserLogin
