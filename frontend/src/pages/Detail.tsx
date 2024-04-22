import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api/api-client";
import { AiFillStar } from "react-icons/ai";
import GuestForm from "../forms/GuestForm/GuestForm";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Detail = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  if (!hotel) {
    return <></>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    adaptiveHeight: true
  };

  return (
    <div className="space-y-6">
      <Slider {...settings}>
        {hotel.imageUrls.map((image, index) => (
          <div key={index} className="h-[450px]">
            <img
              src={image}
              alt={hotel.name}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </Slider>

      <div className="flex flex-col mb-4">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold mr-4" style={{ marginRight: '430px' }}>{hotel.name}</h1>
          <span className="flex" style={{ marginLeft: '70px' }}>
            {Array.from({ length: hotel.starRating }).map((_, index) => (
              <AiFillStar key={index} className="fill-yellow-400" style={{ fontSize: '24px' }} />
            ))}
          </span>
        </div>

        <p className="text-3xl mt-2">
          <span className="font-semibold" style={{ color: '#dfa974' }}>{hotel.pricePerNight}$</span><span className="text-sm">/Pernight</span>
        </p>


        <div className="mt-4">
          <h3 className="text-xl font-semibold">Facilities:</h3>
          <ul className="list-disc ml-6">
            {hotel.facilities.map((facility, index) => (
              <li key={index}>{facility}</li>
            ))}
          </ul>
        </div>

        <p className="mt-4">
          <span className="font-bold text-black">Room Type:</span> {hotel.type}
        </p>
        <p className="mt-4">
          <span className="font-bold text-black">Limits:</span> {hotel.limit}
        </p>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
        <div className="whitespace-pre-line text-justify">{hotel.description}</div>

        <div className="h-fit">
          <GuestForm
            pricePerNight={hotel.pricePerNight}
            hotelId={hotel._id}
            limitNumber={hotel.limit}
          />
        </div>
      </div>

    </div>
  );
};

export default Detail;