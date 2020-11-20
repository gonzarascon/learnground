import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Progress,
  Text,
} from '@chakra-ui/react';

const UserMedals = () => {
  return (
    <Box gridArea="medals" h="380px">
      <Heading as="h3" mb="5">
        Medallas obtenidas
      </Heading>
      <Grid
        border="1px solid"
        borderColor="gray.200"
        rounded="md"
        h="100%"
        p="3"
        templateColumns="repeat(auto-fill, minmax(75px, 1fr))"
        autoRows="75px"
        gap="20px"
        overflowY="auto"
        maxH="308px"
      >
        <Box h="75px" w="75px" rounded="100%" bg="gray.300"></Box>
        <Box h="75px" w="75px" rounded="100%" bg="gray.300"></Box>
        <Box h="75px" w="75px" rounded="100%" bg="gray.300"></Box>
        <Box h="75px" w="75px" rounded="100%" bg="gray.300"></Box>
        <Box h="75px" w="75px" rounded="100%" bg="gray.300"></Box>
        <Box h="75px" w="75px" rounded="100%" bg="gray.300"></Box>
        <Box h="75px" w="75px" rounded="100%" bg="gray.300"></Box>
        <Box h="75px" w="75px" rounded="100%" bg="gray.300"></Box>
        <Box h="75px" w="75px" rounded="100%" bg="gray.300"></Box>
      </Grid>
    </Box>
  );
};

export default UserMedals;
