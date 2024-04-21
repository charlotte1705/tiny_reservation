import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import AddHotel from "./pages/AddHotel"; // Import AddHotel component
import MyHotels from "./pages/MyHotels"; // Import MyHotels component
import UpdateHotel from "./pages/UpdateHotel"; // Import UpdateHotel component
import Search from "./pages/Search"; // Import Search component
import Detail from "./pages/Detail"; // Import Detail component
import Booking from "./pages/Booking"; // Import Booking component
import Home from "./pages/Home";
import { GoogleOAuthProvider } from '@react-oauth/google'; // Import GoogleOAuthProvider
import { useAppContext } from "./contexts/AppContext";
import MyBookings from "./pages/MyBookings";
import AboutUs from "./components/AboutUs"
import ContactUs from "./pages/ContactUs";

const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <GoogleOAuthProvider clientId="418140660178-4llvtgne2b4tqimo2op4of2bjf2ddq37.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/contact-us"
            element={
              <Layout>
                <ContactUs />
              </Layout>
            }
          />
          <Route
            path="/search"
            element={
              <Layout>
                <Search />
              </Layout>
            }
          />
          <Route
            path="/about-us"
            element={
              <Layout>
                <AboutUs />
              </Layout>
            }
          />

          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />

          <Route
            path="/detail/:hotelId"
            element={
              <Layout>
                <Detail />
              </Layout>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Layout>
                <SignIn />
              </Layout>
            }
          />

          {isLoggedIn && (
            <>

              <Route
                path="/hotel/:hotelId/booking"
                element={
                  <Layout>
                    <Booking />
                  </Layout>
                }
              />
              <Route
                path="/add-hotel"
                element={
                  <Layout>
                    <AddHotel />
                  </Layout>
                }
              />
              <Route
                path="/update-hotel/:hotelId"
                element={
                  <Layout>
                    <UpdateHotel />
                  </Layout>
                }
              />
              <Route
                path="/my-hotels"
                element={
                  <Layout>
                    <MyHotels />
                  </Layout>
                }
              />
              <Route
                path="/my-bookings"
                element={
                  <Layout>
                    <MyBookings />
                  </Layout>
                }
              />
            </>
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
