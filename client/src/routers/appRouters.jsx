import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Home from '../components/home';
// import Logout from '../components/pages/userCMS/logout';
// import Login from '../components/pages/userCMS/login';
// import SignUp from '../components/pages/userCMS/signUp';
// import Layout from '../layout/layoutUser/layout';
// import SubmitPage from '../components/pages/userCMS/submitPage';
// import RecipeInfo from '../components/misc/recipeInfo';
// import RecipeSearch from '../components/pages/recipeSearch';
// import UserInfo from '../components/pages/userCMS/userInfo';
// import ViewMore from '../components/misc/viewMore';
// import CategoriesInfo from '../components/misc/categoriesInfo';
// import GptPage from '../components/pages/gptPage';
// import About from '../components/pages/about';
import { lazy, Suspense } from 'react';
import ForgotPassword from '../components/pages/userCMS/forgotPassword';
import ResetPassword from '../components/pages/userCMS/resetPassword';
import HomeAdmin from '../components/admin/homeAdmin';
import LayoutAdmin from '../layout/layoutAdmin/layoutAdmin';

const Home = lazy(() => import("../components/home"))
const Logout = lazy(() => import("../components/pages/userCMS/login"))
const Login = lazy(() => import("../components/pages/userCMS/login"))
const SignUp = lazy(() => import("../components/pages/userCMS/signUp"))
const Layout = lazy(() => import("../layout/layoutUser/layout"))
const SubmitPage = lazy(() => import("../components/pages/userCMS/submitPage"))
const RecipeInfo = lazy(() => import("../components/misc/recipeInfo"))
const RecipeSearch = lazy(() => import("../components/pages/recipeSearch"))
const UserInfo = lazy(() => import("../components/pages/userCMS/userInfo"))
const ViewMore = lazy(() => import("../components/misc/viewMore"))
const CategoriesInfo = lazy(() => import("../components/misc/categoriesInfo"))
const GptPage = lazy(() => import("../components/pages/gptPage"))
const About = lazy(() => import("../components/pages/about"))


const AppRouters = () => {

    return (
        <Router>
            <Suspense fallback={<h2>loading</h2>}>

                <Routes>
                    {/* User Layout */}
                    <Route path='/' element={<Layout />}>
                        <Route index element={< Home />} />
                        <Route path='/signup' element={< SignUp />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/logout' element={<Logout />} />
                        <Route path='/submit-recipe' element={<SubmitPage />} />
                        <Route path='/recipeInfo/:id' element={<RecipeInfo />} />
                        <Route path='/viewMore/:url_code' element={<ViewMore />} />
                        <Route path='/categoriesInfo/:id' element={<CategoriesInfo />} />
                        <Route path='/recipeSearch/' element={<RecipeSearch />} />
                        <Route path='/userInfo/' element={<UserInfo />} />
                        <Route path='/gpt/' element={<GptPage />} />
                        <Route path='/about/' element={<About />} />
                        <Route path='users/forgotPassword/' element={<ForgotPassword />} />
                        <Route path='users/resetPassword/' element={<ResetPassword />} />
                    </Route>

                    {/* Admin Layout */}
                    <Route path='admin/' element={<LayoutAdmin/>}>
                        <Route path='home' element={<HomeAdmin />} />
                    </Route>
                    {/* Not Found */}
                    <Route path='/*' element={<h1>Not Found 404</h1>} />
                </Routes>
            </Suspense>

        </Router >
    )
}

export default AppRouters