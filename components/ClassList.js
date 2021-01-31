import React from 'react';
import { useRouter } from 'next/router';
import { Box, Heading, Icon, List, ListItem, Text } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useCourseStore } from '@/lib/store';

const ClassList = () => {
  const router = useRouter();
  const query = router.query;
  const contents = useCourseStore((state) => state.contentsPreview) || [];

  return (
    <Box position="absolute" top="120px" left="25px">
      <Heading as="h3" fontSize="lg">
        Lista de clases
      </Heading>
      <List maxW="200px">
        {contents.map((content) => {
          const isActive = content.order.toString() === query['class-number'];

          return (
            <ListItem
              d="flex"
              key={content.uid}
              alignItems="center"
              _hover={
                isActive
                  ? { backgroundColor: 'gray.100', color: 'black' }
                  : { backgroundColor: 'gray.100' }
              }
              p="2"
              rounded="md"
              cursor="pointer"
              mb="2"
              title="Clase 1: Configuracion del entorno"
              bg={isActive && 'blue.200'}
              color={isActive && 'white'}
            >
              {/* color="green.300" if not active */}

              {isActive ? (
                <CheckIcon mr="2" color="currentColor" />
              ) : (
                <Icon viewBox="0 0 200 200" color="green.300" mr="2">
                  <path
                    strokeWidth="20px"
                    stroke="currentColor"
                    fill="transparent"
                    d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                  />
                </Icon>
              )}

              <Text isTruncated>{content.title}</Text>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default ClassList;
