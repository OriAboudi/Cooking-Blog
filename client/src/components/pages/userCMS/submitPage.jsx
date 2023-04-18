import React, { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { MyData } from '../../../context/dataContext'
import { ADD_RECIPE, CATEGORIES_NAME, PRESET_KEY } from '../../../constant/constant'
import { apiGet, apiPost } from '../../../services/services'
import axios from 'axios'
import ModalAddRecipe from '../../../shared/components/modalAddRecipe'
import ModalLoading from '../../../shared/components/modalLoading'
import Select from "react-tailwindcss-select";
import { useEffect } from 'react'

const optionsRating = [
  { value: "0", label: " ✳✳✳✳✳✳" },
  { value: "1", label: "⭐ " },
  { value: "2", label: "⭐⭐ " },
  { value: "3", label: "⭐⭐⭐ " },
  { value: "4", label: "⭐⭐⭐⭐ " },
  { value: "5", label: "⭐⭐⭐⭐⭐ " },
];


function SubmitPage() {
  const [ingredient, setIngredient] = useState(['']);
  const [openMR, setOpenMR] = useState(false);
  const [openML, setOpenML] = useState(false);
  const [recipe, setRecipe] = useState({});
  const [options, setOptions] = useState([])
  const [selected, setSelected] = useState(null);
  const [rating, setRating] = useState(null);


  const { doApi } = MyData()
  const inputR = useRef();
  const fileR = useRef();
  const { register, handleSubmit, formState: { errors } } = useForm()



  useEffect(() => {
    doApiCat();
  }, [])
  const doApiCat = async () => {

    const { data } = await apiGet(CATEGORIES_NAME)

    const newArray = data.map(obj => {
      for (let key in obj) {
        if (key === 'name') {
          obj.label = obj.name;
          delete obj.name;
        }
        if (key === 'url_code') {
          obj.value = obj.url_code;
          delete obj.url_code;
        }

        delete obj._id;
      }
      return obj;
    });

    console.log(newArray)
    setOptions(newArray)
  }
  const handleChangeCategory = value => {
    console.log("value:", value);
    setSelected(value);

  };
  const handleChangeRating = value => {
    console.log("value:", value);
    setRating(value);
  };
  const onSub = (bodyData) => {

    console.log(bodyData)
    bodyData.ingredients = ingredient;
    bodyData.rating = rating.value;
    bodyData.category = selected;
    console.log(bodyData)
    uploadFile(bodyData);

  }
  // upload the image to cludinary server, 
  // then get the data from ,category select, rating select and pass the date to function apiRecipe
  const uploadFile = async (_data) => {
    setOpenML(true)
    let formData = new FormData()
    formData.append("file", fileR.current.files[0])
    formData.append("upload_preset", PRESET_KEY);
    console.log(fileR.current.files[0]);
    try {

      let { data } = await axios.post(`https://api.cloudinary.com/v1_1/dzchbifhx/image/upload`, formData)
      console.log(data.secure_url);
      if (data.secure_url) {
        _data.img_url = data.secure_url;
        console.log(_data);
      }


      doApiRecipe(_data)

    } catch (error) {
      console.log(error);
    }

  }
  //send the data to server and Get the recipe after creating and show in modal
  const doApiRecipe = async (_data) => {
    try {

      let data = await apiPost(ADD_RECIPE, _data);
      console.log(data);
      if (data.data._id) {
        setRecipe(data.data)
        doApi()
        setOpenML(false)
        setOpenMR(true);

      }

    } catch (error) {
      console.log(error);
    }

  }
  // add ingredient to array (with validation)  
  const addIngredient = () => {

    if (ingredient[0] === '') {

      setIngredient([inputR.current.value, ""]);

    } else {

      let tempArr = [...ingredient];
      tempArr.pop()
      if (inputR.current.value === "") {
        alert("Please enter a value int the input");
      }
      else {
        tempArr.push(inputR.current.value, "")
        setIngredient(tempArr);


      }
    }

    console.log(ingredient);
  }



  return (
    <div className="flex flex-col   items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* check with xl width */}
      <div className="w-[330px] sm:w-[500px] md:w-[650px]">

        {/* tital */}
        <div className='flex flex-col items-center mb-[40px] '>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Submit Your Recipe
          </h2>
          <p className="text-center sm:w-[400px] text-[13px] mt-3 text-gray-600">Share your amazing recipies with thousands of web developers accross the world. Fill our form to get started.</p>
        </div>
        {!options ? <div>Loading</div> :
          <form onSubmit={handleSubmit(onSub)} className="mt-8 space-y-6 " >

            <div className=" rounded-md shadow-sm">
              {/* name */}
              <div className='my-3' >
                <label className="text-gray-500  font-normal text-[15px] mt-1">
                  Recipe Name:
                </label>
                <input
                  {...register('name', { required: { value: true, message: 'name is required' }, minLength: { value: 2, message: 'min 2 characters' }, maxLength: { value: 200, message: ' maximum 20 characters' } })}
                  type="text"

                  className="mt-1 relative  rounded-lg  appearance-none  rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"

                />

                {errors.fullName && <p className='text-red-600'> {errors.fullName.message}</p>}
              </div>
              {/* description */}
              <div  >
                <label className="text-gray-500  font-normal text-[15px] mt-1">
                  Description:
                </label>
                <input
                  {...register('description', { required: { value: true, message: 'description is required' }, minLength: { value: 2, message: 'min 2 characters' }, maxLength: { value: 500, message: ' maximum 20 characters' } })}
                  type="text"

                  className="mt-1 relative  rounded-lg  appearance-none  rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"

                />

                {errors.description && <p className='text-red-600'> {errors.description.message}</p>}
              </div>

              {/*  info  */}
              <div className='my-4'  >

                <label className="text-gray-500 font-normal text-[15px] ">
                  Info:
                </label>

                <textarea
                  rows={5}
                  {...register('info', { required: { value: true, message: 'info is required' } })}
                  type="text"

                  className="mt-1 relative  rounded-lg  appearance-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />

                {errors.info && <p className='text-red-600'> {errors.info.message}</p>}
              </div>

              {/* categories select  */}
              <label className="text-gray-500 font-normal mt-3 text-[15px]">
                Select a category:
              </label>

              <div className='mt-2 mb-4'>
                <Select
                  primaryColor={"default"}
                  value={selected}
                  onChange={handleChangeCategory}
                  options={options}
                  isMultiple={true}
                  isSearchable={true}
                  onSearchInputChange={
                    (e) => { console.log("value:", e.target.value); }
                  }
                />
              </div>

              {/* {rating} */}

              <label className="text-gray-500 font-normal mt-1 text-[15px]">
                Select a Rating:
              </label>
              <div className='my-2'>
                <Select
                  value={rating}
                  onChange={handleChangeRating}
                  options={optionsRating}
                />

              </div>


              {/* url_site  */}
              <div className='my-3' >
                <label className="text-gray-500   font-normal text-[15px]">
                  Source:
                </label>
                <input
                  {...register('url_site', {
                    required: {
                      value: true,
                      message: 'url_site is required',
                    }
                  })}
                  type="input"

                  className="mt-1  relative rounded-lg  appearance-none  rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                />
                {errors.url_site && <p className='text-red-600'>{errors.url_site.message} </p>}

              </div>

              {/*  ingredient  */}
              <div  >
                <label className="text-gray-500   font-normal text-[15px]">
                  Ingredient:
                </label>

                {ingredient.map((itme, i) => {
                  return (
                    <div key={i} >
                      <input
                        {...register('ingredients', { required: { value: false } })}
                        type="text"
                        className="mt-1 mb-1 relative rounded-lg  appearance-none  rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        ref={inputR}
                      />
                      {errors.ingredients && <p className='text-red-600'>{errors.ingredients.message} </p>}

                    </div>
                  )
                })}


                <button
                  type="button"
                  className="my-4 group relative text-center flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  onClick={() => {

                    addIngredient()
                  }}
                >
                  +Ingredient
                </button>
              </div>

              {/* image product  */}
              <div className='flex flex-col ' >

                <label className="text-gray-500   font-normal text-[15px] my-2">
                  Product Image:
                </label>


                <label className="block mb-[36px] mt-3">
                  <span className="sr-only">Choose profile photo</span>
                  <input type="file"
                    ref={fileR}
                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                   file:bg-slate-100 file:text-gray-500
                    hover:file:bg-slate-400
                           
    "/>
                </label>




              </div>


              <div>
                <button
                  onClick={() => {
                    if (inputR.current.value === '') {
                      ingredient.pop();
                    }
                    else {
                      ingredient.pop();
                      setIngredient([...ingredient, inputR.current.value]);
                    }
                  }}
                  type="submit"
                  className="group relative text-center flex justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >

                  Submit
                </button>
              </div>

            </div>
          </form>}

      </div>
      <ModalLoading open={openML} setOpen={setOpenML} />
      <ModalAddRecipe open={openMR} setOpen={setOpenMR} data={recipe} grayButtonText={"Cancel"} href={'/'} />
    </div>

  )
}

export default SubmitPage