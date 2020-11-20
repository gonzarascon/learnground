import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Progress,
  Text,
} from '@chakra-ui/react';
import { UserInformation, UserMedals } from '@/components/Profile';
import { CourseCard } from '@/components';

const ProfileView = () => {
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
      <Box gridArea="taken">
        <Heading as="h3" mb="5">
          Cursos tomados
        </Heading>
        <Grid templateColumns="1fr 1fr" templateRows="1fr 1fr" gap="20px">
          <CourseCard
            title="Master en CSS: Responsive, SASS, Flexbox, Grid y Bootstrap 4"
            slug="master-en-css"
          />
          <CourseCard
            title="Master en CSS: Responsive, SASS, Flexbox, Grid y Bootstrap 4"
            slug="master-en-css"
          />
          <CourseCard
            title="Master en CSS: Responsive, SASS, Flexbox, Grid y Bootstrap 4"
            slug="master-en-css"
          />
          <CourseCard
            title="Master en CSS: Responsive, SASS, Flexbox, Grid y Bootstrap 4"
            slug="master-en-css"
          />
        </Grid>
      </Box>
      <Box gridArea="created">
        <Heading as="h3" mb="5">
          Cursos creados
        </Heading>
        <Grid templateColumns="1fr 1fr" templateRows="1fr 1fr" gap="20px">
          <CourseCard
            title="Master en CSS: Responsive, SASS, Flexbox, Grid y Bootstrap 4"
            slug="master-en-css"
          />
          <CourseCard
            title="Master en CSS: Responsive, SASS, Flexbox, Grid y Bootstrap 4"
            slug="master-en-css"
          />
          <CourseCard
            title="Master en CSS: Responsive, SASS, Flexbox, Grid y Bootstrap 4"
            slug="master-en-css"
          />
          <CourseCard
            title="Master en CSS: Responsive, SASS, Flexbox, Grid y Bootstrap 4"
            slug="master-en-css"
          />
        </Grid>
      </Box>
    </Grid>
  );
};

export default ProfileView;
