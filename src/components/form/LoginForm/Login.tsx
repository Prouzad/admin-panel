import { Button, Form, Input } from 'antd'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import { useState } from 'react'

import { IconLock, IconLogo, IconPhone } from '@/components/UI/icons/icons'

const UserLogin = () => {
  const { t } = useTranslation('login')
  const [form] = Form.useForm()
  const Router = useRouter()
  const [isError, setIsError] = useState('')
  const [loading, setLoading] = useState<boolean>(false)

  const onFinish = async (data: any) => {
    setLoading(true)
    const { username, password } = data

    try {
      const res = await signIn('credentials', {
        username,
        password,
        redirect: false,
      })

      res?.ok ? Router.push('/requests') : setIsError('incorrect-ud')
      setTimeout(() => {
        setIsError('')
      }, 3000)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      return err
    }
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
          <h2 className="text-[#1D242B] font-bold text-2xl">{t('signIn')}</h2>
        </div>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 106 }}
          form={form}
          style={{ width: '100%' }}
          layout={'vertical'}
          requiredMark={true}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            label={t('your-login')}
            rules={[
              {
                required: true,
                message: t('please-enter-your-username'),
              },
            ]}
            style={{ height: '85px' }}
          >
            <Input
              size="large"
              style={{ height: '48px', marginBottom: '10px' }}
              prefix={<IconPhone className={`mr-3`} />}
              placeholder={t('enter-your-login')}
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={t('your-password')}
            rules={[
              { required: true, message: t('please-enter-your-password') },
            ]}
            style={{ height: '70px' }}
          >
            <Input
              type="password"
              size="large"
              prefix={<IconLock className={`mr-3`} />}
              style={{ height: '48px' }}
              placeholder={t('enter-your-password')}
            />
          </Form.Item>
          <div
            className={`h-8 mb-2 ${isError.length ? 'visible' : 'invisible'}`}
          >
            <h2 className="text-center text-lg text-red-500 font-semibold">
              {t(isError)}
            </h2>
          </div>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              style={{
                color: 'white',
                backgroundColor: '#174880',
                width: '100%',
                height: '48px',
              }}
            >
              {t('authentication')}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default UserLogin
