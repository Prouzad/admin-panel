import UserButton from '../button/userButton'
import UserInput from '../input/userInput'
import { signIn } from 'next-auth/react'


const UserLogin = () => {
	const handleSubmit = () => {
		try{
			const res = signIn()
		}catch(err){
			console.log(err)
		}
	}
  return (
    <div className="w-[550px] p-10 py-20 rounded-xl bg-white border-2 border-blue-200 flex items-center justify-center">
      <form className="w-[70%] flex flex-col items-center " onSubmit={handleSubmit}>
        <UserInput type={'text'} placeHolder="Login" />
        <UserInput type={'password'} placeHolder="Password" />
        <UserButton text={'Login'} style="w-[100%] text-white " />
      </form>
    </div>
  )
}

export default UserLogin
