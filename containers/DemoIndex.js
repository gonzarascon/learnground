import React from 'react';
import { useRouter } from 'next/router';
import { Button, Flex, Grid, Heading, Text } from '@chakra-ui/react';

import { useStore } from '@/lib/store';
import { CourseCard } from '@/components';

function DemoIndex() {
  const router = useRouter();
  const [appType, userType] = useStore((state) => [
    state.appType,
    state.userType,
  ]);

  const handleCreateCourseRedirect = () => {
    const URL = `/demo/${
      appType === 'gamified' ? 'gamificado' : 'no-gamificado'
    }/curso/crear`;

    router.push(URL);
  };

  return (
    <Flex direction="column" w="100%" py="10">
      {userType === 'instructor' && (
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
      <Grid
        width="100%"
        as="section"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        mt="10"
      >
        <CourseCard
          title="Master en CSS: Responsive, SASS, Flexbox, Grid y Bootstrap 4"
          progress={0.5}
          slug="master-en-css"
        />
      </Grid>
    </Flex>
  );
}

export default DemoIndex;
