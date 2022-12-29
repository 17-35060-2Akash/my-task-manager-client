import React from 'react';
import image from '../../../assets/Others/dead.png';

const NotFound = () => {
    // useTitle('Not Found');

    return (
        <div className='flex flex-col align-center justify-center '>
            <img src={image} className='my-10 mx-auto pt-4 w-1/2' alt="" />
            <p className='text-3xl'>Oops!</p>
            <h3 className='text-5xl bg-amber-400 mx-auto p-10 px-20 my-10 rounded-xl' >404</h3>
            <h2 className='py-4 text-5xl text-red-500 mb-20' >Sorry, Page Not Found!</h2>
        </div>
    );
};

export default NotFound;