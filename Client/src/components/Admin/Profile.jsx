import { useContext, useEffect, useState } from 'react';
import { db } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({});
    const { auth } = useContext(AuthContext); // Ensure auth contains the user object

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            try {
                // Get the currently signed-in user's UID
                if (auth && auth.uid) {
                    const uid = auth.uid; // Access uid directly

                    // Retrieve additional user data from Firestore
                    const userDoc = await getDoc(doc(db, 'users', uid));
                    if (userDoc.exists()) {
                        const userInfo = { ...userDoc.data(), email: auth.email }; // Assuming auth has email
                        setUserData(userInfo);
                        setFormData(userInfo); // Set initial form data for editing
                    } else {
                        console.log("No such user data found!");
                    }
                } else {
                    console.log("User is not signed in");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [auth]);

    const handleEditToggle = () => {
        setEditing(!editing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (auth && auth.uid) {
                const uid = auth.uid;
                // Update user data in Firestore
                await updateDoc(doc(db, 'users', uid), formData);
                setUserData((prevData) => ({ ...prevData, ...formData }));
                setEditing(false); // Exit edit mode after saving
                console.log("User data updated successfully");
            }
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (!userData) return <p>No user data available</p>;

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md mt-8">
            {editing ? (
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="companyName">Name:</label>
                        <input
                            type="text"
                            id="companyName"
                            name="companyName"
                            value={formData.companyName || ''}
                            onChange={handleChange}
                            className="border rounded w-full py-2 px-3"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleChange}
                            className="border rounded w-full py-2 px-3"
                            readOnly // Prevent editing of email
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber || ''}
                            onChange={handleChange}
                            className="border rounded w-full py-2 px-3"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="companyAddress">Company Address:</label>
                        <input
                            type="text"
                            id="companyAddress"
                            name="companyAddress"
                            value={formData.companyAddress || ''}
                            onChange={handleChange}
                            className="border rounded w-full py-2 px-3"
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Save</button>
                    <button type="button" onClick={handleEditToggle} className="bg-gray-500 text-white py-2 px-4 rounded ml-2">Cancel</button>
                </form>
            ) : (
                <div>
                    <p><strong>Name:</strong> {userData.companyName || 'N/A'}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Phone Number:</strong> {userData.phoneNumber || 'N/A'}</p>
                    <p><strong>Company Address:</strong> {userData.companyAddress || 'N/A'}</p>
                    <button onClick={handleEditToggle} className="bg-green-500 text-white py-2 px-4 rounded mt-4">Edit Profile</button>
                </div>
            )}
        </div>
    );
};

export default Profile;
