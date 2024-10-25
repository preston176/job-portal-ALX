import React from 'react';

const JobCard = ({ jobTitle, companyName, location, onApply }) => {
    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 max-w-sm mx-auto">
            {/* Job Title */}
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{jobTitle}</h3>

            {/* Company and Location */}
            <div className="text-gray-600 text-sm mb-4">
                <p className="font-medium">{companyName}</p>
                <p>{location}</p>
            </div>

            {/* Job Description */}
            <p className="text-gray-700 text-sm mb-6">
                A brief description of the job goes here. Keep it concise and engaging for the candidate.
            </p>

            {/* Apply Button */}
            <button
                onClick={onApply}
                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-150"
            >
                Apply Now
            </button>
        </div>
    );
};

export default JobCard;
