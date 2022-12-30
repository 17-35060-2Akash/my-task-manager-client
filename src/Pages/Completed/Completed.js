import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Loader from '../../components/Loader';
import { AuthContext } from '../../contexts/AuthProvider';
import CompletedTaskCard from './CompletedTaskCard';

const Completed = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();


    const { data: completedTasks = [], refetch, isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await fetch(`https://my-task-manager-server.vercel.app/completedtasks?email=${user?.email}`);
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
                                navigate('/mytask');
                            }
                        })

                } else if (result.isDenied) {
                    // Swal.fire('Something went wronh with the deletion!', '', 'info');
                }
            });
    };

    const handleChangeStatus = (task) => {
        // console.log(task);

        fetch(`https://my-task-manager-server.vercel.app/tasks/updatestatus/${task._id}?status=${'Not Completed'}`, {
            method: 'PUT'
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {

                    toast.success(`${task.task_name} task is not completed!`);
                    // navigate('/mytask');
                }

                else {
                    toast.error(`Something went wrong changing the not completed status of the ${task.task_name} task.`);
                }
                refetch();
            })
    };

    const handleComment = (task) => {
        const comment = document.getElementById('comment').value;
        // console.log(comment);
        const commentObj = {
            comment
        }

        if (comment.length < 50) {
            ////////////
            fetch(`https://my-task-manager-server.vercel.app/tasks/updatecomment/${task._id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(commentObj)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.modifiedCount > 0) {

                        // navigate('/mytask');
                        if (comment.length === 0) {
                            toast.success('You commnet have been removed!');
                        }
                        else {
                            toast.success(`Your comment has been added!`);
                        }
                    }
                    else {
                        toast.error(`Something went wrong adding your comment.`);
                    }
                });

        }
        else {
            toast.error(`Comment can't exceed 50 characters!`);
        }
    };







    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <section className='my-16 mb-40'>
            <div className='flex justify-between flex-col'>
                <div className='my-5 mb-20'>
                    <h1 className='text-2xl md:text-4xl font-lighter text-center text-amber-500 dark:text-gray-100 font-lighter md:my-20 uppercase' >Completed Tasks</h1>
                </div>

            </div>
            {
                completedTasks?.length > 0 ?
                    <div className='grid gap-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-10 lg:mx-40'>
                        {
                            completedTasks.map(task => <CompletedTaskCard
                                key={task._id}
                                task={task}
                                handleDelete={handleDelete}
                                handleChangeStatus={handleChangeStatus}
                                handleComment={handleComment}
                            >
                            </CompletedTaskCard>)
                        }
                    </div>
                    :
                    <div className='my-10 mb-20 text-rose-600 dark:text-white px-10'>
                        <h1 className='text-lg md:text-3xl font-lighter text-center  my-5 ' >No completed tasks are available right now.</h1>
                        <h1 className='text-lg md:text-3xl font-lighter text-center ' >Please complete tasks!</h1>
                    </div>
            }


            {/*  */}

        </section>
    );
};

export default Completed;