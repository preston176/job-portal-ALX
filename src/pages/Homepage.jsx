import React from 'react'
import Hero from '../components/Hero'
import Search from '../components/Search'
import JobCard from '../components/JobCard'
import TrustedBy from '../components/TrustedBy'
import { useState } from 'react'
import Testimonials from '../components/Testimonials'
import WhyUs from '../components/WhyUs'

const Homepage = () => {


    // Array of job data
    const jobs = [
        { id: 1, jobTitle: "Software Engineer", companyName: "Tech Corp", location: "Remote" },
        { id: 2, jobTitle: "Data Scientist", companyName: "Data Inc.", location: "New York" },
        { id: 3, jobTitle: "Product Manager", companyName: "Startup LLC", location: "San Francisco" },
        { id: 4, jobTitle: "UI/UX Designer", companyName: "Design Studio", location: "Remote" },
        { id: 5, jobTitle: "Backend Developer", companyName: "Cloud Solutions", location: "Austin" }
    ];


    return (
        <div>
            <Hero />
            <Search />
            {/* Job Cards Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 max-w-7xl mx-auto mt-8">
                {jobs.slice(0, 3).map((job, index) => (
                    <JobCard key={job.id} jobTitle={job.jobTitle} companyName={job.companyName} location={job.location} id={job.id} />
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

            <WhyUs />

            <TrustedBy />

            <Testimonials />
        </div>
    )
}

export default Homepage