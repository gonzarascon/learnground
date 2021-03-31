import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from '@chakra-ui/react';
import { Editor } from '@/components';
import 'highlight.js/styles/default.css';

import '@/lib/highlight';
import { useCourseEditStore } from '@/lib/store';
import { updateContent } from '@/lib/firebase/dataFunctions';

const EditContentView = () => {
  const [contentData, courseData] = useCourseEditStore((state) => [
    state.contentData,
    state.courseData,
  ]);
  const router = useRouter();
  const [contentTitle, setContentTitle] = useState('');
  const [editorValue, setEditorValue] = useState('');

  useEffect(() => {
    if (contentData) {
      console.log(contentData.data.data);
      setContentTitle(contentData.data.title);
      setEditorValue(contentData.data.data);
    }
  }, [contentData]);

  useEffect(() => {
    if (courseData) {
      router.prefetch(`/demo/curso/${courseData.data.slug}/editar`);
    }
  }, [courseData]);

  const handleSave = async () => {
    const data = {
      title: contentTitle,
      data: editorValue,
    };
    await updateContent({
      courseUid: courseData.uid,
      contentUid: contentData.uid,
      data,
    }).then(() => {
      router.push(`/demo/curso/${courseData.data.slug}/editar`);
    });
  };

  return (
    <Box p="5" rounded="md" bg="white" mt="5" mx="10">
      <Flex justify="space-between" align="center" wrap="nowrap">
        <FormControl maxW="400px">
          <FormLabel fontFamily="Chivo" fontSize="lg" fontWeight="600">
            Título del contenido
          </FormLabel>
          <Input
            type="text"
            variant="flushed"
            placeholder="Ingresa un titulo para el contenido"
            value={contentTitle}
            onChange={(e) => setContentTitle(e.target.value)}
          />
        </FormControl>

        <Button colorScheme="blue" onClick={handleSave}>
          Guardar cambios
        </Button>
      </Flex>
      <Heading as="h3" fontSize="lg" mt="5">
        Contenido
      </Heading>
      <Box w="100%">
        <Editor editorValue={editorValue} setEditorValue={setEditorValue} />
      </Box>
      <style jsx>{`
        :global(.ql-snow .ql-editor pre.ql-syntax) {
          background-color: #f0f0f0;
        }
      `}</style>
    </Box>
  );
};

export default EditContentView;
