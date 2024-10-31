import { useContext } from "react";
import Typewriter from "typewriter-effect"
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleClick = () => {
        (auth && auth.displayName) ? navigate("/jobs") : navigate("/dashboard")
    }

    return (
        <div className="flex items-center justify-evenly py-20 px-8 bg-gray-100">
            {/* Text Section */}
            <div className="flex flex-col max-w-md">
                <h2 className="font-bold text-3xl mb-4"><Typewriter
                    options={{
                        strings: ['Find Your Dream Job Today', 'Secure Your Dream Job'],
                        autoStart: true,
                        loop: true,
                        delay: 60,
            

                    }}
                /></h2>
                <p className="text-lg text-gray-700">
                    Explore thousands of job listings tailored to your skills and preferences. Start your journey toward a fulfilling career.
                </p>
                <div className="py-3">
                    <button
                        onClick={handleClick}
                        className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-800 transition duration-150">{
                            auth ? "Browse Jobs" : "Get Started"
                        }</button>
                </div>
            </div>

            {/* Image Section */}
            <div className="ml-8">
                <img
                    src="/hero.jpg"
                    alt="Job search illustration"
                    className="w-full max-w-sm rounded-lg shadow-lg"
                />
            </div>
        </div>
    );
};

export default Hero;
