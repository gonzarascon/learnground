import React from 'react';
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

import { useStore } from '@/lib/store';

const DemoLayout = ({ children, isCourse = false }) => {
  const [shopOpen, setShopOpen] = useStore((state) => [
    state.shopOpen,
    state.setShopOpen,
  ]);

  return (
    <Flex minH="100vh" direction="column" align="center" position="relative">
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
