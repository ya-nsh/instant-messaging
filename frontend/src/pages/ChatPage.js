import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ChatPage() {
  const [chats, setChats] = useState();
  const fetchChats = async () => {
    const { data } = await axios.get('/api/chat');
    setChats(data);
  };

  useEffect(() => {
    fetchChats();

    return () => {
      console.log('cleanup');
    };
  }, []);

  return (
    <div>
      {chats?.map(chat => {
        return <div key={chat._id}>{chat.chatName}</div>;
      })}
    </div>
  );
}
