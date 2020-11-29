import React from 'react';
import { DemoLayout } from '@/components';
import { Button, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { MoonIcon } from '@chakra-ui/icons';

function GamificadoCourse() {
  return (
    <DemoLayout>
      <Flex direction="column" align="center" justify="center" minH="80vh">
        <Heading as="h3" textAlign="center" maxW="80%" fontSize="3xl">
          Terminaste de editar:{' '}
          <Text as="i" color="gray.700">
            Master en CSS: Responsive, SASS, Flexbox, Grid y Bootstrap 4
          </Text>
        </Heading>
        <Button colorScheme="green" mt="10" fontSize="xl" w="100%" maxW="200px">
          Ver curso
        </Button>
        <Flex wrap="nowrap" w="100%" maxW="200px" justify="space-evenly" mt="5">
          <IconButton colorScheme="blue" icon={<MoonIcon />} rounded="3xl" />
          <IconButton colorScheme="blue" icon={<MoonIcon />} rounded="3xl" />
          <IconButton colorScheme="blue" icon={<MoonIcon />} rounded="3xl" />
        </Flex>
      </Flex>
    </DemoLayout>
  );
}

export default GamificadoCourse;
