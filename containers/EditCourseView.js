import React from 'react';
import {
  Box,
  Button,
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, ChevronRightIcon } from '@chakra-ui/icons';

const EditCourseView = () => {
  return (
    <Box pt="5">
      <Tabs variant="enclosed-colored" colorScheme="blue">
        <TabList>
          <Tab>Contenidos</Tab>
          <Tab>Detalles</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex
              pt="5"
              minH="60vh"
              direction="column"
              align="center"
              justify="space-between"
            >
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
          </TabPanel>
          <TabPanel>
            <p>2</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default EditCourseView;
