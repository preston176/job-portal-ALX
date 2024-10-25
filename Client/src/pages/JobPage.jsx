// src/pages/JobPage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const JobPage = () => {
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
                </div>
            ) : (
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold">Job not found</h2>
                </div>
            )}
        </div>
    );
};

export default JobPage;
