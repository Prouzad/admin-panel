export interface IData {
  id?: number
  first_name?: string
  last_name?: string
  email?: string
  status: string
  university?: string
}

const bgStatus = (status: string) => {
  if (status === 'new') return 'bg-sky-600'
  if (status === 'accepted') return 'bg-green-500'
  if (status === 'rejected') return 'bg-red-600'

  return 'bg-slate-500'
}

const AdvReqFn = (data: IData[]) => {
  return (
    data?.map(
      ({ id, first_name, last_name, email, status, university }: IData) => {
        return {
          id: id,
          first_name: <p>{first_name}</p>,
          last_name: <p>{last_name}</p>,
          email: <p>{email}</p>,
          status: (
            <div
              className={`rounded-lg p-1 text-white text-center  ${bgStatus(
                status
              )}`}
            >
              {status}
            </div>
          ),
          university: <p className="">{university}</p>,
          extend: (
            <button className="py-2 px-4 bg-sky-600 rounded-2xl cursor-pointer hover:bg-sky-400 text-white">
              Подробнее
            </button>
          ),
        }
      }
    ) || ['l']
  )
}

export default AdvReqFn
