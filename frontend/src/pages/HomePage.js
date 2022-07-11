import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from '@chakra-ui/react';
import React from 'react';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) navigate('/chats');
  }, [navigate]);

  return (
    <Container maxW="xl" centerContent>
      <div className="p-5 bg-white w-full mt-20 mb-4 border-solid border-2 border-black rounded-lg">
        <h1 className="font-bold">Instant Messenger</h1>
      </div>
      <div className="bg-white w-full p-3 rounded-lg border-black border-2 text-black">
        <Tabs variant="soft-rounded" colorScheme="pink" align="center">
          <TabList className="mb-2">
            <Tab className="w-1/2">Login</Tab>
            <Tab className="w-1/2">Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Register />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </Container>
  );
}
