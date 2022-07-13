import { Box } from '@chakra-ui/layout';
import { ChatState } from '../../context/ChatProvider';

import SingleChat from '../SingleChat';

const Chatbox = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat } = ChatState();

  return (
    <div
      className={`${
        selectedChat ? 'flex' : 'none'
      } md:flex flex-col items-center p-4 bg-white w-1/2 md:w-full rounded-lg border-2 border-black m-2 h-[85vh] shadow-md`}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
    </div>
  );
};

export default Chatbox;
