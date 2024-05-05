import { useQuery } from "react-query";
import { useState } from "react";
import * as apiClient from "../api/api-client";
import LatestDestinationCard from "../components/LatestDestinationCard";
import TalkJSChat from "../components/TalkJSChat";
import { MessageOutlined } from "@ant-design/icons";
import AboutUs from "../components/AboutUs";
import Pagination from "../components/Pagination"; // Import Pagination component

const Home = () => {
  const [toggleChatBox, setToggleChatBox] = useState(false);
  const [bottomPage, setBottomPage] = useState(1); // State for managing current page for bottom row

  const { data: hotels } = useQuery("fetchQuery", () =>
    apiClient.fetchHotels()
  );

  const handleToggleChatBox = () => setToggleChatBox(!toggleChatBox);

  // Logic for pagination
  const bottomPageSize = 6; // Number of hotels per page for bottom row
  const bottomStartIndex = (bottomPage - 1) * bottomPageSize;
  const bottomRowHotels = hotels?.slice(2) || []; // Original declaration

  const visibleBottomHotels = bottomRowHotels.slice(bottomStartIndex, bottomStartIndex + bottomPageSize) || [];

  // Slice the first 2 hotels for top row
  const topRowHotels = hotels?.slice(0, 2) || [];

  return (
    <div className="space">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent destinations added by our hosts</p>
      <div className="grid gap-4 w-full">
        <div className="grid md:grid-cols-2 grid-cols-2 gap-20 mx-5 p-6">
          {topRowHotels.map((hotel, index) => (
            <LatestDestinationCard key={index} hotel={hotel} />
          ))}
        </div>
        {/* No pagination needed for top row */}
        <p>Latest destinations added by our hosts</p>
        <div className="grid md:grid-cols-3 gap-4">
          {visibleBottomHotels.map((hotel, index) => (
            <LatestDestinationCard key={index} hotel={hotel} />
          ))}
        </div>
        {/* Display pagination for bottom row if there are more hotels */}
        {bottomRowHotels.length > bottomPageSize && (
          <Pagination
            page={bottomPage}
            pages={Math.ceil(bottomRowHotels.length / bottomPageSize)}
            onPageChange={(newPage) => setBottomPage(newPage)}
          />
        )}
      </div>
      <AboutUs />
      <button
        className="flex items-center justify-center fixed right-[30px] bottom-[30px] w-[50px] h-[50px] z-50 bg-blue-400 rounded-full hover:opacity-80 transition-opacity"
        onClick={handleToggleChatBox}
      >
        <MessageOutlined />
      </button>
      {toggleChatBox && <TalkJSChat />}
    </div>
  );
};

export default Home;
