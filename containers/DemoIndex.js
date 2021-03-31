import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Button, Flex, Grid, Heading, Text } from '@chakra-ui/react';

import { useStore } from '@/lib/store';
import { CourseCard } from '@/components';
import { useRealtime } from '@/lib/firebase/dataFunctions';

function DemoIndex() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [appType, userType, loggedIn] = useStore((state) => [
    state.appType,
    state.userType,
    state.loggedIn,
  ]);

  const handleCreateCourseRedirect = () => {
    router.push('/demo/curso/crear');
  };

  const fetchData = useCallback(async (snapshot) => {
    const docsArr = [];
    if (!snapshot.empty) {
      for (let i in snapshot.docs) {
        const doc = snapshot.docs[i];
        if (doc.exists && doc.id !== 'model') {
          docsArr.push({ ...doc.data(), uid: doc.id });
        }
      }

      setCourses(docsArr.filter((o) => o.origin === appType));
    }
  }, []);

  useEffect(() => {
    const unsubscribe = useRealtime(`courses`, fetchData);

    return () => unsubscribe();
  }, []);

  return (
    <Flex direction="column" w="100%" p="10" h="100%">
      {userType === 'instructor' && loggedIn && (
        <Flex
          justify="space-between"
          bg="gray.100"
          shadow="md"
          p="5"
          mb="5"
          rounded="lg"
          align="flex-end"
        >
          <Heading as="h3" fontSize="2xl">
            <Text
              fontSize="lg"
              fontStyle="oblique"
              color="gray.500"
              fontWeight="lighter"
            >
              Eres profesor
            </Text>
            Comienza creando tu propio curso
          </Heading>
          <Button
            colorScheme="blue"
            onClick={() => handleCreateCourseRedirect()}
          >
            Crear curso nuevo
          </Button>
        </Flex>
      )}
      <Heading fontSize="5xl" as="h2">
        Cursos disponibles
      </Heading>
      {!courses.length && (
        <Heading
          fontSize="2xl"
          as="h3"
          textAlign="center"
          w="100%"
          color="gray.500"
          mt={5}
          bg="blue.100"
          maxW="720px"
          boxShadow="base"
          rounded="md"
          alignSelf="center"
          px="10"
          py="5"
        >
          ¡Ups! Actualmente no hay cursos disponibles, regresa más tarde.
        </Heading>
      )}
      {courses.length > 0 && (
        <Grid
          width="100%"
          as="section"
          gridTemplateColumns="repeat(auto-fill, 300px)"
          mt="10"
          gap={6}
        >
          {courses.map((course) => (
            <CourseCard
              title={course.title}
              progress={0.5}
              image={course.thumbnail}
              slug={course.slug}
              key={course.uid}
            />
          ))}
        </Grid>
      )}
    </Flex>
  );
}

export default DemoIndex;
