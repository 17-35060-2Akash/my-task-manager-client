import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import SocialLogin from './SocialLogin';

const Login = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [loginError, setLoginError] = useState('');

    const { signIn, resetPassword } = useContext(AuthContext);

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';


    const handleLogin = data => {
        // console.log(data);
        setLoginError('');

        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                // console.log(user);
                toast.success(`Welcome ${user?.displayName}`);

                navigate(from, { replace: true });
                reset();
            })
            .catch(error => {
                console.log(error.message)
                setLoginError(error.message);
            });
    };


    return (

        <section className='py-40 w-10/12 md:w-96  mx-auto'>
            <h1 className='text-4xl pb-20 text-blue-600 dark:text-white'>Login</h1>
            <form onSubmit={handleSubmit(handleLogin)}>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white text-start">Your Email</label>
                    <input type="email"
                        {...register("email", { required: "Email Address is required", maxLength: { value: 30, message: "Email Address can't be more than 20 characters" } })}
                        id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email" />
                    {errors.email && <p className='text-rose-500 font-semibold p-2' role="alert">{errors.email?.message}</p>}

                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white text-start">Your Password</label>
                    <input type="password"
                        {...register("password", { required: "Password is required", minLength: { value: 6, message: 'Password Must be at least 6 characters' }, maxLength: 20 })}
                        id="password" name='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password" />
                    {errors.password && <p className='text-rose-500 font-semibold p-2' role="alert">{errors.password?.message}</p>}
                </div>

                <div className="mb-6">
                    {/* <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                    </div> */}
                    <label htmlFor="remember" className="ml-2 text-lg font-medium text-gray-900 dark:text-gray-100 text-center">New to Task Manager? <Link to='/signup' className='text-cyan-600 dark:text-cyan-400 font-semibold hover:text-violet-600'> Sign Up </Link>now!</label>
                    <div className='text-center text-md font-semibold  pt-5 text-rose-600 h-10'>
                        {loginError}
                    </div>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 mt-16 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-blue-800 uppercase">Login</button>
            </form>
            <SocialLogin></SocialLogin>
        </section>

    );
};

export default Login;