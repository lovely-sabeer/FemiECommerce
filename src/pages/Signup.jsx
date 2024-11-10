import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app, db } from '../config';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const [errors, setErrors] = useState({});
	const auth = getAuth(app);
	const googleProvider = new GoogleAuthProvider();
	const navigate = useNavigate();


	// Create Form
	const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Validation function
  const validate = (fieldValues = formData) => {
    let temp = { ...errors };

    // Username validation
    if ('username' in fieldValues)
      temp.username = fieldValues.username ? '' : 'Username is required.';

    // Email validation
    if ('email' in fieldValues)
      temp.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValues.email)
        ? ''
        : 'Email is not valid.';

    // Password validation
    if ('password' in fieldValues)
      temp.password = fieldValues.password.length > 5
        ? ''
        : 'Password must be at least 6 characters long.';

    // Confirm password validation
    if ('confirmPassword' in fieldValues)
      temp.confirmPassword =
        fieldValues.confirmPassword === formData.password
          ? ''
          : 'Passwords do not match.';

    setErrors(temp);

    // Check if all fields are valid
    if (fieldValues === formData)
      return Object.values(temp).every(x => x === '');
  };

	// Get Data From Form
  const handleChange = (e) => {
		const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    validate({ [name]: value });
  };

	// Manual SignUp Submit
  const handleSubmit = async(e) => {
		e.preventDefault();
		try {
			if (validate()) {
      // Submit form (send data to the server or handle it as needed)
				await (createUserWithEmailAndPassword(auth, formData.email, formData.password));
				const user = auth.currentUser;
				
				console.log(user);
				if (user) {
					await setDoc(doc(db, "userDetails", user.uid), {
						email: user.email,
						name: formData.username
					});
				}
				navigate('/');
				
	    } else {
	      alert('Please fix the errors before submitting.');
	    }
		} catch (error) {
			console.log(error);
			alert("not signed up");
		}
    
	};
	
	// Google SignUp Submit
  const handleGoogleSignup = async() => {
		try {
			await signInWithPopup(auth, googleProvider);
			const user = auth.currentUser;
			console.log(user);
			if (user) {
				await setDoc(doc(db, "userDetails", user.uid), {
					email: user.email,
					name: user.displayName
				});
			}
		}
		catch (error) {
			console.error(error)
		}
  };

	// Sign up page ui
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>

        {/* Username */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.username ? 'border-red-500' : 'border-gray-300'} rounded`}
            placeholder="Enter your username"
          />
          {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
            placeholder="Enter your email"
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded`}
            placeholder="Enter your password"
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded`}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
        </div>

        {/* Sign Up Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Sign Up
        </button>

        {/* OR Divider */}
        <div className="my-4 flex items-center justify-center">
          <span className="border-b w-1/4 border-gray-300"></span>
          <span className="mx-4 text-gray-500">OR</span>
          <span className="border-b w-1/4 border-gray-300"></span>
        </div>

        {/* Google Sign Up Button */}
        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full bg-red-500 text-white font-bold py-2 rounded hover:bg-red-600 transition duration-300"
        >
          Sign Up with Google
        </button>

        {/* Already have an account? */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <span className="text-blue-500 hover:underline" onClick={()=>navigate("/")}>
              Log in
            </span>
          </p>
				</div>
				
      </form>
    </div>
	);
	
};

export default Signup;
