// src/pages/Jobs.js

import React, { useState } from 'react';

const jobsData = [
    {
        id: 1,
        title: 'Software Engineer',
        company: 'Tech Company A',
        location: 'Remote',
        description: 'Develop and maintain web applications.',
    },
    {
        id: 2,
        title: 'Product Manager',
        company: 'Tech Company B',
        location: 'New York, NY',
        description: 'Lead product development and strategy.',
    },
    {
        id: 3,
        title: 'Data Scientist',
        company: 'Tech Company C',
        location: 'San Francisco, CA',
        description: 'Analyze data to drive business insights.',
    },
    {
        id: 4,
        title: 'Frontend Developer',
        company: 'Tech Company D',
        location: 'Los Angeles, CA',
        description: 'Build user interfaces for web applications.',
    },
    // Add more job objects as needed
];

const Jobs = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredJobs = jobsData.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Job Listings</h1>

            <input
                type="text"
                placeholder="Search for jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-6 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                        <div key={job.id} className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-200">
                            <h2 className="text-xl font-semibold">{job.title}</h2>
                            <h3 className="text-md font-medium text-gray-600">{job.company}</h3>
                            <p className="text-sm text-gray-500">{job.location}</p>
                            <p className="mt-2 text-gray-700">{job.description}</p>
                            <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none">
                                Apply Now
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No jobs found matching your search.</p>
                )}
            </div>
        </div>
    );
};

export default Jobs;
