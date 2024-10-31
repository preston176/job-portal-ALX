import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const MyApplications = () => {
    const { auth } = useContext(AuthContext);
    const [applications, setApplications] = useState([]);
    const [jobsData, setJobsData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            if (!auth?.email) {
                setError('User not authenticated.');
                setLoading(false);
                return;
            }

            const cachedApplications = localStorage.getItem(`applications_${auth.email}`);
            if (cachedApplications) {
                setApplications(JSON.parse(cachedApplications));
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:3000/api/applications?email=${auth.email}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const apps = data.applications || [];
                setApplications(apps);

                localStorage.setItem(`applications_${auth.email}`, JSON.stringify(apps));
            } catch (error) {
                setError('Failed to fetch applications. Please try again later.');
                console.error("Error fetching applications:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppliedJobs();
    }, [auth]);

    useEffect(() => {
        const fetchJobDetails = async () => {
            const jobs = await Promise.all(
                applications.map(async (application) => {
                    const cachedJob = localStorage.getItem(`job_${application.jobId}`);
                    if (cachedJob) {
                        return JSON.parse(cachedJob);
                    }

                    try {
                        const jobResponse = await fetch(`http://localhost:3000/api/jobs/${application.jobId}`);
                        if (!jobResponse.ok) {
                            throw new Error('Failed to fetch job details');
                        }
                        const jobData = await jobResponse.json();
                        localStorage.setItem(`job_${application.jobId}`, JSON.stringify(jobData));
                        return jobData;
                    } catch (error) {
                        console.error("Error fetching job details:", error);
                        return null;
                    }
                })
            );
            setJobsData(jobs.filter((job) => job !== null));
        };

        if (applications.length > 0) {
            fetchJobDetails();
        }
    }, [applications]);

    const filteredJobs = jobsData.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">My Applications</h1>

            <div className="flex items-center mb-6">
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
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job, index) => (
                        <div key={job._id} className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-200">
                            <h2 className="text-xl font-semibold">{job.title}</h2>
                            <h3 className="text-md font-medium text-gray-600">{job.company}</h3>
                            <p className="text-sm text-gray-500">{job.location}</p>
                            <p className="mt-2 text-gray-700">{job.description}</p>
                            <p className='text-sm text-gray-500'>Applied on {new Date(applications[index].appliedAt).toLocaleString()}</p>
                            <p className='text-sm text-gray-500'>Status: 
                                <button 
                                    className={`ml-2 px-2 py-1 rounded text-white ${
                                        applications[index].applicant.approved === "approved" ? 'bg-green-500' :
                                        applications[index].applicant.approved === "rejected" ? 'bg-red-500' :
                                        'bg-yellow-500'
                                    }`}
                                >
                                    {applications[index].applicant.approved.charAt(0).toUpperCase() + applications[index].applicant.approved.slice(1)}
                                </button>
                            </p>
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
