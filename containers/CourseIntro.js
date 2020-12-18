import React from 'react';
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  List,
  ListIcon,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

const CourseIntro = () => {
  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      gap="50px"
      py={10}
      h="calc(100vh - 94px - 21px)"
    >
      <Box>
        <Heading as="h3">
          Master en CSS: Responsive, SASS, Flexbox, Grid y Bootstrap 4
        </Heading>

        <Image
          src="https://via.placeholder.com/641x370"
          w="100%"
          rounded="lg"
          mt="3"
          maxH="370px"
          fit="cover"
        />
        <Text color="gray.500" mt={3} px={2}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          consequatur quod sit! Eveniet nisi dolores obcaecati iusto provident?
          Possimus nostrum omnis deserunt. Eaque et culpa repellendus mollitia
          rem maiores est facilis aspernatur impedit non id neque consequuntur,
          cupiditate sit praesentium suscipit? Dicta expedita praesentium, enim
          dolorem hic est quod nostrum?
        </Text>
      </Box>
      <Flex direction="column" maxH="50%">
        <Heading as="h4" fontSize="2xl">
          En este curso aprenderás:
        </Heading>
        <List mt={3} spacing={3}>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />A crear una hoja
            de estilos desde 0.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />A crear una hoja
            de estilos desde 0.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckCircleIcon} color="green.500" />A crear una hoja
            de estilos desde 0.
          </ListItem>
        </List>

        <Button
          colorScheme="green"
          justifySelf="flex-end"
          mt="auto"
          maxW="200px"
        >
          Comenzar curso
        </Button>
      </Flex>
    </Grid>
  );
};

export default CourseIntro;
