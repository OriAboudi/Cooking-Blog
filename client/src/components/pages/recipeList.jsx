
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router-dom'
import '../css/Main.css';
import {random} from 'lodash'

function RecipeList({ data }) {

    const item = data
    const rowID =random(0,1000) ;

    const slideLeft = () => {
        var slider = document.getElementById( rowID);
        slider.scrollLeft = slider.scrollLeft - 500;
    };
    const slideRight = () => {
        var slider = document.getElementById( rowID);
        slider.scrollLeft = slider.scrollLeft + 500;
    };



    return (
        <div>
            <div className="flex mx-[40px] mt-[56px] mb-4 justify-between">
                <h2 className='text-center sm:text-start text-3xl font-bold tracking-tight text-gray-900'>{item.url_code}</h2>
                <Link to={"/viewMore/" + item.url_code} className="ms-auto">View More</Link>
            </div>

            <div className='relative flex items-center group '>

                <MdChevronLeft
                    onClick={slideLeft}
                    className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'
                    size={40}
                />

                <div
                    id={rowID}
                    className='flex h-[310px]  w-[950px]  mx-auto   overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'
                >

                    {item.recipe_of_cat_id?.map((element) => {
                        return (
                            <div className='mt-3' key={element._id}>
                                <Link to={"/recipeInfo/" + element._id} className=" text-center food__link">
                                    <div className="food__img--large drop-shadow  ">
                                        <img src={element.img_url} alt="amricen" loading="lazy" />
                                    </div>
                                    <div className="pt-1"> {element.name}</div>
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
        </div>
    )
}

export default RecipeList