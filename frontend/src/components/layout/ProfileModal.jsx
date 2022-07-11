import React from 'react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Image
} from '@chakra-ui/react';

import { ViewIcon } from '@chakra-ui/icons';

function ProfileModal({ user, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: 'flex' }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size="md" isCentered onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader className="text-center">{user?.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              className="m-auto my-12"
              borderRadius="full"
              boxSize="150px"
              src={user?.pic}
              alt={user?.name}
            />
            <p className=" text-md font-semibold text-center">
              Email: {user?.email}
            </p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProfileModal;
