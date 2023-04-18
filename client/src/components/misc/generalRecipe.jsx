import React from 'react'
import { Link } from 'react-router-dom';
import '../css/Main.css';


function GeneralRecipe({info}) {
    const item = info;

    return (

        <div >
            <Link to={"/recipeInfo/" + item._id} >
                <div className='m-4'>
                    <div className="drop-shadow general__img food__link ">
                        <img src={item.img_url} alt="recipe" loading="lazy" />
                        <div className="pt-1 text-center">{item.name}</div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default GeneralRecipe