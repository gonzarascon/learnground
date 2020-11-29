import React from 'react';
import {
  Flex,
  Box,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalCloseButton,
  useDisclosure,
  ModalFooter,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, ChevronRightIcon } from '@chakra-ui/icons';

const ContentView = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      pt="5"
      minH="60vh"
      direction="column"
      align="center"
      justify="space-between"
    >
      <Modal isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crear un nuevo contenido</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box py="5">
              <FormControl>
                <FormLabel>Ingresa el titulo de tu contenido</FormLabel>
                <Flex>
                  <Input
                    placeholder="Clase sobre como plantar tulipanes."
                    borderTopRightRadius="0"
                    borderBottomRightRadius="0"
                  />
                  <Button
                    colorScheme="blue"
                    borderTopLeftRadius="0"
                    borderBottomLeftRadius="0"
                  >
                    Agregar
                  </Button>
                </Flex>
              </FormControl>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cerrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box w="100%">
        <Flex
          my="2"
          wrap="nowrap"
          justify="space-between"
          align="center"
          p="5"
          border="1px solid"
          borderColor="gray.200"
        >
          <Text>Titulo de clase</Text>

          <Flex wrap="nowrap">
            <Button
              colorScheme="yellow"
              mr="2"
              rightIcon={<EditIcon />}
              variant="ghost"
            >
              Editar
            </Button>
            <Button
              colorScheme="red"
              rightIcon={<DeleteIcon />}
              variant="ghost"
            >
              Eliminar
            </Button>
          </Flex>
        </Flex>
        <Button
          m="30px auto"
          d="block"
          colorScheme="blue"
          variant="outline"
          onClick={onOpen}
        >
          Agregar contenido
        </Button>
      </Box>
      <Button
        alignSelf="flex-end"
        d="block"
        colorScheme="blue"
        rightIcon={<ChevronRightIcon />}
      >
        Continuar
      </Button>
    </Flex>
  );
};

export default ContentView;
