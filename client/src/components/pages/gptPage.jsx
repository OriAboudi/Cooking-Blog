import React, { useRef, useState } from 'react'
import { apiPostGPT } from '../../services/services';
import Typewriter from 'typewriter-effect';


function GptPage() {

    // npm i typewriter-effect
    const [data, setData] = useState("")
    const [loading, setloading] = useState(false);


    const inputR = useRef(null);



    const doApi = async () => {
        setloading(true)
        setData("")
        let url = 'https://api.openai.com/v1/chat/completions'
        let body = {
            "model": "gpt-3.5-turbo",
            "messages": [{ "role": "user", "content": inputR.current.value + ". If what is writtenhas nothing to do with food, ingredients or recipes in particular and there is a lack of context in ingredients, food or recipes, do not reply to me. And message me back. Try again to write something related to food, ingredients or recipes! Don't answer if it's not related to the topic I told you!.  " }]
        }

        let { data } = await apiPostGPT(url, body)
        console.log(data);
        setData(data.choices[0].message.content);

        setloading(false);



 


    }




    return (
        <div className=' w-[350px] sm:w-[500px] md:w-[650px] mx-auto mt-[50px]'>
            <h2 className=' text-3xl font-bold tracking-tight text-gray-900 
            text-center m-4 mb-4'>Your Personal Recipe Creator </h2>
            <p className="text-center  text-[17px] mt-3
             text-gray-600 mb-[30px]">Welcome to GPT,
                <br />
                the powerful language model designed by
                OpenAI to help you create amazing recipes!

                With GPT, you can easily generate recipes
                by specifying ingredients or a particular cuisine type.

                The model provides step-by-step
                instructions and cooking times for each recipe.

                Customize recipes to fit dietary
                preferences such as gluten-free, vegetarian or keto.

                Simply input your desired
                ingredients or cuisine type, and let GPT do the rest.

                Whether you're a seasoned
                cook or a beginner,

                GPT can assist you in crafting delicious meals. Try it today
                and start cooking up a storm with GPT!</p>

            <label className='text-[17px] ' >Enter ingredients or cuisine type to generate recipe:</label>


            <textarea className='block w-full p-4 bg-gray-400 rounded-md border-2 border-gray-600 mt-2 ' rows={5} ref={inputR} type="text" />


            <button className='my-[30px] text-white bg-gradient-to-r
             from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br
              focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
              font-medium rounded-lg text-sm px-5 py-2.5 
              text-center mr-2 mb-2' onClick={doApi}>submit</button>


            {loading ? <div>loading</div> :
                <div className='block p-4  w-full  bg-gray-400 rounded-md border-2 border-gray-600 mt-2 mb-[70px]'>
                    <pre style={{ overflow: 'auto', whiteSpace: 'pre-wrap', fontFamily: 'sans-serif', color: 'white' }}>

                        <Typewriter


                            options={{
                                strings: data,
                                autoStart: true,
                                delay: 30
                            }} />:



                    </pre>
                </div>


            }

        </div>
    )
}

export default GptPage