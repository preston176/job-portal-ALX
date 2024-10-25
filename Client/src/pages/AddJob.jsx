// src/pages/AddJob.js

import React, { useState } from 'react';

const AddJob = () => {
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const newJob = { title, company, location, description };

        try {
            const response = await fetch('http://localhost:3000/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newJob),
            });

            if (!response.ok) {
                throw new Error('Failed to add job');
            }

            setSuccess('Job added successfully!');
            // Clear form fields after successful submission
            setTitle('');
            setCompany('');
            setLocation('');
            setDescription('');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Add Job</h1>

            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Job Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Company</label>
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                    Add Job
                </button>
            </form>
        </div>
    );
};

export default AddJob;
