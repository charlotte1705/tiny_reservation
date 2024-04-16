import React, { useEffect } from "react";
import Talk from "talkjs";
import { useQuery } from "react-query";
import * as apiClient from "../api/api-client";

function TalkJSChat() {
  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  useEffect(() => {
    if (!currentUser?._id) return;

    Talk.ready.then(() => {
      const me = new Talk.User({
        id: currentUser?._id, // Replace with your user ID
        name: `${currentUser.firstName} ${currentUser.lastName}`, // Replace with your name
        email: currentUser.email, // Replace with your email
        photoUrl: "https://your-photo-url.jpg/", // Replace with your photo URL
        welcomeMessage: "Hey there! How can I help you?", // Optional welcome message
      });

      const admin = new Talk.User({
        id: "20", // Replace with your user ID
        name: "Admin", // Replace with your name
        email: "admin@gmail.com", // Replace with your email
        photoUrl: "https://your-photo-url.jpg/", // Replace with your photo URL
        welcomeMessage: "Admin here?", // Optional welcome message
      });

      const session = new Talk.Session({
        appId: "tG5wFYEs",
        me: me,
      });

      const conversation = session.getOrCreateConversation(
        Talk.oneOnOneId(me, admin)
      );
      conversation.setParticipant(me);
      conversation.setParticipant(admin);

      const inbox = session.createInbox({ selected: conversation });
      const container = document.getElementById("talkjs-container");
      if (container) {
        inbox.mount(container);
      }
    });
  }, [currentUser?._id]);

  return (
    <div
      id="talkjs-container"
      style={{
        height: "500px",
        position: "fixed",
        zIndex: 999,
        bottom: "30px",
        right: "90px",
      }}
    ></div>
  );
}

export default TalkJSChat;
