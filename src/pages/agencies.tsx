import TempBreadCumb from '@/components/templates/BreadCumb/tempBreadCumb'
import ContentWrapper from '@/components/templates/wrapper/contentWrapper'
import useTranslation from 'next-translate/useTranslation'

const Agencies = () => {
  const { t } = useTranslation('')

  return (
    <ContentWrapper>
      <TempBreadCumb description="dasd" />
      <div className="">{t('agencies')}</div>
			<div>{t('example')}</div>
    </ContentWrapper>
  )
}

export default Agencies
