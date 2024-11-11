import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { app } from '../config';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const auth = getAuth(app);
	const navigate = useNavigate();
	const googleProvider = new GoogleAuthProvider();

	// Manual submit
  const handleSubmit = async(e) => {
    e.preventDefault();
		// Handle form submission (e.g., send login data to backend)
		try {
			await signInWithEmailAndPassword(auth, email, password);
			alert("login Successfully");
		} catch (error) {
			console.error(error);
		}  
		
	};

	// Automatic Login
	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				navigate("/Home")
			}
			else {
				console.log("not a old user");
			}
		}
		)
	}, [auth, navigate])

	// Google SignUp Submit
  const handleGoogleSignIn = async() => {
		try {
			await signInWithPopup(auth, googleProvider);
			const user = auth.currentUser;
			console.log(user);
		}
		catch (error) {
			console.error(error)
		}
  };
	
	// Login page Ui
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
			<form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">

        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

				{/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">email</label>
          <input 
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your email"
            required
          />
        </div>

				{/* Password */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
          <input 
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your password"
            required
          />
        </div>

				{/* Login Button */}
        <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-300">
          Login
				</button>

				{/* Google Sign In Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full bg-red-500 text-white font-bold py-2 my-4 rounded hover:bg-red-600 transition duration-300"
        >
          Sign In with Google
				</button>

				{/* navigate to Sign Up */}
				<div className='py-1'>
					I don't have an Account?
					<span className="text-blue-500 hover:underline" onClick={()=>navigate("/signup")}>
          	Sign Up
					</span>
				</div>

			</form>
    </div>
	);
	
};

export default LoginPage;
