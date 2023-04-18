import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { RECIPE_INFO } from '../../constant/constant';
import { apiGet } from '../../services/services';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Comment from '../pages/comment'
import Favorite from '../pages/userCMS/favorite';
import { useRef } from 'react';

function RecipeInfo() {


    const [info, setInfo] = useState({})
    const params = useParams()
    const nav = useNavigate()


    const doApi = async () => {
        try {
            let { data } = await apiGet(RECIPE_INFO + params["id"])
            setInfo(data)
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        doApi();
        window.scrollTo({
            top: 0,
            behavior: 'instant',
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])



    return (
        <div>
            {!info ? <div>Loading</div> :
                <div className='flex flex-col sm:flex-row justify-center items-center   mt-[20px] mb-[20px]'>
                    <div className='mt-3 sm:hidden'>
                        <h2 className='text-center sm:text-start text-3xl font-bold tracking-tight text-gray-900'>{info.name}</h2>

                    </div>
                    <div className='p-4'>
                        <img src={info.img_url} className='  w-[300px]' alt="" />
                    </div>
                    <div className='p-4 '>



                        <div className='hidden sm:block'>
                            <h2 className='text-center sm:text-start text-3xl font-bold tracking-tight text-gray-900'> {info.name}</h2>
                        </div>


                        <div className=''>
                            <p className='mb-4 '>{info.category}</p>
                            <h2 className='mt-1'>Cooking Instructions</h2>
                            <p className='w-[300px] md:w-[450px] mb-4 text-[15px]  text-gray-600'>{info.info}</p>
                            <p className='w-[300px] md:w-[450px] mb-4 text-[15px]  text-gray-600'>Sourc: <button onClick={() => { window.open(info.url_site, '_blank'); }}>{info.url_site}</button> </p>

                        </div>


                        <div>
                            <h2 className='mb-1'>Ingredients</h2>
                            <ul >

                                {info.ingredients?.map((item, i) => {
                                    return (<div key={i}>
                                        <hr />  <li className='text-[15px] pl-2 p-1 text-gray-600 '>{item}</li>
                                    </div>)
                                })}


                            </ul>
                        </div>
                        {info.rating ?

                            <div className="flex items-center mt-3 ">
                                <p className='mr-2'>Rating</p>
                                {Array(Math.floor(info.rating)).fill().map((_, i) => {
                                    return (
                                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    )
                                })}
                            </div> : ""}




                        <Favorite _id={info._id} />
                    </div>
                </div>}

            <Comment />
        




        </div>//TODO: Show the info and img about the recipe by props 
    )
}

export default RecipeInfo