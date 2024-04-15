import React, { useEffect } from 'react';
import Talk from 'talkjs';


function TalkJSChat() {
    useEffect(() => {
        Talk.ready.then(() => {
            const me = new Talk.User({
                id: '10', // Replace with your user ID
                name: 'client', // Replace with your name
                email: 'client@gmail.com', // Replace with your email
                photoUrl: 'https://your-photo-url.jpg/', // Replace with your photo URL
                welcomeMessage: 'Hey there! How can I help you?', // Optional welcome message
            });

            const admin = new Talk.User({
                id: '20', // Replace with your user ID
                name: 'Admin', // Replace with your name
                email: 'admin@gmail.com', // Replace with your email
                photoUrl: 'https://your-photo-url.jpg/', // Replace with your photo URL
                welcomeMessage: 'Admin here?', // Optional welcome message
            });

            const session = new Talk.Session({
                appId: 'tG5wFYEs',
                me: me,
            });

            const conversation = session.getOrCreateConversation(Talk.oneOnOneId(me, admin));
            conversation.setParticipant(me);
            conversation.setParticipant(admin);

            const inbox = session.createInbox({ selected: conversation });
            const container = document.getElementById('talkjs-container');
            if (container) {
                inbox.mount(container);
            }
        });
    }, []);

    return <div id="talkjs-container" style={{ height: '300px' }}></div>;
}

export default TalkJSChat;
