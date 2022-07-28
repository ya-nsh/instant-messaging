import React, { useEffect, useState } from 'react';
import { ChatState } from '../context/ChatProvider';
import { Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Stack, Text } from '@chakra-ui/layout';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';
import ChatLoading from './ChatLoading';
import { getSender } from '../config/ChatLogics';
import GroupChatModal from './layout/GroupChatModal';

function MyChats({ fetchAgain }) {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };

      const { data } = await axios.get('/api/chat', config);
      setChats(data);
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: 'Failed to Load the chats',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left'
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem('userInfo')));
    fetchChats();
  }, [fetchAgain]);

  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden border-2 border-black md:flex md:flex-col items-center m-2 p-4 h-[85vh]"
      d={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
      w={{ base: '100%', md: '31%' }}
    >
      <div className="flex flex-col lg:flex-row w-full justify-between items-center pb-4 px-4">
        My Chats
        <GroupChatModal>
          <Button d="flex" rightIcon={<AddIcon />}>
            New Group Chat
          </Button>
        </GroupChatModal>
      </div>

      <div className="flex flex-col bg-[#F8F8F8] w-full h-full rounded-md">
        {chats ? (
          <div className="overflow-y-auto h-full">
            {chats.map(chat => (
              <div
                className={`${
                  selectedChat === chat
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-100'
                } border-2 border-black shadow-md cursor-pointer px-3 py-2 rounded-lg my-3`}
                onClick={() => setSelectedChat(chat)}
                key={chat._id}
              >
                <span>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </span>
                {chat.latestMessage && (
                  <span fontSize="xs">
                    {/* <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + '...'
                      : chat.latestMessage.content} */}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <ChatLoading />
        )}
      </div>
    </div>
  );
}

export default MyChats;
