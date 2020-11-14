import React from 'react';
import {
  Box,
  Flex,
  Heading,
  InputGroup,
  Input,
  InputRightAddon,
  Button,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { ChatMessage } from '@/components';

const ChatRoom = () => {
  return (
    <Flex
      bg="gray.100"
      roundedBottomRight="lg"
      roundedTopRight="lg"
      direction="column"
    >
      <Box as="header" borderBottom="1px solid" borderColor="gray.400" p="5">
        <Heading as="h3" size="md">
          Chat de la clase
        </Heading>
      </Box>
      <Flex
        direction="column"
        p="5"
        overflowY="auto"
        overflowX="hidden"
        height="100%"
      >
        <ChatMessage hasBadge={true} />
        <ChatMessage owned={true} />
      </Flex>
      <InputGroup rounded="0">
        <Input
          type="text"
          borderTopLeftRadius="0"
          borderBottomLeftRadius="0"
          placeholder="Escribe tu mensaje"
        />
        <InputRightAddon
          borderTopRightRadius="0"
          children={
            <Button
              w="100%"
              borderLeftRadius="0"
              colorScheme="blue"
              borderTopRightRadius="0"
              rightIcon={<ChevronRightIcon />}
            >
              Enviar
            </Button>
          }
          px="0"
        />
      </InputGroup>
    </Flex>
  );
};

export default ChatRoom;
