import React from 'react';
import { Flex, Heading } from '@chakra-ui/core';

const ChatRoom = () => {
  return (
    <Flex
      direction="column"
      bg="gray.100"
      roundedBottomRight="lg"
      roundedTopRight="lg"
      p="5"
    >
      <Heading>CHAT</Heading>
    </Flex>
  );
};

export default ChatRoom;
