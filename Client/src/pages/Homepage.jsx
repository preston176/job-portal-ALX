import React, { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import Search from '../components/Search';
import JobCard from '../components/JobCard';
import TrustedBy from '../components/TrustedBy';
import Testimonials from '../components/Testimonials';
import WhyUs from '../components/WhyUs';
import { useNavigate } from 'react-router-dom';

const Homepage = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);

    // Fetch job data from the API and store in local storage
    const fetchJobs = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/jobs'); // Adjust the API URL if needed
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            // Update the jobs state and local storage
            setJobs(data);
            localStorage.setItem('jobs', JSON.stringify(data));
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    // Check for local storage data and fetch updates if needed
    useEffect( () => {
        const storedJobs  = localStorage.getItem('jobs');

        if (storedJobs) {
            setJobs(JSON.parse(storedJobs));
            fetchJobs()
        }

        // Fetch fresh job data if not in local storage or to update cache
        fetchJobs();

        // Set an interval to check for updates periodically (e.g., every 5 minutes)
        const updateInterval = setInterval(fetchJobs, 1000); // 300000ms = 5 minutes
        return () => clearInterval(updateInterval); // Clear interval on component unmount
    }, []);

    return (
        <div>
            <Hero />
            <h2 className='text-4xl font-bold text-center'>Featured Jobs</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 max-w-7xl mx-auto mt-8">
                {jobs.slice(0, 6).map((job) => (
                    <JobCard key={job._id} description={job.description} jobTitle={job.title} companyName={job.company} location={job.location} id={job._id} />
                ))}
            </div>
            <div className="flex justify-center mt-6">
                <button
                    onClick={() => navigate("/jobs")}
                    className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-800 transition duration-150"
                >
                    View More
                </button>
            </div>
            <WhyUs />
            <TrustedBy />
            <Testimonials />
        </div>
    );
};

export default Homepage;
