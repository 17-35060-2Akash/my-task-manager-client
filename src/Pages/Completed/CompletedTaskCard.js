import { format } from 'date-fns';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FaPen, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CompletedTaskCard = ({ task, handleDelete, handleChangeStatus, handleComment }) => {

    const { _id, task_name, img, email, status, posted_date, posted_time, comment } = task;

    const [commentToggler, setCommentToggler] = useState(false);
    const navigate = useNavigate();


    const date = new Date();
    const todays_date = format(date, 'PP');
    const todays_time = format(date, 'p');


    return (
        <div>

            <div className="w-full bg-white md:border md:border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 mx-auto ">
                <img className="rounded-t-lg" src={img} alt="" />
                <div className="p-5 pt-0 pb-7">
                    <div className='text-end'>
                        <button onClick={() => handleDelete(task)} type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-lg px-3 py-2.5 text-center mr-2 mt-4"><FaTrashAlt></FaTrashAlt></button>
                    </div>
                    <h5 className="mb-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{task_name}</h5>
                    <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">{posted_time}</p>
                    <p className="mb-8 font-normal text-gray-700 dark:text-gray-400">{posted_date === todays_date ? 'Today' : posted_date}</p>
                    <div className='flex flex-col lg:flex-row align-middle justify-center'>
                        <button onClick={() => handleChangeStatus(task)} type="button" className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Not Completed</button>
                        <button onClick={() => setCommentToggler(!commentToggler)} type="button" className="text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-9 py-2.5 text-center mr-2 mb-2">Comment</button>
                    </div>

                    {
                        commentToggler &&
                        <div className='pt-5 mx-5 pb-3'>
                            <label htmlFor="website-admin" className="block mb-2 text-md font-medium text-gray-900 dark:text-white">Add a comment</label>
                            <div className="flex align-middle justify-center">
                                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    <FaPen></FaPen>
                                </span>
                                <input type="text" id="comment" defaultValue={comment} className="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="comment" />
                            </div>
                            <button onClick={() => handleComment(task)} type="button" className="text-gray-900 hover:text-white bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-md px-5 py-2.5 text-center mr-2 mb-2 w-full mt-5">Post</button>


                        </div>
                    }

                </div>
            </div>

        </div>
    );
};

export default CompletedTaskCard;