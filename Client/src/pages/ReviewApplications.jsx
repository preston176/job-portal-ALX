import React, { useEffect, useState } from 'react';

const ReviewApplications = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [jobTitles, setJobTitles] = useState({});

    // Fetch all applications from the API
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/applications');
                if (!response.ok) {
                    throw new Error('Failed to fetch applications');
                }
                const data = await response.json();
                setApplications(data.applications || []);
                await fetchJobTitles(data.applications || []);
            } catch (error) {
                setError('Failed to fetch applications. Please try again later.');
                console.error("Error fetching applications:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchJobTitles = async (applications) => {
            const titles = {};
            try {
                await Promise.all(applications.map(async (app) => {
                    const response = await fetch(`http://localhost:3000/api/jobs/${app.jobId}`);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch job title for job ID: ${app.jobId}`);
                    }
                    const data = await response.json();
                    titles[app.jobId] = data.title; // Assuming the job title is in data.title
                }));
            } catch (error) {
                console.error(error);
            } finally {
                setJobTitles(titles);
            }
        };

        fetchApplications();
    }, []);

    // Function to handle approval
    const handleApproval = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/applications/${id}/approve`, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to approve application');
            }
            // Update the local state to reflect approval
            setApplications((prevApps) =>
                prevApps.map((app) =>
                    app._id === id ? { ...app, applicant: { ...app.applicant, approved: 'approved' } } : app
                )
            );
        } catch (error) {
            setError('Failed to approve the application.');
            console.error("Error approving application:", error);
        }
    };

    // Function to handle rejection
    const handleRejection = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/api/applications/${id}/reject`, {
                method: 'PATCH', 
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Failed to reject application');
            }
            // Update the local state to reflect rejection
            setApplications((prevApps) =>
                prevApps.map((app) =>
                    app._id === id ? { ...app, applicant: { ...app.applicant, approved: 'rejected' } } : app
                )
            );
        } catch (error) {
            setError('Failed to reject the application.');
            console.error("Error rejecting application:", error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-600">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Review Applications</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {applications.length > 0 ? (
                    applications.map((application) => (
                        <div key={application._id} className="bg-white p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-200">
                            {/* <h2 className="text-xl font-semibold">Application for Job ID: {application.jobId}</h2> */}
                            <h3 className="text-md font-bold text-gray-900">
                                Job Title: {jobTitles[application.jobId] || 'Loading...'}
                            </h3>
                            <h3 className="text-md font-semibold text-gray-600">
                                Applicant: {application.applicant.firstName} {application.applicant.lastName}
                            </h3>
                            <p className="text-sm text-gray-500">Email: {application.applicant.email}</p>
                            <p className="text-sm text-gray-500">Phone: {application.applicant.phone}</p>
                            <p className="text-sm text-gray-500">
                                Status: <span className={`font-semibold ${application.applicant.approved === 'approved' ? 'text-green-500' : application.applicant.approved === 'rejected' ? 'text-red-500' : 'text-yellow-500'}`}>
                                    {application.applicant.approved.charAt(0).toUpperCase() + application.applicant.approved.slice(1)}
                                </span>
                            </p>

                            <div className="flex mt-4">
                                <button
                                    onClick={() => handleApproval(application._id)}
                                    className="bg-green-500 text-white px-3 py-1 rounded mr-2 hover:bg-green-600"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleRejection(application._id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No applications found.</p>
                )}
            </div>
        </div>
    );
};

export default ReviewApplications;
