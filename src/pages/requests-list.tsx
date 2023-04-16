import ContentWrapper from '@/components/templates/wrapper/contentWrapper'

import AntTable from '@/components/templates/tables/antTable'
import { Breadcrumb } from 'antd'

const UserRequestList = () => {
  return (
    <ContentWrapper>
      <div className="px-6 py-4 bg-white mb-3 rounded col-start-3 col-end-19 row-start-2 row-end-4">
        <Breadcrumb
          items={[
            {
              title: 'Home',
            },
            {
              title: (
                <a href="" className="text-black">
                  Requests
                </a>
              ),
            },
          ]}
        />
        <h2 className="text-xl font-medium mt-2 title-page">Requests</h2>
        <p className="text-[13px] mt-3">
          For you to have detailed information about a given advertising offer
        </p>
      </div>
      <AntTable />
    </ContentWrapper>
  )
}

export default UserRequestList
