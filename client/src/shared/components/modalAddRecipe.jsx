import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'

export default function ModalAddRecipe(
    {
        open,
        setOpen,
        href,
        grayButtonText,
        data
    }) {


    const nav = useNavigate()
    const cancelButtonRef = useRef(null)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl sm:m-4">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
                                    <div className="sm:flex sm:items-start">


                                        {/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <BsShieldCheck className="h-6 w-6 text-green-400" aria-hidden="true" />
                                        </div>

                                        
 */}



                                        {/* <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                {header}
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    {description}
                                                </p>
                                            </div>
                                        </div> */}

                                        {data && <div>
                                            <h2 className='  text-3xl font-bold tracking-tight text-green-600 text-center '>{data.name} Created successfully!</h2>

                                            <div className='flex flex-col sm:flex-row justify-center items-center   mt-[20px] mb-[20px]'>

                                                <div className='mt-3 sm:hidden'>
                                                    <h2 className='text-center sm:text-start text-3xl font-bold tracking-tight text-gray-900'>{data.name}</h2>

                                                </div>
                                                <div className='p-4'>
                                                    <img src={data.img_url} className='  w-[300px]' alt="" />
                                                </div>
                                                <div className='p-4'>
                                                    <div className='hidden sm:block'>
                                                        <h2 className='text-center sm:text-start text-3xl font-bold tracking-tight text-gray-900'>{data.description}</h2>
                                                    </div>


                                                    <div className=''>
                                                        <p className='mb-4 '>{data.category}</p>
                                                        <h2 className='mt-1'>Cooking Info</h2>
                                                        <p className='w-[300px] md:w-[450px] mb-4 text-[15px]  text-gray-600'>{data.info}</p>
                                                    </div>
                                                    <p className='text-[15px]  text-gray-600 mb-1'>Sourc: <span>{data.url_site}</span></p>

                                                    <div>
                                                        <h2 className='mb-1'>Ingredients</h2>
                                                        <ul className=''>
                                                            {data.ingredients?.map((item, i) => {
                                                                return (
                                                                    <div key={i}>
                                                                        <hr />
                                                                        <li className='text-[15px] pl-2 p-1 text-gray-600 '>{item}</li>
                                                                    </div>
                                                                )
                                                            })}

                                                            {/* <hr />  <li className='text-[15px] pl-2 p-1 text-gray-600 '>tast</li>
                                                        <hr />  <li className='text-[15px] pl-2 p-1 text-gray-600 '>tast</li>
                                                        <hr />  <li className='text-[15px] pl-2 p-1 text-gray-600 '>tast</li>
                                                        <hr />  <li className='text-[15px] pl-2 p-1 text-gray-600 '>tast</li>
                                                        <hr />  <li className='text-[15px] pl-2 p-1 text-gray-600 '>tast</li>
                                                        <hr />  <li className='text-[15px] pl-2 p-1 text-gray-600 '>tast</li> */}



                                                        </ul>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>

                                        }



                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    {/* <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => {
                                            nav(href)
                                            setOpen(false)
                                        }
                                        }
                                    >
                                        {redButtonText}
                                    </button> */}
                                    <button
                                        type="button"
                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => {
                                            setOpen(false)
                                            nav(href)
                                        }}

                                        ref={cancelButtonRef}
                                    >
                                        {grayButtonText}
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
