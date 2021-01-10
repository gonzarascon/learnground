import React, { useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
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
import {
  addContentToCourse,
  getSubCollection,
} from '@/lib/firebase/dataFunctions';
import { useCourseEditStore, useStore } from '@/lib/store';

const ContentView = () => {
  const router = useRouter();
  const [contentData, setContentData] = useState([]);
  const [contentName, setContentName] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const courseData = useCourseEditStore((state) => state.courseData);
  const appType = useStore((state) => state.appType);

  const fetchData = useCallback(async () => {
    const { uid } = courseData;
    await getSubCollection(`courses/${uid}/content`).then((docRef) => {
      const docsArr = [];
      if (!docRef.empty) {
        for (let i in docRef.docs) {
          const doc = docRef.docs[i];
          if (doc.exists) {
            docsArr.push(doc.data());
          }
        }

        setContentData(docsArr);
      }
    });
  }, [courseData]);

  useEffect(() => {
    if (courseData) {
      fetchData();
    }
  }, [courseData]);

  const handleCreateContent = async () => {
    const { uid } = courseData;
    await addContentToCourse({ title: contentName, courseUid: uid });
    await fetchData();
    setContentName('');
    onClose();
  };

  const handleEditContent = (content) => {
    const pathType = appType === 'normal' ? 'no-gamificado' : 'gamificado';
    const {
      data: { slug },
    } = courseData;
    router.push(`/demo/${pathType}/curso/${slug}/editar/contenido/${content}`);
  };

  return (
    <Flex
      pt="5"
      minH="60vh"
      direction="column"
      align="center"
      justify="space-between"
    >
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
                    onChange={(e) => setContentName(e.target.value)}
                  />
                  <Button
                    colorScheme="blue"
                    borderTopLeftRadius="0"
                    borderBottomLeftRadius="0"
                    onClick={handleCreateContent}
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
        {contentData.length <= 0 && (
          <Flex
            my="2"
            wrap="nowrap"
            justify="center"
            align="center"
            p="5"
            border="1px solid"
            borderColor="gray.200"
          >
            <Text color="gray.400">
              No hay contenido en este curso por ahora. Haz click en "Agregar
              contenido" y comienza a editar.
            </Text>
          </Flex>
        )}
        {contentData.length > 0 &&
          contentData.map((data) => (
            <Flex
              key={data.id}
              my="2"
              wrap="nowrap"
              justify="space-between"
              align="center"
              p="5"
              border="1px solid"
              borderColor="gray.200"
            >
              <Text>{data.title}</Text>

              <Flex wrap="nowrap">
                <Button
                  colorScheme="yellow"
                  mr="2"
                  rightIcon={<EditIcon />}
                  variant="ghost"
                  onClick={() => handleEditContent(data.slug)}
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
          ))}
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
