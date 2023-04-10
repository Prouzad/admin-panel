const UserButton = ({ text, style }: { text: string; style?: string }) => {
  return (
    <>
      <button
        className={`border gap-3  border-sky-800 bg-[#174880;] active:bg-blue-800 p-4 rounded-md ${style}`}
      >
        {text}
      </button>
    </>
  )
}

export default UserButton
