import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Progress,
  Text,
} from '@chakra-ui/react';
import { useStore, useProfileStore } from '@/lib/store';
import { parseCammelCase } from '@/lib/helpers';
import { parseXPToLevel } from '@/lib/gamifiedHandler';

const UserInformation = () => {
  const setShopOpen = useStore((state) => state.setShopOpen);
  const [userLevel, setUserLevel] = useState(null);
  const [profileData, visitorIsOwner] = useProfileStore((state) => [
    state.profileData,
    state.visitorIsOwner,
  ]);
  const handleStoreOpen = () => {
    setShopOpen(true);
  };

  useEffect(() => {
    if (profileData) {
      setUserLevel(parseXPToLevel(profileData.xp));
    }
  }, []);
  return (
    <Box gridArea="info" maxW="441px">
      {profileData && (
        <Flex wrap="nowrap" align="center">
          <Avatar
            name={profileData.username && parseCammelCase(profileData.username)}
            size="xl"
          />
          <Box ml="5">
            <Heading as="h3">{profileData.username}</Heading>
            <Flex wrap="nowrap" align="center">
              {profileData.pins && (
                <Box bg="green.200" rounded="md" mr="3" w="15px" h="15px"></Box>
              )}
              {profileData.titles && <Text>Cazador de conocimiento</Text>}
            </Flex>
          </Box>
        </Flex>
      )}
      {userLevel && (
        <Flex wrap="nowrap" align="center" mt="10">
          <Flex direction="column" align="center" mr="5" color="gray.700">
            <Text fontSize="sm" textAlign="center">
              NIVEL
            </Text>
            <Heading>{userLevel.number}</Heading>
          </Flex>

          <Progress
            colorScheme="green"
            height="35px"
            value={profileData.xp ? profileData.xp : 0}
            min={userLevel.minAmmount ? userLevel.minAmmount : 0}
            max={userLevel.maxAmmount ? userLevel.maxAmmount : 100}
            w="100%"
            rounded="2xl"
          />
        </Flex>
      )}
      {profileData && visitorIsOwner && (
        <Flex wrap="nowrap" align="center" mt="10" justify="space-between">
          <Flex align="center" wrap="nowrap">
            <Box bg="green.200" h="30px" w="30px" rounded="100%" mr="5"></Box>
            <Text fontSize="xl">{profileData.money}</Text>
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
