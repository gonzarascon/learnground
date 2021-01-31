import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import {
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';

import { useStore, useUserStore } from '@/lib/store';
import { parseCammelCase } from '@/lib/helpers';
import { logout } from '@/lib/firebase/dataFunctions';

const MenuItems = (username) => [
  {
    label: 'Mi perfil',
    href: `perfil/${username}`,
  },
  {
    label: 'Configuración',
    href: 'perfil/configuracion',
  },
  {
    label: 'Cerrar sesión',
    href: 'logout',
  },
];

const AvatarMenu = () => {
  const router = useRouter();
  const [appType, setLoggedIn] = useStore((state) => [
    state.appType,
    state.setLoggedIn,
  ]);
  const [user, clearUser] = useUserStore((state) => [
    state.user,
    state.clearUser,
  ]);

  useEffect(() => {
    if (appType && user) {
      const pathType = appType === 'normal' ? 'no-gamificado' : 'gamificado';
      router.prefetch(`/demo/${pathType}/perfil/${user.username}`);
      router.prefetch(`/demo/${pathType}/perfil/configuracion`);
    }
  }, [appType, user]);

  const handleRedirect = async (href) => {
    const pathType = appType === 'normal' ? 'no-gamificado' : 'gamificado';
    if (href === 'logout') {
      //TODO: handle logout

      await logout().then(() => {
        setLoggedIn(false);
        clearUser();
        router.push(`/demo/${pathType}`);
      });

      return;
    }

    router.push(`/demo/${pathType}/${href}`);
  };

  return (
    <Menu closeOnSelect>
      <MenuButton _hover={{ bg: 'gray.200' }} p="2" rounded="25px">
        <Flex display="flex" flexDir="row" alignItems="center">
          <Avatar size="sm" name={parseCammelCase(user.username)} />
          <Text ml="2" fontFamily="var(--f-Chivo)">
            {user.username}
          </Text>
        </Flex>
      </MenuButton>

      <MenuList bg="gray.200" py="5" rounded="25px">
        {MenuItems(user.username).map((item) => (
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
