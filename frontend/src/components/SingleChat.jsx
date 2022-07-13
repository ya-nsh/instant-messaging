import { Box, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { ChatState } from '../context/ChatProvider';
import { IconButton, Spinner, useToast } from '@chakra-ui/react';
import { FormControl } from '@chakra-ui/form-control';
import { ArrowBackIcon } from '@chakra-ui/icons';
import Lottie from 'react-lottie';
import axios from 'axios';
import { getSender, getSenderFull } from '../config/ChatLogics';
import ProfileModal from './layout/ProfileModal';
import UpdateGroupChatModal from './layout/UpdateGroupChatModal';

function SingleChat({ fetchAgain, setFetchAgain }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [istyping, setIsTyping] = useState(false);
  const toast = useToast();

  const { selectedChat, setSelectedChat, user, notification, setNotification } =
    ChatState();

  const fetchMessages = () => {};
  const sendMessage = () => {};

  return (
    <>
      {selectedChat ? (
        <>
          <span className="pb-3 px-2 w-full flex justify-between items-center">
            <IconButton
              d={{ base: 'flex', md: 'none' }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat('')}
            />
            {messages &&
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal
                    fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              ))}
          </span>
          <div className="flex flex-col justify-end p-3 bg-[#f3efef] w-full h-full rounded-xl overflow-y-hidden border-black border-2">
            {loading ? (
              <Spinner
                size="xl"
                w={20}
                h={20}
                alignSelf="center"
                margin="auto"
              />
            ) : (
              <div className="messages">
                {/* TODO: Scroll */}
                {/* <ScrollableChat messages={messages} /> */}
              </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id="first-name"
              isRequired
              mt={3}
            >
              {istyping ? <div>{/* TODO: LOTTIE */}</div> : <></>}
              <Input
                variant="filled"
                bg="#E0E0E0"
                placeholder="Enter a message.."
                value={newMessage}
                // onChange={} -> TODO: IMPLEMENT TypingHandler
              />
            </FormControl>
          </div>
        </>
      ) : (
        // to get socket.io on same page
        <Box d="flex" alignItems="center" justifyContent="center" h="100%">
          <span className="text-3xl pb-3">
            Click on a user to start chatting
          </span>
        </Box>
      )}
    </>
  );
}

export default SingleChat;
