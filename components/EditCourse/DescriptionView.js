import React, { useCallback, useState, useEffect } from 'react';
import _ from 'lodash';
import { useRouter } from 'next/router';
import useSWR from 'swr';
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
import { useCourseEditStore, useStore } from '@/lib/store';
import { fetcher, slugify } from '@/lib/helpers';
import { updateCollection, uploadFile } from '@/lib/firebase/dataFunctions';

const DescriptionView = () => {
  const [courseData, setCourseData] = useCourseEditStore((state) => [
    state.courseData,
    state.setCourseData,
  ]);
  const { data: categories } = useSWR('/api/categories/get', fetcher);
  const appType = useStore((state) => state.appType);
  const router = useRouter();
  const [data, setData] = useState({
    image: undefined,
    concepts: [''],
    title: '',
    categoryId: null,
    description: '',
  });

  useEffect(() => {
    if (courseData) {
      setData((data) => ({
        ...data,
        title: courseData.data?.title,
        categoryId: courseData.data?.categoryId,
        concepts: courseData.data?.concepts,
        image: courseData.data?.thumbnail
          ? {
              preview: courseData.data.thumbnail,
            }
          : undefined,
        description: courseData.data?.description,
      }));
    }
  }, [courseData]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles) {
        setData({
          ...data,
          image: Object.assign(acceptedFiles[0], {
            file: acceptedFiles[0],
            preview: URL.createObjectURL(acceptedFiles[0]),
          }),
        });
      }
    },
    [data]
  );

  const handlePublish = async () => {
    let thumbnailURL = '';
    if (data.image) {
      await uploadFile(data.image).then(async (snapshot) => {
        thumbnailURL = await snapshot.ref.getDownloadURL();
      });
    }

    const newData = {
      title: data.title,
      slug: slugify(data.title),
      thumbnail: thumbnailURL,
      description: data.description,
      concepts: data.concepts,
    };

    await updateCollection('courses', courseData.uid, newData).then(() => {
      const pathType = appType === 'normal' ? 'no-gamificado' : 'gamificado';

      console.log('UPDATE FINISHED');

      setCourseData({ data: { ...newData }, uid: courseData.uid });

      router.push(
        `/demo/${pathType}/curso/${slugify(data.title)}/editar/finalizado`
      );
    });
  };

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
      <Button colorScheme="green" alignSelf="flex-end" onClick={handlePublish}>
        Publicar curso
      </Button>
      <Heading as="h4">Información del curso</Heading>
      <Grid templateColumns="1fr 1fr" gap="20px" w="100%" mt="10">
        <FormControl>
          <FormLabel>Título</FormLabel>
          <Input
            placeholder="Titulo del curso"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Categoría</FormLabel>
          <Select
            options={categories}
            isLoading={categories ? false : true}
            placeholder="Busca una categoría"
            isSearchable
            value={_.find(categories, (c) => c.fields.id === data.categoryId)}
            getOptionLabel={(option) => option.fields.name}
            getOptionValue={(option) => option.fields.id}
            onChange={(v) =>
              setData((data) => ({ ...data, categoryId: v.fields.id }))
            }
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
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            ></Textarea>
          </FormControl>
          <FormControl>
            <FormLabel>¿Qué aprenderan tus alumnos?</FormLabel>

            {data.concepts?.map((concept, index) => (
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
