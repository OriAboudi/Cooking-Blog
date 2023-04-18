import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { INPUT_SEARCH, PAGES_URL } from '../../constant/constant'
import { apiGet } from '../../services/services'
import GeneralRecipe from '../misc/generalRecipe'
import Pages from '../misc/pages'

function RecipeSearch() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [dataSearch, setDataSearch] = useState([]);
    const nav = useNavigate()

    const doApi = async () => {
        try {
            let { data } = await apiGet(INPUT_SEARCH + "?s=" + searchParams.get("s") + "&page=" + searchParams.get("page"));
            console.log(data);
            setDataSearch(data);

        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => { doApi() }, [searchParams.get("page")])
    return (
        <div>

            {!dataSearch ? <div>Loading</div>
                :
                <div>{dataSearch.length > 0 ?
                    <div>

                        <p className='text-center  text-3xl font-bold my-4 text-gray-900'>{"All Recipe Of " + dataSearch.name}</p>
                        <div className='flex flex-wrap justify-center '>
                            {dataSearch?.map((item, i) => {
                                return (
                                    <GeneralRecipe key={i} info={item} />
                                )
                            })}
                        </div>
                    </div> : <p className='text-center  text-3xl font-bold my-4 text-gray-900'>No Results</p>}
                </div>}



            <div className='flex justify-center sm:block sm:ml-[100px]  '>
                <button onClick={() => {
                    nav(-1)
                }} className="bg-gray-900 text-white px-[50px] py-2 my-4 mx-auto  ring-1 ring-black">Back</button>
            </div>

            <Pages apiPage={PAGES_URL + "recipes/pages/count?perPage=12&s=" + searchParams.get("s")} linkTo={"/recipeSearch/?s=" + searchParams.get("s") + "&page="} />
        </div>

    )
}

export default RecipeSearch