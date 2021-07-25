import React from 'react';
import PropTypes from 'prop-types';

import { Box, Button, Flex, Heading, Image } from '@chakra-ui/react';
import Link from 'next/link';

function CourseCard({ title = '', slug = '', image = '' }) {
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
          <Link href={`/demo/curso/${slug}`}>
            <Button
              colorScheme="blue"
              variant="solid"
              color="white"
              mt="3"
              as="a"
              cursor="pointer"
            >
              Comenzar
            </Button>
          </Link>
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
