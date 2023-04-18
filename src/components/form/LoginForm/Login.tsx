import { Button, Form, Input } from 'antd'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

import { IconLock, IconLogo, IconPhone } from '@/components/UI/icons/icons'

const UserLogin = () => {
  const [form] = Form.useForm()
  const Router = useRouter()
  const [isError, setIsError] = useState('')
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = async (data: any) => {
    const { username, password } = data
    try {
      await signIn('credentials', {
        username,
        password,
        redirect: false,
      }).then((authenticated) => {
        if (authenticated?.ok) {
          return Router.push('/requests')
        } else {
          setIsError('Неправильный логин или пароль')
          setTimeout(() => {
            setIsError('')
          }, 3000)
        }

        setLoading(false)
      })
    } catch (err) {
      setLoading(false)
    }
  }

  const onFinish = (values: any) => {
    onSubmit(values)
  }
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center relative bg-white">
      <div
        className="absolute top-0 left-0 ml-[300px] mt-[54px]
			"
      >
        <IconLogo />
      </div>
      <div className="w-[503px] h-[437px] shadow-[0px_1px_12px_rgba(0,0,0,0.12)] p-10 rounded-2xl bg-white flex flex-col items-center justify-center">
        <div className="text-left w-full m-5">
          <h2 className="text-[#1D242B] font-bold text-2xl">Вход</h2>
        </div>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 106 }}
          form={form}
          style={{ width: '100%' }}
          layout={'vertical'}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            label="Ваш логин"
            rules={[{ required: true, message: 'Please input your username!' }]}
            style={{ height: '85px' }}
          >
            <Input
              size="large"
              style={{ height: '48px', marginBottom: '10px' }}
              prefix={<IconPhone className={`mr-3`} />}
              placeholder="Введите ваш логин"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Ваш пароль"
            rules={[{ required: true, message: 'Please input your password!' }]}
            style={{ height: '70px' }}
          >
            <Input
              type="password"
              size="large"
              prefix={<IconLock className={`mr-3`} />}
              style={{ height: '48px' }}
              placeholder="Введите ваш пароль"
            />
          </Form.Item>
          <div
            className={`h-8 mb-2 ${isError.length ? 'visible' : 'invisible'}`}
          >
            <h2 className="text-center text-lg text-red-500 font-semibold">
              {isError}
            </h2>
          </div>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={() => setLoading(true)}
              style={{
                backgroundColor: '#174880',
                width: '100%',
                height: '48px',
              }}
            >
              Авторизация
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default UserLogin
