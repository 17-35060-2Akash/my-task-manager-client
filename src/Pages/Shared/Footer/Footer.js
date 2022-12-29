import React from 'react';
import { FaFacebookSquare, FaGithubSquare, FaGoogle, FaInstagram, FaLinkedin, FaWhatsappSquare } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { format } from 'date-fns'
import './Footer.css';

const Footer = () => {
    const date = new Date();
    const year = format(date, 'yyyy');
    // console.log(year);

    return (
        <div className='py-20 glass'>
            <div className="platform-icons flex flex-row align-middle justify-center my-4 social-tab">
                {/* <Link to='/google' className='px-4 text-4xl'><FaGoogle></FaGoogle></Link> */}
                <a target="_blank" rel="noopener noreferrer" href='https://github.com/17-35060-2Akash' className='px-4 text-4xl'><FaGithubSquare></FaGithubSquare></a>
                <a target="_blank" rel="noopener noreferrer" href='https://www.linkedin.com/in/nasin-ayenul-akash/' className='px-4 text-4xl'><FaLinkedin></FaLinkedin> </a>
                <a target="_blank" rel="noopener noreferrer" href='https://www.instagram.com/rome_frank/' className='px-4 text-4xl'><FaInstagram></FaInstagram> </a>
                <a target="_blank" rel="noopener noreferrer" href='https://www.facebook.com/nasin.akash/' className='px-4 text-4xl'><FaFacebookSquare></FaFacebookSquare> </a>

            </div>
            <h2 className='py-2 px-20 mt-7 text-cyan-500 dark:text-white font-medium'>Copyright©{year} - All right reserved by N A Akash</h2>
        </div>
    );
};

export default Footer;