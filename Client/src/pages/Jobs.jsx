import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Jobs = () => {
    const [jobsData, setJobsData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Fetch job data from the API and store in local storage
    const fetchJobs = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/jobs'); // Adjust the API URL if needed
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            // Update the jobs data state and local storage
            setJobsData(data);
            localStorage.setItem('jobs', JSON.stringify(data));
        } catch (error) {
            setError('Failed to fetch jobs');
            console.error("Error fetching jobs:", error);
        } finally {
            setLoading(false);
        }
    };

    // Check for local storage data and fetch updates if needed
    useEffect(() => {
        const storedJobs = localStorage.getItem('jobs');

        if (storedJobs) {
            setJobsData(JSON.parse(storedJobs));
            fetchJobs();
            setLoading(false);
        } else {
            fetchJobs();
        }

        // Set an interval to check for updates periodically (e.g., every 5 minutes)
        const updateInterval = setInterval(fetchJobs, 300000); // 300000ms = 5 minutes
        return () => clearInterval(updateInterval); // Clear interval on component unmount
    }, []);

    // Filter jobs based on the search term
    const filteredJobs = jobsData.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Job Listings</h1>
            <div className="flex">
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
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map((job) => (
                        <div key={job._id} className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-200">
                            <h2 className="text-xl font-semibold">{job.title}</h2>
                            <h3 className="text-md font-medium text-gray-600">{job.company}</h3>
                            <p className="text-sm text-gray-500">{job.location}</p>
                            <p className="mt-2 text-gray-700">{job.description}</p>
                            <Link to={`/apply/${job._id}`}>
                                <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none">
                                    Apply Now
                                </button>
                            </Link>
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
