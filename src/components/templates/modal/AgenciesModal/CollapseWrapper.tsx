import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Collapse } from 'antd'
import useTranslation from 'next-translate/useTranslation'
import { ReactNode } from 'react'

const { Panel } = Collapse

export const CollapseButton = (props: any) => {
  return (
    <>
      <Button
        type="ghost"
        className="bg-[#2173DF] text-white h-[34px] px-2 rounded-sm flex items-center"
        icon={props.props.isActive ? <MinusOutlined /> : <PlusOutlined />}
      >
        <p className="ml-2">{props.title}</p>
      </Button>
    </>
  )
}

export const CollapseHeader = ({ title }: { title: string }) => {
  return (
    <>
      <p className="font-semibold p-0 text-base">{title}</p>
    </>
  )
}

const CollapseWrapper = ({
  children,
  title,
}: {
  children: ReactNode
  title: string
}) => {
  const { t } = useTranslation('common')
  const titleT = t(title)
  return (
    <Collapse
      expandIconPosition={'end'}
      expandIcon={(props) => {
        return <CollapseButton props={props} title={titleT} />
      }}
      ghost
      style={{
        margin: 0,
        padding: 0,
      }}
      onChange={() => {
        return 'as'
      }}
    >
      <Panel
        style={{
          border: 'none',
          borderBottom: '1px solid #e8e8e8',
          marginBottom: 16,
          padding: '16px 0',
        }}
        header={<CollapseHeader title={titleT} />}
        key="1"
      >
        {children}
      </Panel>
    </Collapse>
  )
}

export default CollapseWrapper
