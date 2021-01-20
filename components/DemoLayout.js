import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';

import { Header, ClassList } from '@/components';

import { useStore, useUserStore } from '@/lib/store';
import { auth } from '@/lib/firebase/client';
import { getById } from '@/lib/firebase/dataFunctions';

const DemoLayout = ({ children, isCourse = false }) => {
  const [setUser, clearUser] = useUserStore((state) => [
    state.setUser,
    state.clearUser,
  ]);
  const [shopOpen, setShopOpen, setLoggedIn] = useStore((state) => [
    state.shopOpen,
    state.setShopOpen,
    state.setLoggedIn,
  ]);

  const handleAuthStateChanged = (user) => {
    if (user) {
      getById('users', user.uid).then((response) => {
        if (response.data()) {
          setUser({ uid: user.uid, user: response.data() });
          setLoggedIn(true);
        }
      });
    } else {
      setLoggedIn(false);
      clearUser();
    }
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(handleAuthStateChanged);

    return () => unsub();
  }, []);

  return (
    <Flex
      minH="100vh"
      direction="column"
      align="center"
      position="relative"
      className="layout"
    >
      <Header version="demo" isCourse={isCourse} />
      {isCourse && <ClassList />}
      <Box
        as="main"
        width="100%"
        height="100%"
        minHeight="calc(100vh - 94px - 21px)"
        maxW="1400px"
      >
        {children}
      </Box>

      <Modal isOpen={shopOpen} onClose={() => setShopOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tienda de artículos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>tienda</ModalBody>
        </ModalContent>
      </Modal>

      <Flex align="center" justify="center" as="footer" w="100%">
        <Text fontSize="sm" color="gray.500">
          My footer
        </Text>
      </Flex>
    </Flex>
  );
};

DemoLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  isCourse: PropTypes.bool,
};

export default DemoLayout;
