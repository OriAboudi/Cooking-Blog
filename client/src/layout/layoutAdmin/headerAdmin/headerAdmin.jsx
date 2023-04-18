import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaSearch } from 'react-icons/fa'
import { MyUsers } from '../../../context/userContext'
import { TOKEN_KEY } from '../../../constant/constant'
import ModalError from '../../../shared/components/modalError'
import ModalSearch from '../../../shared/components/modalSearch'



const navigation = [
    { name: 'Home', href: '/admin/home', current: true },
    { name: 'Users', href: '/about', current: true },
    { name: 'Recipes', href: '/submit-recipe', current: true },
    { name: 'Categories', href: '/gpt', current: true }

]

const menu = [{ name: 'Login', href: '/login' }, { name: 'Sign Up', href: '/signUp' }];
const menuProfile = [{ name: "Log out", href: '/logout' }, { name: 'Profile', href: '/userInfo' }];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export default function HeaderAdmin() {
    const { user, getUser } = MyUsers();
    const [open, setOpen] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        console.log(user);
        if (localStorage.getItem(TOKEN_KEY) && !user) {
            getUser()

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <>

            <Disclosure as="nav" className="">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">

                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">

                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div>

                                </div>
                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    
                                    {/* User icon */}
                                    <div className="flex flex-shrink-0 items-center">
                                        <FaUser className="block h-8 w-auto lg:hidden" color='white' size={'30px'} />
                                        <FaUser className="hidden h-8 w-auto lg:block" color='white' size={'30px'} />

                                    </div>

                                    {/* Logo image */}
                                    <Link to={"/"}>
                                        <div className='mr-[100px] mt-1 sm:mr-0'>
                                            <img className='block w-[150px] sm:w-150' src={"/img/logo.svg"} alt={"dsfsdf"} />
                                        </div>
                                    </Link>


                                    {/* navigation Panel */}
                                    <div className="hidden sm:ml-6 sm:block md:mx-auto">
                                        <div className="flex space-x-4">
                                            {navigation.map((item, i) => {
                                                return (
                                                    <div key={i}>
                                                        <Link
                                                            to={item.href}
                                                            className={classNames(
                                                                item.current ? 'text-gray-500' : '',
                                                                'px-1 py-2 rounded-md text-sm font-medium'
                                                            )}
                                                            aria-current={item.current ? 'page' : undefined}
                                                        >
                                                            {item.name}
                                                        </Link>

                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>

                                </div>

                                {/* Search Panel */}
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                                    {/* <div className=' sm:mr-5'>
                                        <input placeholder='Search...' className=' w-[100px] mr-2 sm:w-[150px] text-[14px] p-[2px] pl-[5px] ring-2 ring-gray-500 rounded-md' />
                                    </div> */}
                                    <button onClick={() => {
                                        setOpenSearch(true)
                                    }}
                                        type="button"
                                        className=" mx-2 rounded-full bg-white p-1  text-gray-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-white  focus:ring-offset-gray-800"
                                    >
                                        <span className="sr-only">View notifications</span>
                                        <FaSearch className="h-5 w-5 " aria-hidden="true" />
                                    </button>

                                    <button
                                        type="button"
                                        className=" rounded-full bg-white p-1 text-gray-800 hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >

                                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="flex rounded-full bg-gray-800 text-sm ring-2 ring-gray-500 focus:none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ">
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src={"https://t3.ftcdn.net/jpg/00/07/32/48/360_F_7324855_mx4CEBWTr81XLOrlQccCROtP2uNR7xbk.jpg"}
                                                    alt=""
                                                />
                                            </Menu.Button>
                                        </div>

                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {!user ?
                                                    <div>
                                                        {menu.map((item, i) => {
                                                            return (
                                                                <div key={i}>
                                                                    <Menu.Item>
                                                                        {({ active }) => (
                                                                            <button
                                                                                onClick={() => {
                                                                                    nav(item.href);
                                                                                }}
                                                                                key={i}

                                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 w-[100%] ')}
                                                                            >
                                                                                {item.name}
                                                                            </button>
                                                                        )}
                                                                    </Menu.Item>
                                                                </div>
                                                            )
                                                        })}

                                                    </div> :

                                                    <div>
                                                        {menuProfile.map((item, i) => {
                                                            return (
                                                                <div key={i}>

                                                                    <Menu.Item>
                                                                        {({ active }) => (
                                                                            <button
                                                                                onClick={() => {
                                                                                    if (item.href === '/logout') {
                                                                                        setOpen(true);
                                                                                    }
                                                                                    else {
                                                                                        nav(item.href);
                                                                                    }
                                                                                }}
                                                                                key={i}
                                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 w-[100%]')}
                                                                            >
                                                                                {item.name}
                                                                            </button>
                                                                        )}
                                                                    </Menu.Item>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                }
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>

                                </div>

                            </div>
                            <hr />
                        </div>

                        {/* navigation profile Panel */}

                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pt-2 pb-3">
                                {navigation.map((item, i) => (
                                    <div key={i}>
                                        <Disclosure.Button

                                            key={item.name}
                                            as="a"
                                            onClick={()=>{nav(item.href)}}
                                            className={classNames(
                                                item.current ? 'bg-gray-400 text-center text-white hover:bg-slate-500' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                'block px-3 py-2 rounded-md text-base font-medium hover:cursor-pointer'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    </div>
                                ))}

                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            {/* modal Error */}
            <ModalError
                open={open}
                setOpen={setOpen}
                href={'/logout'}
                redButtonText={'Logout'}
                grayButtonText={'Cancel'}
                header={'Are you sure?'}
                description={`Are you sure you want to end your current session and log out of your account? You'll need to log in again to access your saved information and continue where you left off.`}

            />
            {/* modal Search */}
            <ModalSearch
                open={openSearch}
                setOpen={setOpenSearch}
                blueButtonText={'Search'}
                grayButtonText={'Cancel'}
                header={'Search'}

            />

        </>
    )
}
