import React from "react";

const Hero = () => {
  return (
    <div className="bg-gray-300 py-10">
      <div className="container mx-auto flex flex-col justify-center items-center gap-2 text-center">
        <h1 className="text-5xl text-black font-bold mb-4">
          Find your next stay
        </h1>
        <p className="text-2xl text-black mb-8">
          Search low prices on hotels for your dream vacation...
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Explore Now
        </button>
      </div>
    </div>
  );
};

export default Hero;
