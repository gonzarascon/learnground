import React from 'react';

import { Avatar, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/core';

const AvatarMenu = () => {
  return (
    <Menu closeOnSelect>
      <MenuButton>
        <Avatar size="sm" name="Usuario Prueba" />
      </MenuButton>

      <MenuList bg="gray.200">
        <MenuItem>Algo</MenuItem>
        <MenuItem>Algo</MenuItem>
        <MenuItem>Algo</MenuItem>
        <MenuItem>Algo</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default AvatarMenu;
