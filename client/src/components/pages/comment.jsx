import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ADD_COMMENT, GET_COMMENT } from '../../constant/constant';

import { apiGet, apiPost } from '../../services/services';
import { time_ago_en } from '../../shared/helpers/timeAgo';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

function Comment() {

    const params = useParams()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [comments, setComments] = useState([]);

    const nav = useNavigate()
    useEffect(() => {
        doApi()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const doApi = async () => {

        try {
            const { data } = await apiGet(GET_COMMENT + params["id"]);
            setComments(data);
            console.log(data);

        } catch (error) {
            console.log(error);
        }

    }

    const onSub = async (bodyData) => {
        try {
            const { data } = await apiPost(ADD_COMMENT + params["id"], bodyData)
            console.log(data);

            doApi()
        } catch (error) {
            console.log(error);
        }
    }
    // const options = { hour: 'numeric', minute: 'numeric', hour12: true };

    return (
        <div >
            <section className="  py-8 lg:py-16">
                <div className="max-w-2xl mx-auto px-4">

                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900 ">Discussion (20)</h2>
                    </div>


                    <form onSubmit={handleSubmit(onSub)} className="mb-[40px]">
                        <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 ">

                            <label className="sr-only">Your comment</label>
                            <textarea id="comment" rows="6"
                                {...register('info', { required: { value: true, message: 'info is required' }, minLength: { value: 1, message: "minimum 1 character" }, maxLength: { value: 9999 }, message: "maximum 9999 character" })}

                                className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-gray-600 dark:placeholder-gray-400 "
                                placeholder="Write a comment..." required>

                            </textarea>
                            {errors.info && <p className='text-red-600'>{errors.info.message}</p>}
                        </div>

                        <button type="submit"
                            className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center bg-slate-500 text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-slate-700">
                            Post comment
                        </button>
                      
                    </form>



                    <div className=' rounded-md p-[46px] flex flex-col max-h-[500px] scrollbar-hide   overflow-y-scroll  scroll-smooth  relative'>
                        {!comments ? <div>Loading </div> : comments.map((item, i) => {
                            return (

                                <article key={i} className="p-6 mb-6 text-base border rounded-[30px]  bg-slate-50 ">
                                    <footer className="flex justify-between items-center mb-2">
                                        <div className="flex items-center">
                                            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-gray-600">
                                                <img
                                                    className="mr-2 w-6 h-6 rounded-full"
                                                    src={item.img_url ? item.img_url : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                                                    alt="Michael Gough" />
                                                {item.user_name}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {time_ago_en((new Date(item.date_created)))}
                                            </p>
                                        </div>

                                        <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                                            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50  dark:hover:bg-gray-200 dark:focus:ring-gray-600"
                                            type="button">
                                            {/* <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                                                </path>
                                            </svg> */}
                                            <span className="sr-only">Comment settings</span>
                                        </button>

                                        {/* <!-- Dropdown menu --> */}
                                        <div id="dropdownComment1"
                                            className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                            {/* <ul className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownMenuIconHorizontalButton">
            <li>
                <a href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
            </li>
            <li>
                <a href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
            </li>
            <li>
                <a href="#"
                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
            </li>
        </ul> */}
                                        </div>
                                    </footer>

                                    <p className="font-sans">{item.info}

                                    </p>

                                    <div className="flex items-center mt-4 space-x-4">
                                        <button type="button"
                                            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                                            {/* <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg> */}
                                            Reply
                                        </button>
                                    </div>

                                </article>
                            )
                        })}

                    </div>
                    <div className=' ml-[20px] md:ml-0 lg:ml-[-90px] '>
                        <button onClick={() => nav(-1)}>
                            <FontAwesomeIcon icon={faArrowLeft} size="2xl" beat={true} style={{ marginTop: "30px", marginBottom: "50px", color: "#111", }} />
                        </button>
                    </div>
                </div>


            </section>


        </div>
    )
}

export default Comment

