import React from 'react'
import CategoriesGraph from './graph/categoriesGraph'
import RecipeGraph from './graph/recipeGraph'
import UsersGraph from './graph/usersGraph'




export default function HomeAdmin() {

    return (
        <div className='mx-[50px]  '>
            <CategoriesGraph />
            <UsersGraph />
            <RecipeGraph />


        </div>
    )
}