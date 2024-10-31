import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { AuthContext } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const CompanyJobs = () => {
    const [userData, setUserData] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [loadingUser, setLoadingUser] = useState(true);
    const [loadingJobs, setLoadingJobs] = useState(false);
    const [error, setError] = useState(null);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate(); // Initialize navigate

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            if (auth?.uid) {
                try {
                    const userRef = doc(db, "users", auth.uid);
                    const userSnap = await getDoc(userRef);
                    if (userSnap.exists()) {
                        setUserData(userSnap.data());
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setError("Failed to load user data.");
                } finally {
                    setLoadingUser(false);
                }
            }
        };
        fetchUserData();
    }, [auth]);

    // Fetch jobs data
    useEffect(() => {
        const fetchJobs = async () => {
            if (userData) {
                setLoadingJobs(true);
                try {
                    const response = await fetch(`http://localhost:3000/api/jobs?companyId=${userData.companyId}`);
                    const data = await response.json();
                    setJobs(data);
                } catch (error) {
                    console.error("Error fetching jobs:", error);
                    setError("Failed to load jobs.");
                } finally {
                    setLoadingJobs(false);
                }
            }
        };
        fetchJobs();
    }, [userData]);

    // Function to handle edit
    const handleEdit = (jobId) => {
        navigate(`/company/edit-job/${jobId}`); // Navigate to edit job page
    };

    // Function to handle delete
    const handleDelete = async (jobId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/jobs/${jobId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Error deleting job with ID ${jobId}`);
            }

            setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId)); // Remove job from state
        } catch (err) {
            setError("Error deleting job. Please try again.");
            console.error("Error deleting job:", err);
        }
    };

    if (loadingUser) {
        return <div className="text-center">Loading user data...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    if (!userData) {
        return <div className="text-center">No user data available.</div>;
    }

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-semibold text-center mb-6">Jobs at {userData.companyName}</h2>
            {loadingJobs ? (
                <div className="text-center">Loading jobs...</div>
            ) : jobs.length > 0 ? (
                <div className="space-y-4">
                    {jobs.map((job) => (
                        <div className="p-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200" key={job._id}>
                            <h3 className="text-lg font-bold">{job.title}</h3>
                            <p className="text-sm text-gray-600"><strong>Location:</strong> {job.location}</p>
                            <p className="text-sm text-gray-700"><strong>Description:</strong> {job.description}</p>
                            <p className="text-sm text-gray-500"><strong>Posted On:</strong> {new Date(job.createdAt).toLocaleDateString()}</p>
                            <div className="mt-2 flex space-x-4">
                                <button
                                    onClick={() => handleEdit(job._id)}
                                    className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(job._id)}
                                    className="px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">No jobs found for this company.</p>
            )}
            <div className="text-center mt-6">
                <Link to="/dashboard" className="text-blue-500 hover:underline">
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default CompanyJobs;
