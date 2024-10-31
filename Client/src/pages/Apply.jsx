// src/pages/JobPage.jsx
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Apply = () => {
    const { auth } = useContext(AuthContext);
    const { jobId } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for form inputs
    const [formData, setFormData] = useState({
        firstName: auth?.displayName || '',
        lastName: '',
        email: auth?.email || auth?.providerData?.[0]?.email || '',
        phone: auth?.providerData?.[0]?.phone || '',
        approved: "pending",
    });

    // Fetch job details based on jobId
    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/jobs/${jobId}`);
                if (!response.ok) throw new Error("Failed to fetch job details");
                const data = await response.json();
                setJob(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        const checkAdmin = () => {
            if (!auth?.displayName) {
                alert("You are an ADMIN ! Cannot Apply")
            }

        }
        checkAdmin();
        fetchJob();
    }, [jobId]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/api/jobs/${jobId}/apply`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error("Failed to submit application");

            const result = await response.json();
            alert(`Application submitted for ${job.jobTitle} at ${job.companyName}`);

            // Reset form data
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                approved: "pending",
            });
        } catch (error) {
            console.error("Error submitting application:", error);
            alert("There was an error submitting your application. Please try again.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="px-4 py-8">
            {job ? (
                <div className="max-w-2xl mx-auto bg-white shadow-md rounded-md p-6">
                    <h1>Job ID: {job._id}</h1>
                    <h2 className="text-3xl font-bold">{job.jobTitle}</h2>
                    <h3 className="text-xl text-gray-700">{job.companyName}</h3>
                    <p className="text-gray-600">{job.location}</p>
                    <div className="mt-4">
                        <h4 className="text-lg font-semibold">Job Description:</h4>
                        <p className="text-gray-800">{job.description}</p>
                    </div>
                    <hr />
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
                                    disabled
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
                            disabled={!auth?.displayName}
                            type="submit"
                            className={`mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-150 ${!auth?.displayName && 'opacity-0'} `}
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
