import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import gemoji from 'remark-gemoji';
import highlight from 'remark-highlight.js';
import { Box } from '@chakra-ui/react';

import { Heading } from './renderers';

const Markdown = ({ source = '' }) => {
  const renderers = {
    heading: Heading,
  };

  return (
    <Box
      overflowY="auto"
      borderColor="gray.100"
      borderWidth="2px"
      p="10"
      roundedTopLeft="lg"
      roundedBottomLeft="lg"
    >
      <ReactMarkdown renderers={renderers} plugins={[gfm, gemoji, highlight]}>
        {source}
      </ReactMarkdown>
    </Box>
  );
};

Markdown.propTypes = {
  source: PropTypes.string,
};

export default Markdown;
