import PropTypes from 'prop-types';
import React from 'react';
import { motion } from 'framer-motion';
import { Box, Flex, Text, Heading, Skeleton } from '@chakra-ui/react';
import { format } from 'date-fns';

const MotionBox = motion.custom(Box);

const ChatMessage = ({
  owned = false,
  hasBadge = false,
  id = '',
  username,
  message,
  createdAt,
}) => {
  return (
    <MotionBox
      key={id}
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      maxW="95%"
      alignSelf={owned ? 'flex-end' : 'flex-start'}
      mb="5"
      color={owned ? 'gray.50' : 'black'}
      bg={owned ? 'blue.400' : 'gray.400'}
      p="5"
      rounded="md"
      className="chatMessage"
    >
      <Flex direction="row" wrap="nowrap" align="center" mb="2">
        {/**
         * TODO: Add badge logic
         */}
        {hasBadge && (
          <Box w="15px" h="15px" bg="teal.300" rounded="md" mr="3"></Box>
        )}
        <Heading as="h4" size="md">
          {username}
        </Heading>
      </Flex>
      <Text>{message}</Text>
      <Skeleton isLoaded={createdAt !== null} h="18px">
        <Text fontSize="xs" fontStyle="oblique" textAlign="right" mt={1}>
          {createdAt && format(new Date(createdAt.toDate()), 'dd/MM/yy HH:mm')}
        </Text>
      </Skeleton>
    </MotionBox>
  );
};

ChatMessage.propTypes = {
  hasBadge: PropTypes.bool,
  id: PropTypes.string,
  owned: PropTypes.bool,
  username: PropTypes.string,
  message: PropTypes.string,
  createdAt: PropTypes.string,
};

export default ChatMessage;
