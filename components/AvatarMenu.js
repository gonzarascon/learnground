import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';

import { useStore } from '@/lib/store';

const MenuItems = [
  {
    label: 'Mi perfil',
    href: 'perfil/username',
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
      <MenuButton _hover={{ bg: 'gray.200' }} p="2" rounded="25px">
        <Flex display="flex" flexDir="row" alignItems="center">
          <Avatar size="sm" name="Usuario Prueba" />
          <Text ml="2" fontFamily="var(--f-Chivo)">
            Usuario Prueba
          </Text>
        </Flex>
      </MenuButton>

      <MenuList bg="gray.200" py="5" rounded="25px">
        {MenuItems.map((item) => (
          <MenuItem
            _hover={{ backgroundColor: 'gray.300' }}
            key={item.href}
            onClick={() => handleRedirect(item.href)}
          >
            {item.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default AvatarMenu;
