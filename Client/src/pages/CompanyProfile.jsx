// src/pages/UserProfilePage.jsx

import { Link } from 'react-router-dom';
import Profile from '../components/Admin/Profile';

const CompanyProfile = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-3xl font-bold text-center mb-6">User Profile</h1>
                <Profile /> {/* Display the Profile component */}
                <div className="text-center mt-6">
                    <Link to="/dashboard" className="text-blue-500 hover:underline">
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CompanyProfile;
