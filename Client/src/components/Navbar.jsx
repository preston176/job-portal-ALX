import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { auth } = useContext(AuthContext);

    return (
        <nav className="bg-white shadow-md sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <Link to={`${auth ? (auth.displayName ? "/" : "/dashboard") : "/"}`} className="text-xl font-semibold text-blue-600">
                        Job Portal
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-4 items-center">
                        <Link to="/" className="text-gray-600 hover:text-blue-600">
                            Home
                        </Link>
                        <Link to="/jobs" className="text-gray-600 hover:text-blue-600">
                            Jobs
                        </Link>
                        <Link to="/about" className="text-gray-600 hover:text-blue-600">
                            About
                        </Link>
                        <Link to="/contact" className="text-gray-600 hover:text-blue-600">
                            Contact
                        </Link>
                        <Link
                            to={auth && auth?.displayName ? "/jobs" : !auth?.displayName && auth ? "/company/jobs" : "/login"}
                            className="text-gray-600 hover:text-blue-600"
                            onClick={() => setIsOpen(false)}
                        >
                            <button
                                className="px-3 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150">
                                {
                                    !auth ? "Get Started" : !auth?.displayName ? "View Listings" : "Browse Jobs"
                                }
                            </button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-blue-600 focus:outline-none"
                        >
                            {isOpen ? (
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            ) : (
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    ></path>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="flex flex-col px-4 py-2 space-y-2">
                        <Link
                            to="/"
                            className="text-gray-600 hover:text-blue-600"
                            onClick={() => setIsOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            to="/jobs"
                            className="text-gray-600 hover:text-blue-600"
                            onClick={() => setIsOpen(false)}
                        >
                            Jobs
                        </Link>
                        <Link
                            to="/about"
                            className="text-gray-600 hover:text-blue-600"
                            onClick={() => setIsOpen(false)}
                        >
                            About
                        </Link>
                        <Link
                            to="/contact"
                            className="text-gray-600 hover:text-blue-600"
                            onClick={() => setIsOpen(false)}
                        >
                            Contact
                        </Link>
                        <Link
                            to={auth ? "/jobs" : !auth?.displayName && auth ? "/company/jobs" : "/login"}
                            className="text-gray-600 hover:text-blue-600"
                            onClick={() => setIsOpen(false)}
                        >
                            <button className="px-3 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150">
                                {
                                    !auth ? "Get Started" : !auth?.displayName ? "View Listings" : "Browse Jobs"
                                }
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
