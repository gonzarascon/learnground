import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import gemoji from 'remark-gemoji';
import highlight from 'remark-highlight.js';
import { Box, Button, Flex } from '@chakra-ui/react';

import { Heading } from './renderers';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const Markdown = ({ source = '' }) => {
  const renderers = {
    heading: Heading,
  };

  return (
    <Box
      overflowY="auto"
      borderColor="gray.100"
      borderWidth="2px"
      roundedTopLeft="lg"
      roundedBottomLeft="lg"
      position="relative"
    >
      <Box p="10">
        <ReactMarkdown renderers={renderers} plugins={[gfm, gemoji, highlight]}>
          {source}
        </ReactMarkdown>
      </Box>
      <Flex
        position="sticky"
        left={0}
        bottom={0}
        width="100%"
        bgColor="gray.200"
        py="2"
        px="2"
        align="center"
        justify="space-between"
      >
        <Button colorScheme="blue" leftIcon={<ChevronLeftIcon />}>
          Clase anterior
        </Button>
        <Button colorScheme="blue" rightIcon={<ChevronRightIcon />}>
          Próxima clase
        </Button>
      </Flex>
    </Box>
  );
};

Markdown.propTypes = {
  source: PropTypes.string,
};

export default Markdown;
