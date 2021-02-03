import React from 'react';
import { useRouter } from 'next/router';
import { Box, Heading, List, ListItem, Text } from '@chakra-ui/react';
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
              _hover={!isActive && { backgroundColor: 'blue.200' }}
              p="2"
              rounded="md"
              cursor="pointer"
              mb="2"
              title="Clase 1: Configuracion del entorno"
              bg={isActive ? 'blue.400' : 'blue.100'}
              color={isActive && 'white'}
            >
              {/* color="green.300" if not active */}

              <Text fontSize="2xl" fontWeight="bold" mr={2}>
                {content.order}
              </Text>

              <Text isTruncated>{content.title}</Text>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

export default ClassList;
