import React, { useContext } from 'react'

import { LockClosedIcon } from '@heroicons/react/20/solid'
import { FaUser } from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { MyUsers } from '../../../context/userContext'
import { LOGIN_URL, TOKEN_KEY } from '../../../constant/constant'
import { apiPost } from '../../../services/services'



function Login() {
    const { getUser } = MyUsers()
    const nav = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm()

    const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

    const onSub = (data) => {
        console.log(data);
        login(data)

    }
    const login = async (body) => {

        try {
            setLoading(true);
            const { data } = await apiPost(LOGIN_URL, body)
            console.log(data);

            setTimeout(() => {
                if (data.token) {
                    localStorage.setItem(TOKEN_KEY, data.token)
                    if (data.role == 'admin') {
                        nav('/admin')
                    } else {
                        nav('/')
                    }
                }
                if (localStorage.getItem(TOKEN_KEY)) {
                    getUser()
                }
                setLoading(false)

            }, 1000)

        } catch (err) {
            if (err.response.data.arr_msg) {
                setError(err.response.data.arr_msg);
            }
            setLoading(false);
        }

    }





    return (
        <div style={{minHeight:"100vh"}} className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8 mt-[-100px]">
                <div className='flex flex-col justify-center'>
                    <FaUser className=' h-8 w-auto lg:block " ' color='black' size={'30px'} />
                    {/* <img
                        className="mx-auto h-12 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    /> */}
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Login to your account
                    </h2>

                </div>
                <form onSubmit={handleSubmit(onSub)} className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px rounded-md  ">
                        <div className='mb-4'>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input


                                className="relative block w-full appearance-none  rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Email address"
                                {...register('email', { required: { value: true, message: "Email is requierd" }, minLength: { value: 3, message: 'minimum 3 characters' }, maxLength: { value: 100, message: "Maximum 100 characters" }, pattern: { value: emailReg, message: "Email invalid" } })}
                            />
                            {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input

                                type="password"

                                className="relative block w-full appearance-none  rounded-lg border  border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Password"
                                {...register('password', { required: { value: true, message: "password is required" }, minLength: { value: 3, message: "minimum 3 characters!" }, maxLength: { value: 20, message: "maximum 20 characters!" } })}
                            />
                            {errors.password && <p className='text-red-600'>{errors.password.message}</p>}
                        </div>
                    </div>
                    {loading && error ? <div className="flex items-center">
                        <img style={{ position: 'absolute', zIndex: '-1' }} width={'80px'} src='https://media4.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=ecf05e47nogttyy9l1kfcz2ckyo2oot6pkp8dhvia62f9euw&rid=giphy.gif&ct=g' />
                    </div> :
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <Link to={"/users/forgotPassword"} className="font-medium text-bg-gray-800 hover:text-bg-gray-800">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>
                    }
                    {/* check the state error and setError */}

                    {error && <p className='text-red-600'>{error}! </p>}
                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-bg-gray-800 group-hover:text-bg-gray-700" aria-hidden="true" />
                            </span>
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Login