import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Progress,
  Text,
} from '@chakra-ui/react';

const UserInformation = () => {
  return (
    <Box gridArea="info" maxW="441px">
      <Flex wrap="nowrap" align="center">
        <Avatar name="Usuario Prueba" size="xl" />
        <Box ml="5">
          <Heading as="h3">Usuario Prueba</Heading>
          <Flex wrap="nowrap" align="center">
            <Box bg="green.200" rounded="md" mr="3" w="15px" h="15px"></Box>
            <Text>Cazador de conocimiento</Text>
          </Flex>
        </Box>
      </Flex>
      <Flex wrap="nowrap" align="center" mt="10">
        <Flex direction="column" align="center" mr="5" color="gray.700">
          <Text fontSize="sm" textAlign="center">
            NIVEL
          </Text>
          <Heading>2</Heading>
        </Flex>
        <Progress
          colorScheme="green"
          height="35px"
          value={25}
          min={0}
          max={100}
          w="100%"
          rounded="2xl"
        />
      </Flex>
      <Flex wrap="nowrap" align="center" mt="10" justify="space-between">
        <Flex align="center" wrap="nowrap">
          <Box bg="green.200" h="30px" w="30px" rounded="100%" mr="5"></Box>
          <Text fontSize="xl">200</Text>
        </Flex>
        <Button colorScheme="purple">Visitar tienda</Button>
      </Flex>
    </Box>
  );
};

export default UserInformation;
