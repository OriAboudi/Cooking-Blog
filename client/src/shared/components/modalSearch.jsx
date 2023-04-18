import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
// import { FaSearch} from '@heroicons/react/24/outline'
import { FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
// import { apiGet } from '../../services/services'
// import { INPUT_SEARCH } from '../../constant/constant'

export default function ModalSearch(
  {
    open,
    setOpen,
    href,
    blueButtonText,
    grayButtonText,

  }) {
  //   need props ==>>> 
  //open,setOpen ==> state[type boolean]
  //href == (Link to '/)
  // redButtonText,grayButtonText,title,description

  const nav = useNavigate()
  const cancelButtonRef = useRef(null)
  const inputR = useRef("")

  const searchQ = async () => {
    nav('recipeSearch/?s=' + inputR.current.value)
    setOpen(false)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      nav('recipeSearch/?s=' + inputR.current.value)
      setOpen(false)
    }
  };

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
          <div className="flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white sm:mx-0 sm:h-10 sm:w-10">
                      <FaSearch className="h-6 w-6 text-blue-500" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">

                      </Dialog.Title>
                      <div className="mt-2">
                        {/* <p className="text-sm text-gray-500">
                          {description}
                        </p> */}
                        <div>
                          <input onKeyDown={handleKeyDown} ref={inputR} type="text" className='ring-1 ring-gray-400  rounded-md text-sm h-[30px] p-4 sm:w-[400px]' placeholder='Search...' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={searchQ}


                  >
                    {blueButtonText}
                  </button>
                  <button
                    type="button"
                    className="hidden sm:inline-flex mt-3 w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus: ring-1 ring-gray-300 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
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
