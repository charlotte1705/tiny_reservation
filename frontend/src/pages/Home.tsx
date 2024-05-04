import { useQuery } from "react-query";
import { useState } from "react";
import * as apiClient from "../api/api-client";
import LatestDestinationCard from "../components/LatestDestinationCard";
import TalkJSChat from "../components/TalkJSChat";
import { MessageOutlined } from "@ant-design/icons";
import AboutUs from "../components/AboutUs";

const Home = () => {
  const [toggleChatBox, setToggleChatBox] = useState(false);

  const { data: hotels } = useQuery("fetchQuery", () =>
    apiClient.fetchHotels()
  );  

  const handleToggleChatBox = () => setToggleChatBox(!toggleChatBox);

  const topRowHotels = hotels?.slice(0, 2) || [];
  const bottomRowHotels = hotels?.slice(2) || [];

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
        <p>Latest estinations added by our hosts</p>
        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowHotels.map((hotel, index) => (
            <LatestDestinationCard key={index} hotel={hotel} />
          ))}
        </div>
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