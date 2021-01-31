import React from 'react';
import {
  Box,
  Flex,
  Heading,
  InputGroup,
  Input,
  InputRightAddon,
  Button,
  Text,
} from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';

import { useCourseStore } from '@/lib/store';
import { ChatMessage } from '@/components';

const ChatRoom = () => {
  const chatMessages = useCourseStore((state) => state.chatMessages);
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
        {!chatMessages && (
          <Text fontSize="sm" color="gray.500">
            Aún no hay mensajes en el chat de esta clase. ¡Se el primero!
          </Text>
        )}
        <AnimatePresence>
          {chatMessages && (
            <AnimateSharedLayout>
              <ChatMessage hasBadge={true} id="message_1" />
              <ChatMessage owned={true} id="message_2" />
            </AnimateSharedLayout>
          )}
        </AnimatePresence>
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
