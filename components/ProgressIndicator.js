import React from 'react';
import {
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Text,
} from '@chakra-ui/core';

const ProgressIndicator = () => {
  return (
    <Flex wrap="nowrap" align="center" justify="space-evenly" mr="5">
      <Text fontFamily="var(--f-Chivo)" mr="5">
        Progreso
      </Text>
      <CircularProgress color="green" value={50}>
        <CircularProgressLabel fontFamily="var(--f-Chivo)" userSelect="none">
          50%
        </CircularProgressLabel>
      </CircularProgress>
    </Flex>
  );
};

export default ProgressIndicator;
