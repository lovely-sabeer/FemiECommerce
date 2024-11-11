import React, { useState, useEffect } from 'react';
import logo from "../assets/logo.avif";
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../config';

function Navbar() {
  const [navBg, setNavBg] = useState('transparent');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
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
        {/* Mobile view */}
        <div className="flex md:hidden w-full h-full items-center justify-between px-4 py-4">
          <img src={logo} alt="Logo" className="w-28" />
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-lg bg-green-900 hover:bg-gray-600 text-white font-semibold transition duration-300">
            {/* Hamburger Icon */}
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#FFFFE4] p-4 space-y-4">
            <button onClick={() => { setIsMenuOpen(false); navigate("/home"); }} className="block w-full text-left p-2 rounded-lg bg-green-900 hover:bg-gray-600 text-white font-semibold transition duration-300">Home</button>
            <button onClick={() => { setIsMenuOpen(false); navigate("/orders"); }} className="block w-full text-left p-2 rounded-lg bg-green-900 hover:bg-gray-600 text-white font-semibold transition duration-300">My Orders</button>
            <button onClick={() => { setIsMenuOpen(false); handleLogout(); }} className="block w-full text-left p-2 rounded-lg bg-green-900 hover:bg-gray-600 text-white font-semibold transition duration-300">LogOut</button>
          </div>
        )}

        {/* Tablet and laptop views */}
        <div className="hidden md:flex w-full h-full items-center justify-between py-6">
          <div className="mr-auto">
            <img src={logo} alt="Logo" className="w-36 ml-4" />
          </div>
          <div className="flex gap-10">
            <button onClick={() => navigate("/home")} className="p-2 rounded-lg bg-green-900 hover:bg-gray-600 text-white font-semibold transition duration-300">Home</button>
            <button onClick={() => navigate("/orders")} className="p-2 rounded-lg bg-green-900 hover:bg-gray-600 text-white font-semibold transition duration-300">My Orders</button>
            <button onClick={handleLogout} className="p-2 rounded-lg bg-green-900 hover:bg-gray-600 text-white font-semibold transition duration-300">LogOut</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
