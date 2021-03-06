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
import {
  useCourseEditStore,
  useProfileStore,
  useStore,
  useUserStore,
} from '@/lib/store';
import { Twitter, Whatsapp } from '@/components/icons';
import { useRouter } from 'next/router';
import { Share } from '@/lib/share';
import useCookies from '@/lib/useCookies';
import { updateBadgeAndXP } from '@/lib/firebase/dataFunctions';
import { missionsDataset } from '@/lib/gamifiedHandler';

function GamificadoCourse() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const courseData = useCourseEditStore((state) => state.courseData);
  const setBadge = useProfileStore((state) => state.setBadge);
  const [cookieValue, setCookie, isLoading] = useCookies();
  const [appType, setProfileAlert] = useStore((state) => [
    state.appType,
    state.setProfileAlert,
  ]);
  const [uid] = useUserStore((state) => [state.uid]);

  useEffect(() => {
    if (courseData) {
      setLoaded(true);
    }
  }, [courseData]);

  const handleClickCourse = () => {
    const path = router.asPath;

    const sanitizedPath = path.replace('/editar/finalizado', '');

    router.push(sanitizedPath);
  };

  /**
   *
   * @param {"wp" | "tw" | "link"} provider
   */
  const handleClickShare = (provider) => {
    if (appType === 'gamified') {
      const badgeToEarn = missionsDataset.find(
        (obj) => obj.pk === 'shared_course'
      );

      if (!isLoading && badgeToEarn) {
        if (!cookieValue) {
          setCookie({
            badges: [badgeToEarn],
          });

          const { badgeId, xpAmmount } = badgeToEarn;
          updateBadgeAndXP(uid, badgeId, xpAmmount).then(() => {
            setBadge(badgeId);
          });
        } else {
          const badges = cookieValue.badges || [];

          if (!badges.find((obj) => obj.pk === 'shared_course')) {
            setCookie({
              badges: [...badges, badgeToEarn],
            });

            const { badgeId, xpAmmount } = badgeToEarn;
            updateBadgeAndXP(uid, badgeId, xpAmmount).then(() => {
              setBadge(badgeId);
            });
          }
        }
        setProfileAlert(true);
      }
    }

    const baseURL =
      process.env.NODE_ENV === 'production'
        ? window.location.href
        : 'localhost:3000';
    const path = router.asPath.replace('/editar/finalizado', '');
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
            Terminaste de editar:{' '}
            <Text as="i" color="gray.700">
              {courseData?.data?.title}
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
          Ver curso
        </Button>
        <Flex wrap="nowrap" w="100%" maxW="200px" justify="space-evenly" mt="5">
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
    </DemoLayout>
  );
}

export default GamificadoCourse;
