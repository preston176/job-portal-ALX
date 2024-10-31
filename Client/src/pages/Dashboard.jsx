// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import Sidebar from '../components/Admin/SideBar';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [activities, setActivities] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applicationCount, setApplicationCount] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to fetch data from ${url}`);
      return await response.json();
    } catch (err) {
      console.error(err);
      throw err; 
    }
  };

  useEffect(() => {
    const fetchTotalJobs = async () => {
      try {
        const data = await fetchData('http://localhost:3000/api/jobs');
        setTotalJobs(data.length);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchStats = async () => {
      try {
        const data = await fetchData('http://localhost:3000/api/applications');
        setStats(data);
        setApplicationCount(data.applications?.length || 0);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchActivities = async () => {
      try {
        const data = await fetchData('http://localhost:3000/api/activities');
        setActivities(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalJobs();
    fetchStats();
    fetchActivities();
  }, []);

  const renderStatsCard = (title, value) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <p className="mt-4 text-3xl font-bold text-gray-900">{value || 0}</p>
    </div>
  );

  const renderActivitiesList = () => {
    if (loading) return <p>Loading activities...</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    
    return (
      <ul className="space-y-4">
        {activities.map(({ job, applications }) => (
          <li key={job.id} className="border-b pb-4">
            <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
            <p className="text-gray-600">Company: {job.company}</p>
            <p className="text-gray-600">Location: {job.location}</p>
            <p className="text-gray-600">Description: {job.description}</p>
            <h4 className="text-md font-semibold text-gray-700 mt-2">Applications:</h4>
            <ul className="pl-4">
              {applications.map(({ id, applicant, status }) => (
                <li key={id} className={`mt-1 ${status === 'approved' ? 'text-green-600' : 'text-red-600'}`}>
                  {applicant.firstName} {applicant.lastName} - {status.charAt(0).toUpperCase() + status.slice(1)}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-grow p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
          <Link to="/company/addjob">
            <button className="px-3 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150">
              Post New Job
            </button>
          </Link>
        </div>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderStatsCard('Total Jobs Posted', totalJobs)}
          {/* {renderStatsCard('Pending Reviews', stats.pendingReviews)} */}
          {renderStatsCard('Total Applications', applicationCount)}
        </section>
        <section className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {renderActivitiesList()}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
