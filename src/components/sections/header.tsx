import { signOut, useSession } from 'next-auth/react'
import { IconLogOut, IconLogo } from '../UI/icons/icons'
import { redirect } from 'next/dist/server/api-utils'

const UserHeader = () => {
  const { data } = useSession()
  console.log('session', data)
  return (
    <div className="h-20 w-full bg-white p-3 flex items-center rounded-b-2xl fixed ">
      <div className="w-[290px] pl-7 border-r-2">
        <IconLogo />
      </div>
      <div className="w-[80%] flex justify-between px-5">
        <div className="ml-7 text-cyan-900 text-xl font-bold">
          {data?.user?.name}
        </div>
        <div
          className="cursor-pointer"
          onClick={() =>
            signOut({
              callbackUrl: `${window.location.origin}`,
            })
          }
        >
          <IconLogOut className="text-3xl text-cyan-900" />
        </div>
      </div>
    </div>
  )
}
export default UserHeader
