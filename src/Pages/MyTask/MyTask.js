import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import Task from './Task';
import Swal from "sweetalert2";
import { toast } from 'react-hot-toast';

const MyTask = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();


    const { data: tasks = [], refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await fetch(`https://my-task-manager-server.vercel.app/tasks?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    });


    // console.log(tasks);
    const handleDelete = (task) => {
        Swal.fire({
            title: `Are you sure to delete this ${task.task_name} task?`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't Delete`,
        })
            .then((result) => {
                if (result.isConfirmed) {
                    fetch(`https://my-task-manager-server.vercel.app/tasks/${task._id}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            // console.log(data);
                            if (data.deletedCount > 0) {
                                Swal.fire('Task Deleted', '', 'success')
                                // toast.success('Deleted Successfully!');
                                refetch();
                            }
                        })

                } else if (result.isDenied) {
                    // Swal.fire('Changes are not saved', '', 'info');
                }
            });
    };


    return (
        <section className='my-16 mb-40'>
            <div className='flex justify-between flex-col'>
                <div className='my-5 mb-20'>
                    <h1 className='text-2xl md:text-4xl font-lighter text-center text-cyan-500 dark:text-gray-100 font-lighter md:my-20 uppercase' >My Tasks</h1>
                </div>

            </div>
            {
                tasks?.length > 0 ?
                    <div className='grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-10 lg:mx-40'>
                        {
                            tasks.map(task => <Task
                                key={task._id}
                                task={task}
                                handleDelete={handleDelete}
                            >
                            </Task>)
                        }
                    </div>
                    :
                    <div className='my-10 mb-20 text-rose-600 dark:text-white'>
                        <h1 className='text-2xl md:text-3xl font-lighter text-center  my-12 ' >No tasks are available right now.</h1>
                        <h1 className='text-2xl md:text-3xl font-lighter text-center ' >Please add tasks!</h1>
                    </div>
            }


            {/*  */}

        </section>
    );
};

export default MyTask;