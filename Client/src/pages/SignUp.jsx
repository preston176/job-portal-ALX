// src/pages/SignupPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase'; // Import your firebase configuration
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/'); // Redirect to homepage after signup
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("User Info:", user);
            navigate('/'); // Redirect to homepage after signup
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Error Code:", errorCode);
            console.error("Error Message:", errorMessage);
            setError(errorMessage);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold text-center">Sign Up</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSignup} className="mt-4">
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="flex items-center justify-between mt-4">
                    <hr className="flex-grow border-t" />
                    <span className="mx-2 text-gray-500">OR</span>
                    <hr className="flex-grow border-t" />
                </div>
                <button
                    onClick={handleGoogleSignup}
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 transition mt-4"
                >
                    Sign up with Google
                </button>
                <p className="mt-4 text-center">
                    Already have an account?{' '}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Log In
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Signup;
