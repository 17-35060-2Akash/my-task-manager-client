import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const AddTask = () => {
    const { user } = useContext(AuthContext);

    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [loginError, setLoginError] = useState('');

    const imageHostingKey = process.env.REACT_APP_imgbb_key;
    const navigate = useNavigate();


    const handleAddTask = (data) => {
        // console.log(data);
        /* if (event.key === 'Enter') {
            console.log('Akash');
            return;
        } */
        if (!user?.email) {
            toast.error('You have to login to add a task');
            navigate('/login');
            // console.log(user?.email);
            return;
        }
        setLoginError('');


        const task_name = data.taskName;

        const date = new Date();
        const posted_date = format(date, 'PP');
        const posted_time = format(date, 'p');

        //uploading data to imgbb
        const img = data.img[0];
        // console.log(img);
        const formData = new FormData();
        formData.append('image', img);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {

                    const taskInfo = {
                        task_name,
                        img: imageData.data.url,
                        email: user?.email,
                        status: "Not Completed",
                        comment: "",
                        posted_date,
                        posted_time,
                    }

                    // console.log(taskInfo);
                    ////////////////
                    //save product info to the db
                    fetch('https://my-task-manager-server.vercel.app/tasks', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(taskInfo)
                    })
                        .then(res => res.json())
                        .then(data => {
                            // console.log(data);
                            if (data.acknowledged) {
                                toast.success(`Your task is added succesfully to your Tasks.`);
                                navigate('/mytask');
                            }
                        })

                }
            })

    };


    return (
        <section className='py-72 w-10/12 md:w-96  mx-auto'>
            <h1 className='text-4xl pb-20 text-blue-600 dark:text-gray-200 font-lighter uppercase '>Add Task</h1>
            <form onSubmit={handleSubmit(handleAddTask)}>
                <div className='mb-6'>
                    <label htmlFor="task" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white text-start">Upload Image</label>
                    <input type="file"
                        {...register("img", { required: "Image is required." })}
                        placeholder="Image URL" className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-300 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300" />
                    {errors.img && <p className='text-error p-1'>{errors.img.message}</p>}
                </div>

                <div className="mb-6">
                    <label htmlFor="task" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white text-start">Task Name</label>
                    <input type="text"
                        {...register("taskName", { required: "Task is required", maxLength: { value: 30, message: "Task Name can't be more than 30 characters" } })}
                        id="taskName" name='taskName' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-300 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Task Name" />
                    {errors.taskName && <p className='text-rose-500 font-semibold p-2' role="alert">{errors.taskName?.message}</p>}

                </div>





                {/* <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full  px-5 py-2.5 mt-16 text-center dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800 uppercase">Add Task</button> */}
                <button type="submit" className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 uppercase w-full mt-16">Add Task</button>
            </form>
        </section>
    );
};

export default AddTask;