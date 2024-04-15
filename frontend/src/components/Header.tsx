import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn, role } = useAppContext();
  
  return (
    <div className="bg-gradient-to-r from-pink-300 to-purple-300 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">TinyReservation.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              {role === 'user' && <Link
                className="flex items-center text-white px-3 font-bold hover:bg-pink-400 rounded-md"
                to="/my-bookings"
              >
                My Bookings
              </Link>
              }
              {role !== 'user' &&<Link
                className="flex items-center text-white px-3 font-bold hover:bg-pink-400 rounded-md"
                to="/my-hotels"
              >
                My Hotels
              </Link>
              }
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-pink-600 px-3 font-bold hover:bg-gray-100 rounded-md"
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
