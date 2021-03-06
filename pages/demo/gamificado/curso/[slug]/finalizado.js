import React, { useState, useEffect } from 'react';
import { DemoLayout } from '@/components';
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import { LinkIcon } from '@chakra-ui/icons';
import { useCourseStore, useStore } from '@/lib/store';
import { Twitter, Whatsapp } from '@/components/icons';
import { useRouter } from 'next/router';
import { Share } from '@/lib/share';

function GamificadoCourse() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const appType = useStore((state) => state.appType);
  const courseData = useCourseStore((state) => state.courseData);

  useEffect(() => {
    if (courseData) {
      setLoaded(true);
    }
  }, [courseData]);

  useEffect(() => {
    if (appType) {
      const pathType = appType === 'normal' ? 'no-gamificado' : 'gamificado';
      const path = `/demo/${pathType}`;
      router.prefetch(path);
    }
  }, [appType]);

  const handleClickCourse = () => {
    const pathType = appType === 'normal' ? 'no-gamificado' : 'gamificado';
    const path = `/demo/${pathType}`;

    router.push(path);
  };

  /**
   *
   * @param {"wp" | "tw" | "link"} provider
   */
  const handleClickShare = (provider) => {
    const baseURL =
      process.env.NODE_ENV === 'production'
        ? 'learnground.com'
        : 'localhost:3000';
    const path = router.asPath.replace('/finalizado', '');
    const url = `https://${baseURL}${path}`;
    Share('¡Encontré este curso en learnground.com, mirá!', url, provider);
  };

  return (
    <DemoLayout>
      <Flex direction="column" align="center" justify="center" minH="80vh">
        <Skeleton
          isLoaded={loaded}
          d="flex"
          flexDirection="column"
          alignItems="center"
          maxW="80%"
          w="100%"
        >
          <Heading as="h3" textAlign="center" fontSize="3xl">
            Completaste el curso:{' '}
            <Text as="i" color="gray.700">
              {courseData?.title}
            </Text>
          </Heading>
        </Skeleton>

        <Button
          colorScheme="green"
          mt="10"
          fontSize="xl"
          w="100%"
          maxW="200px"
          isLoading={!loaded}
          onClick={handleClickCourse}
        >
          Volver al inicio
        </Button>
        <Flex direction="column" align="center" w="100%" mt="10">
          <Text fontSize="xl">Comparte el curso con tus amigos:</Text>
          <Flex
            wrap="nowrap"
            w="100%"
            maxW="200px"
            justify="space-evenly"
            mt="5"
          >
            <Skeleton isLoaded={loaded}>
              <IconButton
                colorScheme="blue"
                icon={<Twitter />}
                rounded="3xl"
                size="lg"
                onClick={() => handleClickShare('tw')}
              />
            </Skeleton>
            <Skeleton isLoaded={loaded}>
              <IconButton
                colorScheme="blue"
                icon={<Whatsapp />}
                rounded="3xl"
                size="lg"
                onClick={() => handleClickShare('wp')}
              />
            </Skeleton>
            <Skeleton isLoaded={loaded}>
              <IconButton
                colorScheme="blue"
                icon={<LinkIcon />}
                rounded="3xl"
                size="lg"
                onClick={() => handleClickShare('link')}
              />
            </Skeleton>
          </Flex>
        </Flex>
      </Flex>
    </DemoLayout>
  );
}

export default GamificadoCourse;
