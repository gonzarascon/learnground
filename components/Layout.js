import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Text } from '@chakra-ui/react';

import { Header } from '@/components';

const Layout = ({ children }) => {
  return (
    <Flex minH="100vh" direction="column" className="layout">
      <Header />
      <Box
        as="main"
        width="100%"
        height="100%"
        minHeight="calc(100vh - 94px - 21px)"
      >
        {children}
      </Box>
      <Flex align="center" justify="center">
        <Text fontSize="sm" color="gray.500">
          My footer
        </Text>
      </Flex>
    </Flex>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};

export default Layout;
