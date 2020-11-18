import React from 'react';
import { Box, Heading, Icon, List, ListItem, Text } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';

const ClassList = () => {
  return (
    <Box position="absolute" top="120px" left="25px">
      <Heading as="h3" fontSize="lg">
        Lista de clases
      </Heading>
      <List maxW="200px">
        <ListItem
          d="flex"
          alignItems="center"
          bg="blue.200"
          _hover={{ backgroundColor: 'gray.100', color: 'black' }}
          p="2"
          rounded="md"
          cursor="pointer"
          mb="2"
          title="Clase 1: Configuracion del entorno"
          color="white"
        >
          {/* color="green.300" if not active */}
          <CheckIcon mr="2" color="currentColor" />
          <Text isTruncated>Clase 1: Configuracion del entorno</Text>
        </ListItem>
        <ListItem
          d="flex"
          alignItems="center"
          _hover={{ backgroundColor: 'gray.100' }}
          p="2"
          rounded="md"
          cursor="pointer"
        >
          <Icon viewBox="0 0 200 200" color="green.300" mr="2">
            <path
              strokeWidth="20px"
              stroke="currentColor"
              fill="transparent"
              d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
            />
          </Icon>
          <Text isTruncated>Item 1</Text>
        </ListItem>
      </List>
    </Box>
  );
};

export default ClassList;
