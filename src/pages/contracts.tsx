import { contractsCrumb } from 'BREADCRUMB_DATA'

import TempBreadCumb from '@/components/templates/BreadCumb/tempBreadCumb'
import ContentWrapper from '@/components/templates/wrapper/contentWrapper'

const Contracts = () => {
  return (
    <ContentWrapper>
      <TempBreadCumb data={contractsCrumb} />
      <h2>Contracts</h2>
    </ContentWrapper>
  )
}

export default Contracts
