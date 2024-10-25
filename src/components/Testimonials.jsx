import React from 'react'
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const Testimonials = () => {
    return (
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
                {/* review */}
                <SplideSlide>
                    <img className="w-36 h-36 rounded-full object-cover mb-4 mx-auto" src="" alt="" />
                    <div className="flex flex-col items-center">
                        <p className="text-gray-800 mb-2 text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, sint.</p>
                        <div className="flex items-center">
                            <div className="inline-block leading-none">
                                <span className="text-orange-500 text-lg">&#9733;</span>
                                <span className="text-orange-500 text-lg">&#9733;</span>
                                <span className="text-orange-500 text-lg">&#9733;</span>
                                <span className="text-orange-500 text-lg">&#9733;</span>
                                <span className="text-gray-400 text-lg">&#9734;</span>
                            </div>
                            <p className="font-semibold ml-2">James</p>
                        </div>
                    </div>
                </SplideSlide>
                <SplideSlide>
                    <img className="w-36 h-36 rounded-full object-cover mb-4 mx-auto" src="" alt="" />
                    <div className="flex flex-col items-center">
                        <p className="text-gray-800 mb-2 text-lg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, sint.</p>
                        <div className="flex items-center">
                            <div className="inline-block leading-none">
                                <span className="text-orange-500 text-lg">&#9733;</span>
                                <span className="text-orange-500 text-lg">&#9733;</span>
                                <span className="text-orange-500 text-lg">&#9733;</span>
                                <span className="text-orange-500 text-lg">&#9733;</span>
                                <span className="text-gray-400 text-lg">&#9734;</span>
                            </div>
                            <p className="font-semibold ml-2">James</p>
                        </div>
                    </div>
                </SplideSlide>
                {/* review */}
            </Splide></div>
    )
}

export default Testimonials