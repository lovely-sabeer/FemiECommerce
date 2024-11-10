import React, { useState, useEffect } from 'react';
import logo from "../assests/logo.avif";
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../config';

function Navbar() {
  const [navBg, setNavBg] = useState('transparent'); 
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/");
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavBg('bg-[#FFFFE4]'); 
    } else {
      setNavBg('transparent'); 
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <div className={`fixed top-0 z-50 w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 ${navBg} transition duration-300`}>
        {/* For mobile view
        <div className="flex md:hidden w-full h-full items-center justify-between px-4 py-4">
          <img src={logo} alt="Logo" className="w-28" />
          <button onClick={handleLogout} className="p-2 rounded-lg bg-green-900 hover:bg-gray-600 text-white font-semibold transition duration-300">LogOut</button>
        </div> */}

        {/* For tablet and laptop views */}
        <div className="hidden md:flex w-full h-full items-center justify-between py-6">
          <div className="mr-auto">
            <img src={logo} alt="Logo" className="w-36 ml-4" />
					</div>
					<div className='flex gap-10'>
	          <button onClick={()=>navigate("/home")} className="p-2 rounded-lg bg-green-900 hover:bg-gray-600 text-white font-semibold transition duration-300">Home</button>
	          <button onClick={()=>navigate("/orders")} className="p-2 rounded-lg bg-green-900 hover:bg-gray-600 text-white font-semibold transition duration-300">My Orders</button>
	          <button onClick={handleLogout} className="p-2 rounded-lg bg-green-900 hover:bg-gray-600 text-white font-semibold transition duration-300">LogOut</button>
					</div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
