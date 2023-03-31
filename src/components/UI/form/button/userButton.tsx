const UserButton = ({ text, style }: { text: string; style?: string }) => {
  return (
    <>
      <button
        className={`border  border-sky-800 bg-cyan-800 active:bg-cyan-600 p-4 rounded-md ${style}`}
      >
        {text}
      </button>
    </>
  )
}

export default UserButton
