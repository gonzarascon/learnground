import React, { useState } from 'react';
// import dynamic from 'next/dynamic';
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

const EditContentView = () => {
  const [editorValue, setEditorValue] = useState('');

  return (
    <Box pt="5">
      <Flex justify="space-between" align="center" wrap="nowrap">
        <FormControl maxW="400px">
          <FormLabel fontFamily="Chivo" fontSize="lg" fontWeight="600">
            Título del contenido
          </FormLabel>
          <Input
            type="text"
            variant="flushed"
            placeholder="Ingresa un titulo para el contenido"
          />
        </FormControl>

        <Button colorScheme="blue">Guardar cambios</Button>
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
