// src/components/JobCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ jobTitle, companyName, location, id }) => {
    return (
        <Link to={`/apply/${id}`} className="block bg-white shadow-md rounded-md p-4 hover:shadow-lg transition">
            <h3 className="text-lg font-semibold">{jobTitle}</h3>
            <p className="text-gray-600">{companyName}</p>
            <p className="text-gray-500">{location}</p>
        </Link>
    );
};

export default JobCard;
