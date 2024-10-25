// src/pages/AboutPage.jsx
import React from 'react';

const AboutPage = () => {
    return (
        <div className="px-4 py-8 max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-center">About Us</h1>
            <p className="mt-4 text-lg text-center text-gray-600">
                At Job Portal, we are dedicated to connecting job seekers with their dream opportunities.
                Our mission is to simplify the job search process and empower individuals to find fulfilling careers.
            </p>

            <section className="mt-8">
                <h2 className="text-3xl font-semibold">Our Mission</h2>
                <p className="mt-2 text-gray-700">
                    Our mission is to create a seamless platform that bridges the gap between job seekers and employers.
                    We believe that everyone deserves the opportunity to find a job they love, and we strive to make that a reality.
                </p>
            </section>

            <section className="mt-8">
                <h2 className="text-3xl font-semibold">Our Values</h2>
                <ul className="mt-2 list-disc list-inside text-gray-700">
                    <li>Integrity: We uphold the highest standards of honesty and transparency.</li>
                    <li>Innovation: We embrace creativity and strive for excellence in everything we do.</li>
                    <li>Community: We believe in building strong relationships with our users and partners.</li>
                </ul>
            </section>

            <section className="mt-8">
                <h2 className="text-3xl font-semibold">Meet Our Team</h2>
                <div className="grid gap-6 mt-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="font-bold text-xl">Preston Mayieka</h3>
                        <p className="text-gray-600">Founder & CEO</p>
                        <p className="mt-2 text-gray-700">
                            Preston is passionate about helping people find jobs that inspire them. With over years of experience in the industry, hhe leads our team with vision and integrity.
                        </p>
                    </div>
                    {/* <div className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="font-bold text-xl">John Smith</h3>
                        <p className="text-gray-600">Co-Founder & CTO</p>
                        <p className="mt-2 text-gray-700">
                            John is a tech enthusiast who loves building innovative solutions. He is dedicated to ensuring that our platform is user-friendly and efficient.
                        </p>
                    </div> */}
                    {/* <div className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="font-bold text-xl">Emily Johnson</h3>
                        <p className="text-gray-600">Marketing Director</p>
                        <p className="mt-2 text-gray-700">
                            Emily is a marketing expert with a passion for storytelling. She leads our marketing efforts to reach and engage job seekers effectively.
                        </p>
                    </div> */}
                    {/* Add more team members as needed */}
                </div>
            </section>

            <section className="mt-8">
                <h2 className="text-3xl font-semibold">Get in Touch</h2>
                <p className="mt-2 text-gray-700">
                    We love to hear from you! Whether you have questions, feedback, or just want to connect, feel free to reach out to us at <a href="mailto:info@yourcompany.com" className="text-blue-600">info@yourcompany.com</a>.
                </p>
            </section>
        </div>
    );
};

export default AboutPage;
