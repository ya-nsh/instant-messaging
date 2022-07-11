import React, { useState } from 'react';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  Tooltip,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  MenuItem
} from '@chakra-ui/react';
import { ChatState } from '../../context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';

function SideDrawer() {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const { user } = ChatState();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  return (
    <>
      <div className="flex justify-between items-center w-[99%] p-3 border-2 border-black m-2 rounded-md shadow-xl">
        <Tooltip label="Search for users to chat" hasArrow placement="bottom">
          <Button variant="ghost">
            <i className="fas fa-search"></i>
            <p className=" hidden sm:block px-4">Search User</p>
          </Button>
        </Tooltip>

        <span className="text-2xl">Instant-messenger</span>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon m={1} fontSize="2xl" />
            </MenuButton>
            {/* MenuList Functionality */}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                name={user.name}
                cursor="pointer"
                src={user.pic}
              />
            </MenuButton>
            <MenuList className="border-2 border-black">
              <MenuItem>
                <ProfileModal user={user}>
                  <p className="text-md font-semibold">My Profile</p>
                </ProfileModal>
              </MenuItem>
              <hr />
              <MenuItem onClick={handleLogout}>
                <p className="text-md font-semibold">Logout</p>
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </>
  );
}

export default SideDrawer;
