import React, { useContext, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import ReactSwitch from 'react-switch';
import { ThemeContext } from '../../../App';
import logo from '../../../assets/Logos/logo1.jpg';
import { AuthContext } from '../../../contexts/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const { theme, handleThemeSwitch, isProfileOpen, setIsProfileOpen } = useContext(ThemeContext);

    // const [isProfileOpen, setIsProfileOpen] = useState(false);
    // console.log(user);

    const handleLogOut = () => {
        logOut()
            .then(() => { })
            .catch(error => console.error(error));
    };

    const menuItems =
        <React.Fragment>
            <li className='font-medium text-gray-700 dark:text-white transition-colors duration-200 hover:text-deep-purple-accent-400 py-2 pt-3 px-2 pr-4 hover:bg-slate-100 dark:hover:text-gray-600  flex-nowrap'><Link className='flex flex-nowrap justify-center align-middle' to='/'>
                <svg aria-hidden="true" className="mr-1 w-7 h-7 pb-1 text-blue-600 dark:text-cyan-500 group-hover:text-gray-500  dark:group-hover:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path></svg>
                Add Task
            </Link></li>
            <li className='font-medium text-gray-700 dark:text-white transition-colors duration-200 hover:text-deep-purple-accent-400 py-2 pt-3 px-2 pr-4  hover:bg-slate-100 dark:hover:text-gray-600'><Link className='flex flex-nowrap justify-center align-middle' to='/mytask'>
                <svg aria-hidden="true" className="mr-1 w-7 h-7 pb-1 text-blue-600 dark:text-cyan-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                My Task
            </Link></li>
            <li className='font-medium text-gray-700 dark:text-white transition-colors duration-200 hover:text-deep-purple-accent-400 py-2 pt-3 px-2 pr-4  hover:bg-slate-100 dark:hover:text-gray-600'><Link className='flex flex-nowrap justify-center align-middle' to='/completedtasks'>
                <svg aria-hidden="true" className="mr-1 w-7 h-7 pb-1 font-bold text-blue-600 dark:text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                Completed
            </Link></li>

            {/* <li className='font-medium text-gray-700 dark:text-white transition-colors duration-200 hover:text-deep-purple-accent-400 py-2 pt-3 px-2 pr-4  hover:bg-slate-100 dark:hover:text-gray-600'><Link to='/completedtasks'>Completed Tasks</Link></li> */}
            {
                user?.uid ?
                    <React.Fragment>
                        <li onClick={handleLogOut} className='font-medium text-white transition-colors duration-200 hover:text-deep-purple-accent-400 py-2 mt-1 px-3 hover:bg-rose-700 bg-rose-500'>Logout</li>
                    </React.Fragment>
                    :
                    <li className='font-medium text-white transition-colors duration-200 hover:text-deep-purple-accent-400 py-2 mt-1 px-4  hover:bg-cyan-500 bg-blue-600'><Link to='/login'>Login</Link></li>
            }
        </React.Fragment>

    const menuItemsDropDown =
        <React.Fragment>
            <li className='font-medium text-gray-700  transition-colors duration-200 hover:text-deep-purple-accent-400 py-2 px-2  hover:bg-slate-100 dark:hover:text-gray-600  flex-nowrap'><Link to='/'>Add Task</Link></li>
            <li className='font-medium text-gray-700  transition-colors duration-200 hover:text-deep-purple-accent-400 py-2 px-2  hover:bg-slate-100 dark:hover:text-gray-600'><Link to='/mytask'>My Task</Link></li>
            <li className='font-medium text-gray-700  transition-colors duration-200 hover:text-deep-purple-accent-400 py-2 px-2  hover:bg-slate-100 dark:hover:text-gray-600'><Link to='/completedtasks'>Completed</Link></li>
            {
                user?.uid ?
                    <React.Fragment>
                        <li onClick={handleLogOut} className='font-medium text-white transition-colors duration-200 hover:text-deep-purple-accent-400 py-2 px-3  hover:bg-rose-700 bg-rose-500'>Logout</li>
                    </React.Fragment>
                    :
                    <li className='font-medium text-white transition-colors duration-200 hover:text-deep-purple-accent-400 py-2 px-4  hover:bg-cyan-500 bg-blue-600'><Link to='/login'>Login</Link></li>
            }
        </React.Fragment>

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div>
            <div className="px-4 py-5 mx-auto  md:px-24 lg:px-28">
                <div className="relative flex flex-nowrap justify-between">

                    {/* Large Devices */}
                    <div>
                        <Link
                            to="/"
                            aria-label="Company"
                            title="Company"
                            className="inline-flex items-center"
                        >
                            <img className='w-40 md:w-1/2 lg:w-2/5 mt-3.5 md:mt-2 lg:mt-1' src={logo} alt="" />
                        </Link>
                    </div>
                    <div className='mr-2 '>
                        <ul className="flex items-start hidden space-x-8 lg:flex uppercase">

                            {menuItems}

                        </ul>
                    </div>
                    {/* profile section  */}
                    <div className=''>
                        {
                            isProfileOpen &&
                            <div id="dropdown" className="absolute top-14 md:top-16 lg:top-10 right-2 md:right-0 z-10 text-base list-none bg-white divide-y divide-gray-100 rounded shadow w-60 dark:bg-gray-700 ">
                                <div className="py-1" aria-labelledby="dropdownButton">

                                    {/* profile section  */}

                                    <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">

                                        <div className="flex flex-col items-center py-10">
                                            {
                                                user?.photoURL ?
                                                    <img className="w-16 h-16 mb-3 rounded-full shadow-lg" src={user?.photoURL} alt="" />
                                                    :
                                                    <FaUser className="w-16 h-16 mb-3 rounded-full shadow-lg bg-blue-200 p-2 "></FaUser>

                                            }
                                            {/* <FaUser className="w-16 h-16 mb-3 rounded-full shadow-lg bg-blue-200 p-2"></FaUser> */}
                                            <h5 className="mb-1 text-xl font-medium text-blue-500 dark:text-white">{user?.displayName ? user?.displayName : "unknown"}</h5>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</span>
                                            <div className="flex mt-4 space-x-3 md:mt-6">
                                                <a href="/none" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-rose-500 rounded-lg hover:bg-rose-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-rose-500 dark:hover:bg-rose-700 dark:focus:ring-blue-800">Edit Profile</a>
                                                {/* <a href="/" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Message</a> */}
                                            </div>
                                        </div>
                                    </div>


                                    {/* profile section */}

                                </div>
                            </div>
                        }
                    </div>
                    {/* profile section  */}

                    <div title='Profile'
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className='font-bold ml-3 mt-2 md:mt-1 lg:-mt-0 mx-1 text-sm lg:text-lg dark:text-white flex flex-nowrap hover:bg-slate-100 dark:hover:bg-slate-50 pl-3 pt-2.5 dark:hover:text-slate-600 ' >
                        {user?.displayName ?

                            <h3 className='hidden lg:block md:mt-2.5 lg:mt-0'>Hi, <span className='text-blue-500 dark:text-cyan-500 uppercase '> {user?.displayName}</span> </h3>
                            : ''

                        }
                        {
                            user?.displayName &&
                            <svg aria-hidden="true" className="ml-1 mr-2  pb-0 lg:pb-2 w-9 h-9 text-gray-400 hover:text-gray-600 dark:text-gray-200 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>

                        }
                    </div>

                    <div
                        title={`${theme} mode`}
                        className='mt-5 md:mt-4 lg:mt-2.5 pt-0.5 lg:pt-0 mr-2 lg:mr-0'>
                        <ReactSwitch onChange={handleThemeSwitch}
                            checked={theme === 'dark'}
                        ></ReactSwitch>
                    </div>


                    <div className="lg:hidden">

                        <button
                            aria-label="Open Menu"
                            title="Open Menu"
                            className="p-2 -mr-1 mt-4 md:mt-3.5 lg:mt-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50 "
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <svg className="w-5 text-gray-600 dark:text-gray-100" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                                />
                            </svg>
                        </button>

                        {isMenuOpen && (

                            // Small Devices
                            <div className="absolute top-0 left-0 w-full">
                                <div className="p-5 bg-white border rounded shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <a
                                                href="/"
                                                className="inline-flex items-center"
                                            >
                                                {/* <svg
                                                    className="w-8 text-deep-purple-accent-400"
                                                    viewBox="0 0 24 24"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeMiterlimit="10"
                                                    stroke="currentColor"
                                                    fill="none"
                                                >
                                                    <rect x="3" y="1" width="7" height="12" />
                                                    <rect x="3" y="17" width="7" height="6" />
                                                    <rect x="14" y="1" width="7" height="6" />
                                                    <rect x="14" y="11" width="7" height="12" />
                                                </svg> */}
                                                {/* <span className="ml-2 text-xl font-bold text-gray-800">
                                                    Task Manager
                                                </span> */}
                                                <img className='w-2/4' src={logo} alt="" />
                                            </a>
                                        </div>
                                        <div
                                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                                            className='font-semibold ml-3 mt-1 text-xs md:text-sm lg:text-lg flex flex-nowrap'>
                                            {user?.displayName ?

                                                <h3 className='mt-3 mr-0.5'>Hi, <span className='text-blue-500  uppercase'> {user?.displayName}</span> </h3>
                                                : ''

                                            }
                                            {
                                                user?.displayName &&
                                                <svg aria-hidden="true" className=" mr-2 mt-2 md:mt-0.5 lg:mt-0 w-10 h-10 text-gray-400 hover:text-gray-600 dark:text-gray-200 " fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path></svg>

                                            }
                                        </div>
                                        <div>
                                            <button
                                                title="Close Menu"
                                                className="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                                                    <path
                                                        fill="currentColor"
                                                        d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <nav onClick={() => setIsProfileOpen(false)}>
                                        <ul className="space-y-4 uppercase">
                                            {menuItemsDropDown}
                                        </ul>
                                    </nav>

                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;