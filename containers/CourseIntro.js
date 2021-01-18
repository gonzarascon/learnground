import React, { useEffect } from 'react';
import useSWR from 'swr';
import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  List,
  ListIcon,
  ListItem,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useCourseStore } from '@/lib/store';
import { fetcher } from '@/lib/helpers';

const CourseIntro = () => {
  const courseData = useCourseStore((state) => state.courseData);
  const { data } = useSWR(
    courseData && `/api/categories/${courseData.categoryId}`,
    fetcher
  );

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      gap="50px"
      py={10}
      h="calc(100vh - 94px - 21px)"
    >
      <Box>
        <Skeleton isLoaded={data} mb={5}>
          <Flex align="center">
            <Text mr={5} fontWeight="400" fontSize="xl" fontStyle="oblique">
              Categoría
            </Text>
            <Badge colorScheme="blue">{data && data[0].fields.name}</Badge>
          </Flex>
        </Skeleton>
        <Heading as="h3">
          {courseData ? courseData?.title : <Skeleton height="20px" />}
        </Heading>

        <Image
          src={courseData?.thumbnail}
          alt={courseData?.title}
          fallbackSrc="https://via.placeholder.com/641x370"
          w="100%"
          rounded="lg"
          mt="3"
          maxH="370px"
          fit="cover"
        />
        <Text color="gray.500" mt={3} px={2}>
          {courseData ? (
            courseData.description
          ) : (
            <>
              <Skeleton height="20px" />
              <Skeleton height="20px" />
              <Skeleton height="20px" />
            </>
          )}
        </Text>
      </Box>
      <Flex direction="column" maxH="50%" mt={14}>
        <Heading as="h4" fontSize="2xl">
          En este curso aprenderás:
        </Heading>
        <List mt={3} spacing={3}>
          {courseData?.concepts.map((concept, index) => (
            <ListItem key={`${concept}-${index}`}>
              <ListIcon as={CheckCircleIcon} color="green.500" />
              {concept}
            </ListItem>
          ))}
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
