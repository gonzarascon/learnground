import React from 'react';
import { Box, Divider, Flex, Heading, Text } from '@chakra-ui/react';

const CreateCourseView = () => {
  return (
    <Flex direction="column" align="center" w="100%">
      <Box w="100%" maxW="600px" py="5">
        <Heading as="h4" fontSize="lg" color="gray.400" textAlign="center">
          Crear un nuevo curso
        </Heading>
        <Flex wrap="nowrap" align="center" justify="space-evenly">
          <Flex direction="column" align="center" w="100%" maxW="150px">
            <Flex
              bg="blue.200"
              rounded="100%"
              p="15px"
              color="white"
              w="50px"
              h="50px"
              justify="center"
              align="center"
            >
              <Text>1</Text>
            </Flex>
            <Text mt="3">Primer paso</Text>
          </Flex>
          <Divider orientation="horizontal" mx="5" maxW="200px" />
          <Flex direction="column" align="center" w="100%" maxW="150px">
            <Flex
              bg="gray.200"
              rounded="100%"
              p="15px"
              color="white"
              w="50px"
              h="50px"
              justify="center"
              align="center"
            >
              <Text>2</Text>
            </Flex>
            <Text color="gray.300">Segundo paso</Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default CreateCourseView;
