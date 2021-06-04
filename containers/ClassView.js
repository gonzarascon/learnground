import React from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { Flex, Grid, Heading, Skeleton } from '@chakra-ui/react';

import { useStore } from '@/lib/store';
import { ChatRoom, CourseCard, Markdown } from '@/components';

function ClassView({ source = '' }) {
  const router = useRouter();
  const [isGamified, appType] = useStore((state) => [
    state.appType === 'gamified' ? true : false,
    state.appType,
  ]);

  //TODO: handle layout change based on appType

  return (
    <Skeleton isLoaded={source}>
      <Grid
        templateColumns={isGamified ? '70% 1fr' : '1fr'}
        w="100%"
        py="10"
        maxH="927px"
        height="calc(100vh - 21px - 89px)"
      >
        <Markdown source={source} />
        {isGamified && <ChatRoom />}
      </Grid>
    </Skeleton>
  );
}

ClassView.propTypes = {
  source: PropTypes.string,
};

export default ClassView;
