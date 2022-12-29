import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';

const SocialLogin = () => {
    const { signInWithGoogle } = useContext(AuthContext);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const provider = new GoogleAuthProvider();

    const handleGoogleLogin = () => {
        signInWithGoogle(provider)
            .then(result => {
                const user = result.user;
                console.log(user);

                // saveUser(user.displayName, user.email);
                toast.success(`Welcome ${user?.displayName}`);
                navigate(from, { replace: true });

            })
            .catch(error => console.error(error));
    };

    return (
        <div className='pt-10'>
            <div className="font-semibold dark:text-white">OR</div>
            <button onClick={handleGoogleLogin} className='mt-10 w-full flex justify-center align-middle text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'><FaGoogle className='text-blue-500 mr-2 text-lg'></FaGoogle>CONTINUE WITH GOOGLE </button>
        </div>
    );
};

export default SocialLogin;