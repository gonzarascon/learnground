import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Skeleton } from '@chakra-ui/react';

import { useStore } from '@/lib/store';
import { ChatRoom, Markdown } from '@/components';

function ClassView({ source = '' }) {
  const [isGamified] = useStore((state) => [
    state.appType === 'gamified' ? true : false,
  ]);

  return (
    <Skeleton isLoaded={source}>
      <Flex
        w="100%"
        py="10"
        maxH="927px"
        height="calc(100vh - 21px - 89px)"
        wrap="nowrap"
        maxWidth={{ xxxl: '80vw' }}
        ml={{ xxxl: 'auto' }}
      >
        <Markdown source={source} />
        {isGamified && <ChatRoom />}
      </Flex>
    </Skeleton>
  );
}

ClassView.propTypes = {
  source: PropTypes.string,
};

export default ClassView;
