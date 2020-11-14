import React from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Flex,
  Grid,
  Heading,
  Menu,
  MenuButton,
} from '@chakra-ui/react';
import { AvatarMenu, ProgressIndicator } from '@/components';

const Header = ({ version }) => {
  /**
   * processVersion
   * @param {String} resultIfStart String to return if version is equal to "start"
   * @param {String} resultIfDemo String to return if version is equal to "demo"
   */
  const processVersion = (resultIfStart, resultIfDemo) =>
    version === 'start' ? resultIfStart : resultIfDemo;

  return (
    <Grid
      as="header"
      alignItems="center"
      justifyItems="center"
      gap="20px"
      templateColumns={processVersion('1fr', 'auto 1fr auto')}
      px="10"
      py="5"
      borderBottom="1px solid"
      borderColor="gray.300"
      backgroundColor="gray.50"
      width="100%"
    >
      <Heading as="h1" size={processVersion('xl', 'md')}>
        Learnground
      </Heading>

      {version === 'demo' && (
        <>
          {/* TODO: Conditional rendering for this heading */}
          <Heading as="h2" size="sm" maxWidth="500px" isTruncated>
            Master en CSS: Responsive, SASS, Flexbox, Grid y Bootstrap 4
          </Heading>

          <Flex wrap="nowrap" justify="flex-end">
            <ProgressIndicator />

            {version === 'demo' && <AvatarMenu />}
          </Flex>
        </>
      )}
    </Grid>
  );
};

Header.propTypes = {
  version: PropTypes.oneOf(['demo', 'start']),
};

Header.defaultProps = {
  version: 'start',
};

export default Header;
