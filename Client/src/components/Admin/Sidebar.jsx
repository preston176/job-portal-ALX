// src/components/Sidebar.jsx
import React from 'react';
import { FaHome, FaChartBar, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="w-64 bg-gray-800 text-white h-screen flex flex-col">
            <div className="flex items-center justify-center h-20 border-b border-gray-700">
                <h1 className="text-2xl font-bold">My Dashboard</h1>
            </div>
            <nav className="flex-grow mt-10">
                <NavLink
                    to="/"
                    className="flex items-center px-6 py-3 hover:bg-gray-700 transition-colors"
                    activeClassName="bg-gray-700"
                >
                    <FaHome className="mr-3" />
                    <span>Home</span>
                </NavLink>
                <NavLink
                    to="/analytics"
                    className="flex items-center px-6 py-3 hover:bg-gray-700 transition-colors"
                    activeClassName="bg-gray-700"
                >
                    <FaChartBar className="mr-3" />
                    <span>Analytics</span>
                </NavLink>
                <NavLink
                    to="/company/profile"
                    className="flex items-center px-6 py-3 hover:bg-gray-700 transition-colors"
                    activeClassName="bg-gray-700"
                >
                    <FaUser className="mr-3" />
                    <span>Profile</span>
                </NavLink>
                <NavLink
                    to="/settings"
                    className="flex items-center px-6 py-3 hover:bg-gray-700 transition-colors"
                    activeClassName="bg-gray-700"
                >
                    <FaCog className="mr-3" />
                    <span>Settings</span>
                </NavLink>
            </nav>
            <div className="border-t border-gray-700">
                <NavLink
                    to="/logout"
                    className="flex items-center px-6 py-3 hover:bg-gray-700 transition-colors"
                >
                    <FaSignOutAlt className="mr-3" />
                    <span>Logout</span>
                </NavLink>
            </div>
        </aside>
    );
};

export default Sidebar;
