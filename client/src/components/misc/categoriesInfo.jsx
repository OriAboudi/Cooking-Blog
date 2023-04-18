import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { GET_CATEGORIES } from '../../constant/constant';
import { apiGet } from '../../services/services';
import RecipeList from '../pages/recipeList';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function CategoriesInfo() {
  const [loading, setLoading] = useState(false);
  const [categoriesInfo, setCategoriesInfo] = useState([])
  const categoriesId = useParams();
  const nav = useNavigate();

  useEffect(() => { doApi() }, [])
  const doApi = async () => {
    try {
      setLoading(true)
      const { data } = await apiGet(GET_CATEGORIES + "/" + categoriesId["id"])
      console.log(data);
      setCategoriesInfo(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='mt-[20px]'>

      <h2 className='font-bold text-[50px] text-center'>{categoriesInfo.name}</h2>
      <h3 className='font-bold text-[25px] text-center px-[20px] lg:px-[120px]'>{categoriesInfo.discription}</h3>
      <div className=' lg:flex justify-between px-[20px] text-center lg:p-[70px]'>
        <p className='p-[30px]'>{categoriesInfo.info}</p>
        <img src={categoriesInfo.img_url} className="rounded-3xl mx-auto" width={500} alt="categoriesImg" />
      </div>
      {loading ? <div>loading</div> :
        < RecipeList data={categoriesInfo} />}
      <button onClick={() => nav(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} size="2xl" beat={true} style={{ margin: "30px", color: "#111", }} />
      </button>

    </div>
  )
}

export default CategoriesInfo