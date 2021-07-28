import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Progress,
  Text,
  Icon,
} from '@chakra-ui/react';
import {
  useStore,
  useProfileStore,
  useUserStore,
  useItemsStore,
} from '@/lib/store';
import { parseCammelCase } from '@/lib/helpers';
import { missionsDataset, parseXPToLevel } from '@/lib/gamifiedHandler';
import useCookies from '@/lib/useCookies';
import { registerEvent, updateBadgeAndXP } from '@/lib/firebase/dataFunctions';
import { CurrencyDollarIcon, AcademicCapIcon } from '@heroicons/react/solid';
import { EventsEnum } from '@/lib/events';

const UserInformation = () => {
  const uid = useUserStore((state) => state.uid);
  const availableMoney = useItemsStore((state) => state.availableMoney);
  const [setShopOpen, isGamified] = useStore((state) => [
    state.setShopOpen,
    state.appType === 'gamified' ? true : false,
  ]);
  const [userLevel, setUserLevel] = useState({
    minAmmount: 0,
    maxAmmount: 100,
    number: 0,
  });
  const [
    profileData,
    visitorIsOwner,
    setBadge,
    selectedColor,
  ] = useProfileStore((state) => [
    state.profileData,
    state.visitorIsOwner,
    state.setBadge,
    state.selectedColor,
  ]);
  const [cookieValue, setCookie] = useCookies();

  const handleStoreOpen = () => {
    const badgeToEarn = missionsDataset.find(
      (obj) => obj.pk === 'first_view_store'
    );

    registerEvent(EventsEnum.OPEN_SHOP, {
      [EventsEnum.OPEN_SHOP]: profileData?.username,
    });

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

      if (!badges.find((obj) => obj.pk === 'first_view_store')) {
        setCookie({
          badges: [...badges, badgeToEarn],
        });

        const { badgeId, xpAmmount } = badgeToEarn;
        updateBadgeAndXP(uid, badgeId, xpAmmount).then(() => {
          setBadge(badgeId);
        });
      }
    }

    setShopOpen(true);
  };

  useEffect(() => {
    if (profileData && isGamified) {
      setUserLevel(parseXPToLevel(profileData.xp));
    }
  }, [isGamified, profileData]);

  return (
    <Box gridArea="info" maxW="441px">
      {profileData && (
        <Flex wrap="nowrap" align="center">
          <Avatar
            name={
              profileData?.username && parseCammelCase(profileData.username)
            }
            size="xl"
          />
          <Box ml="5">
            <Heading
              as="h3"
              color={
                selectedColor && isGamified ? selectedColor.color : 'black'
              }
            >
              {profileData?.username}
            </Heading>
            {isGamified &&
              profileData?.titles &&
              profileData.titles.find((t) => t.selected) && (
                <Flex wrap="nowrap" align="center">
                  <Icon
                    as={AcademicCapIcon}
                    color="green.200"
                    w="30px"
                    h="30px"
                    mr="5"
                  />

                  <Text>{profileData.titles.find((t) => t.selected).name}</Text>
                </Flex>
              )}
          </Box>
        </Flex>
      )}
      {isGamified && (
        <Flex wrap="nowrap" align="center" mt="10">
          <Flex direction="column" align="center" mr="5" color="gray.700">
            <Text fontSize="sm" textAlign="center">
              NIVEL
            </Text>
            <Heading>{userLevel?.number}</Heading>
          </Flex>

          <Progress
            colorScheme="green"
            height="35px"
            value={profileData?.xp ? profileData.xp : 0}
            min={userLevel?.minAmmount ? userLevel.minAmmount : 0}
            max={userLevel?.maxAmmount ? userLevel.maxAmmount : 100}
            w="100%"
            rounded="2xl"
          />
        </Flex>
      )}
      {profileData && visitorIsOwner && isGamified && (
        <Flex wrap="nowrap" align="center" mt="10" justify="space-between">
          <Flex align="center" wrap="nowrap">
            <Icon
              as={CurrencyDollarIcon}
              color="green.200"
              w="30px"
              h="30px"
              mr="5"
            />
            <Text fontSize="xl">{availableMoney}</Text>
          </Flex>
          <Button colorScheme="purple" onClick={handleStoreOpen}>
            Visitar tienda
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default UserInformation;
