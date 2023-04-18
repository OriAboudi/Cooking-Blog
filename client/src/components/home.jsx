import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GET_ALL_RECIPES } from '../constant/constant'
import { apiGet } from '../services/services'
import CategoriesList from './pages/categoriesList'
import RecipeList from './pages/recipeList'



function Home() {

    const [data, setData] = useState([]);

    useEffect(() => { doApi() }, [])

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    }
    
    const doApi = async () => {
        try {
            let { data } = await apiGet(GET_ALL_RECIPES);
            let randomRecipes = [];
            let randomNumber;
            for (; randomRecipes.length < 3;) {
                randomNumber = getRandomInt(data.length);
                if (!randomRecipes.includes(data[randomNumber])) {
                    randomRecipes.push(data[randomNumber]);
                }
            }
            console.log(randomRecipes);
            setData(randomRecipes);

        } catch (error) {
            console.log(error.response);
        }
    }


    return (
        <main>

            {/* {strip start} */}
            <section>
                <div className="flex flex-col items-center sm:flex-row-reverse justify-evenly g-5 py-4 mb-4">
                    <div className="flex w-[350px]">
                        <img src="/img/hero-image.png" alt="Cooking blog" />
                    </div>

                    <div className="w-[350px] my-[16px] sm:my-auto ">

                        <h2 className="text-center sm:text-start text-3xl font-bold tracking-tight text-gray-900">Huge selection of delicios recipe ideas</h2>
                        <p className="text-center sm:text-start text-[13px] mt-3 text-gray-600">
                            Explore our huge selection of delicious recipe ideas including; easy desserts, delicious vegan and vegetarian dinner ideas, gorgeous pasta recipes, quick bakes, family-friendly meals and gluten-free recipes.
                        </p>

                        <div className="flex justify-center  sm:justify-start mt-5 sm:mt-5">
                            <Link to={"/gpt"} className="bg-gray-900 text-white px-4 py-2  ring-1 ring-black">Generate Recipe </Link>
                            <Link to={"/"} className="ring-1 ring-gray-600 py-2 px-4 mx-3">Show Random </Link>

                        </div>

                    </div>

                </div>
            </section>
            {/* {strip end} */}


            {/* {categories start} */}
            <section>
                <CategoriesList />
            </section>
            {/* {categories end} */}

//TODO: add lazy loading to image loading

            {/* rescipe */}
            <section>
                {!data ? <h2 className="text-center sm:text-start text-3xl font-bold tracking-tight text-gray-900">Loading</h2> 
                : data.map((item, i) => { return (<div key={i}> <RecipeList data={item} /> </div>) })}
            </section>
            {/* recipe end */}


            {/* strip submint  */}
            <section className="px-4 py-5 my-[50px] text-center">
                <img src="/img/publish-recipe.png" className=" mx-auto mb-4 " alt="Publish your recipe for FREE today" width="566" height="208" loading="lazy" />
                <h1 className="text-3xl mt-[30px] font-bold tracking-tight text-gray-900">Publish your recipe for FREE today</h1>
                <div className=" mx-auto ">
                    <p className=" mb-4">Publish your Recipe in front of thousands of people for free.</p>
                    <div className="mt-[40px]">
                        <Link to={"/submit-recipe"} className="bg-gray-900 text-white px-4 py-2  ring-1 ring-black">Submit Recipe</Link>
                    </div>
                </div>
            </section>
            {/* strip submit end */}

        </main>
    )
}

export default Home