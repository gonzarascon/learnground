import PropTypes from 'prop-types';
import React from 'react';
import {
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Text,
} from '@chakra-ui/react';

const ProgressIndicator = ({ progress }) => {
  return (
    <Flex wrap="nowrap" align="center" justify="space-evenly" mr="5">
      <Text fontFamily="var(--f-Chivo)" mr="5">
        Progreso
      </Text>
      <CircularProgress
        color="green.400"
        value={progress}
        isIndeterminate={typeof progress === 'undefined'}
        min={0}
        max={100}
      >
        <CircularProgressLabel fontFamily="var(--f-Chivo)" userSelect="none">
          {typeof progress !== 'undefined' ? `${progress}%` : '...'}
        </CircularProgressLabel>
      </CircularProgress>
    </Flex>
  );
};

ProgressIndicator.propTypes = {
  progress: PropTypes.oneOfType([PropTypes.number, undefined]),
};

export default ProgressIndicator;
