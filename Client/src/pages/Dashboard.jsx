// src/pages/Dashboard.jsx
import React from 'react';
import Sidebar from '../components/Admin/SideBar';
import { Link } from 'react-router-dom';


const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-grow p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
          <Link to={"/company/addjob"}>
            <button className="px-3 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150">
              Post New Job
            </button>
          </Link>
        </div>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">Jobs Active</h2>
            <p className="mt-4 text-3xl font-bold text-gray-900">1,234</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">Revenue</h2>
            <p className="mt-4 text-3xl font-bold text-gray-900">$12,345</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">Job Applicants</h2>
            <p className="mt-4 text-3xl font-bold text-gray-900">5</p>
          </div>
        </section>
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <span>User John Doe completed a task</span>
                <span className="text-gray-500 text-sm">2 hours ago</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Revenue report generated</span>
                <span className="text-gray-500 text-sm">5 hours ago</span>
              </li>
              <li className="flex items-center justify-between">
                <span>System backup completed</span>
                <span className="text-gray-500 text-sm">1 day ago</span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
