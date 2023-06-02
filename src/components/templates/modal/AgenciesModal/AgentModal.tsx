import { Form, Select } from 'antd'
import { useSession } from 'next-auth/react'
import useTranslation from 'next-translate/useTranslation'
import PhoneInput from 'react-phone-input-2'
import { useQuery } from 'react-query'

import { getRoles } from '@/components/services'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AgentModal = ({ itemID }: { itemID?: string }) => {
  const { t } = useTranslation('common')
  const { data: session } = useSession()
  const res = useQuery('Role', () => getRoles(session?.user?.accessToken), {
    enabled: !!session?.user?.accessToken,
  })
  const roles = res.data ? (res.data as string[]) : ['agent', 'agent']

  return (
    <>
      <div
        style={{
          borderBottom: '1px solid #e8e8e8',
        }}
      ></div>
      <div style={{ padding: '16px 0' }} className="flex items-end">
        <div className="">
          <p className="mb-2">{t('phone-number')}</p>
          <Form.Item
            name={'agent_phone_number'}
            rules={[
              {
                required: true,
                len: 12,
                message: t('total-number-of-digits-should-be-12'),
              },
            ]}
          >
            <PhoneInput
              specialLabel=""
              country="uz"
              alwaysDefaultMask
              inputProps={{
                placeholder: '+998 --  ---  --  --',
                required: true,
              }}
              defaultMask=".. ... - .. - .."
              inputClass={`w-[273px] border p-1 px-2 rounded-sm hover:border-blue-400 focus:outline-none focus:blue focus:blue-400 `}
            />
          </Form.Item>
        </div>
        <div className=" mx-4">
          <p className="mb-2">{t('role')}</p>
          <Form.Item name={'agent_role'}>
            <Select
              defaultValue={t('agent')}
              style={{ width: 120, borderRadius: 2 }}
              options={roles.map((item) => {
                return { value: item, label: t(item) }
              })}
            />
          </Form.Item>
        </div>
      </div>
    </>
  )
}
export default AgentModal
