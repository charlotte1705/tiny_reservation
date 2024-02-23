import { Link } from "react-router-dom";

const Header = () => {

  return (
    <div className="bg-purple-300 py-10">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-black font-bold tracking-tight">
          <Link to="/">TinyReservation.com</Link>
        </span>
        <span className="flex space-x-2">
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100">
              Sign In
            </Link>
        </span>
      </div>
    </div>
  );
};

export default Header;