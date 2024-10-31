import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const EditJob = () => {
    const { jobId } = useParams(); // Get job ID from URL params
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        title: '',
        company: '',
        location: '',
        description: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch job data on component mount
    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/jobs/${jobId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch job details');
                }
                const job = await response.json();
                setFormValues({
                    title: job.title,
                    company: job.company,
                    location: job.location,
                    description: job.description,
                });
                setLoading(false);
            } catch (err) {
                console.error('Error fetching job:', err);
                setError('Failed to load job details. Please try again.');
                setLoading(false);
            }
        };

        fetchJob();
    }, [jobId]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/api/jobs/${jobId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formValues),
            });

            if (response.ok) {
                navigate(`/company/jobs`);
            } else {
                const errorData = await response.json();
                console.error('Error updating job:', errorData.message);
            }
        } catch (err) {
            console.error('Error updating job:', err);
        } finally {
            alert("Successfully Updated Job");
            navigate("/company/jobs")
        }
    };

    if (loading) return <p className="text-gray-500">Loading job details...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Job</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formValues.title}
                        onChange={handleInputChange}
                        required
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Company:</label>
                    <input
                        type="text"
                        name="company"
                        disabled={formValues.company}
                        value={formValues.company}
                        onChange={handleInputChange}
                        required
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={formValues.location}
                        onChange={handleInputChange}
                        required
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description:</label>
                    <textarea
                        name="description"
                        value={formValues.description}
                        onChange={handleInputChange}
                        required
                        className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    ></textarea>
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Update Job
                </button>
            </form>
        </div>
    );
};

export default EditJob;
