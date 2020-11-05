import React from 'react';
import { useRouter } from 'next/router';
import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/core';

import { useStore } from '@/lib/store';

const MenuItems = [
  {
    label: 'Mi perfil',
    href: 'profile',
  },
  {
    label: 'Ver tienda',
    href: 'store',
  },
  {
    label: 'Cerrar sesión',
    href: 'logout',
  },
];

const AvatarMenu = () => {
  const router = useRouter();
  const appType = useStore((state) => state.appType);

  const handleRedirect = (href) => {
    if (href === 'logout') {
      //TODO: handle logout

      return;
    }

    const pathType = appType === 'normal' ? 'no-gamificado' : 'gamificado';

    router.push(`/demo/${pathType}/${href}`);
  };

  return (
    <Menu closeOnSelect>
      <MenuButton
        display="flex"
        alignItems="center"
        _hover={{ bg: 'gray.200' }}
        p="2"
        rounded="25px"
      >
        <Avatar size="sm" name="Usuario Prueba" />
        <Text ml="2" fontFamily="var(--f-Chivo)">
          Usuario Prueba
        </Text>
      </MenuButton>

      <MenuList bg="gray.200" py="5" rounded="25px">
        {MenuItems.map((item) => (
          <MenuItem _hover={{ backgroundColor: 'gray.300' }} key={item.href}>
            {item.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default AvatarMenu;
