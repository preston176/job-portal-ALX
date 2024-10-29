// src/pages/JobPage.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const JobPage = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/jobs/${jobId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch job');
                }
                const data = await response.json();
                setJob(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchJob();
    }, [jobId]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

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
