import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Heading } from '@chakra-ui/core';

const Header = () => {
  return (
    <Flex
      as="header"
      align="center"
      justify="center"
      wrap="wrap"
      padding="1.5rem"
      borderBottom="1px solid"
      borderColor="gray.300"
      backgroundColor="gray.50"
    >
      <Heading>My header</Heading>
    </Flex>
  );
};

export default Header;
