import React from "react";
import heroImage1 from '../assets/hero/hero-1.jpg';
import heroImage2 from '../assets/hero/hero-2.jpg';
import heroImage3 from '../assets/hero/hero-3.jpg';
import SearchBar from "./SearchBar";

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

    // <div className="hero-section relative w-full h-auto bg-cover bg-center" style={{ backgroundImage: `url(${heroImage1})`, paddingTop: '200px', paddingBottom: '200px' }}>
    //   <div className="container mx-auto">
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
    //       <div className="hero-text">
    //         <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold mb-8">Sona A Luxury Hotel</h1>
    //         <p className="text-lg text-white mb-8">Here are the best hotel booking sites, including recommendations for international travel and for finding low-priced hotel rooms.</p>
    //         <a href="#" className="primary-btn">Discover Now</a>
    //       </div>
    //     </div>
    //   </div>
    // </div>

  );
};

export default Hero;
