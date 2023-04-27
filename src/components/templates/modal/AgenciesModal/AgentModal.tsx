import { Select, Switch } from 'antd'
import PhoneInput from 'react-phone-input-2'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AgentModal = ({ itemID }: { itemID?: string }) => {
  return (
    <>
      <div
        style={{
          borderBottom: '1px solid #e8e8e8',
        }}
      ></div>
      <div style={{ padding: '16px 0' }} className="flex items-end">
        <div className="">
          <p className="mb-2">Phone number</p>
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
        </div>
        <div className=" mx-4">
          <p className="mb-2">Role</p>
          <Select
            defaultValue="disabled"
            style={{ width: 120, borderRadius: 2 }}
            onChange={() => 'asds'}
            options={[
              { value: 'disabled', label: 'Choose', disabled: true },
              { value: 'owner', label: 'Owner' },
              { value: 'lucy', label: 'Lucy' },
              { value: 'Yiminghe', label: 'yiminghe' },
            ]}
          />
        </div>
        <div className="flex h-8 items-center">
          <p className="mr-2">Is verified</p>
          <Switch defaultChecked onChange={() => 'rewe'} />
        </div>
      </div>
    </>
  )
}
export default AgentModal
