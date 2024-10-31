import React, { useState } from 'react';

const ReviewPage = () => {
    const [review, setReview] = useState('');
    const [name, setName] = useState('');
    const [rating, setRating] = useState(5); // Default rating
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input
        if (!review || !name) {
            setErrorMessage('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ review, name, rating }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit review');
            }

            const data = await response.json();

            // Show success message
            setSuccessMessage('Thank you for your review!');
            setErrorMessage('');

            // Reset form fields
            setReview('');
            setName('');
            setRating(5);
        } catch (error) {
            setErrorMessage(error.message);
            setSuccessMessage('');
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <h2 className="text-3xl font-semibold text-center mb-6">Leave a Review</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Your Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Your Review</label>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                        rows="4"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Rating</label>
                    <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
                    >
                        <option value={5}>5 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={2}>2 Stars</option>
                        <option value={1}>1 Star</option>
                    </select>
                </div>
                {successMessage && <p className="text-green-600">{successMessage}</p>}
                {errorMessage && <p className="text-red-600">{errorMessage}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-colors"
                >
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default ReviewPage;