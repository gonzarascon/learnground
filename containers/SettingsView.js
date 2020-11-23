import React, { useState } from 'react';
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

function SettingsView() {
  const [settingsData, setSettingsData] = useState({});

  return (
    <Box position="relative" maxW="720px" m="0 auto" as="section">
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
            <Avatar name="Usuario Prueba" size="lg" />
            <Input placeholder="Nombre de usuario" ml="5" />
          </Flex>
        </Box>
        <Divider orientation="horizontal" />
        <Box my="5">
          <Heading as="h4" fontSize="xl" color="gray.500" mb="3">
            Títulos e insignias
          </Heading>
          <Flex align="center" wrap="nowrap">
            <Text mr="5">Titulo del perfil</Text>
            <Select />
          </Flex>
          <Flex align="center" wrap="nowrap">
            <Text mr="5">Insignia de identificación</Text>
            <Select />
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
