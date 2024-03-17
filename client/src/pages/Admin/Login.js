import { message } from 'antd'
import axios from 'axios'
import React from 'react'
import { HideLoading, ShowLoading } from '../../redux/rootSlice'
import { useDispatch } from 'react-redux'

function Login() {
  const[user,setUser]=React.useState({

    username:"",
    password:""
})
const dispatch=useDispatch()
const login=async()=>{
  try {
    dispatch(ShowLoading())
    const response=await axios.post(`${process.env.REACT_APP_BACKEND}/portfolio/admin-login`,user)
    dispatch(HideLoading())
    if(response.data.success){
      message.success(response.data.message)
      localStorage.setItem("token",response.data)
      window.location.href="/admin"
    }
    else{
      message.error(response.data.message)
    }
  } catch (error) {
    message.error(error.message)
    dispatch(HideLoading())
  }
}
  return (
   <>
   <div className='flex justify-center items-center flex-col h-screen gap-10 bg-primary'>
    <div className='w-96 flex justify-center items-center flex-col gap-5'>
<h1 className="font-semibold text-2xl text-white">Login</h1>
<input type="text" placeholder='Username' name='username' onChange={(e)=>setUser({...user,username:e.target.value})}/>
<input type="password" placeholder='Password' name='password' onChange={(e)=>setUser({...user,password:e.target.value})}/>
<button className=' text-white px-5 py-2 bg-secondary' onClick={login}>Login</button>
</div>
</div>
   </>
  )
}

export default Login