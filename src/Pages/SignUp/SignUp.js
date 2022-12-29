import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';
import SocialLogin from '../Login/SocialLogin';

const SignUp = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [signupError, setSignupError] = useState('');


    //password matching handling
    const [passwordMatchError, setPasswordMatchError] = useState('');

    const navigate = useNavigate();
    const { createUser, updateUser } = useContext(AuthContext);

    const handleSignUp = data => {
        // console.log(data);
        setSignupError('');



        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                // console.log(user.email);
                toast.success(`Welcome ${data.name}`);
                // toast.success(`Welcome!`);


                const profile = {
                    displayName: data.name
                }
                updateUser(profile)
                    .then(() => {
                        // saveUser(data.name, data.email, data.accountType);
                        navigate('/');
                        reset();

                    })
                    .catch(error => console.error(error))

            })
            .catch(error => {
                console.error(error)
                setSignupError(error.message)
            })

    };

    const handleConfirmPassword = event => {
        const mainPass = document.getElementById('password').value;
        // console.log('mainpass', mainPass);
        const confirmPass = event.target.value;
        // console.log('confirmpass', confirmPass);
        setPasswordMatchError('');
        if (!mainPass.startsWith(confirmPass)) {
            setPasswordMatchError("Password doesn't match confirm password.");
        }
    }

    return (
        <section className='py-40 w-10/12 md:w-96  mx-auto'>
            <h1 className='text-4xl pb-20 text-cyan-600 dark:text-white'>Sign Up</h1>
            <form onSubmit={handleSubmit(handleSignUp)}>
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white text-start">Your Name</label>
                    <input type="name"
                        {...register("name", { required: "Name is required.", maxLength: { value: 20, message: "Name can't be more than 30 chracters." } })}
                        id="name" name='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" />
                    {errors.name && <p className='text-rose-500 font-semibold p-2' role="alert">{errors.name?.message}</p>}
                </div>

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

                <div onChange={handleConfirmPassword} className="mb-6">
                    <label htmlFor="confirmPassword" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white text-start">Confirm Password</label>
                    <input type="password"
                        {...register("confirmPassword",
                            {
                                required: "Confirm password is required."
                            }
                        )}
                        id="confirmPassword" name='confirmPassword' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Re-Type Password" />
                    {errors.confirmPassword && <p className='text-rose-500 font-semibold p-1'>{errors.confirmPassword.message}</p>}
                    {
                        passwordMatchError && <p className='text-rose-500 font-semibold p-1'>{passwordMatchError}</p>
                    }
                </div>


                <div className="mb-6">
                    {/* <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                    </div> */}
                    <label htmlFor="remember" className="ml-2 text-lg font-medium text-gray-900 dark:text-white text-center">Already have an account? <Link to='/login' className='text-blue-600 hover:text-violet-600 dark:text-sky-400 font-semibold'> Login </Link>here!</label>
                    <div className='text-center text-md font-semibold  pt-5 text-rose-600 h-10'>
                        {signupError}
                    </div>
                </div>
                <button type="submit" className="text-white bg-cyan-600 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 mt-12 text-center dark:bg-cyan-500 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800 uppercase">Sign Up</button>
            </form>
            <SocialLogin></SocialLogin>
        </section>
    );
};

export default SignUp;