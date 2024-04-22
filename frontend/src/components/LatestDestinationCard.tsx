import { Link } from "react-router-dom";
import { HotelType } from "../../../backend/src/shared/types";

type Props = {
  hotel: HotelType;
};

const LatestDestinationCard = ({ hotel }: Props) => {
  return (
    <div className="max-w-md ">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <Link
          to={`/detail/${hotel._id}`}
          className="block overflow-hidden rounded-t-lg"
        >
          <img
            src={hotel.imageUrls[0]}
            alt={hotel.name}
            className="w-full h-48 object-cover object-center"
          />
        </Link>

        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 hover:text-blue-500 transition duration-300">
            <Link
              to={`/detail/${hotel._id}`}
              className="hover:underline"
            >
              {hotel.name}
            </Link>
          </h2>
          <p className="text-gray-600 text-sm mb-2">
            {hotel.city} - Limit: {hotel.limit}
          </p>
          <p className="text-gray-700 text-lg mb-2">
            <span className="hover:text-blue-500 transition duration-300 font-semibold">${hotel.pricePerNight}</span>/night
          </p>
          <div className="text-gray-700 text-lg mb-2">
            <p>Adults: {hotel.adultCount}</p>
            <p>Children: {hotel.childCount}</p>
          </div>
        </div>

        <div className="bg-gray-100 text-center py-2">
          <Link
            to={`/detail/${hotel._id}`}
            className="text-blue-500 hover:underline hover:text-blue-600"
          >
            <span className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md transition duration-300 hover:bg-blue-600">
              View Details
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LatestDestinationCard;
