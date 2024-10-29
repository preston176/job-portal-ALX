import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions
import { AuthContext } from '../context/AuthContext'; // Context for authentication
import { db } from '../firebase'; // Firebase database instance

const AddJob = () => {
    const [title, setTitle] = useState(''); // State for job title
    const [company, setCompany] = useState(''); // State for company name
    const [location, setLocation] = useState(''); // State for job location
    const [description, setDescription] = useState(''); // State for job description
    const [error, setError] = useState(''); // State for error messages
    const [success, setSuccess] = useState(''); // State for success messages
    const { auth } = useContext(AuthContext); // Get auth context

    // Fetch company data based on the authenticated user
    useEffect(() => {
        const fetchCompanyData = async () => {
            try {
                if (auth && auth.uid) {
                    const userDoc = await getDoc(doc(db, 'users', auth.uid));
                    if (userDoc.exists()) {
                        const userInfo = userDoc.data();
                        setCompany(userInfo.companyName || ''); // Set company name from user data
                    } else {
                        console.log("No such user data found!");
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchCompanyData();
    }, [auth]); // Dependency array includes auth to refetch if it changes

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setError(''); // Reset error message
        setSuccess(''); // Reset success message

        const newJob = { title, company, location, description }; // Create new job object

        try {
            const response = await fetch('http://localhost:3000/api/jobs', {
                method: 'POST', // Specify the POST method
                headers: {
                    'Content-Type': 'application/json', // Set the content type
                },
                body: JSON.stringify(newJob), // Convert job object to JSON
            });

            if (!response.ok) { // Check for HTTP errors
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to add job');
            }

            const addedJob = await response.json(); // Parse response
            alert("Job added", addedJob)

            setSuccess('Job added successfully!'); // Set success message
            // Reset form fields
            setTitle('');
            setLocation('');
            setDescription('');
        } catch (error) {
            setError(error.message); // Set error message
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Add Job</h1>

            {error && <p className="text-red-600">{error}</p>} {/* Display error if exists */}
            {success && <p className="text-green-600">{success}</p>} {/* Display success if exists */}

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                {/* Job Title Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Job Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} // Update title state
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Company Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Company</label>
                    <input
                        type="text"
                        value={company}
                        readOnly // Make the input read-only to disable editing
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md bg-gray-200"
                    />
                </div>

                {/* Location Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)} // Update location state
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>

                {/* Job Description Field */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} // Update description state
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    ></textarea>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                    Add Job
                </button>
            </form>

            {/* Back to Dashboard Link */}
            <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
                Back to Dashboard
            </Link>
        </div>
    );
};

export default AddJob;
