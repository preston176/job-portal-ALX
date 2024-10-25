
const Footer = () => {
    return (
        <footer className="lg:pl-72 md:pl-36 bg-gray-800 text-white py-6 mt-4">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                    <h2 className="text-lg font-semibold">Your Company</h2>
                    <p className="text-sm">© 2024 Your Company. All rights reserved.</p>
                </div>
                <div className="flex space-x-4">
                    <a href="/about" className="hover:text-gray-400">
                        About
                    </a>
                    <a href="/jobs" className="hover:text-gray-400">
                        Jobs
                    </a>
                    <a href="/contact" className="hover:text-gray-400">
                        Contact
                    </a>
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
