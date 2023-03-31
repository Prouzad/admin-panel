const UserInput = ({
  type,
  placeHolder,
}: {
  type: string
  placeHolder?: string
}) => {
  return (
    <div className="mb-6 w-full">
      <div className="">
        <input
          type={type}
          placeholder={placeHolder}
          className="border-2 border-slate-400 text-gray-900 text-lg rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-4 "
        />
      </div>
    </div>
  )
}

export default UserInput
