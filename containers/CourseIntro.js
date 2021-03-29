import React, { useEffect, useState, useCallback } from 'react';
import _ from 'lodash';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  List,
  ListIcon,
  ListItem,
  Skeleton,
  Text,
} from '@chakra-ui/react';
import { CheckCircleIcon, EditIcon } from '@chakra-ui/icons';
import {
  useCourseStore,
  useProfileStore,
  useStore,
  useUserStore,
} from '@/lib/store';
import { fetcher } from '@/lib/helpers';
import ActionButton from '@/components';
import {
  subscribeUserToCourse,
  updateBadgeAndXP,
} from '@/lib/firebase/dataFunctions';
import { missionsDataset } from '@/lib/gamifiedHandler';
import useCookies from '@/lib/useCookies';

const CourseIntro = () => {
  const router = useRouter();
  const [toClass, setToClass] = useState(1);
  const [isSubscribed, setIsSubscribed] = useState(undefined);
  const [cookieValue, setCookie] = useCookies();
  const [courseData, courseId] = useCourseStore((state) => [
    state.courseData,
    state.courseId,
  ]);
  const [loggedIn, setProfileAlert] = useStore((state) => [
    state.loggedIn,
    state.setProfileAlert,
  ]);
  const uid = useUserStore((state) => state.uid);
  const setBadge = useProfileStore((state) => state.setBadge);

  const { data } = useSWR(
    courseData && `/api/categories/${courseData.categoryId}`,
    fetcher
  );

  useEffect(() => {
    if (courseData) {
      const checkSubscribed = _.find(
        courseData.subscribers,
        (s) => s.uid === uid
      );
      if (checkSubscribed) {
        setIsSubscribed(true);
        setToClass(checkSubscribed.lastClass);
      } else {
        setIsSubscribed(false);
      }
    }
  }, [courseData]);

  useEffect(() => {
    if (courseData) {
      if (loggedIn) {
        router.prefetch(`/demo/curso/${courseData.slug}/clase/${toClass}`);
      } else {
        router.prefetch(`/auth/iniciar-sesion`);
      }
    }
  }, [toClass, loggedIn, courseData]);

  const handleBadge = () => {
    const badgeToEarn = missionsDataset.find(
      (obj) => obj.pk === 'first_subscribed_course'
    );

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

      if (!badges.find((obj) => obj.pk === 'first_subscribed_course')) {
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
  };

  const subscribeUser = useCallback(async () => {
    const checkSubscribed = _.find(
      courseData.subscribers,
      (s) => s.uid === uid
    );

    if (!checkSubscribed) {
      handleBadge();
      await subscribeUserToCourse({ courseUid: courseId, userUid: uid });
      return;
    } else {
      return;
    }
  }, [courseData, uid]);

  const handleClickStart = async () => {
    if (loggedIn) {
      await subscribeUser();
      router.push(`/demo/curso/${courseData.slug}/clase/${toClass}`);
    } else {
      router.push({
        pathname: `/auth/iniciar-sesion`,
        query: { fromCourse: true, courseSlug: courseData.slug },
      });
    }
  };

  const handleClickEdit = () => {
    if (courseData.creatorId === uid) {
      router.push(`/demo/curso/${courseData.slug}/editar`);
    }
  };

  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" columnGap="50px" py={10}>
        <Flex gridColumn="1/3" align="center" justify="space-between" px={5}>
          <Skeleton isLoaded={data}>
            <Flex align="center">
              <Text mr={5} fontWeight="400" fontSize="xl" fontStyle="oblique">
                Categoría
              </Text>
              <Badge colorScheme="blue">{data && data[0].fields.name}</Badge>
            </Flex>
          </Skeleton>
        </Flex>
        <Box p={5}>
          <Heading as="h3" mb={5}>
            {courseData ? courseData?.title : <Skeleton height="20px" />}
          </Heading>

          <Image
            src={courseData?.thumbnail}
            alt={courseData?.title}
            fallbackSrc="https://via.placeholder.com/641x370"
            w="100%"
            rounded="lg"
            mt="3"
            maxH="370px"
            fit="cover"
          />
          <Text color="gray.500" mt={3} px={2}>
            {courseData ? (
              courseData.description
            ) : (
              <>
                <Skeleton height="20px" as="span" />
                <Skeleton height="20px" as="span" />
                <Skeleton height="20px" as="span" />
              </>
            )}
          </Text>
        </Box>
        <Flex direction="column" maxH="50%" p={5}>
          <Heading as="h4" fontSize="2xl">
            En este curso aprenderás:
          </Heading>
          <List mt={3} spacing={3}>
            {courseData?.concepts.map((concept, index) => (
              <ListItem key={`${concept}-${index}`}>
                <ListIcon as={CheckCircleIcon} color="green.500" />
                {concept}
              </ListItem>
            ))}
          </List>

          <Skeleton
            mt="auto"
            justifySelf="flex-end"
            isLoaded={isSubscribed !== undefined}
            colorScheme="green"
          >
            <Button
              colorScheme="green"
              justifySelf="flex-end"
              mt="auto"
              maxW="200px"
              onClick={handleClickStart}
            >
              {isSubscribed ? 'Continuar' : 'Comenzar'} curso
            </Button>
          </Skeleton>
        </Flex>
      </Grid>
      {courseData && courseData.creatorId === uid && (
        <ActionButton
          icon={<EditIcon />}
          onClick={handleClickEdit}
          colorScheme="green"
        />
      )}
    </>
  );
};

export default CourseIntro;
