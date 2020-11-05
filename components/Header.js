import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Flex, Heading, Menu, MenuButton } from '@chakra-ui/core';
import { AvatarMenu } from '@/components';

const Header = ({ version }) => {
  /**
   * processVersion
   * @param {String} resultIfStart String to return if version is equal to "start"
   * @param {String} resultIfDemo String to return if version is equal to "demo"
   */
  const processVersion = (resultIfStart, resultIfDemo) =>
    version === 'start' ? resultIfStart : resultIfDemo;

  return (
    <Flex
      as="header"
      align="center"
      justify={processVersion('center', 'space-between')}
      wrap="wrap"
      padding="1.5rem"
      borderBottom="1px solid"
      borderColor="gray.300"
      backgroundColor="gray.50"
    >
      <Heading
        fontFamily="var(--f-Chivo)"
        as="h1"
        size={processVersion('xl', 'sm')}
      >
        Learnground
      </Heading>

      {version === 'demo' && <AvatarMenu />}
    </Flex>
  );
};

Header.propTypes = {
  version: PropTypes.oneOf(['demo', 'start']),
};

Header.defaultProps = {
  version: 'start',
};

export default Header;
