import React, { useContext, useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Testimonials = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const { auth } = useContext(AuthContext);
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleClick = () => {
        if (auth && auth?.displayName) {
            navigate("/review");
        }
    }

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/reviews');
                if (!response.ok) {
                    throw new Error('Failed to fetch reviews');
                }
                const data = await response.json();
                setReviews(data); // Assuming your API returns an array of review objects
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    if (loading) {
        return <p>Loading reviews...</p>;
    }

    if (error) {
        return <p className="text-red-600">{error}</p>;
    }

    return (
        <>
            <div>
                <h2 className="text-3xl text-primary font-semibold text-center my-6 mt-5">Customer Reviews</h2>
                <Splide
                    options={{
                        perPage: 1,
                        autoplay: true,
                        speed: 1000,
                        rewind: true,
                        rewindByDrag: true,
                    }}
                >
                    {reviews.map((review) => (
                        <SplideSlide key={review._id}> {/* Assuming each review has a unique ID */}
                            {/* <img
                                className="w-36 h-36 rounded-full object-cover mb-4 mx-auto"
                                src="https://via.placeholder.com/150" // Placeholder image
                                alt={review.name} // Use review name as alt text
                            /> */}
                            <div className="flex flex-col items-center">
                                <p className="text-gray-800 mb-2 text-lg">{review.review}</p>
                                <div className="flex items-center">
                                    <div className="inline-block leading-none">
                                        {[...Array(review.rating)].map((_, index) => (
                                            <span key={index} className="text-orange-500 text-lg">&#9733;</span>
                                        ))}
                                        {[...Array(5 - review.rating)].map((_, index) => (
                                            <span key={index} className="text-gray-400 text-lg">&#9734;</span>
                                        ))}
                                    </div>
                                    <p className="font-semibold ml-2">{review.name}</p>
                                </div>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>
            </div>
            <div className="flex justify-center mt-6">
                <button onClick={handleClick} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition-colors">
                    Leave a Review
                </button>
            </div>
        </>
    );
}

export default Testimonials;
