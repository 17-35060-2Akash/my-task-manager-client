import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Task = ({ task, handleDelete }) => {
    const { _id, task_name, img, email, status, posted_date, posted_time, comment } = task;
    // console.log(task);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showComment, setShowComment] = useState(false);

    return (

        <div onClick={() => setIsMenuOpen(!isMenuOpen)} className="w-full  bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-start px-4 pt-4">
                <button id="dropdownButton" data-dropdown-toggle="dropdown"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5" type="button">
                    <span className="sr-only">Open dropdown</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path></svg>
                </button>

                {/* <!-- Dropdown menu --> */}


            </div>
            <div className=''>
                {
                    isMenuOpen &&
                    <div id="dropdown" className="absolute z-10 text-base list-none bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 ">
                        <ul className="py-1" aria-labelledby="dropdownButton">
                            <li>
                                <Link to={`/tasks/${_id}`} className="block px-4 py-2 text-sm text-blue-700 hover:bg-gray-100 dark:hover:bg-blue-600 dark:text-gray-200 dark:hover:text-white">Edit</Link>
                            </li>
                            <li>
                                <button onClick={() => handleDelete(task)} className="block w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" >Delete</button>

                            </li>
                            {
                                showComment === true ?
                                    <li>
                                        <button onClick={() => setShowComment(!showComment)} className="block w-full px-4 py-2 text-sm text-cyan-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" >Hide Comment</button>
                                    </li>
                                    :
                                    <li>
                                        <button onClick={() => setShowComment(!showComment)} className="block w-full px-4 py-2 text-sm text-cyan-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white" >Show Comment</button>
                                    </li>
                            }
                        </ul>
                    </div>
                }
            </div>
            <div className="flex flex-col items-center pb-10">
                <img className="w-28 h-28 mb-3 rounded-full shadow-lg" src={img} alt="Bonnie image" />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{task_name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{posted_time}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{posted_date}</span>
                <div className="flex mt-4 space-x-3 md:mt-6 ">
                    {/* <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</button> */}
                    {/* <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Message</a> */}
                    <Link to={`/completedtasks/${_id}`}>
                        <button type="button" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-full text-md px-8 py-2.5 text-center mr-2 mb-2 ">Completed</button>
                    </Link>

                </div>
                {
                    showComment &&
                    <div>
                        {
                            comment !== '' ?
                                <div className='mt-5'>
                                    <label className="block mb-3 text-md font-medium text-gray-900 dark:text-white">Comment</label>
                                    <p className="mb-1 font-normal text-gray-800 dark:text-gray-900 bg-slate-100 p-2 rounded-lg px-4">{comment}</p>
                                </div>
                                :
                                <div className='mt-5'>
                                    <label className="block mb-3 text-md font-medium text-gray-600 dark:text-white">Comment</label>
                                    <p className="mb-1 font-normal text-blue-500 dark:text-gray-900 bg-slate-100 p-2 rounded-lg px-4">No comment yet</p>
                                </div>
                        }
                    </div>
                }

            </div>
        </div>

    );
};

export default Task;