import { format } from 'date-fns';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const Update = () => {
    const task = useLoaderData();
    // console.log(task);
    const { _id, task_name, img, email, status, posted_date, posted_time } = task;

    const { user } = useContext(AuthContext);

    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [loginError, setLoginError] = useState('');

    const imageHostingKey = process.env.REACT_APP_imgbb_key;
    const navigate = useNavigate();


    const handleUpdate = data => {
        // console.log(data);
        setLoginError('');

        const task_name = data.taskName;

        const date = new Date();
        const posted_date = format(date, 'PP');
        const posted_time = format(date, 'p');

        //uploading data to imgbb
        const img = data.img[0];
        // console.log(img);
        if (img !== undefined) {
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

                        const updatedTaskInfo = {
                            task_name,
                            img: imageData.data.url,
                            // email: user?.email,
                            // status: "Not Completed",
                            posted_date,
                            posted_time,
                        }

                        // console.log(updatedTaskInfo);
                        ////////////////
                        fetch(`https://my-task-manager-server.vercel.app/tasks/update/${_id}`, {
                            method: 'PUT',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(updatedTaskInfo)
                        })
                            .then(res => res.json())
                            .then(data => {
                                // console.log(data);
                                if (data.modifiedCount > 0) {
                                    toast.success(`Your task has been updated!`);
                                    navigate('/mytask');
                                }
                                else {
                                    toast.error(`Something went wrong updating your task.`);
                                }
                            })

                    }
                });
        }
        else {
            //if there is no image
            const updatedTaskInfo = {
                task_name,
                img: task.img,
                // email: user?.email,
                // status: "Not Completed",
                posted_date,
                posted_time,
            }

            // console.log(updatedTaskInfo);
            ////////////////
            fetch(`https://my-task-manager-server.vercel.app/tasks/update/${_id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(updatedTaskInfo)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.modifiedCount > 0) {
                        toast.success(`Your task has been updated!`);
                        navigate('/mytask');
                    }
                    else {
                        toast.error(`Something went wrong updating your task.`);
                    }
                })
        }

    };

    return (
        <section className='py-40 w-10/12 md:w-96  mx-auto'>
            <h1 className='text-4xl pb-20 text-blue-600 uppercase dark:text-white'>Update Task</h1>
            <form onSubmit={handleSubmit(handleUpdate)}>
                <div className="mb-6">
                    <label htmlFor="task" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white text-start">Task Name</label>
                    <input type="text" defaultValue={task_name}
                        {...register("taskName", { required: "Task is required", maxLength: { value: 30, message: "Task Name can't be more than 30 characters" } })}
                        id="taskName" name='taskName' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Task Name" />
                    {errors.taskName && <p className='text-rose-500 font-semibold p-2' role="alert">{errors.taskName?.message}</p>}

                </div>
                <div className='mb-6'>
                    <label htmlFor="task" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white text-start">Upload Image</label>
                    <input type="file"
                        {...register("img", { required: "Image is required." })}
                        placeholder="Image URL" className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
                    {errors.img && <p className='text-error p-1'>{errors.img.message}</p>}
                </div>




                <button type="submit" className="text-white w-full mt-12 bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 uppercase">Add Task</button>
            </form>
        </section>
    );
};

export default Update;