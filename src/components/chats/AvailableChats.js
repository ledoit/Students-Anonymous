import React from 'react';

import ChatService from '../../services/chat.service';
import { Chat } from '../../models/chat';

import Button from '../common/Button';

export default function AvailableChats({
  user,
  profiles,
  chats,
}) {

  function getAvailableProfiles() {
    return profiles.filter((profile) => {
      return profile.id !== user.uid;
    }).filter((profile) => {
      return !chats.find((chat) => chat.users.includes(profile.id));
    });
  }

  async function createChatWith(profile) {
    await ChatService.createChat(new Chat({
      users: [user.uid, profile.id],
    }));
  }

  return (
    <div className=''>

      {
        getAvailableProfiles().map(profile =>
          <div key={profile.id} className="profile-row">

            <div className='profile-holder'>
              <img src={profile.imageUrl} alt="profile" />

              <div className='ms-3'>
                {profile.name} {profile.surname}
              </div>
            </div>

            <div>
              <Button onClick={() => createChatWith(profile)}>+</Button>
            </div>
          </div>
        )
      }

    </div>
  )
}
