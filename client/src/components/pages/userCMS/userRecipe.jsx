
import { useNavigate } from 'react-router-dom';
import { PAGES_URL, userInfo } from '../../../constant/constant';


import GeneralRecipe from '../../misc/generalRecipe';
import Pages from '../../misc/pages';


function UserRecipe({data}) {
    
    const nav = useNavigate()
 
    return (


        <div className='mt-[30px]'>

            {!data.recipe_id ? <div>Loading</div>
                :
                <div>   {!data.recipe_id.length>0 ? <p className='text-center  text-3xl font-bold my-4 text-gray-900'>No Results</p>
                :
                <div>
                        

                        <p className='text-center  text-3xl font-bold my-4 text-gray-900'>{"Your Recipes " + data.fullName}</p>
                        <div className='flex flex-wrap justify-center '>
                            {data.recipe_id?.map((item, i) => {
                                return (
                                    <GeneralRecipe key={i} info={item} />
                                )
                            })}
                        </div>
                    </div>}
                </div>}



            <div className='flex justify-center sm:block sm:ml-[100px]  '>
                <button onClick={() => {
                    nav(-1)
                }} className="bg-gray-900 text-white px-[50px] py-2 my-4 mx-auto  ring-1 ring-black transition transform hover:-translate-y-0.5">Back</button>
            </div>
            <Pages apiPage={PAGES_URL+"recipes/pages/count?perPage=9&id="+data._id} linkTo={"/userInfo?page="} />

        </div>

    )
}

export default UserRecipe