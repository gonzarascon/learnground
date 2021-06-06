import React, { useState, useEffect, useRef } from 'react';
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

import { ChatMessage } from '@/components';
import { useContentStore, useProfileStore, useUserStore } from '@/lib/store';
import {
  registerEvent,
  sendMessageToChat,
  useChatRoom,
} from '@/lib/firebase/dataFunctions';
import { EventsEnum } from '@/lib/events';

const ChatRoom = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRepliying, setIsRepliying] = useState(null);
  const messagesContainer = useRef(null);
  const selectedColor = useProfileStore((state) => state.selectedColor);
  const chatId = useContentStore((state) => state.chatId);
  const [uid, username] = useUserStore((state) => [
    state.uid,
    state.user.username,
  ]);

  /**
   *
   * @param {firebase.default.firestore.QuerySnapshot} snapshot
   */
  const fetchData = async (snapshot) => {
    const docsArr = [];
    if (!snapshot.empty) {
      for (let i in snapshot.docs) {
        const doc = snapshot.docs[i];
        if (doc.exists) {
          docsArr.push({ ...doc.data(), uid: doc.id });
        }
      }

      setChatMessages(docsArr);
    }
  };

  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Enter' && inputMessage !== '') {
        sendMessage();
        event.preventDefault();
        // callMyFunction();
      }
    };
    document.addEventListener('keypress', listener);
    return () => {
      document.removeEventListener('keypress', listener);
    };
  }, []);

  useEffect(() => {
    if (chatId) {
      const unsubscribe = useChatRoom(`/chats/${chatId}/messages`, fetchData);

      return () => unsubscribe();
    }
  }, [chatId]);

  useEffect(() => {
    if (chatMessages.length && messagesContainer) {
      const container = messagesContainer.current;

      container.scrollTop = container.scrollHeight;
    }
  }, [chatMessages, messagesContainer]);

  const sendMessage = () => {
    sendMessageToChat({
      chatUid: chatId,
      message: {
        repliying: isRepliying ? isRepliying : '',
        text: inputMessage,
        user: { uid, username },
      },
    });
    registerEvent(EventsEnum.SEND_MESSAGE, {
      [EventsEnum.SEND_MESSAGE]: inputMessage,
    });
    setInputMessage('');
  };

  return (
    <Flex
      bg="gray.100"
      roundedBottomRight="lg"
      roundedTopRight="lg"
      direction="column"
      w="100%"
      maxW="30%"
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
        maxH="70vh"
        ref={messagesContainer}
      >
        {!chatMessages.length && (
          <Text fontSize="sm" color="gray.500">
            Aún no hay mensajes en el chat de esta clase. ¡Se el primero!
          </Text>
        )}
        <AnimatePresence>
          {chatMessages.length > 0 && (
            <AnimateSharedLayout>
              {chatMessages.map((message) => {
                const isOwned = message.user.uid === uid;
                return (
                  <ChatMessage
                    owned={isOwned}
                    key={message.text}
                    id={`messages_${message.uid}`}
                    message={message.text}
                    createdAt={message.createdAt}
                    username={message.user.username}
                    usernameColor={
                      isOwned && selectedColor ? selectedColor : 'black'
                    }
                  />
                );
              })}
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
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <InputRightAddon borderTopRightRadius="0" px="0">
          <Button
            w="100%"
            borderLeftRadius="0"
            colorScheme="blue"
            borderTopRightRadius="0"
            rightIcon={<ChevronRightIcon />}
            disabled={inputMessage === ''}
            onClick={sendMessage}
          >
            Enviar
          </Button>
        </InputRightAddon>
      </InputGroup>
    </Flex>
  );
};

export default ChatRoom;
