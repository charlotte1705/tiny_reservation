// import { Fragment } from "react";
import about1 from "../assets/about/about-1.jpg";
import about2 from "../assets/about/about-2.jpg";


const AboutUs = () => {
    return (
        <section className="aboutus-section spad">
            <div className="container">
                <div className="flex flex-wrap items-center">
                    <div className="w-full lg:w-1/2">
                        <div className="about-text">
                            <div className="section-title">
                                <span>About Us</span>
                                <h2>Intercontinental LA <br />Westlake Hotel</h2>
                            </div>
                            <p className="f-para">
                                Sona.com is a leading online accommodation site. We’re passionate about
                                travel. Every day, we inspire and reach millions of travelers across 90 local websites in 41
                                languages.
                            </p>
                            <p className="s-para">
                                So when it comes to booking the perfect hotel, vacation rental, resort,
                                apartment, guest house, or tree house, we’ve got you covered.
                            </p>
                            <a href="#" className=" primary-btn about-btn inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                                Read More
                            </a>

                        </div>
                    </div>
                    <div className="w-full lg:w-1/2">
                        <div className="about-pic flex flex-wrap">
                            <div className="w-1/2">
                                <img src={about1} alt="" className="w-full" />
                            </div>
                            <div className="w-1/2">
                                <img src={about2} alt="" className="w-full" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutUs;
