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
