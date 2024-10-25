// src/components/WhyUs.jsx
import React from 'react';

const WhyUs = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-4xl font-bold text-center">Why Choose Us?</h2>
            <p className="mt-4 text-lg text-center text-gray-600">
                We believe in providing exceptional service and value to our customers. Here’s why you should choose us:
            </p>
            <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-2xl font-semibold">Expertise</h3>
                    <p className="mt-2 text-gray-700">
                        Our team consists of industry experts with years of experience, ensuring you receive the best guidance and support.
                    </p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-2xl font-semibold">Customer Focus</h3>
                    <p className="mt-2 text-gray-700">
                        We prioritize our customers' needs and strive to create a seamless experience tailored to your requirements.
                    </p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-2xl font-semibold">Innovative Solutions</h3>
                    <p className="mt-2 text-gray-700">
                        We leverage the latest technology and trends to provide innovative solutions that set you up for success.
                    </p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-2xl font-semibold">Transparency</h3>
                    <p className="mt-2 text-gray-700">
                        No Middlemen, Just straight forward, apply for your job.
                    </p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-2xl font-semibold">Proven Track Record</h3>
                    <p className="mt-2 text-gray-700">
                        We have a proven track record of success, helping countless customers achieve their goals with our services.
                    </p>
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <h3 className="text-2xl font-semibold">24/7 Support</h3>
                    <p className="mt-2 text-gray-700">
                        Our dedicated support team is available 24/7 to assist you with any questions or issues you may encounter.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WhyUs;
