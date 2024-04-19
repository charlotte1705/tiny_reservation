import React, { useEffect, useMemo } from "react";
import Talk from "talkjs";

function AdminChat({ id, randomId, profiles }) {
  const profile = useMemo(
    () => profiles.find((p) => p._id === id || p._id === randomId),
    [id, randomId, profiles]
  );

  useEffect(() => {
    Talk.ready.then(() => {
      const admin = new Talk.User({
        id: "20", // Replace with your admin user ID
        name: "Admin", // Replace with admin name
        email: "testuser@gmail.com", // Replace with admin email
        photoUrl: "https://your-photo-url.jpg/", // Replace with admin photo URL
        welcomeMessage: "Admin here?", // Optional welcome message
      });

      const client = new Talk.User({
        id: id || randomId, // Replace with your user ID
        name: `${profile.firstName} ${profile.lastName}`, // Replace with your name
        email: "client@gmail.com", // Replace with your email
        photoUrl: "https://your-photo-url.jpg/", // Replace with your photo URL
        welcomeMessage: "Hey there! How can I help you?", // Optional welcome message
      });

      const session = new Talk.Session({
        appId: "tG5wFYEs",
        me: admin,
      });

      const conversation = session.getOrCreateConversation(
        Talk.oneOnOneId(admin, client)
      );
      conversation.setParticipant(admin);
      conversation.setParticipant(client);

      const inbox = session.createInbox({ selected: conversation });
      const container = document.getElementById("admin-talkjs-container");
      if (container) {
        inbox.mount(container);
      }
    });
  }, [id]);

  return (
    <div
      id="admin-talkjs-container"
      className="fixed"
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

export default AdminChat;
