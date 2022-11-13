import React, { useEffect, useState } from 'react'

import './Chats.css';

import ProfileService from '../../services/profile.service';
import ChatService from '../../services/chat.service';

// import components from the components folder
import AvailableChats from './AvailableChats';
import ChatSidebar from './ChatsSidebar';
import ChatMessages from './ChatMessages';

export default function ChatsPage({ user }) {

  const [profiles, setProfiles] = useState([]);
  const [chats, setChats] = useState([]);
  const [chat, setChat] = useState(null);

  // on component did mount
  useEffect(() => {
    fetchProfiles();

    const unsubscribe = ChatService.subscribeToUserChats(user, (chats) => {
      // get my chats here when they change
      setChats(chats);
    });

    // component will unmount
    return () => unsubscribe();
  }, []);

  async function fetchProfiles() {
    try {
      const profiles = await ProfileService.fetchProfiles();
      setProfiles(profiles);
    } catch (err) {
      // TODO handle error
    }
  }

  return (
    <div className='container my-4'>
      <h1>Chats: {user.email} </h1>

      <div>
        <AvailableChats
          profiles={profiles}
          user={user}
          chats={chats} />

      </div>

      <div className='row mt-5'>
        <div className='col-4'>
          <ChatSidebar
            profiles={profiles}
            user={user}
            chats={chats}
            chat={chat}
            onChatSelected={(chat) => setChat(chat)}
          />
        </div>

        <div className='col-8'>
          <ChatMessages
            user={user}
            chat={chat}
          />
        </div>
      </div>
    </div>
  )
}
