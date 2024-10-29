import React, { useEffect, useState } from 'react';

const MyApplications = ({ applicantEmail }) => {
    const [jobsData, setJobsData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch jobs the applicant has applied to from the API
    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/applications?email=${applicantEmail}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setJobsData(data.applications);
            } catch (error) {
                setError('Failed to fetch applications');
                console.error("Error fetching applications:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppliedJobs();
    }, [applicantEmail]);

    const filteredJobs = jobsData.filter((job) =>
        job.jobId.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">My Applications</h1>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
            <input
                type="text"
                placeholder="Search for jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-6 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((application) => (
                        <div key={application.jobId} className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-200">
                            <h2 className="text-xl font-semibold">{application.jobId.title}</h2>
                            <h3 className="text-md font-medium text-gray-600">{application.jobId.company}</h3>
                            <p className="text-sm text-gray-500">{application.jobId.location}</p>
                            <p className="mt-2 text-gray-700">{application.jobId.description}</p>
                        </div>
                    ))
                ) : (
                    <p>No jobs found matching your search.</p>
                )}
            </div>
        </div>
    );
};

export default MyApplications;