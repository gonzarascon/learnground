import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Flex, Grid, Heading } from '@chakra-ui/core';

import { useStore } from '@/lib/store';
import { CourseCard, Markdown } from '@/components';

function ClassView({ source = '' }) {
  const router = useRouter();
  const appType = useStore((state) => state.appType);

  return (
    <Grid
      templateColumns="70% 1fr"
      w="100%"
      py="10"
      maxH="927px"
      height="calc(100vh - 21px - 89px)"
    >
      <Markdown source={source} />
    </Grid>
  );
}

ClassView.propTypes = {
  source: PropTypes.string,
};

export default ClassView;
