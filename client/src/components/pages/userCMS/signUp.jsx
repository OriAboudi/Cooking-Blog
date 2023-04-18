import { LockClosedIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import { SIGN_UP_URL } from '../../../constant/constant'
import { apiPost } from '../../../services/services'

const SignUp = () => {
    const nav = useNavigate();
    const [error, setError] = useState('')
    const { getValues, register, handleSubmit, formState: { errors } } = useForm()

    const emailReg = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i

    const signUp = async (_body) => {

        try {
            console.log(_body)
            const { data } = await apiPost(SIGN_UP_URL, _body)
            console.log(data)
            if (data.msg) {
                nav("/login");
            }

        } catch (err) {
            console.log(err.response.data)
            if (err.response.data.code === 11000) {
                setError(err.response.data.err_msg)
            }
        }

    }
    const onSub = (data) => {
        delete data.confirmPassword
        console.log(data)
        const obj = {
            fullName: data.fullName,
            email: data.email,
            password: data.password
        }
        if (data.profileImg) {
            obj.profileImg = data.profileImg
        }
        console.log(obj)

        signUp(obj)
    }

    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                //TODO: create a icon of Sign Up
                <div>
                    {/* <FaFont/> */}
                    <div>

                    </div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Sign Up
                    </h2>
                </div>
                <form onSubmit={handleSubmit(onSub)} className="mt-8 space-y-6" >
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div >
                            <label className="sr-only">
                                fullName
                            </label>
                            <input
                                {...register('fullName', { required: { value: true, message: 'name is required' }, minLength: { value: 2, message: 'min 2 characters' }, maxLength: { value: 20, message: ' maximum 20 characters' } })}
                                type="text"

                                className="mt-3 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="FullName..."
                            />

                            {errors.fullName && <p className='text-red-600'> {errors.fullName.message}</p>}
                        </div>
                        <div >
                            <label className="sr-only">
                                Profile Iamge Link
                            </label>
                            <textarea
                                rows={5}
                                {...register('profileImg', { required: { value: false, message: 'name is required' }, minLength: { value: 2, message: 'min 2 characters' } })}
                                type="text"

                                className="mt-3 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Profile Image Link..."
                            />

                            {errors.profile && <p className='text-red-600'> {errors.profile.message}</p>}
                        </div>

                        <div >
                            <label className="sr-only">
                                Email address
                            </label>
                            <input
                                {...register('email', { required: { value: true, message: "Email is required" }, pattern: { value: emailReg, message: 'Email invalid' } })}
                                type="email"

                                className="mt-3 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="Email address"
                            />
                            {errors.email && <p className='text-red-600'>{errors.email.message} </p>}
                        </div>
                        <div >
                            <label className="sr-only">
                                password
                            </label>
                            <input
                                {...register('password', { required: { value: true, message: 'password is required' }, minLength: { value: 3, message: 'min two characters' }, maxLength: { value: 20, message: 'max 20 characters' } })}
                                type="password"

                                className="mt-3 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="password.."
                            />
                            {errors.password && <p className='text-red-600'>{errors.password.message}</p>}

                        </div>
                        <div >
                            <label className="sr-only">
                                confirm password...
                            </label>
                            <input
                                {...register('confirmPassword', {
                                    required: {
                                        value: true,
                                        message: 'password is required',
                                    },
                                    validate: (value) => value === getValues('password') || 'password not mach'




                                })}
                                type="password"

                                className="mt-3 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="confirm password....."
                            />
                            {errors.confirmPassword && <p className='text-red-600'>{errors.confirmPassword.message} </p>}

                        </div>

                    </div>

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

                        </div>
                    </div>
                    {error && <p className='text-red-600'>{error}! </p>}

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <LockClosedIcon className="h-5 w-5 text-white " aria-hidden="true" />
                            </span>
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default SignUp