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
  useCourseStore,
  useProfileStore,
  useStore,
  useUserStore,
} from '@/lib/store';
import { Twitter, Whatsapp } from '@/components/icons';
import { useRouter } from 'next/router';
import { Share } from '@/lib/share';
import { missionsDataset } from '@/lib/gamifiedHandler';
import { registerEvent, updateBadgeAndXP } from '@/lib/firebase/dataFunctions';
import useCookies from '@/lib/useCookies';
import { EventsEnum } from '@/lib/events';

function GamificadoCourse() {
  const router = useRouter();
  const [uid] = useUserStore((state) => [state.uid]);

  const [cookieValue, setCookie, isLoading] = useCookies();
  const [loaded, setLoaded] = useState(false);
  const [appType, setProfileAlert] = useStore((state) => [
    state.appType,
    state.setProfileAlert,
  ]);
  const setBadge = useProfileStore((state) => state.setBadge);
  const courseData = useCourseStore((state) => state.courseData);

  useEffect(() => {
    if (appType === 'gamified') {
      const badgeToEarn = missionsDataset.find(
        (obj) => obj.pk === 'first_view_profile'
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

          if (!badges.find((obj) => obj.pk === 'first_view_profile')) {
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
  }, [isLoading, appType]);

  useEffect(() => {
    if (courseData) {
      setLoaded(true);
    }
  }, [courseData]);

  useEffect(() => {
    router.prefetch('/demo');
  }, []);

  const handleClickCourse = () => {
    registerEvent(EventsEnum.FINISH_COURSE, {
      [EventsEnum.FINISH_COURSE]: courseData?.title,
    });
    router.push('/demo');
  };

  /**
   *
   * @param {"wp" | "tw" | "link"} provider
   */
  const handleClickShare = (provider) => {
    const baseURL = window.location;
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
