import React from 'react';
import { useRouter } from 'next/router';
import { Box, Heading, List, ListItem, Text } from '@chakra-ui/react';
import { useCourseStore } from '@/lib/store';

const ClassList = () => {
  const router = useRouter();
  const query = router.query;
  const contents = useCourseStore((state) => state.contentsPreview) || [];

  return (
    <Box
      position={{ base: 'relative', xxxl: 'absolute' }}
      top={{ xxxl: '120px' }}
      left={{ xxxl: '25px' }}
      d={{ base: 'flex', xxxl: 'block' }}
      alignItems="center"
      w={{ base: '100%', xxxl: 'auto' }}
      maxW="760px"
      mt={{ base: '5', xxxl: 'unset' }}
    >
      <Heading as="h3" fontSize="lg" mr="5" flex="1 1 160px">
        Lista de clases
      </Heading>
      <List
        maxW={{ xxxl: '200px' }}
        d={{ base: 'flex', xxxl: 'block' }}
        justifyContent="space-evenly"
        w="100%"
      >
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
