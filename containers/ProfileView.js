import React from 'react';
import {
  Avatar,
  Box,
  Flex,
  Grid,
  Heading,
  Progress,
  Text,
} from '@chakra-ui/react';

const ProfileView = () => {
  return (
    <Grid
      templateColumns="1fr 1fr"
      templateRows="1fr 1fr"
      templateAreas={`"info medals" "taken created"`}
      as="section"
      p="10"
      gap="87px"
    >
      <Box gridArea="info">
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
            maxW="350px"
            colorScheme="green"
            height="35px"
            value={25}
            min={0}
            max={100}
            w="100%"
            rounded="2xl"
          />
        </Flex>
        <Flex wrap="nowrap" align="center" mt="10"></Flex>
      </Box>
    </Grid>
  );
};

export default ProfileView;
