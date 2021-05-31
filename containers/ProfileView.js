import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Heading, Text } from '@chakra-ui/react';
import { UserInformation, UserMedals } from '@/components/Profile';
import { CourseCard } from '@/components';
import { useProfileStore, useStore } from '@/lib/store';
import { getById } from '@/lib/firebase/dataFunctions';
import { useRouter } from 'next/router';

const ProfileView = () => {
  const appType = useStore((state) => state.appType);

  const router = useRouter();

  const isGamified = appType === 'gamified' ? true : false;

  const [profileData, visitorIsOwner] = useProfileStore((state) => [
    state.profileData,
    state.visitorIsOwner,
  ]);
  const [takenCourses, setTakenCourses] = useState([]);
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

      if (profileData && profileData.courses) {
        const coursesArr = [];

        for (let uid in profileData.courses) {
          const objData = await getById('courses', profileData.courses[uid]);

          if (objData.data()) {
            coursesArr.push({
              uid: objData.id,
              ...objData.data(),
            });
          }
        }
        setTakenCourses(coursesArr);
      }
    };

    data();
  }, [profileData]);

  const handleClickCourse = () => {
    router.push('/demo');
  };

  const handleClickCreate = () => {
    router.push('/demo/curso/crear');
  };

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
      {isGamified && <UserMedals />}
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
              {appType &&
              profileData &&
              profileData?.courses?.length &&
              takenCourses.length ? (
                takenCourses?.map((course) => {
                  if (course.origin === appType) {
                    return (
                      <CourseCard
                        title={course?.title}
                        slug={course.slug}
                        image={course.thumbnail}
                        key={course}
                      />
                    );
                  } else {
                    return null;
                  }
                })
              ) : (
                <Box>
                  <Text color="gray.400" fontSize="lg" mb={3}>
                    ¡Ups, no hay cursos aún!
                  </Text>
                  {visitorIsOwner && (
                    <Button colorScheme="green" onClick={handleClickCourse}>
                      Comienza uno ahora
                    </Button>
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
                {appType &&
                profileData &&
                profileData?.createdCourses.length &&
                createdCourses.length ? (
                  createdCourses?.map((course) => {
                    if (course.origin === appType) {
                      return (
                        <CourseCard
                          title={course?.title}
                          slug={course?.slug}
                          image={course?.thumbnail}
                        />
                      );
                    } else {
                      return null;
                    }
                  })
                ) : (
                  <Box>
                    <Text color="gray.400" fontSize="lg" mb={3}>
                      ¡Ups, no hay cursos aún!
                    </Text>
                    {visitorIsOwner && (
                      <Button colorScheme="green" onClick={handleClickCreate}>
                        Crea uno ahora
                      </Button>
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
