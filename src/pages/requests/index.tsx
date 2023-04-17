import ContentWrapper from '@/components/templates/wrapper/contentWrapper'
import TempBreadCumb from '@/components/templates/BreadCumb/tempBreadCumb'
import RequestTable from '@/components/templates/tables/RequestTable'

const UserRequestList = () => {
  return (
    <ContentWrapper>
      <TempBreadCumb
        description={
          'For you to have detailed information about a given advertising offer'
        }
      />
      <RequestTable />
    </ContentWrapper>
  )
}

export default UserRequestList
