import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { USER_INFO } from '../../../constant/constant';
import { apiGet } from '../../../services/services';
import UserRecipe from './userRecipe'

function UserInfo() {
    const [data, setData] = useState([]);
    const nav = useNavigate();
    const [searchParams] = useSearchParams();


    const doApi = async () => {

        try {
            console.log(searchParams.get('page'));
            const { data } = await apiGet(USER_INFO + "?page=" + searchParams.get('page'))
            console.log(data);
            setData(data)


        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        doApi();
    }, [searchParams.get('page')]);


    return (
        <div>
            {!data.recipe_id ? <div>Loading</div> :

                <div className="p-16">
                    <div className="p-8 bg-white shadow mt-24">
                        <div className="grid grid-cols-1 md:grid-cols-3">
                            <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0">
                                <div>
                                    <p className="font-bold text-gray-700 text-xl">{data.role}</p>
                                    <p className="text-gray-400">role</p>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-700 text-xl">{data.recipe_id.length}</p>
                                    <p className="text-gray-400">Recipes</p>
                                </div>
                                <div>
                                    <p className="font-bold text-gray-700 text-xl">{data.fav_id.length}</p>
                                    <p className="text-gray-400">Favorit recipes</p>
                                </div>
                            </div>
                            <div className="relative">
                                <div>

                                    <img src={data.profileImg ? data.profileImg : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP3lC0SfgqCcTGipFh64hddM6xgBYQj90wOA&usqp=CAU'} className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center" alt="userImage" />
                                </div>
                            </div>

                            <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                                <button
                                    onClick={() => nav('/submit-recipe')}
                                    className="text-white py-2 px-4 uppercase rounded bg-blue-400 hover:bg-blue-500 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                                >

                                    Submit

                                </button>
                                <button
                                    onClick={() => nav('/submit-recipe')}
                                    className="text-white py-2 px-4 uppercase rounded bg-gray-700 hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
                                >
                                    My Favorit
                                </button>
                            </div>
                        </div>

                        <div className="mt-20 text-center pb-12">
                            <h1 className="text-4xl font-medium text-gray-700">{data.fullName} <span className="font-light text-gray-500">27</span></h1>
                            <p className="font-light text-gray-600 mt-3">Bucharest, Romania</p>


                        </div>



                    </div>

                    <UserRecipe data={data} />
                </div>}




        </div>
    )
}

export default UserInfo