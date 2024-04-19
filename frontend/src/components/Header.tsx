import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn, role } = useAppContext();

  return (
    <div className="bg-gradient-to-r from-rose-200 to-lavender-200 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-3xl text-black font-bold tracking-tight">
          <Link to="/" className="text-black">
            TinyReservation.com
          </Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              {role === "user" && (
                <Link
                  className="flex items-center text-black px-3 font-bold hover:bg-rose-300 rounded-md"
                  to="/my-bookings"
                >
                  My Bookings
                </Link>
              )}
              {role !== "user" && (
                <Link
                  className="flex items-center text-black px-3 font-bold hover:bg-rose-300 rounded-md"
                  to="/my-hotels"
                >
                  My Hotels
                </Link>
              )}
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-pink-300 items-center text-black px-3 py-1 font-bold hover:bg-gray-100 rounded-md"
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;

// import React from "react";
// import { Link } from "react-router-dom";
// import { useAppContext } from "../contexts/AppContext";
// import SignOutButton from "./SignOutButton";
// import { Typography } from "antd";
// import { PhoneOutlined, MailOutlined } from "@ant-design/icons";

// import "../style/style.css";
// import "../css/bootstrap.min.css";
// import "../css/font-awesome.min.css";
// import "../css/elegant-icons.css";
// import "../css/flaticon.css";
// import "../css/owl.carousel.min.css";
// import "../css/nice-select.css";
// import "../css/jquery-ui.min.css";
// import "../css/magnific-popup.css";
// import "../css/slicknav.min.css";

// const { Text } = Typography;

// const Header = () => {
//   const { isLoggedIn, role } = useAppContext();

//   return (
//     <>
//       {/* Offcanvas Menu Section Begin */}
//       <div className="offcanvas-menu-overlay"></div>
//       <div className="canvas-open">
//         <i className="icon_menu"></i>
//       </div>
//       <div className="offcanvas-menu-wrapper">
//         <div className="canvas-close">
//           <i className="icon_close"></i>
//         </div>
//         <div className="search-icon  search-switch">
//           <i className="icon_search"></i>
//         </div>
//         <div className="header-configure-area">
//           <div className="language-option">
//             <img src="img/flag.jpg" alt="" />
//             <span>
//               EN <i className="fa fa-angle-down"></i>
//             </span>
//             <div className="flag-dropdown">
//               <ul>
//                 <li>
//                   <a href="#">Zi</a>
//                 </li>
//                 <li>
//                   <a href="#">Fr</a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           {isLoggedIn ? (
//             <SignOutButton />
//           ) : (
//             <Link to="/sign-in" className="bk-btn">
//               Sign In
//             </Link>
//           )}
//         </div>
//         <nav className="mainmenu mobile-menu">
//           <ul>
//             <li className="active">
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/rooms">Rooms</Link>
//             </li>
//             <li>
//               <Link to="/about-us">About Us</Link>
//             </li>
//             <li>
//               <Link to="/pages">Pages</Link>
//               <ul className="dropdown">
//                 <li>
//                   <Link to="/room-details">Room Details</Link>
//                 </li>
//               </ul>
//             </li>
//             <li>
//               <Link to="/contact">Contact</Link>
//             </li>
//           </ul>
//         </nav>
//         <div id="mobile-menu-wrap"></div>
//         <div className="top-social">
//           <a href="#">
//             <i className="fa fa-facebook"></i>
//           </a>
//           <a href="#">
//             <i className="fa fa-twitter"></i>
//           </a>
//           <a href="#">
//             <i className="fa fa-tripadvisor"></i>
//           </a>
//           <a href="#">
//             <i className="fa fa-instagram"></i>
//           </a>
//         </div>
//         <ul className="top-widget">
//           <li>
//             <PhoneOutlined /> <Text>(12) 345 67890</Text>
//           </li>
//           <li>
//             <MailOutlined /> <Text>info.colorlib@gmail.com</Text>
//           </li>
//         </ul>
//       </div>
//       {/* Offcanvas Menu Section End */}

//       {/* Header Section Begin */}
//       <header className="header-section">
//         <div className="top-nav">
//           <div className="container">
//             <div className="row align-items-center">
//               {" "}
//               {/* Added align-items-center class */}
//               <div className="col-lg-6">
//                 <ul className="tn-left">
//                   <li>
//                     <i className="fa fa-phone"></i> (12) 345 67890
//                   </li>
//                   <li>
//                     <i className="fa fa-envelope"></i> info.colorlib@gmail.com
//                   </li>
//                 </ul>
//               </div>
//               <div className="col-lg-6 d-flex justify-content-end">
//                 {" "}
//                 {/* Added d-flex and justify-content-end classes */}
//                 <div className="tn-right">
//                   <div className="top-social">
//                     <a href="#">
//                       <i className="fa fa-facebook"></i>
//                     </a>
//                     <a href="#">
//                       <i className="fa fa-twitter"></i>
//                     </a>
//                     <a href="#">
//                       <i className="fa fa-tripadvisor"></i>
//                     </a>
//                     <a href="#">
//                       <i className="fa fa-instagram"></i>
//                     </a>
//                   </div>
//                   <div className="language-option">
//                     <img src="img/flag.jpg" alt="" />
//                     <span>
//                       EN <i className="fa fa-angle-down"></i>
//                     </span>
//                     <div className="flag-dropdown">
//                       <ul>
//                         <li>
//                           <a href="#">Zi</a>
//                         </li>
//                         <li>
//                           <a href="#">Fr</a>
//                         </li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="menu-item">
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-2">
//                 <div className="logo">
//                   <Link to="/">
//                     <img src="img/logo.png" alt="" />
//                   </Link>
//                 </div>
//               </div>
//               <div className="col-lg-10">
//                 <div className="nav-menu">
//                   <nav className="mainmenu">
//                     <ul>
//                       <li className="active">
//                         <Link to="/">Home</Link>
//                       </li>
//                       <li>
//                         <Link to="/rooms">Rooms</Link>
//                       </li>
//                       <li>
//                         <Link to="/about-us">About Us</Link>
//                       </li>
//                       <li>
//                         <Link to="/pages">Pages</Link>
//                         <ul className="dropdown">
//                           <li>
//                             <Link to="/room-details">Room Details</Link>
//                           </li>
//                         </ul>
//                       </li>
//                       <li>
//                         <Link to="/contact">Contact</Link>
//                       </li>
//                     </ul>
//                   </nav>
//                   <div className="nav-right search-switch">
//                     <i className="icon_search"></i>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>
//       {/* Header End */}
//     </>
//   );
// };

// export default Header;
