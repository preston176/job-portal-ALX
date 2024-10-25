// src/pages/JobPage.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Apply = () => {
    // Retrieve job ID from the URL parameters
    const { jobId } = useParams();

    // Mock job data (you can replace this with actual data fetching)
    const jobs = [
        { id: '1', jobTitle: "Software Engineer", companyName: "Tech Corp", location: "Remote", description: "Develop and maintain software applications." },
        { id: '2', jobTitle: "Data Scientist", companyName: "Data Inc.", location: "New York", description: "Analyze data and build predictive models." },
        { id: '3', jobTitle: "Product Manager", companyName: "Startup LLC", location: "San Francisco", description: "Lead product development and strategy." },
        { id: '4', jobTitle: "UI/UX Designer", companyName: "Design Studio", location: "Remote", description: "Create intuitive user interfaces and experiences." },
        { id: '5', jobTitle: "Backend Developer", companyName: "Cloud Solutions", location: "Austin", description: "Build and maintain server-side applications." }
    ];

    // Find the job based on the jobId
    const job = jobs.find(job => job.id === jobId);

    // State for form inputs
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Process the form submission (e.g., send data to the server)
        alert(`Application submitted for ${job.jobTitle} at ${job.companyName}`);
        console.log(formData);
        // Reset the form (optional)
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
        });
    };

    return (
        <div className="px-4 py-8">
            {job ? (
                <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md p-6">
                    <h2 className="text-3xl font-bold">{job.jobTitle}</h2>
                    <h3 className="text-xl text-gray-700">{job.companyName}</h3>
                    <p className="text-gray-600">{job.location}</p>
                    <div className="mt-4">
                        <h4 className="text-lg font-semibold">Job Description:</h4>
                        <p className="text-gray-800">{job.description}</p>
                    </div>
                    <hr />
                    {/* Application Form */}
                    <p className='text-gray-800 text-center'>Please fill in the form below to apply for the position</p>
                    <form className="mt-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200"
                                />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring focus:ring-blue-200"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-150"
                        >
                            Apply
                        </button>
                    </form>
                </div>
            ) : (
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold">Job not found</h2>
                </div>
            )}
        </div>
    );
};

export default Apply;
