import React, { useCallback, useState } from 'react';
import {
  Flex,
  Box,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  Grid,
  Heading,
  Image,
  Textarea,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon, AddIcon } from '@chakra-ui/icons';
import Select from 'react-select';
import { useDropzone } from 'react-dropzone';

// temp
const options = [
  { value: 'cat_1', label: 'categoria 1' },
  { value: 'cat_2', label: 'categoria 2' },
];

const DescriptionView = () => {
  const [data, setData] = useState({ image: undefined, concepts: [''] });

  const onDrop = useCallback((acceptedFiles) => {
    setData({
      ...data,
      image: Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      }),
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  const handleConcept = useCallback(
    (value, index) => {
      const concepts = [...data.concepts];

      concepts[index] = value;

      setData({ ...data, concepts });
    },
    [data]
  );

  const handleNewConcept = useCallback(() => {
    const concepts = [...data.concepts];

    concepts.push('');

    setData({ ...data, concepts });
  }, [data]);

  const handleRemoveConcept = useCallback(
    (index) => {
      const concepts = [...data.concepts];
      concepts.splice(index, 1);
      setData({ ...data, concepts });
    },
    [data]
  );

  /* TODO: bring data from db */

  return (
    <Flex
      pt="5"
      minH="60vh"
      direction="column"
      align="center"
      justify="space-between"
    >
      <Button colorScheme="green" alignSelf="flex-end">
        Publicar curso
      </Button>
      <Heading as="h4">Información del curso</Heading>
      <Grid templateColumns="1fr 1fr" gap="20px" w="100%" mt="10">
        <FormControl>
          <FormLabel>Título</FormLabel>
          <Input placeholder="Titulo del curso" />
        </FormControl>
        <FormControl>
          <FormLabel>Categoría</FormLabel>
          <Select
            options={options}
            placeholder="Busca una categoría"
            isClearable
            value={options[0]}
          />
        </FormControl>
        <Box>
          <FormControl>
            <FormLabel>Portada</FormLabel>
            <Box
              {...getRootProps()}
              background="gray.100"
              p="5"
              rounded="lg"
              _hover={{ cursor: 'pointer', backgroundColor: 'gray.200' }}
            >
              <Input {...getInputProps()} multiple={false} />
              {isDragActive ? (
                <Text color="gray.500">Suelta la imagen aquí</Text>
              ) : (
                <Text color="gray.500">
                  Suelta la imagen aquí o haz clic para buscar el archivo.
                </Text>
              )}
            </Box>
          </FormControl>
          <Image
            src={data.image?.preview}
            fallbackSrc="https://via.placeholder.com/641x370"
            w="100%"
            rounded="lg"
            mt="3"
            maxH="370px"
            fit="cover"
          />
        </Box>
        <Box>
          <FormControl>
            <FormLabel>Descripción</FormLabel>
            <Textarea
              resize="none"
              placeholder="Escribe una descripción para tu curso."
              isRequired
            ></Textarea>
          </FormControl>
          <FormControl>
            <FormLabel>¿Qué aprenderan tus alumnos?</FormLabel>

            {data.concepts.map((concept, index) => (
              <Flex key={`key_${index}`} py="2">
                <Input
                  placeholder="A crear interfaces dinamicas."
                  value={concept}
                  onChange={(e) => handleConcept(e.target.value, index)}
                />
                {data.concepts.length !== 1 && (
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    ml="3"
                    onClick={() => handleRemoveConcept(index)}
                  />
                )}
              </Flex>
            ))}
            <IconButton
              icon={<AddIcon />}
              colorScheme="blue"
              m="0 auto"
              d="block"
              onClick={handleNewConcept}
            />
          </FormControl>
        </Box>
      </Grid>
    </Flex>
  );
};

export default DescriptionView;
