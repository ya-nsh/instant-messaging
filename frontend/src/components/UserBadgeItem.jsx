import { CloseIcon } from '@chakra-ui/icons';
import { Badge } from '@chakra-ui/layout';

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge
      px={3}
      py={2}
      borderRadius="lg"
      m={1}
      mb={3}
      variant="solid"
      fontSize={12}
      colorScheme="purple"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.name}
      {admin === user._id && <span> (Admin)</span>}
      <CloseIcon pl={1} ml={3} />
    </Badge>
  );
};

export default UserBadgeItem;
