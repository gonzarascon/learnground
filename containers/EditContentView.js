import React from 'react';
import { Box, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react';
import MDEditor, { commands } from '@uiw/react-md-editor';

const commandList = [
  commands.bold,
  commands.hr,
  commands.title,
  commands.code,
  commands.link,
  commands.orderedListCommand,
  commands.unorderedListCommand,
  commands.divider,
  commands.strikethrough,
  {
    name: 'Imagen',
    keyCommand: 'image',
    icon: (
      <svg width="12" height="12" viewBox="0 0 20 20">
        <path
          fill="currentColor"
          d="M15 9c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm4-7H1c-.55 0-1 .45-1 1v14c0 .55.45 1 1 1h18c.55 0 1-.45 1-1V3c0-.55-.45-1-1-1zm-1 13l-6-5-2 2-4-5-4 8V4h16v11z"
        ></path>
      </svg>
    ),
  },
];

const EditContentView = () => {
  return (
    <Box pt="5">
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
      <Heading as="h3" fontSize="lg" mt="5">
        Contenido
      </Heading>
      <Box w="100%">
        <MDEditor commands={commandList} visiableDragbar={false} />
      </Box>
    </Box>
  );
};

export default EditContentView;
