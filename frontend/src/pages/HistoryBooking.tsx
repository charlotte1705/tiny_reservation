import { useQuery } from "react-query";
import { fetchHistoryBookings } from "../api/api-client";
// import { useMutation, useQueryClient } from "react-query";

const HistoryBooking = () => {
    const { data: hotels } = useQuery(
        "fetchHistoryBookings",
        fetchHistoryBookings
    );

    if (!hotels || hotels.length === 0) {
        return <span>No bookings found</span>;
    }

    return (
        <div className="space-y-5">
            <h1 className="text-3xl font-bold">History Bookings</h1>
            {hotels.map((hotel) => (
                <div key={hotel._id} className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] border border-slate-300 rounded-lg p-8 gap-5">
                    <div className="lg:w-full lg:h-[250px]">
                        <img
                            src={hotel.imageUrls[0]}
                            className="w-full h-full object-cover object-center"
                        />
                    </div>
                    <div className="flex flex-col gap-4 overflow-y-auto max-h-[300px]">
                        <div className="text-2xl font-bold">
                            {hotel.name}
                            <div className="text-xs font-normal">
                                {hotel.city}, {hotel.country}
                            </div>
                        </div>
                        {hotel.bookings.map((booking) => (
                            <div key={booking._id} className="border border-gray-200 p-4 rounded-lg">
                                <div className="flex justify-between">
                                    <div className="text-xl font-semibold">{booking.firstName} {booking.lastName}</div>
                                    <div className="font-bold">Price: ${booking.totalCost}</div>
                                </div>
                                <div className="flex justify-between">
                                    <div>Check-in: {new Date(booking.checkIn).toLocaleDateString()}</div>
                                    <div>Check-out: {new Date(booking.checkOut).toLocaleDateString()}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default HistoryBooking;