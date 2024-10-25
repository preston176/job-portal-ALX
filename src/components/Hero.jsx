import React from 'react';

const Hero = () => {
    return (
        <div className="flex items-center justify-evenly py-20 px-8 bg-gray-100">
            {/* Text Section */}
            <div className="flex flex-col max-w-md">
                <h2 className="font-bold text-3xl mb-4">Find Your Dream Job Today!</h2>
                <p className="text-lg text-gray-700">
                    Explore thousands of job listings tailored to your skills and preferences. Start your journey toward a fulfilling career.
                </p>
            </div>

            {/* Image Section */}
            <div className="ml-8">
                <img
                    src="/hero.jpg"
                    alt="Job search illustration"
                    className="w-full max-w-sm rounded-lg shadow-lg"
                />
            </div>
        </div>
    );
};

export default Hero;
