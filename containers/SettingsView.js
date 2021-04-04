import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import _ from 'lodash';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import Select from 'react-select';
import { useUserStore } from '@/lib/store';
import { fetcher, parseCammelCase } from '@/lib/helpers';
import { registerEvent } from '@/lib/firebase/dataFunctions';
import { EventsEnum } from '@/lib/events';

function SettingsView() {
  const [user, setUser] = useUserStore((state) => [
    state.user,
    state.setUserOnly,
  ]);
  const { data: titlesData } = useSWR(
    user.titles && `/api/titles/get?titles=${JSON.stringify(user.titles)}`,
    fetcher
  );
  const { data: pinsData } = useSWR(
    user.pins && `/api/pins/get?pins=${JSON.stringify(user.pins)}`,
    fetcher
  );
  const [settingsData, setSettingsData] = useState({
    username: null,
    titles: null,
    pins: null,
  });

  useEffect(() => {
    if (!_.isEmpty(user)) {
      setSettingsData({ ...settingsData, username: user.username });
    }
  }, [user]);

  useEffect(() => {
    if (titlesData && Array.isArray(titlesData.titles)) {
      setSettingsData({ ...setSettingsData, titles: titlesData.titles });
    }
  }, [titlesData]);

  useEffect(() => {
    if (pinsData && Array.isArray(pinsData.pins)) {
      setSettingsData({ ...setSettingsData, pins: pinsData.pins });
    }
  }, [pinsData]);

  const changeSelected = (arr, selected) => {
    const arrCopy = arr;
    const prevSelected = arrCopy.findIndex((o) => o.selected);
    const newSelected = arrCopy.findIndex((o) => o.id === selected.id);

    if (prevSelected) {
      arrCopy[prevSelected].selected = false;
    }

    if (newSelected) {
      arrCopy[newSelected].selected === true;
    }

    return arrCopy;
  };

  const handleChange = (obj, from) => {
    const isTitle = from === 'title';
    const properArr = isTitle ? user.titles : user.pins;

    const newArr = changeSelected(properArr, obj);

    setUser({ ...user, [isTitle ? 'titles' : 'pins']: newArr });

    registerEvent(isTitle ? EventsEnum.CHANGE_TITLE : EventsEnum.SET_PIN, {
      [isTitle ? EventsEnum.CHANGE_TITLE : EventsEnum.SET_PIN]: obj,
    });
  };

  return (
    <Box
      position="relative"
      maxW="720px"
      mx="auto"
      my="10"
      px="10"
      py="5"
      as="section"
      bg="white"
      rounded="lg"
    >
      <Box
        as="header"
        borderBottom="2px solid"
        borderColor="gray.300"
        py="5"
        position="sticky"
        top="0"
        left="0"
      >
        <Heading as="h3">Configuración</Heading>
      </Box>
      <Box p="5">
        <Box mb="5">
          <Heading as="h4" fontSize="xl" color="gray.500" mb="3">
            Información básica
          </Heading>
          <Flex justify="space-between" align="center">
            <Avatar
              name={
                settingsData.username
                  ? parseCammelCase(settingsData.username)
                  : ''
              }
              size="lg"
            />
            <Input
              placeholder="Nombre de usuario"
              ml="5"
              value={settingsData.username}
            />
          </Flex>
        </Box>
        <Divider orientation="horizontal" />
        <Box my="5">
          <Heading as="h4" fontSize="xl" color="gray.500" mb="3">
            Títulos e insignias
          </Heading>
          <Flex align="center" wrap="nowrap">
            <Text mr="5" flex="0 1 auto">
              Titulo del perfil
            </Text>
            <Box w="100%" flex="1">
              <Select
                placeholder="Selecciona un título..."
                options={settingsData.titles ? settingsData.titles : []}
                noOptionsMessage={() =>
                  '¡Aún no has desbloqueado títulos! Continua aprendiendo para ganar 😊'
                }
                defaultValue={user && user.titles.find((o) => o.selected)}
                onChange={(obj) => handleChange(obj, 'title')}
              />
            </Box>
          </Flex>
          <Flex align="center" wrap="nowrap" mt={5}>
            <Text mr="5" flex="0 1 auto">
              Insignia de identificación
            </Text>
            <Box w="100%" flex="1">
              <Select
                placeholder="Selecciona una insignia..."
                options={settingsData.pins ? settingsData.pins : []}
                noOptionsMessage={() =>
                  '¡Aún no has desbloqueado insignias! Continua aprendiendo para ganar 😊'
                }
                defaultValue={user && user.pins.find((o) => o.selected)}
                onChange={(obj) => handleChange(obj, 'pins')}
              />
            </Box>
          </Flex>
        </Box>
      </Box>
      <Box as="footer" position="sticky" bottom="0" left="0">
        <Button colorScheme="blue">Guardar cambios</Button>
      </Box>
    </Box>
  );
}

export default SettingsView;
