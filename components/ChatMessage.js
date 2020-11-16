import PropTypes from 'prop-types';
import React from 'react';
import { motion } from 'framer-motion';
import { Box, Flex, Text, Heading } from '@chakra-ui/react';

const MotionBox = motion.custom(Box);

const ChatMessage = ({ owned = false, hasBadge = false, id = '' }) => {
  return (
    <MotionBox
      layoutId={id}
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
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
      <Text fontSize="xs" fontStyle="oblique" textAlign="right" mt={1}>
        20/11/20 13:30
      </Text>
    </MotionBox>
  );
};

ChatMessage.propTypes = {
  hasBadge: PropTypes.bool,
  id: PropTypes.string,
  owned: PropTypes.bool,
};

export default ChatMessage;
