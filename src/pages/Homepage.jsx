import React from 'react'
import Hero from '../components/Hero'
import Search from '../components/Search'
import JobCard from '../components/JobCard'
import TrustedBy from '../components/TrustedBy'
import { useState } from 'react'

const Homepage = () => {


    // Array of job data
    const jobs = [
        { jobTitle: "Software Engineer", companyName: "Tech Corp", location: "Remote" },
        { jobTitle: "Data Scientist", companyName: "Data Inc.", location: "New York" },
        { jobTitle: "Product Manager", companyName: "Startup LLC", location: "San Francisco" },
        { jobTitle: "UI/UX Designer", companyName: "Design Studio", location: "Remote" },
        { jobTitle: "Backend Developer", companyName: "Cloud Solutions", location: "Austin" }
    ];


    return (
        <div>
            <Hero />
            <Search />
            {/* Job Cards Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 max-w-7xl mx-auto mt-8">
                {jobs.slice(0, 3).map((job, index) => (
                    <JobCard key={index} jobTitle={job.jobTitle} companyName={job.companyName} location={job.location} />
                ))}
            </div>
            {/* View More Button */}

            <div className="flex justify-center mt-6">
                <button
                    onClick={() => console.log("hello")}
                    className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-800 transition duration-150"
                >
                    View More
                </button>
            </div>

            <TrustedBy />
        </div>
    )
}

export default Homepage