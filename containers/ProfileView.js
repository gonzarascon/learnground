import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Heading, Skeleton, Text } from '@chakra-ui/react';
import { UserInformation, UserMedals } from '@/components/Profile';
import { CourseCard } from '@/components';
import { useProfileStore } from '@/lib/store';
import { getById } from '@/lib/firebase/dataFunctions';

const ProfileView = () => {
  const [profileData, visitorIsOwner] = useProfileStore((state) => [
    state.profileData,
    state.visitorIsOwner,
  ]);
  const [createdCourses, setCreatedCourses] = useState([]);

  useEffect(() => {
    const data = async () => {
      if (profileData && profileData.createdCourses) {
        const coursesArr = [];

        for (let uid in profileData.createdCourses) {
          const objData = await getById(
            'courses',
            profileData.createdCourses[uid]
          );

          if (objData.data()) {
            coursesArr.push({
              uid: objData.id,
              ...objData.data(),
            });
          }
        }

        setCreatedCourses(coursesArr);
      }
    };

    data();
  }, [profileData]);

  return (
    <Grid
      templateColumns="1fr 1fr"
      templateAreas={`"info medals" "taken created"`}
      as="section"
      p="10"
      gap="87px"
      bgColor="white"
      rounded="md"
    >
      <UserInformation />
      <UserMedals />
      {profileData && (
        <>
          <Box gridArea="taken">
            <Heading as="h3" mb="5">
              Cursos tomados
            </Heading>
            <Grid
              templateColumns="1fr 1fr"
              templateRows="repeat(auto-fill,minmax(350px, 1fr))"
              gap="20px"
            >
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
              <Grid
                templateColumns="50% 50%"
                templateRows="repeat(auto-fill,minmax(350px, 1fr))"
                gap="20px"
              >
                {profileData.createdCourses.length ? (
                  profileData.createdCourses.map((course) => {
                    const actualCourse = createdCourses.find(
                      (o) => o.uid === course
                    );
                    return (
                      <Skeleton key={course} isLoaded={actualCourse}>
                        <CourseCard
                          title={actualCourse?.title}
                          slug={actualCourse?.slug}
                          image={actualCourse?.thumbnail}
                        />
                      </Skeleton>
                    );
                  })
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
