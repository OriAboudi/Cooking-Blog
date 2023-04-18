import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { CATEGORY_INFO, PAGES_URL } from '../../constant/constant';
import { apiGet } from '../../services/services';
import GeneralRecipe from './generalRecipe'
import Pages from './pages';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function ViewMore() {

  const [categoryData, setCategoryData] = useState({});
  const params = useParams()
  console.log(params["url_code"]);
  const [searchParams] = useSearchParams();
  const nav = useNavigate()

  useEffect(() => {
    doApi()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get('page')]);

  const doApi = async () => {
    try {
      let { data } = await apiGet(CATEGORY_INFO + params["url_code"] + "?page=" + searchParams.get('page'))
      console.log(data);
      setCategoryData(data)

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div style={{ minHeight: "100vh" }}>

      {!categoryData ? <div>Loading</div>
        : <div>
          <p className='text-center  text-3xl font-bold my-4 text-gray-900'>{categoryData.name ? "All Recipe Of " + categoryData.name : "All Recipe Of -"}</p>
          <div className='flex flex-wrap justify-center '>
            {categoryData.recipe_of_cat_id?.map((item, i) => {
              return (
                <GeneralRecipe key={i} info={item} />
              )
            })}
          </div>
        </div>}





      <div className='flex justify-center sm:block sm:ml-[100px]  '>
        {/* <button onClick={() => {
          nav(-1)
        }} className="bg-gray-900 text-white px-[50px] py-2 my-4 mx-auto  ring-1 ring-black">Back</button> */}
        <Pages apiPage={PAGES_URL + "recipes/pages/count?perPage=12&category=" + params["url_code"]} linkTo={"/viewMore/" + params["url_code"] + "?page="} />
        <button onClick={() => nav(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} size="2xl" beat={true} style={{ marginTop: "30px", color: "#111", }} />
        </button>
      </div>
    </div>
  )
}

export default ViewMore