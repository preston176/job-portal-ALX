import React from 'react';

const Search = () => {
    return (
        <>
            <p className='flex items-center justify-center text-lg text-gray-700 py-4'>Search For Your Job</p>
            <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-md max-w-md mx-auto">
                {/* Search Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                </svg>
                {/* Input Field */}
                <input
                    type="text"
                    placeholder="Search..."
                    className="bg-transparent outline-none w-full text-gray-700"
                />
            </div>
        </>
    );
};

export default Search;
