import React from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom';
import { RESET_PASSWORD } from '../../../constant/constant';
import { apiPost } from '../../../services/services';




const ResetPassword = () => {
    const { getValues, register, handleSubmit, formState: { errors } } = useForm()
    const validateConfirmPassword = (value) => {
        if (value !== getValues('password')) {
            return 'Passwords do not match';
        }
    };
    const [query] = useSearchParams()
    const resetPassword = async ({password}) => {
        try{
            const {data} = await apiPost(RESET_PASSWORD,{
                userId:query.get('id'),
                resetString:query.get('str'),
                newPassword:password
            
            })

            console.log(data)
        }catch(err){
            console.log(err.response)
        }
    }
    const onSub = async (bodyData) => {
        console.log(bodyData)
        resetPassword(bodyData)
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSub)} className="px-5 mt-8 mx-auto space-y-6 md:w-[40%]" >
                <p className='text-[30px] underline'>Reset Password</p>
                <div className="-space-y-px rounded-md shadow-sm">
                    <div >
                        <label className="sr-only">
                            password
                        </label>
                        <input
                            {...register('password', { required: true, minLength: 3, maxLength: 20 })}
                            type="password"

                            className="mt-3 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="password.."
                        />
                        {errors.password && <p className='text-red-600'>password is required </p>}

                    </div>
                    <div >
                        <label className="sr-only">
                            confirm password...
                        </label>
                        <input
                            {...register('confirmPassword', {
                                required: { value: true, message: 'confirm password is required' },
                                validate: validateConfirmPassword
                            })}
                            type="password"

                            className="mt-3 relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            placeholder="confirm password....."
                        />
                        {errors.confirmPassword && <p className='text-red-600'>{errors.confirmPassword.message} </p>}

                    </div>

                </div>

                <div className="flex items-center justify-between">



                </div>
                <div>
                    <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >

                        Reset Password
                    </button>
                </div>
            </form>

        </div>
    )
}

export default ResetPassword