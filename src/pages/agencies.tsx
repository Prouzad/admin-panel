import { Input } from 'antd'
import { agenciesCrumb } from 'BREADCRUMB_DATA'
import useTranslation from 'next-translate/useTranslation'

import TempBreadCumb from '@/components/templates/BreadCumb/tempBreadCumb'
import ContentWrapper from '@/components/templates/wrapper/contentWrapper'
const { Search } = Input
const Agencies = () => {
  const { t } = useTranslation('agencies')
  return (
    <ContentWrapper>
      <TempBreadCumb data={agenciesCrumb} />
      <div className="">{t('agencies')}</div>
      <div>{t('example')}</div>
      <Search
        placeholder="Please enter"
        allowClear
        style={{
          width: 232,
        }}
        // onSearch={(value: string) => {}}
      />
    </ContentWrapper>
  )
}

export default Agencies
