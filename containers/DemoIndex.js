import React from 'react';
import { useRouter } from 'next/router';
import { Flex, Grid, Heading } from '@chakra-ui/react';

import { useStore } from '@/lib/store';
import { CourseCard } from '@/components';

function DemoIndex() {
  const router = useRouter();
  const appType = useStore((state) => state.appType);

  return (
    <Flex direction="column" w="100%" py="10">
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
