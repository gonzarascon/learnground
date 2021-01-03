import React from 'react';
import { Box, Button, Grid, Heading, Text } from '@chakra-ui/react';
import { UserInformation, UserMedals } from '@/components/Profile';
import { CourseCard } from '@/components';
import { useProfileStore } from '@/lib/store';

const ProfileView = () => {
  const [profileData, visitorIsOwner] = useProfileStore((state) => [
    state.profileData,
    state.visitorIsOwner,
  ]);
  return (
    <Grid
      templateColumns="1fr 1fr"
      templateAreas={`"info medals" "taken created"`}
      as="section"
      p="10"
      gap="87px"
    >
      <UserInformation />
      <UserMedals />
      {profileData && (
        <>
          <Box gridArea="taken">
            <Heading as="h3" mb="5">
              Cursos tomados
            </Heading>
            <Grid templateColumns="1fr 1fr" templateRows="1fr 1fr" gap="20px">
              {profileData.courses.length ? (
                profileData.courses.map((course) => (
                  <CourseCard
                    title="Master en CSS: Responsive, SASS, Flexbox, Grid y Bootstrap 4"
                    slug="master-en-css"
                    key={course}
                  />
                ))
              ) : (
                <Box>
                  <Text color="gray.400" fontSize="lg" mb={3}>
                    ¡Ups, no hay cursos aún!
                  </Text>
                  {visitorIsOwner && (
                    <Button colorScheme="green">Comienza uno ahora</Button>
                  )}
                </Box>
              )}
            </Grid>
          </Box>
          {profileData.type === 'instructor' && (
            <Box gridArea="created">
              <Heading as="h3" mb="5">
                Cursos creados
              </Heading>
              <Grid templateColumns="1fr 1fr" templateRows="1fr 1fr" gap="20px">
                {profileData.createdCourses.length ? (
                  profileData.createdCourses.map((course) => (
                    <CourseCard
                      title="Master en CSS: Responsive, SASS, Flexbox, Grid y Bootstrap 4"
                      slug="master-en-css"
                      key={course}
                    />
                  ))
                ) : (
                  <Box>
                    <Text color="gray.400" fontSize="lg" mb={3}>
                      ¡Ups, no hay cursos aún!
                    </Text>
                    {visitorIsOwner && (
                      <Button colorScheme="green">Crea uno ahora</Button>
                    )}
                  </Box>
                )}
              </Grid>
            </Box>
          )}
        </>
      )}
    </Grid>
  );
};

export default ProfileView;
