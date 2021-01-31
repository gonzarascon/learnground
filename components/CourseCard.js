import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import { Box, Button, Flex, Heading, Image, Progress } from '@chakra-ui/react';

function CourseCard({
  title = '',
  slug = '',
  image = '',
  progress,
  lastClass = 0,
}) {
  const [coursePath, setCoursePath] = useState('');
  const router = useRouter();

  useEffect(() => {
    const path = `${router.pathname}/curso/${slug}`;
    setCoursePath(path);
    router.prefetch(path);
  }, []);

  const handleButtonClick = () => {
    router.push(coursePath);
  };

  return (
    <Box
      rounded="lg"
      borderWidth="1px"
      shadow="md"
      overflow="hidden"
      maxW="sm"
      bgColor="white"
    >
      <Image
        src={image.length > 0 ? image : '/images/course_placeholder.png'}
        alt={title}
        objectFit="contain"
      />
      <Box p="5">
        <Heading as="h4" fontSize="md" isTruncated title={title}>
          {title}
        </Heading>
        <Flex wrap="nowrap" align="center" justify="space-between">
          <Button
            colorScheme="blue"
            variant="solid"
            color="white"
            mt="3"
            onClick={handleButtonClick}
          >
            Comenzar
          </Button>

          {progress && (
            <Box w="50%">
              <Heading as="h5" fontWeight="300" fontSize="sm">
                Progreso
              </Heading>
              <Progress
                color="green"
                value={progress * 100}
                rounded="lg"
                mt="2"
              />
            </Box>
          )}
        </Flex>
      </Box>
    </Box>
  );
}

CourseCard.propTypes = {
  image: PropTypes.string,
  lastClass: PropTypes.number,
  progress: PropTypes.number,
  slug: PropTypes.string,
  title: PropTypes.string,
};

export default CourseCard;
