import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import { Box, Button, Flex, Heading, Image, Progress } from '@chakra-ui/react';
import { useStore } from '@/lib/store';

function CourseCard({
  title = '',
  slug = '',
  image = '',
  progress,
  lastClass = 0,
}) {
  const [coursePath, setCoursePath] = useState('');
  const appType = useStore((state) => state.appType);
  const router = useRouter();

  useEffect(() => {
    if (appType) {
      const pathType = appType === 'normal' ? 'no-gamificado' : 'gamificado';
      const path = `/demo/${pathType}/curso/${slug}`;
      setCoursePath(path);
      router.prefetch(path);
    }
  }, [appType]);

  const handleButtonClick = () => {
    router.push(coursePath);
  };

  console.log(image);
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
            onClick={handleButtonClick}
          >
            Comenzar
          </Button>

          {/*progress && (
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
          )*/}
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
