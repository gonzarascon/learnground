import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Text } from '@chakra-ui/react';

import { Header } from '@/components';

const DemoLayout = ({ children }) => {
  return (
    <Flex minH="100vh" direction="column" align="center">
      <Header version="demo" />
      <Box
        as="main"
        width="100%"
        height="100%"
        minHeight="calc(100vh - 94px - 21px)"
        maxW="1400px"
      >
        {children}
      </Box>
      <Flex align="center" justify="center" as="footer" w="100%">
        <Text fontSize="sm" color="gray.500">
          My footer
        </Text>
      </Flex>
    </Flex>
  );
};

DemoLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default DemoLayout;
