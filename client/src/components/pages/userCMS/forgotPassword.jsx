import React, { useRef, useState } from 'react'


import { useNavigate } from 'react-router-dom'
import { REQUSET_RESET_PASSWORD } from '../../../constant/constant'
import { apiPost } from '../../../services/services'
const ForgotPassword = () => {
  const emailRef = useRef()
  const [msg, setMsg] = useState(null)
  const [errMsg, setErrMsg] = useState(null)
  const [loading, setLoading] = useState(false)
  const [toggle, setToggle] = useState(false)
  const nav = useNavigate()
  const requsetResetPassword = async () => {
    setLoading(true)
    setErrMsg(null)
    setMsg(null)
    try {
      const { data } = await apiPost(REQUSET_RESET_PASSWORD, {
        email: emailRef.current.value,
        redirectUrl: "http://localhost:3002/resetPassword"
      })
      setToggle(true)
      console.log(data)
      setMsg(data.message)


      setTimeout(() => {
        setToggle(true);
        setLoading(false);
      }, 3000)
    } catch (err) {
      setToggle(true)

      console.log(err.response)
      setErrMsg(err.response.data.message)
      setLoading(false)
    }

  }
  return (
    <div className='flex items-center' style={{ minHeight: "100vh" }}>
      <div className='mt-[-200px] mx-auto p-5 shadow-2xl rounded-xl border  '>
        <p className='text-base my-2'>Enter you email to reset your password:</p>
        <input ref={emailRef} className='input  border-[2px] border-[black] block rounded-2xl px-2 h-[50px]' type="email" placeholder='Enter your email....' />
        <button disabled={toggle} onClick={requsetResetPassword} className='btn-sm btn mt-2'>Send Email </button>
        {toggle && errMsg && <button onClick={() => {
          setToggle(false)
          setMsg(null)
          setErrMsg(null)
        }} className='btn-sm btn mx-2 mt-2'>Try Again </button>}


        {msg && <p className='text-base text-[green] my-2'>{msg}</p>}
        {loading && <img width={'100px'} src="https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=ecf05e47hdd0ty1pa1pm3qy7lpp6da26d5wlp3l4k2uym0aw&rid=giphy.gif&ct=g" alt="" />}
        {errMsg && <pre className='text-base text-[red] my-2 whitespace-pre-wrap overflow-auto'>{errMsg}</pre>}
      </div>
    </div>
  )
}

export default ForgotPassword