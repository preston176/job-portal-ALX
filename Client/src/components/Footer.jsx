import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="lg:pl-72 md:pl-36 bg-gray-800 text-white py-6 mt-4">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <h2 className="text-lg font-semibold">Job Portal</h2>
                    <p className="text-sm">© 2024 Your Company. All rights reserved.</p>
                </div>
                <div className="flex space-x-4">
                    <Link to="/about" className="hover:text-gray-400">
                        About
                    </Link>
                    <Link to="/jobs" className="hover:text-gray-400">
                        Jobs
                    </Link>
                    <Link to="/contact" className="hover:text-gray-400">
                        Contact
                    </Link>
                    <Link to="/company/login" className="hover:text-gray-400">
                        Are you a Company?
                    </Link>
                </div>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="#" className="hover:text-gray-400">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="hover:text-gray-400">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#" className="hover:text-gray-400">
                        <i className="fab fa-instagram"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
