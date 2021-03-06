import React, { useState, useEffect } from 'react';
import { ChatState } from '../context/ChatProvider';
import SideDrawer from '../components/layout/SideDrawer';
import MyChats from '../components/MyChats';
import ChatBox from '../components/layout/ChatBox';

export default function ChatPage() {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div className="w-full">
      {user && <SideDrawer />}
      <div className="flex justify-between w-full p-3 h-[90vh]">
        <div className="flex-[0.3] ">
          {user && <MyChats fetchAgain={fetchAgain} />}
        </div>
        <div className="flex-[0.7]">
          {user && (
            <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )}
        </div>
      </div>
    </div>
  );
}
