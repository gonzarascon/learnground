import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { ArrowNarrowLeftIcon } from '@heroicons/react/outline';
import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Icon,
  Text,
  Button,
  Grid,
} from '@chakra-ui/react';
import { logout, registerEvent } from '@/lib/firebase/dataFunctions';

import { Header, ClassList } from '@/components';

import { useItemsStore, useStore, useUserStore } from '@/lib/store';
import { auth } from '@/lib/firebase/client';
import { getById } from '@/lib/firebase/dataFunctions';
import { EventsEnum } from '@/lib/events';
import { CurrencyDollarIcon } from '@heroicons/react/solid';
import { StoreItems } from '@/lib/constants';

const StoreItem = ({ color, text, isPurchased, onClick, ...rest }) => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      opacity={isPurchased ? 0.75 : 100}
      {...rest}
    >
      <Box w="100px" h="100px" bgColor={color} rounded="md" />
      <Flex align="center" wrap="nowrap" mt="2">
        <Icon
          as={CurrencyDollarIcon}
          color="green.200"
          w="30px"
          h="30px"
          mr="2"
        />
        <Text fontWeight="bold">500</Text>
      </Flex>
      <Text fontSize="sm" textAlign="center" mt="2">
        Color {text} para tu usuario.
      </Text>
      <Button
        onClick={onClick}
        disabled={isPurchased}
        mt="2"
        colorScheme="blue"
      >
        Comprar
      </Button>
    </Flex>
  );
};

const DemoLayout = ({ children, isCourse = false }) => {
  const router = useRouter();
  const [
    availableMoney,
    restMoney,
    setPurchasedItem,
    purchasedItems,
  ] = useItemsStore((state) => [
    state.availableMoney,
    state.restMoney,
    state.setPurchasedItem,
    state.purchasedItems,
  ]);
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

  useEffect(() => {
    router.prefetch('/');
  }, []);

  const handleReditect = async () => {
    registerEvent(EventsEnum.BACK_TO_INDEX, { [EventsEnum.BACK_TO_INDEX]: 1 });
    await logout().then(() => {
      setLoggedIn(false);
      clearUser();
      router.push(`/`);
    });
  };

  const purchaseItem = (item) => {
    restMoney(500);
    setPurchasedItem(item);
  };

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

      <Modal isOpen={shopOpen} size="xl" onClose={() => setShopOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tienda de artículos</ModalHeader>
          <ModalCloseButton />
          <ModalBody p="5">
            <Grid templateColumns="repeat(3,1fr)" gap="10">
              {StoreItems.map((item) => (
                <StoreItem
                  key={item.text}
                  onClick={() => purchaseItem(item)}
                  isPurchased={
                    availableMoney > 0
                      ? purchasedItems?.find((i) => i === item) !== undefined
                        ? true
                        : false
                      : true
                  }
                  {...item}
                />
              ))}
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Flex
        align="center"
        justify="space-between"
        as="footer"
        w="100%"
        py="5"
        px="10"
      >
        <Button
          color="blue.500"
          bg="white"
          px="5"
          py="2"
          rounded="md"
          shadow="base"
          onClick={handleReditect}
        >
          <Icon as={ArrowNarrowLeftIcon} w={10} h={5} />
          Volver al comienzo.
        </Button>

        <Text fontSize="sm" color="gray.500">
          Hecho con ❤️ y 👷‍♂️ por Gonzalo Rascón
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
