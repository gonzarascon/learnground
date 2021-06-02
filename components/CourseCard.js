import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import { Box, Button, Flex, Heading, Image } from '@chakra-ui/react';

function CourseCard({ title = '', slug = '', image = '' }) {
  const [coursePath, setCoursePath] = useState('');
  const router = useRouter();

  useEffect(() => {
    const path = `/demo/curso/${slug}`;
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
        src={image}
        fallbackSrc="/images/course_placeholder.png"
        alt={title}
        objectFit="cover"
        h="224px"
        w="100%"
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
            onClick={() => handleButtonClick()}
          >
            Comenzar
          </Button>
        </Flex>
      </Box>
    </Box>
  );
}

CourseCard.propTypes = {
  image: PropTypes.string,
  slug: PropTypes.string,
  title: PropTypes.string,
};

export default CourseCard;
