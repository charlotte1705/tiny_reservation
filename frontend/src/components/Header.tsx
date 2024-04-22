import * as React from 'react';
import { Link } from "react-router-dom";
import { Typography } from "antd";
import { PhoneOutlined, MailOutlined } from "@ant-design/icons";
import logoImage from "../assets/TinyReservationLogo.png";
import CustomizedMenus from "./CustomizedMenus"; // Import CustomizedMenus component
import { useAppContext } from "../contexts/AppContext"; // Import useAppContext hook

import "../style/header.css";
import "../css/bootstrap.min.css";
import "../css/font-awesome.min.css";
import "../css/elegant-icons.css";
import "../css/flaticon.css";
import "../css/owl.carousel.min.css";
import "../css/nice-select.css";
import "../css/jquery-ui.min.css";
import "../css/magnific-popup.css";
import "../css/slicknav.min.css";

const { Text } = Typography;

const Header = () => {
  const [activeLink, setActiveLink] = React.useState<string>('');
  const { isLoggedIn } = useAppContext(); // Use isLoggedIn state from context

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
  };

  return (
    <>
    
      <header className="header-section">
        <div className="menu-item">
          <div className="container">
            <div className="row">
              <div className="col-2 h-16 flex items-center">
                <div className="logo">
                  <Link to="/">
                    <img src={logoImage} alt="Logo" className="w-20 h-auto mt-3" />
                  </Link>
                </div>
              </div>

              <div className="col-lg-10">
                <div className="nav-menu">
                  <nav className="mainmenu flex">
                    <ul className="flex">
                      <li className={activeLink === '/' ? 'active' : ''}>
                        <Link to="/" className="no-underline" onClick={() => handleLinkClick('/')}>
                          Home
                        </Link>
                      </li>


                      <li className={activeLink === '/rooms' ? 'active' : ''}>
                        <Link to="/rooms" className="no-underline" onClick={() => handleLinkClick('/rooms')}>
                          Rooms
                        </Link>
                      </li>
                      <li className={activeLink === '/about-us' ? 'active' : ''}>
                        <Link to="/about-us" className="no-underline" onClick={() => handleLinkClick('/about-us')}>
                          About Us
                        </Link>
                      </li>
                      <li className={activeLink === '/pages' ? 'active' : ''}>
                        <Link to="/pages" className="no-underline" onClick={() => handleLinkClick('/pages')}>
                          Pages
                          <ul className="dropdown">
                            <li>
                              <Link to="/room-details" className="no-underline">Room Details</Link>
                            </li>
                          </ul>
                        </Link>
                      </li>
                      <li className={activeLink === '/contact-us' ? 'active' : ''}>
                        <Link to="/contact-us" className="no-underline" onClick={() => handleLinkClick('/contact-us')}>
                          Contact
                        </Link>
                      </li>
                    </ul>
                  </nav>
                  <div className="nav-right search-switch">

                    {isLoggedIn ? (
                      <CustomizedMenus />
                    ) : (
                      <Link to="/sign-in" className="no-underline">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Login
                        </button>
                      </Link>
                    )}
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
