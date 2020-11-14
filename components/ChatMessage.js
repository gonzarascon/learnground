import PropTypes from 'prop-types';
import React from 'react';
import { Box, Flex, Text, Heading } from '@chakra-ui/react';

const ChatMessage = ({ owned = false, hasBadge = false }) => {
  return (
    <Box
      maxW="95%"
      alignSelf={owned ? 'flex-end' : 'flex-start'}
      mb="5"
      color={owned ? 'gray.50' : 'black'}
      bg={owned ? 'blue.400' : 'gray.400'}
      p="5"
      rounded="md"
    >
      <Flex direction="row" wrap="nowrap" align="center" mb="2">
        {/**
         * TODO: Add badge logic
         */}
        {hasBadge && (
          <Box w="15px" h="15px" bg="teal.300" rounded="md" mr="3"></Box>
        )}
        <Heading as="h4" size="md">
          Dan Avramov
        </Heading>
      </Flex>
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
        quisquam, id mollitia quos laborum et?
      </Text>
    </Box>
  );
};

ChatMessage.propTypes = {
  hasBadge: PropTypes.bool,
  owned: PropTypes.bool,
};

export default ChatMessage;
