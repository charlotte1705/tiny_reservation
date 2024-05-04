import React from "react";
import heroImage3 from '../assets/hero/hero-3.jpg';

const Hero = () => {
  return (
    <div
      className="bg-gray-300 py-10 sm:py-20 flex items-center justify-center"
      style={{
        backgroundImage: `url(${heroImage3})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '650px',
        minHeight: '300px' // Add a minimum height for smaller screens
      }}
    >
      <div className="container mx-auto text-center text-white flex flex-col justify-center items-center sm:text-left">
        <div className="w-80"> 
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Find your next stay
          </h1>
          <p className="text-base sm:text-lg lg:text-xl mb-8">
            Search low prices on hotels for your dream vacation...
          </p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded">
            Explore Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
