import React from 'react';
import PropTypes from 'prop-types';

import { Box, Button, Heading, Image } from '@chakra-ui/core';

function CourseCard({ title = '', slug = '', image = '' }) {
  return (
    <Box
      rounded="lg"
      borderWidth="1px"
      shadow="md"
      overflow="hidden"
      maxW="sm`"
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
        <Button variantColor="blue" variant="solid" color="white" mt="3">
          Comenzar
        </Button>
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
