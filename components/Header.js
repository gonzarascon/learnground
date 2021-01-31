import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import _ from 'lodash';
import { Flex, Grid, Heading, Link as ChakraLink } from '@chakra-ui/react';
import { AvatarMenu, ProgressIndicator } from '@/components';
import { useCourseStore, useStore, useUserStore } from '@/lib/store';

const Header = ({ version, isCourse }) => {
  const [progress, setProgress] = useState();
  const loggedIn = useStore((state) => state.loggedIn);
  const uid = useUserStore((state) => state.uid);
  const courseData = useCourseStore((state) => state.courseData);

  useEffect(() => {
    if (courseData && uid) {
      setProgress(
        _.find(courseData.subscribers, (s) => s.uid === uid)?.progress
      );
    }
  }, [courseData, uid]);

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
          {isCourse && (
            <Heading as="h2" size="sm" maxWidth="500px" isTruncated>
              {courseData && courseData.title
                ? courseData.title
                : 'Cargando...'}
            </Heading>
          )}

          <Flex
            wrap="nowrap"
            justify="flex-end"
            gridColumn={isCourse ? 'auto' : '3/4'}
          >
            {isCourse && <ProgressIndicator progress={progress} />}

            {version === 'demo' && loggedIn && <AvatarMenu />}
            {version === 'demo' && !loggedIn && (
              <Link href="/auth/iniciar-sesion">
                <ChakraLink>Iniciar Sesión</ChakraLink>
              </Link>
            )}
          </Flex>
        </>
      )}
    </Grid>
  );
};

Header.propTypes = {
  version: PropTypes.oneOf(['demo', 'start']),
  isCourse: PropTypes.bool,
};

Header.defaultProps = {
  version: 'start',
  isCourse: false,
};

export default Header;
