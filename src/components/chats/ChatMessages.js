import React, { useEffect, useState } from 'react';

import MessageService from '../../services/message.service';
import { Message } from '../../models/message';

import Button from '../common/Button';

export default function ChatMessages({
  user,
  chat
}) {

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    let unsubscribe = null;

    if (chat) {
      unsubscribe = MessageService.subscribeToChatMessages(chat, (messages) => {
        // handle the messages
        setMessages(messages);
      });
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [chat]);

  async function onMessageFormSubmit(e) {
    e.preventDefault();
    setSending(true);
    try {
      await MessageService.createMessage(new Message({
        id: (new Date()).getTime() + '',
        message: message,
        chatId: chat.id,
        fromId: user.uid,
      }));

      setMessage('');
    } catch (err) {
      console.log(err);
      // TODO handle the error
    }
    setSending(false);
  }

  return (
    <div className='messages-card'>

      <div className='messages'>
        {
          messages.map(message =>
            <div key={message.id} className={
              (message.fromId !== user.uid) ? 'message-right' : 'message-left'
            }>
              <div className='message'>
                {message.message}
              </div>
            </div>
          )
        }
      </div>
      
      <form className='message-form' onSubmit={onMessageFormSubmit}>
        <div className="input-group mb-3">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            className="form-control"
          />
          <Button
            loading={sending}
            variant=''
            className="btn-outline-secondary"
            type="submit">
            +
          </Button>
        </div>
      </form>

    </div>
  )
}
