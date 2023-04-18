import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../css/Main.css';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { apiGet } from '../../services/services';
import { GET_CATEGORIES } from '../../constant/constant';
import { useEffect } from 'react';


function CategoriesList() {

    const [categories, setCategories] = useState([]);

    const doApi = async () => {
        const { data } = await apiGet(GET_CATEGORIES)
        console.log(data);
        setCategories(data)
    }

    useEffect(() => {
        doApi()
    }, [])

    const rowID = 5
    const slideLeft = () => {
        let slider = document.getElementById('sliderCategories' + rowID);
        slider.scrollLeft = slider.scrollLeft - 500;
    };
    const slideRight = () => {
        let slider = document.getElementById('sliderCategories' + rowID);
        slider.scrollLeft = slider.scrollLeft + 500;
    };



    return (
        <div>

            <div className='relative flex items-center group '>
                <MdChevronLeft
                    onClick={slideLeft}
                    className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
                    size={40}
                />
                <div
                    id={'sliderCategories' + rowID}
                    className='flex h-[160px] w-[950px]  mx-auto overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'
                >



                    {categories.map((item, i) => {
                        return (
                            <div key={i} className='mt-3'>
                                < Link to={"/categoriesInfo/" + item._id} className=" text-center category__link">
                                    <div className="category__img drop-shadow ">
                                        <img src={item.img_url} alt="American" loading="lazy" />
                                    </div>
                                    <div className="pt-1">{item.name}</div>
                                </Link>
                            </div>


                        )
                    })}



                </div>
                <MdChevronRight
                    onClick={slideRight}
                    className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
                    size={40}
                />
            </div>
        </div >
    )
}

export default CategoriesList